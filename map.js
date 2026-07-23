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
    // -- Tier 1 (nodos 0-9) --------------------------------------------
    { nombre:'Saibaman',             race:'Namek',   hpBase:10, pattern:[{tipo:'ataque',valor:2},{tipo:'ataque',valor:3}] },
    { nombre:'Soldado Raso Freezer', race:'Freezer', hpBase:13, pattern:[{tipo:'ataque',valor:3},{tipo:'ataque',valor:2}] },
    // -- Tier 2 (nodos 10-24) -------------------------------------------
    { nombre:'Guerrero Namekiano',   race:'Namek',   hpBase:26, pattern:[{tipo:'ataque',valor:4},{tipo:'ataque',valor:3},{tipo:'cura',valor:4}] },
    { nombre:'Élite de Freezer',     race:'Freezer', hpBase:24, pattern:[{tipo:'ataque',valor:4},{tipo:'bloqueo',valor:3},{tipo:'ataque',valor:4}] },
    // -- Tier 3 (nodos 25+) ----------------------------------------------
    { nombre:'Saiyan Renegado',      race:'Saiyan',  hpBase:38, pattern:[{tipo:'ataque',valor:5},{tipo:'ataque',valor:3},{tipo:'ataque',valor:6}] }
  ];

  var ENEMY_ELITE = [
    { nombre:'Ginyu',           race:'Freezer', hpBase:55, pattern:[{tipo:'ataque',valor:6},{tipo:'ataque',valor:6},{tipo:'bloqueo',valor:7}], elite:true },
    { nombre:'Comando Ginyu',   race:'Freezer', hpBase:62, pattern:[{tipo:'ataque',valor:5},{tipo:'cura',valor:6},{tipo:'ataque',valor:7},{tipo:'bloqueo',valor:5}], elite:true }
  ];

  var ENEMY_BOSS = [
    { nombre:'Nappa',                   race:'Saiyan',  hpBase:90,  pattern:[{tipo:'ataque',valor:6},{tipo:'ataque',valor:5},{tipo:'bloqueo',valor:8},{tipo:'ataque',valor:9}], boss:true },
    { nombre:'Freezer (Segunda Forma)', race:'Freezer', hpBase:120, pattern:[{tipo:'ataque',valor:7},{tipo:'bloqueo',valor:9},{tipo:'ataque',valor:7},{tipo:'cura',valor:9},{tipo:'ataque',valor:10}], boss:true },
    { nombre:'Freezer (Forma Final)',   race:'Freezer', hpBase:160, pattern:[{tipo:'ataque',valor:9},{tipo:'ataque',valor:8},{tipo:'bloqueo',valor:10},{tipo:'ataque',valor:12}], boss:true }
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
      return { tipo: paso.tipo, valor: Math.max(1, Math.round(paso.valor * mult)) };
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

    return {
      name: plantilla.nombre,
      race: plantilla.race,
      health: health,
      pattern: escalarPattern(plantilla.pattern, mult),
      elite: !!plantilla.elite,
      boss: !!plantilla.boss
    };
  };

})();
