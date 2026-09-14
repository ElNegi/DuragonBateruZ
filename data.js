/* map.js
   ---------------------------------------------------------------------
   REESCRITURA — árbol de nodos rogue-like + enemigos con patrón fijo.

   1) generarMapa(numNodos): genera de 30 a 40 nodos (por defecto 35)
      repartidos en 3 "Actos". Cada nodo recibe un tipo mediante pesos
      probabilísticos que dependen de en qué punto del Acto se está:
        - Al inicio de cada Acto predomina 'Combate'.
        - 'Elite' no aparece nunca al principio del Acto 1 y gana peso
          conforme avanza la expedición.
        - El PENÚLTIMO nodo de cada Acto es siempre 'Descanso' (hoguera
          previa al jefe) y el ÚLTIMO es siempre 'Jefe'.
        - 'Tienda' y 'Descanso' nunca se repiten dos veces seguidas.

   2) pickEnemyForNode(node, totalNodos): sustituye la IA de "robar
      cartas" del enemigo por un PATRÓN FIJO tipo Inscryption:
      pattern = [{tipo:'ataque'|'bloqueo'|'cura', valor:number}, ...].
      El enemigo se inicializa con un multiplicador de HP y daño según
      el índice global del nodo (más difícil cuanto más se avanza).
   ---------------------------------------------------------------------
*/
(function(){

  // ------------------------------------------------------------------
  // Compatibilidad retro: generador lineal simple (ya no se usa desde
  // game.js, pero se mantiene por si algún código externo lo invoca).
  // ------------------------------------------------------------------
  var NODE_TYPES_LEGACY = ['Tienda','Combate','Entrenamiento','Maestro','Evento','Respiro'];
  window.generateMap = function(count){
    count = count || 8;
    var nodes = [];
    for(var i=0;i<count;i++){
      var type = NODE_TYPES_LEGACY[i % NODE_TYPES_LEGACY.length];
      nodes.push({
        id: 'node-' + (i+1),
        index: i,
        type: type,
        title: type + ' ' + (i+1),
        connectedTo: i>0 ? ['node-'+i] : []
      });
    }
    return nodes;
  };

  // ==================================================================
  // 1) GENERACIÓN DEL MAPA — árbol de 30-40 nodos en 3 Actos
  // ==================================================================

  // Pesos de cada tipo de nodo según el progreso dentro del Acto actual
  // (0 = recién empezado el Acto, ~1 = a punto de llegar al jefe).
  function pesosPorProgreso(progreso, acto){
    var w = { Combate: 46, Elite: 0, Descanso: 11, Tienda: 11, Evento: 18 };

    // Nunca hay Élites al principio del Acto 1: es la introducción.
    w.Elite = (acto === 0 && progreso < 0.3) ? 0 : Math.round(6 + progreso * 16 + acto * 7);

    // Tiendas y Descansos ganan peso hacia el final del Acto (el jugador
    // necesita prepararse antes del jefe).
    w.Tienda += Math.round(progreso * 8);
    w.Descanso += Math.round(progreso * 5);

    // Combate baja ligeramente su peso relativo conforme avanza el Acto
    // y conforme se avanza de Acto (da paso a más variedad de nodos).
    w.Combate = Math.max(18, w.Combate - Math.round(progreso * 12) - acto * 4);

    return w;
  }

  // Elige un tipo de nodo al azar respetando los pesos, evitando repetir
  // el tipo anterior cuando ese tipo es 'Descanso' o 'Tienda' (no tiene
  // sentido encontrar dos hogueras o dos tiendas seguidas).
  function elegirPonderado(pesos, evitarTipos){
    evitarTipos = evitarTipos || [];
    var claves = Object.keys(pesos).filter(function(k){ return pesos[k] > 0; });
    var candidatos = claves.filter(function(k){ return evitarTipos.indexOf(k) === -1; });
    if(candidatos.length === 0) candidatos = claves;

    var total = candidatos.reduce(function(acc,k){ return acc + pesos[k]; }, 0);
    var r = Math.random() * total;
    for(var i = 0; i < candidatos.length; i++){
      r -= pesos[candidatos[i]];
      if(r <= 0) return candidatos[i];
    }
    return candidatos[candidatos.length - 1];
  }

  // Genera el árbol de expedición completo. Devuelve un array plano de
  // nodos (el mapa se presenta como sendero único ascendente en la UI
  // actual); cada nodo conoce su Acto y su tipo.
  window.generarMapa = function(numNodos){
    numNodos = numNodos || 35; // dentro del rango pedido (30-40)
    var ACTOS = 3;
    var porActo = Math.floor(numNodos / ACTOS);
    var nodes = [];
    var globalIdx = 0;

    for(var acto = 0; acto < ACTOS; acto++){
      var esUltimoActo = (acto === ACTOS - 1);
      var nodosEnActo = esUltimoActo ? (numNodos - nodes.length) : porActo;
      var tipoAnterior = null;

      for(var i = 0; i < nodosEnActo; i++){
        var esJefe = (i === nodosEnActo - 1);
        var esPreJefe = (i === nodosEnActo - 2);
        var tipo;

        if(esJefe){
          tipo = 'Jefe';
        } else if(esPreJefe){
          tipo = 'Descanso'; // hoguera garantizada antes de cada jefe
        } else {
          var progreso = nodosEnActo > 1 ? i / (nodosEnActo - 1) : 0;
          var pesos = pesosPorProgreso(progreso, acto);
          var evitarLista = [];
          if(tipoAnterior === 'Descanso' || tipoAnterior === 'Tienda') evitarLista.push(tipoAnterior);
          // El nodo justo antes de la hoguera forzada pre-jefe nunca
          // debe ser también 'Descanso' (evita dos hogueras seguidas).
          if(i === nodosEnActo - 3 && evitarLista.indexOf('Descanso') === -1) evitarLista.push('Descanso');
          tipo = elegirPonderado(pesos, evitarLista);
        }

        nodes.push({
          id: 'node-' + (globalIdx + 1),
          index: globalIdx,
          acto: acto + 1,
          tipo: tipo,
          estado: globalIdx === 0 ? 'disponible' : 'bloqueado'
        });

        tipoAnterior = tipo;
        globalIdx++;
      }
    }

    // Tres bifurcaciones reales (una por Acto). El jugador elige una de
    // las dos rutas; la alternativa queda omitida al comprometerse.
    for(var a = 1; a <= ACTOS; a++){
      var idxs = nodes.map(function(n,idx){ return n.acto===a ? idx : -1; }).filter(function(i){ return i>=0; });
      if(idxs.length < 8) continue;
      var branchA = idxs[3], branchB = idxs[4], merge = idxs[5], prev = idxs[2];
      nodes[prev].nextIndices = [branchA, branchB];
      nodes[branchA].nextIndices = [merge]; nodes[branchB].nextIndices = [merge];
      nodes[branchA].branchGroup = 'acto-'+a; nodes[branchB].branchGroup = 'acto-'+a;
      nodes[branchA].routeLabel = 'Ruta A'; nodes[branchB].routeLabel = 'Ruta B';
      if(a===1){ nodes[branchA].tipo='Combate'; nodes[branchB].tipo='Evento'; }
      else if(a===2){ nodes[branchA].tipo='Elite'; nodes[branchB].tipo='Tienda'; }
      else { nodes[branchA].tipo='Elite'; nodes[branchB].tipo='Evento'; }
    }
    // En el resto del mapa, nextIndices conserva la progresión lineal.
    nodes.forEach(function(n,idx){
      if(!Array.isArray(n.nextIndices)) n.nextIndices = idx < nodes.length-1 ? [idx+1] : [];
    });

    return nodes;
  };

  // Helpers compartidos por solitario y multijugador.
  window.seleccionarRamaMapa = function(nodes, idx){
    nodes = nodes || []; var node = nodes[idx]; if(!node || !node.branchGroup) return nodes;
    nodes.forEach(function(n,i){
      if(i!==idx && n.branchGroup===node.branchGroup && n.estado!=='completado') n.estado='omitido';
    });
    return nodes;
  };

  window.completarNodoMapa = function(nodes, idx){
    nodes = nodes || []; var node = nodes[idx]; if(!node) return nodes;
    node.estado='completado';
    window.seleccionarRamaMapa(nodes,idx);
    (node.nextIndices || (idx<nodes.length-1?[idx+1]:[])).forEach(function(next){
      if(nodes[next] && nodes[next].estado==='bloqueado') nodes[next].estado='disponible';
    });
    return nodes;
  };

  // ==================================================================
  // 2) ENEMIGOS — patrón fijo tipo Inscryption, sin cartas ni IA de mano
  // ==================================================================
  // Cada plantilla define: nombre, raza (solo para el emoji/color de
  // retrato), hpBase y pattern (array cíclico de movimientos). El HP y
  // el valor de cada movimiento se escalan según el nodo alcanzado.

  // RE-TUNING: HP y daño mucho más contenidos. Los nodos de nivel bajo
  // (Tier 1, nodos 0-9) quedan en un rango de 10-20 HP tras el escalado
  // -> combates de 1-2 turnos. El daño de los patrones se mantiene
  // "contenido" (2-3 en Tier 1, creciendo gradualmente) para que el
  // jugador siempre tenga margen de reacción.
  var ENEMY_NORMAL = [
    // -- Tier 1 ---------------------------------------------------------
    { nombre:'Saibaman', race:'Namek', hpBase:10, archetype:'Explosivo', trait:'Alterna golpes rápidos con una carga que vuelve peligroso su siguiente ataque.',
      pattern:[{tipo:'ataque',valor:2},{tipo:'carga',valor:2},{tipo:'ataque',valor:3}] },
    { nombre:'Soldado Raso Freezer', race:'Freezer', hpBase:13, archetype:'Hostigador', trait:'Puede drenar tu energía antes de disparar.',
      pattern:[{tipo:'ataque',valor:3},{tipo:'drenaje',valor:1},{tipo:'ataque',valor:2}] },
    // -- Tier 2 ---------------------------------------------------------
    { nombre:'Guerrero Namekiano', race:'Namek', hpBase:26, archetype:'Regenerador', trait:'Se cura y puede Debilitar tus ataques.',
      pattern:[{tipo:'ataque',valor:4},{tipo:'estado',estado:'Debilitado',valor:0},{tipo:'cura',valor:4},{tipo:'ataque',valor:3}] },
    { nombre:'Élite de Freezer', race:'Freezer', hpBase:24, archetype:'Rompeguardias', trait:'Su golpe pesado atraviesa parte de tu escudo.',
      pattern:[{tipo:'ataque',valor:4},{tipo:'bloqueo',valor:3},{tipo:'rompeguardia',valor:6}] },
    // -- Tier 3 ---------------------------------------------------------
    { nombre:'Saiyan Renegado', race:'Saiyan', hpBase:38, archetype:'Furia', trait:'Aumenta su daño a medida que el combate se alarga.',
      pattern:[{tipo:'ataque',valor:5},{tipo:'furia',valor:1},{tipo:'ataque',valor:4},{tipo:'rompeguardia',valor:7}] }
  ];

  var ENEMY_ELITE = [
    { nombre:'Ginyu', race:'Freezer', hpBase:55, archetype:'Capitán táctico', trait:'Alterna control, contraataques y golpes fuertes.', statusResistances:['Aturdido'],
      pattern:[{tipo:'ataque',valor:6},{tipo:'estado',estado:'Agotado',valor:0},{tipo:'contra',valor:4},{tipo:'ataque',valor:7}], elite:true },
    { nombre:'Comando Ginyu', race:'Freezer', hpBase:62, archetype:'Escuadrón coordinado', trait:'Se protege, se recupera y prepara una descarga cargada.', statusResistances:['Debilitado'],
      pattern:[{tipo:'ataque',valor:5},{tipo:'cura',valor:6},{tipo:'carga',valor:3},{tipo:'bloqueo',valor:5},{tipo:'ataque',valor:7}], elite:true }
  ];

  var ENEMY_BOSS = [
    { nombre:'Nappa', race:'Saiyan', hpBase:90, archetype:'Demoledor Saiyan', trait:'Cuando cae por debajo del 55% entra en Furia y encadena rompeguardias.', statusResistances:['Aturdido'], boss:true,
      pattern:[{tipo:'ataque',valor:6},{tipo:'ataque',valor:5},{tipo:'bloqueo',valor:8},{tipo:'carga',valor:3},{tipo:'ataque',valor:8}],
      phases:[{threshold:.55,name:'Furia Saiyan',rage:2,shield:4,text:'su poder se dispara',pattern:[{tipo:'furia',valor:1},{tipo:'ataque',valor:8},{tipo:'rompeguardia',valor:10},{tipo:'carga',valor:4}]}] },
    { nombre:'Freezer (Segunda Forma)', race:'Freezer', hpBase:120, archetype:'Tirano mutante', trait:'Controla el ritmo con Sellado y drenaje. Cambia de patrón al 60%.', statusResistances:['Sellado','Aturdido'], boss:true,
      pattern:[{tipo:'ataque',valor:7},{tipo:'bloqueo',valor:9},{tipo:'drenaje',valor:2},{tipo:'ataque',valor:8},{tipo:'cura',valor:8}],
      phases:[{threshold:.60,name:'Crueldad creciente',rage:1,shield:7,text:'abandona la cautela y busca anular tus recursos',pattern:[{tipo:'estado',estado:'Sellado',valor:0},{tipo:'rompeguardia',valor:10},{tipo:'drenaje',valor:3},{tipo:'ataque',valor:9}]}] },
    { nombre:'Freezer (Forma Final)', race:'Freezer', hpBase:160, archetype:'Emperador final', trait:'Jefe de tres fases: precisión, dominación y ejecución.', statusResistances:['Aturdido','Sellado','Agotado'], boss:true,
      pattern:[{tipo:'ataque',valor:9},{tipo:'contra',valor:5},{tipo:'bloqueo',valor:10},{tipo:'ataque',valor:10}],
      phases:[
        {threshold:.70,name:'Poder al 70%',rage:1,shield:8,text:'su aura comprime el campo de batalla',pattern:[{tipo:'drenaje',valor:2},{tipo:'ataque',valor:10},{tipo:'estado',estado:'Agotado',valor:0},{tipo:'rompeguardia',valor:12}]},
        {threshold:.35,name:'100% de Poder',rage:3,shield:5,text:'abandona toda defensa y busca terminar el combate',pattern:[{tipo:'carga',valor:5},{tipo:'rompeguardia',valor:14},{tipo:'contra',valor:6},{tipo:'ataque',valor:12}]}
      ] }
  ];

  // Tier 1: nodos 0-9 · Tier 2: nodos 10-24 · Tier 3: nodos 25+
  function tierPorIndice(indice){
    if(indice < 10) return 1;
    if(indice < 25) return 2;
    return 3;
  }

  // Escalado suave: crece con el progreso global en la expedición.
  function multiplicadorPorNodo(indice, totalNodos){
    totalNodos = totalNodos || 35;
    return 1 + (indice / totalNodos) * 1.3;
  }

  function escalarPattern(pattern, mult){
    return pattern.map(function(paso){
      var out = { tipo: paso.tipo };
      if(paso.estado) out.estado = paso.estado;
      if(typeof paso.valor === 'number'){
        // Los movimientos de estado no necesitan valor; el resto escala.
        out.valor = paso.valor === 0 ? 0 : Math.max(1, Math.round(paso.valor * mult));
      }
      return out;
    });
  }

  function escalarPhases(phases, mult){
    return (phases || []).map(function(ph){
      return {
        threshold: ph.threshold,
        name: ph.name,
        text: ph.text,
        rage: ph.rage ? Math.max(1, Math.round(ph.rage * Math.max(1, mult * .75))) : 0,
        shield: ph.shield ? Math.max(1, Math.round(ph.shield * mult)) : 0,
        pattern: escalarPattern(ph.pattern || [], mult)
      };
    });
  }

  // Selecciona y escala un enemigo apropiado para el nodo dado. Devuelve
  // un objeto listo para instanciar el Enemy de game.js (sin cartas,
  // sin mano, sin dados: solo pattern + hp).
  window.pickEnemyForNode = function(node, totalNodos){
    var indice = node.index || 0;
    var mult = multiplicadorPorNodo(indice, totalNodos);
    var plantilla, pool;

    if(node.tipo === 'Jefe'){
      var actoIdx = Math.min(ENEMY_BOSS.length - 1, (node.acto || 1) - 1);
      plantilla = ENEMY_BOSS[actoIdx];
      mult *= 1.1; // los jefes son siempre un peldaño más duros que su tier
    } else if(node.tipo === 'Elite'){
      plantilla = ENEMY_ELITE[Math.floor(Math.random() * ENEMY_ELITE.length)];
    } else {
      var tier = tierPorIndice(indice);
      pool = ENEMY_NORMAL.filter(function(e){
        if(tier === 1) return e.hpBase <= 15;
        if(tier === 2) return e.hpBase > 15 && e.hpBase <= 28;
        return e.hpBase > 15; // tier 3: variedad de gama media/alta, ya escalada
      });
      if(pool.length === 0) pool = ENEMY_NORMAL;
      plantilla = pool[Math.floor(Math.random() * pool.length)];
    }

    var health = Math.round(plantilla.hpBase * mult);
    // Garantía dura del re-tuning: en Tier 1 (nodos 0-9), fuera de Élite
    // y Jefe, el HP siempre queda en el rango 10-20 -> combates de 1-2
    // turnos, tal y como pide el diseño.
    if(tier === 1 && node.tipo !== 'Elite' && node.tipo !== 'Jefe'){
      health = Math.max(10, Math.min(20, health));
    }

    if(!node.objective && window.Engagement && typeof window.Engagement.makeObjective === 'function'){
      node.objective = window.Engagement.makeObjective(node);
    }

    return {
      name: plantilla.nombre,
      race: plantilla.race,
      health: health,
      pattern: escalarPattern(plantilla.pattern, mult),
      archetype: plantilla.archetype || '',
      trait: plantilla.trait || '',
      phases: escalarPhases(plantilla.phases || [], mult),
      statusResistances: (plantilla.statusResistances || []).slice(),
      objective: node.objective || null,
      elite: !!plantilla.elite,
      boss: !!plantilla.boss
    };
  };

})();
