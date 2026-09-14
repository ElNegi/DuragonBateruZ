/* engagement-system.js
   ============================================================================
   Capa de "ritmo" para Ecos de Ki. Añade variedad sin sustituir el motor base:
   - Resonancias de dados (la suma sigue siendo la energía principal).
   - Flujo/combos genéricos por alternar tipos de acción.
   - Medidor de Despertar racial y transformaciones temporales.
   - Especializaciones persistentes por raza.
   - Objetivos opcionales de combate.
   - Fases de jefe y contraataques de enemigos.

   Todo el estado se guarda en objetos planos para ser compatible con Firestore.
   ============================================================================ */
(function(){
  'use strict';

  function n(v,d){ return (typeof v === 'number' && isFinite(v)) ? v : (d || 0); }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function maxHp(p){ return p ? n(p._maxHealth,n(p.maxHealth,n(p.health,100))) : 100; }
  function log(ctx,msg){ if(ctx && typeof ctx.log === 'function') ctx.log(msg); }
  function cardType(card){ return (card && (card.tipoCatalogo || card.clase || card.tipoCarta)) || 'Otro'; }
  function isAttack(card){
    var t=cardType(card);
    return !!card && (t==='Ataque' || card.tipoEfecto==='ataque' || t==='Técnica clásica' && n(card.damageBase)>0 || t==='Combo' && /Inflige/i.test(card.efecto||''));
  }
  function isTechnique(card){ var t=cardType(card); return t==='Técnica de Ki' || t==='Técnica clásica' || t==='Técnica'; }
  function isDefense(card){ var t=cardType(card); return t==='Defensa' || (card && card.tipoEfecto==='defensa'); }
  function isRecovery(card){ var t=cardType(card); return t==='Recuperación' || t==='Cura' || (card && card.tipoEfecto==='cura'); }

  function state(p){
    if(!p) return {};
    if(!p.engagementState || typeof p.engagementState !== 'object'){
      p.engagementState={
        awakening:0, awakened:false, awakeningTurns:0,
        flow:0, flowChain:[], lastFlowTag:null,
        resonance:null, resonanceCount:0,
        flags:{}, turnFlags:{}, combatStats:{physicalDamage:0,kiDamage:0,kiCards:0,recoveryCards:0,types:{}}
      };
    }
    var s=p.engagementState;
    s.flowChain=arr(s.flowChain); s.flags=s.flags||{}; s.turnFlags=s.turnFlags||{};
    s.combatStats=s.combatStats||{physicalDamage:0,kiDamage:0,kiCards:0,recoveryCards:0,types:{}};
    s.combatStats.types=s.combatStats.types||{};
    return s;
  }

  function resetCombat(p){
    if(!p) return;
    p.engagementState={
      awakening:0, awakened:false, awakeningTurns:0,
      flow:0, flowChain:[], lastFlowTag:null,
      resonance:null, resonanceCount:0,
      flags:{}, turnFlags:{}, combatStats:{physicalDamage:0,kiDamage:0,kiCards:0,recoveryCards:0,types:{}}
    };
  }

  function specializationFor(p){
    if(!p) return null;
    return p.specialization || (typeof window !== 'undefined' && window.CURRENT_USER && window.CURRENT_USER.race===p.race ? window.CURRENT_USER.specialization : null) || null;
  }

  var SAGAS={
    1:{id:'saiyan-arrival',icon:'☄️',name:'Llegada de los Saiyan',desc:'Los ataques Físicos infligen +1 de daño.'},
    2:{id:'namek-battle',icon:'🌌',name:'Batalla por Namek',desc:'Los ataques de Ki infligen +1 y las curaciones recuperan +1.'},
    3:{id:'galactic-emperor',icon:'👑',name:'El Emperador Galáctico',desc:'Los enemigos infligen +1 de daño, pero las victorias otorgan +10 de oro.'}
  };
  function getSaga(act){ return SAGAS[Math.max(1,Math.min(3,Math.floor(n(act,1))))] || SAGAS[1]; }
  function sagaAct(ctx){ var h=ctx&&ctx.host; return h ? n(h.sagaAct,n(h.currentSagaAct,0)) : 0; }

  var SPECIALIZATIONS={
    Saiyan:[
      {id:'Bruto',name:'Bruto Saiyan',icon:'🥊',desc:'Tus ataques Físicos infligen +1 de daño.'},
      {id:'MaestroKi',name:'Maestro del Ki',icon:'⚡',desc:'La primera Técnica/Ki de cada turno cuesta 1 menos.'},
      {id:'Adaptativo',name:'Guerrero Adaptativo',icon:'🔁',desc:'Al alcanzar Flujo 3 recuperas además 1 de energía.'}
    ],
    Freezer:[
      {id:'Ejecutor',name:'Ejecutor',icon:'🎯',desc:'Infliges +2 de daño a enemigos por debajo del 35% de vida.'},
      {id:'Estratega',name:'Estratega',icon:'🛡️',desc:'La primera Defensa de cada turno cuesta 1 menos.'},
      {id:'Tirano',name:'Tirano',icon:'👑',desc:'Las Habilidades y Estados generan +2 de Despertar adicional.'}
    ],
    Namek:[
      {id:'Guardian',name:'Guardián',icon:'🛡️',desc:'Reduces en 1 el daño de cada ataque enemigo.'},
      {id:'Regenerador',name:'Regenerador',icon:'🌱',desc:'La primera curación de cada turno recupera +2 de vida.'},
      {id:'Mistico',name:'Místico',icon:'🔮',desc:'La primera Técnica de cada turno cuesta 1 menos.'}
    ]
  };

  function getSpecializations(race){ return (SPECIALIZATIONS[race]||[]).slice(); }

  function addAwakening(p,amount,ctx,reason){
    if(!p || amount<=0) return 0;
    var s=state(p);
    if(s.awakened) return 0;
    var before=n(s.awakening);
    s.awakening=clamp(before+amount,0,100);
    if(before<100 && s.awakening>=100) log(ctx,'🔥 '+(p.name||'Jugador')+' puede activar su Despertar.');
    return s.awakening-before;
  }

  function awakeningName(race){
    if(race==='Saiyan') return 'Super Saiyan';
    if(race==='Freezer') return 'Forma Final';
    if(race==='Namek') return 'Despertar Namekiano';
    return 'Despertar';
  }

  function activateAwakening(p,ctx){
    var s=state(p);
    if(s.awakened || n(s.awakening)<100) return {ok:false,reason:'El medidor de Despertar no está completo'};
    s.awakening=0; s.awakened=true; s.awakeningTurns=3; s.turnFlags={};
    log(ctx,'✨ '+(p.name||'Jugador')+' activa '+awakeningName(p.race)+' durante 3 turnos.');
    return {ok:true,name:awakeningName(p.race)};
  }

  function modifyCost(card,p,cost,ctx){
    var s=state(p), spec=specializationFor(p); cost=n(cost);
    var type=cardType(card);
    s.turnFlags=s.turnFlags||{};
    if(s.awakened){
      if(p.race==='Saiyan' && card && card.naturaleza==='Físico' && !s.turnFlags.awakeCost){ cost-=1; }
      else if(p.race==='Freezer' && !s.turnFlags.awakeCost){ cost-=1; }
      else if(p.race==='Namek' && (isTechnique(card)||isRecovery(card)) && !s.turnFlags.awakeCost){ cost-=1; }
    }
    if(spec==='MaestroKi' && (isTechnique(card)||card && card.naturaleza==='Ki') && !s.turnFlags.specCost) cost-=1;
    if(spec==='Estratega' && isDefense(card) && !s.turnFlags.specCost) cost-=1;
    if(spec==='Mistico' && isTechnique(card) && !s.turnFlags.specCost) cost-=1;
    return Math.max(0,Math.round(cost));
  }

  function consumeCostHook(card,p){
    var s=state(p), spec=specializationFor(p);
    s.turnFlags=s.turnFlags||{};
    if(s.awakened){
      if(p.race==='Saiyan' && card && card.naturaleza==='Físico') s.turnFlags.awakeCost=true;
      else if(p.race==='Freezer') s.turnFlags.awakeCost=true;
      else if(p.race==='Namek' && (isTechnique(card)||isRecovery(card))) s.turnFlags.awakeCost=true;
    }
    if(spec==='MaestroKi' && (isTechnique(card)||card && card.naturaleza==='Ki')) s.turnFlags.specCost=true;
    if(spec==='Estratega' && isDefense(card)) s.turnFlags.specCost=true;
    if(spec==='Mistico' && isTechnique(card)) s.turnFlags.specCost=true;
  }

  function modifyOutgoingDamage(attacker,target,card,amount,ctx){
    var s=state(attacker), spec=specializationFor(attacker), bonus=0;
    if(s.awakened){
      if(attacker.race==='Saiyan') bonus+=2;
      else if(attacker.race==='Freezer' && card && card.naturaleza==='Ki') bonus+=2;
      else if(attacker.race==='Namek') bonus+=1;
    }
    var act=sagaAct(ctx);
    if(act===1 && card && card.naturaleza==='Físico') bonus+=1;
    if(act===2 && card && card.naturaleza==='Ki') bonus+=1;
    if(spec==='Bruto' && card && card.naturaleza==='Físico') bonus+=1;
    if(spec==='Ejecutor' && target){
      var mh=maxHp(target); if(mh>0 && n(target.health)/mh<=0.35) bonus+=2;
    }
    return Math.max(0,n(amount)+bonus);
  }

  function modifyIncomingDamage(p,attacker,amount,ctx){
    var s=state(p), spec=specializationFor(p), reduce=0;
    if(s.awakened && (p.race==='Freezer' || p.race==='Namek')) reduce+=2;
    if(spec==='Guardian') reduce+=1;
    return Math.max(0,n(amount)-reduce);
  }

  function modifyHeal(p,amount,ctx,sourceCard){
    var s=state(p), spec=specializationFor(p), bonus=0;
    s.turnFlags=s.turnFlags||{};
    if(sagaAct(ctx)===2) bonus+=1;
    if(s.awakened && p.race==='Namek') bonus+=2;
    if(spec==='Regenerador' && !s.turnFlags.specHeal){ bonus+=2; s.turnFlags.specHeal=true; }
    return Math.max(0,n(amount)+bonus);
  }

  function flowTag(card){
    if(isDefense(card)) return '🛡️';
    if(isRecovery(card)) return '❤️';
    if(isAttack(card) || isTechnique(card)){
      if(card && card.naturaleza==='Físico') return '🥊';
      if(card && card.naturaleza==='Ki') return '⚡';
      return '💥';
    }
    if(cardType(card)==='Combo') return '🔥';
    return '🌀';
  }

  function objective(host){ return host && host.engagementObjective ? host.engagementObjective : null; }
  function initObjective(host,obj){
    if(!host) return null;
    host.engagementObjective=obj ? JSON.parse(JSON.stringify(obj)) : null;
    if(host.engagementObjective) host.engagementObjective.progress=host.engagementObjective.progress||{};
    return host.engagementObjective;
  }

  function updateObjectiveAfterCard(host,card,damage){
    var o=objective(host); if(!o) return;
    o.progress=o.progress||{};
    var t=cardType(card); o.progress.types=o.progress.types||{}; o.progress.types[t]=true;
    if(card && card.naturaleza==='Físico') o.progress.physicalDamage=n(o.progress.physicalDamage)+n(damage);
    if(card && (card.naturaleza==='Ki'||isTechnique(card))) o.progress.kiCards=n(o.progress.kiCards)+1;
    if(isRecovery(card)) o.progress.usedRecovery=true;
  }

  function afterCardPlayed(card,p,ctx,damage){
    if(!p||!card)return;
    var s=state(p), tag=flowTag(card), type=cardType(card);
    s.combatStats.types[type]=true;
    if(card.naturaleza==='Físico') s.combatStats.physicalDamage=n(s.combatStats.physicalDamage)+n(damage);
    if(card.naturaleza==='Ki') s.combatStats.kiDamage=n(s.combatStats.kiDamage)+n(damage);
    if(isTechnique(card)||card.naturaleza==='Ki') s.combatStats.kiCards=n(s.combatStats.kiCards)+1;
    if(isRecovery(card)) s.combatStats.recoveryCards=n(s.combatStats.recoveryCards)+1;

    if(s.lastFlowTag && s.lastFlowTag!==tag) s.flow=n(s.flow)+1; else s.flow=1;
    s.lastFlowTag=tag; s.flowChain.push(tag); if(s.flowChain.length>5)s.flowChain=s.flowChain.slice(-5);

    var awaken=2;
    if(isAttack(card)) awaken+=2;
    if(isTechnique(card)) awaken+=2;
    if(cardType(card)==='Combo') awaken+=3;
    if(p.race==='Saiyan' && card.naturaleza==='Físico') awaken+=2;
    if(p.race==='Namek' && (isDefense(card)||isRecovery(card))) awaken+=2;
    if(p.race==='Freezer' && (type==='Habilidad'||type==='Estado'||type==='Poder')) awaken+=2;
    if(specializationFor(p)==='Tirano' && (type==='Habilidad'||type==='Estado')) awaken+=2;
    addAwakening(p,awaken,ctx,'carta');

    if(s.flow===3){
      if(window.CardEngine && window.CardEngine.runtime){
        var rt=window.CardEngine.runtime(p); rt.buffs.nextAttackBonus=n(rt.buffs.nextAttackBonus)+1;
      }
      if(specializationFor(p)==='Adaptativo') p.energy=n(p.energy)+1;
      addAwakening(p,5,ctx,'flujo');
      log(ctx,'🔥 Flujo 3: tu próximo ataque obtiene +1 de daño'+(specializationFor(p)==='Adaptativo'?' y recuperas 1 de energía':'')+'.');
    } else if(s.flow>=5){
      if(window.CardEngine && window.CardEngine.draw) window.CardEngine.draw(p,1,ctx);
      addAwakening(p,8,ctx,'flujo perfecto');
      log(ctx,'🌟 Flujo perfecto: robas 1 carta y aceleras tu Despertar.');
      s.flow=0; s.flowChain=[]; s.lastFlowTag=null;
    }

    updateObjectiveAfterCard(ctx && ctx.host,card,damage);
    if(damage>0) resolveEnemyCounter(p,ctx,damage);
    if(ctx && ctx.target) checkEnemyPhase(ctx.target,ctx);
  }

  function afterBasicAttack(p,ctx,damage){
    var fake={nombre:'Golpe Básico',clase:'Ataque',tipoCatalogo:'Ataque',naturaleza:'Físico',alcance:'Cercanía'};
    afterCardPlayed(fake,p,ctx,damage);
  }

  function afterDamageReceived(p,attacker,actual,ctx){
    if(!p || actual<=0)return;
    var gain=Math.min(18,4+Math.floor(actual/2));
    if(p.race==='Saiyan') gain+=4;
    addAwakening(p,gain,ctx,'daño recibido');
    var s=state(p);
    if(n(p.health)<=maxHp(p)*0.3 && !s.flags.lowHpAwaken){ s.flags.lowHpAwaken=true; addAwakening(p,12,ctx,'poca vida'); log(ctx,'⚠️ La presión del combate acelera tu Despertar.'); }
  }

  function afterHeal(p,amount,ctx,sourceCard){
    if(amount<=0)return;
    var o=objective(ctx&&ctx.host);
    if(o && sourceCard && isRecovery(sourceCard)){ o.progress=o.progress||{}; o.progress.usedRecovery=true; }
  }

  function analyzeDice(dice){
    dice=arr(dice).map(Number);
    var counts={}; dice.forEach(function(v){counts[v]=(counts[v]||0)+1;});
    var maxCount=0, pairValue=null; Object.keys(counts).forEach(function(k){if(counts[k]>maxCount){maxCount=counts[k];pairValue=Number(k);}});
    var unique=Object.keys(counts).map(Number).sort(function(a,b){return a-b;});
    var straight=false;
    for(var i=0;i<=unique.length-3;i++) if(unique[i+2]===unique[i]+2 && unique[i+1]===unique[i]+1) straight=true;
    return {maxCount:maxCount,pairValue:pairValue,straight:straight,doubleSix:n(counts[6])>=2};
  }

  function afterRoll(p,ctx){
    if(!p)return;
    var s=state(p), a=analyzeDice(p.dice), messages=[];
    s.resonance=null;
    if(a.maxCount>=2){ p.energy=n(p.energy)+1; messages.push('Pareja: +1 energía'); s.resonance='Pareja'; }
    if(a.straight && window.CardEngine && window.CardEngine.runtime){ var rt=window.CardEngine.runtime(p); rt.buffs.nextCardDiscount=n(rt.buffs.nextCardDiscount)+1; messages.push('Escalera: próxima carta -1'); s.resonance=s.resonance?'Doble resonancia':'Escalera'; }
    if(a.maxCount>=3){ p.shield=n(p.shield)+2; messages.push('Trío: +2 escudo'); s.resonance='Trío'; }
    if(a.doubleSix){ addAwakening(p,8,ctx,'doble 6'); messages.push('Doble 6: +8 Despertar'); }
    if(messages.length){ s.resonanceCount=n(s.resonanceCount)+1; var o=objective(ctx&&ctx.host); if(o){o.progress=o.progress||{};o.progress.resonances=n(o.progress.resonances)+1;} log(ctx,'🎲 Resonancia — '+messages.join(' · ')+'.'); }
  }

  function onTurnStart(p,ctx){
    var s=state(p); s.turnFlags={}; s.resonance=null;
    if(s.awakened) log(ctx,'✨ '+awakeningName(p.race)+' activo ('+n(s.awakeningTurns)+' turnos restantes).');
  }

  function onTurnEnd(p,ctx){
    var s=state(p);
    if(s.awakened){
      s.awakeningTurns=n(s.awakeningTurns)-1;
      if(s.awakeningTurns<=0){ s.awakened=false; s.awakeningTurns=0; log(ctx,'La transformación de '+(p.name||'Jugador')+' termina.'); }
    }
  }

  function intentInfo(move){
    move=move||{};
    var map={
      ataque:['⚔️','Ataca por '+n(move.valor)], bloqueo:['🛡️','Escudo +'+n(move.valor)], cura:['💚','Cura '+n(move.valor)],
      carga:['💢','Carga +'+n(move.valor)+' al próximo ataque'], drenaje:['🔻','Drena '+n(move.valor)+' de energía'],
      estado:['☣️','Aplica '+(move.estado||'Quemado')], rompeguardia:['💥','Rompeguardia '+n(move.valor)],
      furia:['🔥','Furia +'+n(move.valor)+' daño'], contra:['↩️','Contraataque '+n(move.valor)]
    };
    var v=map[move.tipo]||['❔',(move.tipo||'Acción')+' '+n(move.valor)];
    return {icon:v[0],label:v[1]};
  }

  function checkEnemyPhase(enemy,ctx){
    if(!enemy || !arr(enemy.phases).length || n(enemy.health)<=0)return false;
    enemy.phaseIndex=n(enemy.phaseIndex);
    var next=enemy.phases[enemy.phaseIndex];
    if(!next)return false;
    var max=n(enemy._maxHealth,n(enemy.maxHealth,n(enemy.health,1)));
    var ratio=max>0?n(enemy.health)/max:0;
    if(ratio>n(next.threshold,0))return false;
    enemy.phaseIndex++;
    if(arr(next.pattern).length){ enemy.pattern=JSON.parse(JSON.stringify(next.pattern)); enemy.patternIndex=0; }
    if(n(next.shield)>0) enemy.shield=n(enemy.shield)+n(next.shield);
    if(n(next.rage)>0) enemy.rageBonus=n(enemy.rageBonus)+n(next.rage);
    enemy.phaseName=next.name||('Fase '+(enemy.phaseIndex+1));
    log(ctx,'⚠️ '+(enemy.name||'Enemigo')+' entra en '+enemy.phaseName+(next.text?' — '+next.text:'')+'.');
    return true;
  }

  function resolveEnemyCounter(p,ctx,damage){
    var enemy=ctx&&ctx.target;
    if(!enemy || n(enemy.health)<=0 || n(enemy.counter)<=0 || damage<=0)return;
    var amount=n(enemy.counter); enemy.counter=0;
    if(window.CardEngine){
      var mitig=window.CardEngine.beforeIncomingDamage(p,enemy,amount,ctx); amount=n(mitig&&mitig.damage,amount);
    }
    if(n(p.shield)>0){ var b=Math.min(n(p.shield),amount); p.shield=Math.max(0,n(p.shield)-b); amount=Math.max(0,amount-b); }
    var before=n(p.health); p.health=Math.max(0,before-amount); var actual=before-p.health;
    log(ctx,'↩️ '+(enemy.name||'Enemigo')+' contraataca e inflige '+actual+' de daño.');
    if(window.CardEngine) window.CardEngine.afterIncomingDamage(p,enemy,actual,ctx);
  }

  function makeObjective(node){
    var type=(node&&node.tipo)||'Combate';
    var pool=[
      {id:'speed',icon:'⏱️',title:'Ataque relámpago',desc:'Gana antes de terminar la ronda {x}.',maxRound:type==='Jefe'?6:(type==='Elite'?5:4)},
      {id:'variety',icon:'🎭',title:'Versatilidad',desc:'Juega 3 tipos distintos de carta.'},
      {id:'physical',icon:'🥊',title:'Dominio físico',desc:'Inflige {x}+ de daño Físico.',target:type==='Jefe'?25:(type==='Elite'?18:12)},
      {id:'ki',icon:'⚡',title:'Dominio del Ki',desc:'Juega {x} técnicas/cartas de Ki.',target:type==='Jefe'?4:3},
      {id:'noRecovery',icon:'🩸',title:'Sin descanso',desc:'Gana sin jugar cartas de Recuperación.'},
      {id:'resonance',icon:'🎲',title:'Armonía de dados',desc:'Activa al menos una Resonancia de dados.',target:1}
    ];
    var pick=pool[Math.floor(Math.random()*pool.length)];
    pick=JSON.parse(JSON.stringify(pick)); pick.progress={};
    pick.rewardGold=type==='Jefe'?40:(type==='Elite'?25:15);
    pick.desc=pick.desc.replace('{x}',pick.maxRound||pick.target||1);
    return pick;
  }

  function objectiveStatus(host,p,round,victory){
    var o=objective(host); if(!o)return null; var pr=o.progress||{}; var done=false,progress='';
    if(o.id==='speed'){ done=!!victory && n(round,1)<=n(o.maxRound); progress='Ronda '+n(round,1)+' / '+o.maxRound; }
    else if(o.id==='variety'){ var c=Object.keys(pr.types||{}).length; done=c>=3; progress=c+'/3 tipos'; }
    else if(o.id==='physical'){ var d=n(pr.physicalDamage); done=d>=n(o.target); progress=d+'/'+o.target+' daño'; }
    else if(o.id==='ki'){ var k=n(pr.kiCards); done=k>=n(o.target); progress=k+'/'+o.target+' cartas'; }
    else if(o.id==='noRecovery'){ done=!pr.usedRecovery; progress=pr.usedRecovery?'Fallado':'Intacto'; if(!victory && pr.usedRecovery) done=false; }
    else if(o.id==='resonance'){ var r=n(pr.resonances); done=r>=1; progress=r+'/1'; }
    if(o.id==='noRecovery' && !victory) done=false;
    return {done:done,progress:progress,text:o.icon+' '+o.title+' — '+o.desc+' ('+progress+')',rewardGold:n(o.rewardGold)};
  }

  function getHud(p,host,round){
    var s=state(p), obj=objectiveStatus(host,p,round,false);
    return {
      awakening:clamp(n(s.awakening),0,100), awakened:!!s.awakened, awakeningTurns:n(s.awakeningTurns), awakeningName:awakeningName(p&&p.race),
      flow:n(s.flow), flowChain:arr(s.flowChain).join(' '), resonance:s.resonance,
      specialization:specializationFor(p), objective:obj
    };
  }

  window.Engagement={
    state:state, resetCombat:resetCombat, getSpecializations:getSpecializations, specializationFor:specializationFor, getSaga:getSaga,
    addAwakening:addAwakening, activateAwakening:activateAwakening, awakeningName:awakeningName,
    modifyCost:modifyCost, consumeCostHook:consumeCostHook, modifyOutgoingDamage:modifyOutgoingDamage,
    modifyIncomingDamage:modifyIncomingDamage, modifyHeal:modifyHeal,
    afterCardPlayed:afterCardPlayed, afterBasicAttack:afterBasicAttack, afterDamageReceived:afterDamageReceived, afterHeal:afterHeal,
    afterRoll:afterRoll, onTurnStart:onTurnStart, onTurnEnd:onTurnEnd,
    intentInfo:intentInfo, checkEnemyPhase:checkEnemyPhase, makeObjective:makeObjective,
    initObjective:initObjective, objectiveStatus:objectiveStatus, getHud:getHud, analyzeDice:analyzeDice
  };
})();
