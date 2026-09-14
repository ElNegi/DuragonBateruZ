/* balance-system.js
   =====================================================================
   Segunda pasada de balance + progresión del catálogo ampliado.

   Objetivos:
   - Evitar que las cartas más fuertes aparezcan/jueguen demasiado pronto.
   - Dar identidad a Saiyan / Freezer / Namek al generar ofertas.
   - Añadir rarezas y precios coherentes sin tocar el texto base de las cartas.
   - Ofrecer funciones de selección ponderada reutilizables por tienda/eventos.
   - Mantener compatibilidad total con las 32 cartas originales.
   ===================================================================== */
(function(){
  'use strict';

  var RARITIES = {
    Comun:      { key:'Comun',      label:'Común',      icon:'●', rank:1, shopWeight:52, priceBase:10, pricePerCost:5, salvage:7 },
    PocoComun:  { key:'PocoComun',  label:'Poco común', icon:'◆', rank:2, shopWeight:31, priceBase:18, pricePerCost:6, salvage:10 },
    Rara:       { key:'Rara',       label:'Rara',       icon:'★', rank:3, shopWeight:13, priceBase:32, pricePerCost:7, salvage:15 },
    Epica:      { key:'Epica',      label:'Épica',      icon:'✦', rank:4, shopWeight:3.5, priceBase:52, pricePerCost:8, salvage:22 },
    Legendaria: { key:'Legendaria', label:'Legendaria', icon:'✹', rank:5, shopWeight:0.5, priceBase:78, pricePerCost:10, salvage:35 }
  };

  // Técnicas/cartas icónicas o de gran swing: rareza fija para que no dependan
  // únicamente de una heurística de coste/texto.
  var RARITY_OVERRIDES = {
    'Genki-dama':'Legendaria',
    'Dragon Fist':'Legendaria',
    'Final Flash':'Epica',
    'Death Ball':'Epica',
    'Special Beam Cannon':'Epica',
    'Hellzone Grenade':'Rara',
    'Super Ghost Kamikaze Attack':'Epica',
    'Poder Incontenible':'Legendaria',
    'Último Poder':'Epica',
    'Control Mental':'Epica',
    'Robo de Habilidad':'Epica',
    'Duplicación':'Legendaria',
    'Aura Protectora':'Epica',
    'Leyenda del Guerrero':'Legendaria',
    'Cadena del Guerrero':'Legendaria',
    'Combo Infinito':'Epica',
    'Defensa Suprema':'Epica',
    'Guardia Total':'Rara',
    'Recuperación Milagrosa':'Epica',
    'Renacer del Guerrero':'Epica',
    'Semilla Senzu':'Rara',
    'Arma Legendaria':'Legendaria',
    'Shenron — Deseo':'Legendaria',
    'Shenron - Deseo':'Legendaria',
    'El Guerrero Legendario':'Legendaria',
    'Batalla Final':'Epica',
    'Planeta en Peligro':'Rara',
    'Emperador Galáctico':'Epica',
    'Poder Ancestral':'Epica',
    'Voluntad Indomable':'Epica'
  };

  var RACE_AFFINITY = {
    Saiyan: {
      types: { 'Ataque':2.2, 'Combo':2.3, 'Reacción':1.2, 'Poder':1.0, 'Equipamiento':0.7, 'Recuperación':-0.35 },
      nature: { 'Físico':2.1, 'Ki':0.35 },
      range: { 'Cercanía':1.0, 'Distancia':0.1 }
    },
    Freezer: {
      types: { 'Técnica de Ki':2.0, 'Técnica clásica':1.7, 'Habilidad':1.7, 'Estado':2.3, 'Reacción':1.6, 'Poder':1.6, 'Ataque':0.7 },
      nature: { 'Ki':2.2, 'Físico':-0.25 },
      range: { 'Distancia':1.0, 'Cercanía':0.1 }
    },
    Namek: {
      types: { 'Recuperación':2.4, 'Defensa':2.2, 'Misión':1.6, 'Aliado':1.5, 'Técnica de Ki':1.0, 'Habilidad':1.0, 'Equipamiento':0.7 },
      nature: { 'Ki':0.8, 'Físico':0.0 },
      range: { 'Distancia':0.35, 'Cercanía':0.15 }
    }
  };

  function n(v){ v=Number(v); return isFinite(v)?v:0; }
  function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
  function normalizeName(s){ return (s||'').toString().normalize ? (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'') : (s||'').toString(); }

  function cardType(card){ return card && (card.tipoCatalogo || card.clase || card.tipoCarta) || 'Otro'; }

  function powerScore(card){
    var cost=n(card && card.costo);
    var type=cardType(card);
    var text=(card && card.efecto || '').toLowerCase();
    var score=cost;

    if(type==='Saga' || type==='Escenario' || type==='Poder') score+=1.6;
    if(type==='Combo' || type==='Misión' || type==='Equipamiento' || type==='Aliado' || type==='Reacción') score+=0.75;
    if(type.indexOf('Racial ')===0) score+=1.25;
    if(type==='Técnica clásica') score+=0.8;
    if(cost>=6) score+=1.0;
    if(cost>=7) score+=0.7;

    if(/acción adicional|accion adicional|cuesta 0|gratis|anula completamente|toda tu vida|duplica|dos veces|todos los rivales|todos los enemigos|ignora 5|12 de daño|15 de daño/.test(text)) score+=1.1;
    if(/una vez por partida|si fueras a ser eliminado|queda en 1/.test(text)) score+=0.7;
    if(/roba 3|roba 4|recupera 10|\+10 daño|\+8 daño/.test(text)) score+=0.6;
    if(cost<=2 && /inflige [234] de daño|reduce [234] de daño|recupera [2345] de vida/.test(text)) score-=0.45;

    return score;
  }

  function rarityFor(card){
    if(!card) return 'Comun';
    if(RARITY_OVERRIDES[card.nombre]) return RARITY_OVERRIDES[card.nombre];

    // Cartas originales: mantenerlas sencillas y fiables al inicio.
    if(!card.importada){
      if(card.clase==='Transformación') return n(card.costo)>=6 ? 'Epica' : 'Rara';
      if(n(card.costo)<=2) return 'Comun';
      if(n(card.costo)<=4) return 'PocoComun';
      return 'Rara';
    }

    var score=powerScore(card);
    if(score < 2.8) return 'Comun';
    if(score < 4.6) return 'PocoComun';
    if(score < 6.7) return 'Rara';
    if(score < 8.7) return 'Epica';
    return 'Legendaria';
  }

  function minRoundFor(card, rarity){
    if(!card) return 1;
    var cost=n(card.costo);
    if(!card.importada){
      if(card.clase==='Transformación') return cost>=6 ? 3 : 2;
      return 1;
    }
    var type=cardType(card);
    var r=RARITIES[rarity] || RARITIES.Comun;
    var min=1;

    // Regla central del diseño: el turno 1 solo tiene un dado. Aunque un 6
    // pueda pagar una carta de coste 6, las cartas de mayor impacto no deben
    // aparecer como "finisher" desde la primera ronda.
    if(cost>=5 && r.rank>=3) min=2;
    if(cost>=6) min=2;
    if(r.rank>=4) min=Math.max(min,2);
    if(r.rank>=5) min=Math.max(min,3);

    // Permanentes globales y grandes efectos se retrasan ligeramente para
    // que primero exista estado de partida sobre el que interactuar.
    if(type==='Saga' || type==='Escenario') min=Math.max(min,2);

    // Excepciones de carga/poder máximo.
    if(card.nombre==='Genki-dama') min=3;
    if(card.nombre==='Dragon Fist') min=3;
    if(card.nombre==='Poder Incontenible') min=3;
    if(card.nombre==='Cadena del Guerrero') min=3;
    return min;
  }

  function minProgressForRarity(rarity){
    var rank=(RARITIES[rarity]||RARITIES.Comun).rank;
    if(rank<=2) return 0;
    if(rank===3) return 0.08;   // las raras empiezan a asomar pronto, no de salida pura
    if(rank===4) return 0.28;   // épicas desde final de Acto 1 / Acto 2
    return 0.52;                // legendarias principalmente en la mitad final
  }

  function affinityScore(card,race){
    if(!card || !race) return 0;
    if(card.raza && card.raza!=='Neutral') return card.raza===race ? 5.5 : -100;
    var cfg=RACE_AFFINITY[race];
    if(!cfg) return 0;
    var score=0, type=cardType(card);
    score += n(cfg.types[type]);
    score += n(cfg.nature[card.naturaleza]);
    score += n(cfg.range[card.alcance]);
    return score;
  }

  function annotateCard(card){
    if(!card || typeof card!=='object') return card;
    var rarity=card.rareza || rarityFor(card);
    card.rareza=rarity;
    card.rarezaLabel=(RARITIES[rarity]||RARITIES.Comun).label;
    card.rarezaIcon=(RARITIES[rarity]||RARITIES.Comun).icon;
    card.rarityRank=(RARITIES[rarity]||RARITIES.Comun).rank;
    if(card.rondaMinima==null) card.rondaMinima=minRoundFor(card,rarity);
    if(card.progresoMinimo==null) card.progresoMinimo=minProgressForRarity(rarity);
    return card;
  }

  function annotateAll(){
    var seen=[];
    var pool=window.CARD_POOL || {};
    Object.keys(pool).forEach(function(r){
      (pool[r]||[]).forEach(function(c){
        if(c && seen.indexOf(c)===-1){ seen.push(c); annotateCard(c); }
      });
    });
    (window.FULL_CARD_CATALOG||[]).forEach(annotateCard);
    return seen;
  }

  function cardKey(c){
    if(!c) return '';
    return c.id || ('name:'+(c.nombre||'')+'|'+cardType(c)+'|'+(c.raza||'Neutral'));
  }

  function ownedIds(owned){
    var map={};
    (owned||[]).forEach(function(c){
      if(!c) return;
      map[cardKey(c)] = true;
    });
    return map;
  }

  function eligiblePool(race, progress, owned, source){
    progress=clamp(n(progress),0,1);
    var pool=[];
    var base=window.CARD_POOL || {};
    // La raza propia + neutrales. Las raciales de otras razas quedan fuera.
    pool=pool.concat(base[race]||[]).concat(base.Neutral||[]);
    var seen={}, own=ownedIds(owned), out=[];
    pool.forEach(function(card){
      if(!card) return;
      annotateCard(card);
      var id=cardKey(card);
      if(seen[id]) return;
      seen[id]=true;
      if(card.raza && card.raza!=='Neutral' && card.raza!==race) return;
      if(own[id]) return;
      var required=n(card.progresoMinimo);
      // Boss/elite pueden adelantar ligeramente una rareza como recompensa.
      var grace=(source==='bossReward')?0.18:(source==='eliteReward'?0.08:0);
      if(progress + grace < required) return;
      out.push(card);
    });
    return out;
  }

  function sourceRarityWeight(source, rarity, progress){
    var rank=(RARITIES[rarity]||RARITIES.Comun).rank;
    var table;
    if(source==='normalReward') table=[0,50,34,14,2,0.15];
    else if(source==='eliteReward') table=[0,12,33,39,14,2];
    else if(source==='bossReward') table=[0,2,12,38,35,13];
    else if(source==='event') table=[0,30,40,24,5.5,0.5];
    else table=[0,52,31,13,3.5,0.5]; // shop
    var w=table[rank] || 0.01;
    // Las rarezas altas se vuelven algo más frecuentes según progreso.
    if(rank>=3) w *= (0.65 + progress*0.9);
    if(rank>=4) w *= (0.45 + progress*1.15);
    if(rank===5) w *= (0.25 + progress*1.5);
    return w;
  }

  function candidateWeight(card, race, progress, source){
    var rarity=card.rareza || rarityFor(card);
    var base=sourceRarityWeight(source,rarity,progress);
    var affinity=affinityScore(card,race);
    // La afinidad guía, no bloquea: incluso una raza puede construir un mazo atípico.
    var affinityFactor=clamp(1 + affinity*0.16,0.3,2.0);
    // Costes extremos se suavizan al principio para evitar manos muertas.
    var cost=n(card.costo);
    var curve=1;
    if(progress<0.25 && cost>=6) curve*=0.38;
    else if(progress<0.45 && cost>=7) curve*=0.55;
    if(cost<=2 && progress>0.65) curve*=0.72;
    return Math.max(0.001,base*affinityFactor*curve);
  }

  function weightedPick(pool, weightFn){
    if(!pool || !pool.length) return null;
    var total=0, weights=[];
    pool.forEach(function(c){ var w=Math.max(0,n(weightFn(c))); weights.push(w); total+=w; });
    if(total<=0) return pool[Math.floor(Math.random()*pool.length)];
    var r=Math.random()*total;
    for(var i=0;i<pool.length;i++){ r-=weights[i]; if(r<=0) return pool[i]; }
    return pool[pool.length-1];
  }

  function pickCards(opts){
    opts=opts||{};
    var race=opts.race || 'Saiyan';
    var count=Math.max(1,Math.floor(n(opts.count)||1));
    var progress=clamp(n(opts.progress),0,1);
    var source=opts.source || 'shop';
    var pool=eligiblePool(race,progress,opts.owned||[],source);
    // Si la colección ya agotó los candidatos, permitimos duplicados antes de
    // devolver una oferta vacía. Esto evita tiendas sin cartas al final.
    if(pool.length<count) pool=eligiblePool(race,progress,[],source);
    var result=[];
    // Identidad de raza: una parte importante de las ofertas incluye al menos
    // una carta exclusiva propia si todavía quedan disponibles. No es un
    // bloqueo duro: el resto de huecos siguen explorando todo el catálogo.
    var raceChance = source==='shop' ? 0.68 : (source==='event' ? 0.45 : 0.55);
    if(count>=2 && Math.random()<raceChance){
      var racePool=pool.filter(function(c){ return c.raza===race; });
      if(racePool.length){
        var racePick=weightedPick(racePool,function(c){ return candidateWeight(c,race,progress,source)*1.4; });
        if(racePick){ result.push(racePick); pool=pool.filter(function(c){return c!==racePick;}); }
      }
    }
    while(result.length<count && pool.length){
      var chosen=weightedPick(pool,function(c){return candidateWeight(c,race,progress,source);});
      if(!chosen) break;
      result.push(chosen);
      pool=pool.filter(function(c){return c!==chosen;});
    }
    return result;
  }

  function getPrice(card, progress){
    annotateCard(card);
    var meta=RARITIES[card.rareza]||RARITIES.Comun;
    var base=meta.priceBase + meta.pricePerCost*n(card.costo);
    // Los precios escalan muy poco con el Acto: el oro también aumenta vía élites/jefes.
    var actFactor=1 + clamp(n(progress),0,1)*0.12;
    return Math.max(8,Math.round(base*actFactor/2)*2);
  }

  function getSalvageValue(card){
    annotateCard(card);
    var meta=RARITIES[card.rareza]||RARITIES.Comun;
    return meta.salvage + Math.max(0,Math.floor(n(card.costo)/2));
  }

  function cloneCard(card){
    if(!card) return card;
    // Las cartas son data-only. Copia profunda evita que una mejora del jugador
    // modifique el objeto maestro del CARD_POOL y futuras tiendas/recompensas.
    return JSON.parse(JSON.stringify(card));
  }

  function getMeta(rarity){ return RARITIES[rarity] || RARITIES.Comun; }
  function formatRarity(card){ annotateCard(card); var m=getMeta(card.rareza); return m.icon+' '+m.label; }

  function progressFromNode(index,total){
    total=Math.max(1,n(total)-1);
    return clamp(n(index)/total,0,1);
  }

  annotateAll();

  window.CardBalance={
    rarities:RARITIES,
    annotateCard:annotateCard,
    annotateAll:annotateAll,
    rarityFor:rarityFor,
    minRoundFor:minRoundFor,
    affinityScore:affinityScore,
    pickCards:pickCards,
    getPrice:getPrice,
    getSalvageValue:getSalvageValue,
    cloneCard:cloneCard,
    getMeta:getMeta,
    formatRarity:formatRarity,
    progressFromNode:progressFromNode,
    cardType:cardType
  };

  var stats={};
  annotateAll().forEach(function(c){ stats[c.rareza]=(stats[c.rareza]||0)+1; });
  console.info('[Ecos de Ki] Balance/rareza aplicado:',stats);
})();
