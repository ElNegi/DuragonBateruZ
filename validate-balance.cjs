/* card-engine.js
   ============================================================================
   Motor ampliado de cartas para Ecos de Ki.

   Objetivos:
   - Mantener 100% compatibles las cartas originales.
   - Dar soporte seguro a las 370 cartas del catálogo ampliado.
   - Añadir permanentes (Equipo/Aliado), Misiones, Sagas, Escenarios,
     Estados, Reacciones, Combos, Técnicas y Poderes sin reescribir el
     motor base de expedición.
   - Funcionar con los objetos de jugador tanto de game.js como de
     multiplayer.js (ambos usan health/shield/deck/hand/discard/energy).

   Nota de diseño: el proyecto actual es PvE/coop. Efectos expresamente PvP o
   Battle Royale se degradan de forma segura: conservan su parte aplicable y
   nunca rompen el combate por no existir un objetivo PvP.
   ============================================================================ */
(function(){
  'use strict';

  function n(v, d){ return (typeof v === 'number' && isFinite(v)) ? v : (d || 0); }
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function lower(v){ return (v || '').toString().toLowerCase(); }
  function includesCI(text, needle){ return lower(text).indexOf(lower(needle)) !== -1; }
  function uniq(list){ return list.filter(function(v,i,a){ return a.indexOf(v) === i; }); }
  function isAttack(card){
    if(!card) return false;
    return card.tipoCatalogo === 'Ataque' || card.tipoEfecto === 'ataque' ||
      (card.tipoCatalogo === 'Técnica clásica' && n(card.damageBase) > 0);
  }
  function isTechnique(card){
    return !!card && (card.tipoCatalogo === 'Técnica de Ki' || card.tipoCatalogo === 'Técnica clásica' || card.clase === 'Técnica');
  }
  function isDefense(card){ return !!card && (card.tipoCatalogo === 'Defensa' || card.tipoEfecto === 'defensa'); }
  function isRecovery(card){ return !!card && (card.tipoCatalogo === 'Recuperación' || card.tipoEfecto === 'cura'); }
  function isPhysical(card){ return !!card && card.naturaleza === 'Físico'; }
  function isKi(card){ return !!card && card.naturaleza === 'Ki'; }
  function maxHealth(p){ return p ? n(p._maxHealth, n(p.maxHealth, n(p.health,100))) : 100; }
  function health(p){ return p ? n(p.health) : 0; }
  function alive(p){ return !!p && health(p) > 0; }

  function shuffle(a){
    a = a || [];
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  function runtime(p){
    if(!p) return {};
    if(!p.cardRuntime || typeof p.cardRuntime !== 'object'){
      p.cardRuntime = {
        statuses: [], equipment: [], allies: [], missions: [], reactions: [],
        buffs: {}, delayed: [], once: {},
        turn: 0, turnsSurvived: 0, cardsPlayedThisTurn: [], cardHistory: [],
        attacksThisTurn: 0, attacksTotal: 0, consecutiveAttacks: 0,
        techniquesThisTurn: 0, techniquesTotal: 0,
        defensesThisTurn: 0, damageDealtThisTurn: 0, damageReceivedThisTurn: 0,
        damageDealtTotal: 0, damageReceivedTotal: 0, damageBlockedTotal: 0,
        maxSingleHit: 0, fullBlocks: 0, kills: 0, counterattacks: 0,
        energySpentThisTurn: 0, energySpentTotal: 0, diceRolledTotal: 0,
        missionsCompleted: 0, turnsWithoutHealing: 0, turnsWithAction: 0,
        healedThisTurn: 0, actionDamageStreak: 0, attackedTurns: 0,
        lowHpDamageTotal: 0, distinctTargetsThisTurn: [],
        turnStartHealth: health(p), firstIncomingHandled: false,
        firstPhysicalDone: false, firstKiDone: false, firstHealDone: false,
        firstCardDone: false, firstDefenseDone: false, firstTechniqueDone: false,
        wasDamagedSinceLastAction: false, evadedThisTurn: false,
        lastAttackBlocked: 0, lastDamageAction: 0, previousDamageAction: 0
      };
    }
    var r=p.cardRuntime;
    r.statuses=arr(r.statuses); r.equipment=arr(r.equipment); r.allies=arr(r.allies);
    r.missions=arr(r.missions); r.reactions=arr(r.reactions); r.delayed=arr(r.delayed);
    r.buffs=r.buffs||{}; r.once=r.once||{}; r.cardHistory=arr(r.cardHistory);
    r.cardsPlayedThisTurn=arr(r.cardsPlayedThisTurn); r.distinctTargetsThisTurn=arr(r.distinctTargetsThisTurn);
    return r;
  }

  function hostRuntime(host){
    if(!host) host={};
    if(!host.cardRuntime || typeof host.cardRuntime !== 'object') host.cardRuntime={ scenario:null, saga:null, flags:{} };
    host.cardRuntime.flags=host.cardRuntime.flags||{};
    return host.cardRuntime;
  }

  function log(ctx, text){ if(ctx && typeof ctx.log === 'function') ctx.log(text); }
  function playerName(p){ return p && p.name ? p.name : 'Jugador'; }
  function targetName(p){ return p && p.name ? p.name : 'Objetivo'; }

  function getTargets(ctx){
    var ts = arr(ctx && ctx.targets).filter(alive);
    if(ctx && ctx.target && alive(ctx.target) && ts.indexOf(ctx.target) === -1) ts.unshift(ctx.target);
    return ts;
  }
  function getTarget(ctx){
    if(ctx && ctx.target && alive(ctx.target)) return ctx.target;
    var ts=getTargets(ctx); return ts[0] || null;
  }

  function draw(p, count, ctx){
    count=Math.max(0, n(count));
    p.deck=arr(p.deck); p.hand=arr(p.hand); p.discard=arr(p.discard);
    var drawn=0;
    for(var i=0;i<count;i++){
      if(p.deck.length===0 && p.discard.length){ p.deck=shuffle(p.discard.slice()); p.discard=[]; }
      if(!p.deck.length) break;
      p.hand.push(p.deck.pop()); drawn++;
    }
    if(drawn) log(ctx, playerName(p)+' roba '+drawn+' carta'+(drawn===1?'':'s')+'.');
    return drawn;
  }

  function discardRandom(p, count, ctx){
    p.hand=arr(p.hand); count=Math.min(p.hand.length, Math.max(0,n(count))); var d=0;
    p.discard=arr(p.discard);
    while(d<count && p.hand.length){
      var idx=Math.floor(Math.random()*p.hand.length); p.discard.push(p.hand.splice(idx,1)[0]); d++;
    }
    if(d) log(ctx, playerName(p)+' descarta '+d+' carta'+(d===1?'':'s')+'.');
    return d;
  }

  function addStatus(p, statusName, ctx){
    if(!p || !statusName) return false;
    var r=runtime(p);
    // Algunos élites/jefes tienen una salvaguarda temática: resisten la
    // primera aplicación de ciertos Estados, pero no son inmunes para siempre.
    var resist=arr(p.statusResistances);
    r.statusWardUsed=r.statusWardUsed||{};
    if(resist.indexOf(statusName)!==-1 && !r.statusWardUsed[statusName]){
      r.statusWardUsed[statusName]=true;
      log(ctx,targetName(p)+' resiste la primera aplicación de '+statusName+'.');
      return false;
    }
    var s=r.statuses.find(function(x){ return x && x.name===statusName; });
    if(s) s.stacks=n(s.stacks,1)+1;
    else r.statuses.push({name:statusName, stacks:1});
    log(ctx, targetName(p)+' recibe el estado '+statusName+'.');
    return true;
  }
  function hasStatus(p, name){ return runtime(p).statuses.some(function(s){ return s && s.name===name; }); }
  function removeStatus(p, name){
    var r=runtime(p); var before=r.statuses.length;
    r.statuses=r.statuses.filter(function(s){ return !s || s.name!==name; });
    return before!==r.statuses.length;
  }
  function clearNegativeStatuses(p, ctx){
    var r=runtime(p); var count=r.statuses.length; r.statuses=[];
    if(count) log(ctx, playerName(p)+' elimina '+count+' Estado'+(count===1?'':'s')+' negativo'+(count===1?'':'s')+'.');
    return count;
  }

  function permanentNames(p){
    var r=runtime(p);
    return r.equipment.concat(r.allies).map(function(x){ return x && x.nombre; }).filter(Boolean);
  }
  function hasPermanent(p, name){ return permanentNames(p).indexOf(name)!==-1; }
  function scenario(ctx){ var h=hostRuntime(ctx && ctx.host); return h.scenario && h.scenario.card ? h.scenario.card : null; }
  function saga(ctx){ var h=hostRuntime(ctx && ctx.host); return h.saga || null; }

  function heal(p, amount, ctx, sourceCard){
    amount=Math.max(0,n(amount)); if(!amount || !p) return 0;
    var r=runtime(p);
    var bonus=0;
    if(sourceCard && sourceCard.tipoCatalogo==='Recuperación' && hasPermanent(p,'Bastón Mágico')) bonus+=2;
    bonus += n(r.buffs.healBonus);
    var penalty = n(r.buffs.healPenalty);
    var sc=scenario(ctx);
    if(sc && sc.nombre==='Planeta Namek') bonus+=2;
    if(hasPermanent(p,'Emblema Namekiano') && !r.firstHealDone) bonus+=2;
    amount=Math.max(0, amount + bonus - penalty);
    if(window.Engagement && typeof window.Engagement.modifyHeal==='function') amount=window.Engagement.modifyHeal(p,amount,ctx,sourceCard);
    if(sc && sc.nombre==='Arena de Supervivencia'){
      var restante=Math.max(0,5-n(r.healedThisTurn)); amount=Math.min(amount,restante);
    }
    var before=health(p); p.health=Math.min(maxHealth(p),before+amount);
    var gained=p.health-before;
    if(gained>0){
      r.healedThisTurn=n(r.healedThisTurn)+gained; r.firstHealDone=true;
      log(ctx, playerName(p)+' recupera '+gained+' de vida.');
      if(sc && sc.nombre==='Arena de Supervivencia' && p.health<=5 && !r.once.arenaLowDraw){ r.once.arenaLowDraw=true; draw(p,2,ctx); }
      if(window.Engagement && typeof window.Engagement.afterHeal==='function') window.Engagement.afterHeal(p,gained,ctx,sourceCard);
    }
    return gained;
  }

  function modifyDiceEnergy(p){ p.energy=arr(p.dice).reduce(function(a,b){ return a+n(b); },0); }

  function applyAttackBonuses(attacker, target, card, amount, ctx){
    var r=runtime(attacker); var bonus=0;
    if(isPhysical(card) && hasPermanent(attacker,'Espada')) bonus+=2;
    if(isPhysical(card) && hasPermanent(attacker,'Guantes de Gravedad') && n(card.costo)>=4) bonus+=3;
    if(isPhysical(card) && hasPermanent(attacker,'Botas de Entrenamiento Pesadas')) bonus+=2;
    if(isPhysical(card) && hasPermanent(attacker,'Trunks - Espadachín')) bonus+=2;
    if(isPhysical(card) && hasPermanent(attacker,'Guantes de Combate') && !r.firstPhysicalDone) bonus+=1;
    if(isKi(card) && hasPermanent(attacker,'Guantelete Energético') && !r.firstKiDone) bonus+=3;
    if(hasPermanent(attacker,'Cinturón de Combate') && health(attacker)<=5) bonus+=2;
    if(hasPermanent(attacker,'Arma Legendaria')) bonus+=2;
    if(hasPermanent(attacker,'Gohan - Potencial') && health(attacker)<=5) bonus+=3;
    if(isKi(card) && hasPermanent(attacker,'Emblema de Freezer') && target && health(target)<=5) bonus+=2;
    bonus+=n(r.buffs.turnAttackBonus)+n(r.buffs.nextAttackBonus);
    if(isPhysical(card)) bonus+=n(r.buffs.turnPhysicalBonus);
    if(isKi(card)) bonus+=n(r.buffs.turnKiBonus);
    if(hasStatus(attacker,'Debilitado')) bonus-=2;
    var sc=scenario(ctx);
    if(sc && sc.nombre==='Torneo Mundial' && isPhysical(card)) bonus+=1;
    var sg=saga(ctx);
    if(sg && sg.attackBonus) bonus+=n(sg.attackBonus);
    if(sg && sg.physicalBonus && isPhysical(card)) bonus+=n(sg.physicalBonus);
    if(sg && sg.kiBonus && isKi(card)) bonus+=n(sg.kiBonus);
    var total=Math.max(0, amount+bonus);
    if(window.Engagement && typeof window.Engagement.modifyOutgoingDamage==='function') total=window.Engagement.modifyOutgoingDamage(attacker,target,card,total,ctx);
    return Math.max(0,total);
  }

  function incomingReduction(p, amount, attacker, ctx){
    var r=runtime(p); var reduce=0; var nullify=false; var consumed=[];
    if(hasPermanent(p,'Armadura Saiyan')) reduce+=1;
    if(hasPermanent(p,'Capa de Guerrero') && !r.once.capaGuerreroTurn){ reduce+=2; r.once.capaGuerreroTurn=true; }
    if(hasPermanent(p,'Armadura Reforzada') && !r.once.armaduraReforzadaTurn){ reduce+=3; r.once.armaduraReforzadaTurn=true; }
    if(hasPermanent(p,'Krilin - Apoyo') && !r.once.krilinTurn){ reduce+=2; r.once.krilinTurn=true; }
    if(hasPermanent(p,'Capa de Invisibilidad') && !r.once.capaInvisibilidadGame){ nullify=true; r.once.capaInvisibilidadGame=true; }
    if(n(r.buffs.nextDamageReduce)>0){ reduce+=n(r.buffs.nextDamageReduce); r.buffs.nextDamageReduce=0; }
    if(r.buffs.auraProtectora){ nullify=true; r.buffs.auraProtectora=false; }
    r.reactions=arr(r.reactions);
    r.reactions.forEach(function(rx){
      if(!rx || rx.used) return;
      if(rx.name==='¡Esquiva!'){ reduce+=5; rx.used=true; consumed.push(rx); }
      else if(rx.name==='Barrera Instantánea'){ reduce+=7; rx.used=true; consumed.push(rx); }
      else if(rx.name==='Desvío de Ki'){ reduce+=5; rx.used=true; consumed.push(rx); }
      else if(rx.name==='Reflejo Perfecto' && amount<=6){ nullify=true; rx.used=true; consumed.push(rx); }
      else if(rx.name==='Resistencia'){ reduce+=4; rx.used=true; consumed.push(rx); r.buffs.healAfterHit=2; }
      else if(rx.name==='Último Segundo'){ r.buffs.deathPreventOnce=true; rx.used=true; consumed.push(rx); }
      else if(rx.name==='¡Todavía No!'){ r.buffs.deathPreventBig=true; rx.used=true; consumed.push(rx); }
      else if(rx.name==='Contraataque'){ r.buffs.counterAfterHit=4; rx.used=true; consumed.push(rx); }
    });
    r.reactions=r.reactions.filter(function(rx){ return rx && !rx.used; });
    var after = nullify ? 0 : Math.max(0,amount-reduce);
    var blocked=Math.max(0,amount-after);
    if(blocked){ r.damageBlockedTotal=n(r.damageBlockedTotal)+blocked; if(after===0) r.fullBlocks=n(r.fullBlocks)+1; log(ctx,playerName(p)+' reduce '+blocked+' de daño.'); }
    if(nullify) r.evadedThisTurn=true;
    return {damage:after, blocked:blocked};
  }

  function afterIncomingDamage(p, attacker, actualDamage, ctx){
    var r=runtime(p);
    r.damageReceivedThisTurn=n(r.damageReceivedThisTurn)+actualDamage;
    r.damageReceivedTotal=n(r.damageReceivedTotal)+actualDamage;
    r.wasDamagedSinceLastAction=actualDamage>0;
    if(actualDamage>0 && hasPermanent(p,'Emblema Saiyan')) r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+2;
    if(actualDamage>0 && r.buffs.counterAfterHit && attacker && alive(attacker)){
      var d=n(r.buffs.counterAfterHit); r.buffs.counterAfterHit=0; attacker.health=Math.max(0,health(attacker)-d); r.counterattacks=n(r.counterattacks)+1;
      log(ctx,playerName(p)+' contraataca e inflige '+d+' de daño a '+targetName(attacker)+'.');
    }
    if(r.buffs.healAfterHit){ var h=n(r.buffs.healAfterHit); r.buffs.healAfterHit=0; if(health(p)<=3) heal(p,h,ctx); }
    if(actualDamage>0 && r.buffs.barrierRetaliate && attacker && alive(attacker)){
      attacker.health=Math.max(0,health(attacker)-n(r.buffs.barrierRetaliate));
      log(ctx,'La Barrera devuelve '+n(r.buffs.barrierRetaliate)+' de daño a '+targetName(attacker)+'.');
    }
    if(health(p)<=0 && r.buffs.deathPreventBig){ p.health=1; r.buffs.deathPreventBig=false; draw(p,2,ctx); p.energy=n(p.energy)+3; log(ctx,playerName(p)+' se niega a caer y queda a 1 de vida.'); }
    else if(health(p)<=0 && r.buffs.deathPreventRacial){ p.health=1; r.buffs.deathPreventRacial=false; heal(p,5,ctx); log(ctx,playerName(p)+' activa Voluntad Indomable.'); }
    else if(health(p)<=0 && r.buffs.deathPreventHeal){ p.health=1; var dh=n(r.buffs.deathPreventHeal); r.buffs.deathPreventHeal=0; heal(p,dh,ctx); }
    else if(health(p)<=0 && r.buffs.deathPreventOnce){ p.health=1; r.buffs.deathPreventOnce=false; log(ctx,playerName(p)+' sobrevive con 1 de vida.'); }
    if(health(p)<=5 && hasPermanent(p,'Videl - Determinación') && actualDamage>0 && !r.once.videlTurn){ r.once.videlTurn=true; heal(p,2,ctx); }
    if(window.Engagement && typeof window.Engagement.afterDamageReceived==='function') window.Engagement.afterDamageReceived(p,attacker,actualDamage,ctx);
  }

  function dealDamage(attacker, target, amount, card, ctx, opts){
    if(!target || !alive(target)) return 0; opts=opts||{};
    var r=runtime(attacker); var before=health(target);
    amount=Math.max(0,n(amount));
    amount=applyAttackBonuses(attacker,target,card,amount,ctx);
    var ignore=Math.max(0,n(opts.ignoreDefense));
    var blocked=0;
    if(n(target.shield)>0){
      var effectiveShield=Math.max(0,n(target.shield)-ignore);
      blocked=Math.min(effectiveShield,amount);
      amount=Math.max(0,amount-blocked);
      target.shield=Math.max(0,n(target.shield)-blocked);
      if(blocked) log(ctx,targetName(target)+' bloquea '+blocked+' de daño.');
    }
    target.health=Math.max(0,before-amount);
    var actual=before-target.health;
    r.previousDamageAction=n(r.lastDamageAction); r.lastDamageAction=actual;
    if(actual>0){
      r.damageDealtThisTurn=n(r.damageDealtThisTurn)+actual; r.damageDealtTotal=n(r.damageDealtTotal)+actual;
      r.maxSingleHit=Math.max(n(r.maxSingleHit),actual); r.actionDamageStreak=n(r.actionDamageStreak)+1;
      if(health(attacker)<=5) r.lowHpDamageTotal=n(r.lowHpDamageTotal)+actual;
      var tid=target.id||target.name||'target'; if(r.distinctTargetsThisTurn.indexOf(tid)===-1) r.distinctTargetsThisTurn.push(tid);
      log(ctx,playerName(attacker)+' usa '+(card?card.nombre:'un ataque')+' e inflige '+actual+' de daño a '+targetName(target)+'.');
      var sc=scenario(ctx);
      if(sc && sc.nombre==='Campo de Batalla Destruido' && actual>=5 && ctx && typeof ctx.damageOthers==='function') ctx.damageOthers(1,target,attacker);
    } else r.actionDamageStreak=0;
    r.lastAttackBlocked=blocked;
    if(isPhysical(card)) r.firstPhysicalDone=true; if(isKi(card)) r.firstKiDone=true;
    if(target.health<=0 && before>0){
      r.kills=n(r.kills)+1;
      if(hasPermanent(attacker,'Arma Legendaria')){ draw(attacker,3,ctx); attacker.energy=n(attacker.energy)+3; }
      if(typeof ctx.onKill==='function') ctx.onKill(target,card);
    }
    return actual;
  }

  function genericTextEffects(text, card, ctx, opts){
    opts=opts||{}; text=text||''; var p=ctx.player, t=getTarget(ctx), r=runtime(p); var didDamage=false;
    // Daño directo (si no fue aplicado por un resolver específico)
    if(!opts.skipDamage){
      var m=text.match(/Inflige\s+(\d+)\s+de daño/i);
      if(m && t){ dealDamage(p,t,parseInt(m[1],10)+(opts.addBaseDamage? n(p.baseDamage):0),card,ctx,opts); didDamage=true; }
      var ma=text.match(/Todos los rivales pierden\s+(\d+)\s+de vida/i);
      if(ma){ getTargets(ctx).forEach(function(x){ if(alive(x)) dealDamage(p,x,parseInt(ma[1],10),card,ctx,opts); }); didDamage=true; }
    }
    var mh=text.match(/(?:Recupera|Cura)\s+(\d+)\s+(?:de vida|HP)/i); if(mh) heal(p,parseInt(mh[1],10),ctx,card);
    var me=text.match(/(?:recupera|obtiene)\s+\+?(\d+)\s+Ki/i); if(me) p.energy=n(p.energy)+parseInt(me[1],10);
    var md=text.match(/roba\s+(\d+)\s+carta/i); if(md) draw(p,parseInt(md[1],10),ctx);
    if(/elimina (?:todos )?(?:tus )?Estados negativos/i.test(text)) clearNegativeStatuses(p,ctx);
    ['Aturdido','Debilitado','Quemado','Agotado','Sellado'].forEach(function(s){ if(new RegExp('aplica\\s+'+s,'i').test(text) && t) addStatus(t,s,ctx); });
    var nb=text.match(/(?:tu )?(?:siguiente|próximo) ataque(?: físico)?(?: obtiene| hace| inflige)?\s*\+?(\d+)\s+(?:de )?daño/i); if(nb) r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+parseInt(nb[1],10);
    var nc=text.match(/(?:tu )?(?:siguiente|próxima) carta cuesta\s+(\d+)\s+menos/i); if(nc) r.buffs.nextCardDiscount=n(r.buffs.nextCardDiscount)+parseInt(nc[1],10);
    if(/(?:tu )?(?:siguiente|próxima) carta cuesta 0/i.test(text)) r.buffs.nextCardFree=true;
    var hpLoss=text.match(/(?:pierdes|pierde)\s+(\d+)\s+de vida/i); if(hpLoss && !/todos/i.test(text)) p.health=Math.max(0,health(p)-parseInt(hpLoss[1],10));
    return didDamage;
  }

  function comboReady(card,p,t){
    var r=runtime(p), name=card.nombre, h=r.cardHistory;
    function last(i){ return h[h.length-i] || {}; }
    switch(name){
      case 'Cadena de Golpes': return n(r.consecutiveAttacks)>=2;
      case 'Combo de Tres Golpes': return n(r.consecutiveAttacks)>=3;
      case 'Golpe Final': return last(2).nature==='Físico' && last(1).nature==='Ki';
      case 'Puño -> Ki': return last(1).nature==='Físico' && n(last(1).damage)>0;
      case 'Ki -> Puño': return last(1).nature==='Ki' && n(last(1).damage)>0;
      case 'Tormenta de Golpes': return n(r.attacksThisTurn)>=3;
      case 'Asalto Imparable': return n(r.attacksTotal)>=4;
      case 'Contraataque Perfecto': return last(1).type==='Defensa';
      case 'Defensa -> Ataque': return last(1).type==='Defensa';
      case 'Esquiva -> Golpe': return !!r.evadedThisTurn;
      case 'Combo Ascendente': return uniq(r.cardHistory.filter(function(x){return x.attack;}).map(function(x){return (x.nature||'')+'|'+(x.range||'');})).length>=3;
      case 'Golpe Incesante': return n(last(1).damage)>0;
      case 'Doble Impacto': return n(r.attacksThisTurn)>=2;
      case 'Triple Impacto': return n(r.attacksThisTurn)>=3;
      case 'Combo Brutal': return !!t && health(t)<health(p) && n(last(1).damage)>0;
      case 'Combo Desesperado': return health(p)<=5 && n(r.damageReceivedThisTurn)>0;
      case 'Venganza': return n(r.damageReceivedThisTurn)>0;
      case 'Combo de Ki': return n(r.energySpentThisTurn)>=3;
      case 'Flujo de Energía': return n(r.techniquesThisTurn)>=2;
      case 'Cadena Perfecta': return h.length>=3 && last(3).attack && last(2).technique && last(1).attack;
      case 'Rompeguardia': return n(r.lastAttackBlocked)>0;
      case 'Ataque Encadenado': return n(last(1).damage)>0;
      case 'Combo Devastador': return n(r.damageDealtThisTurn)>=10;
      case 'Persecución': return !!t && health(t)<=5 && n(last(1).damage)>0;
      case 'Combo Multitudinario': return r.distinctTargetsThisTurn.length>=2;
      case 'Todos Contra Uno': return !!(t && t.cardRuntime && t.cardRuntime.hitByOther);
      case 'Vínculo de Combate': return r.allies.length>0;
      case 'Combo de Supervivencia': return n(r.turnStartHealth)<=5 && health(p)>0;
      case 'Combo Infinito': return uniq(r.cardsPlayedThisTurn).length>=4;
      case 'Cadena del Guerrero': return n(r.cardsPlayedThisTurn.length)>=5;
      default: return true;
    }
  }

  function canPlay(card,p,t,ctx){
    if(!card || !p) return {ok:false,reason:'Carta o jugador no válido'};
    if(card.raza && card.raza!=='Neutral' && card.raza!==p.race) return {ok:false,reason:'Carta exclusiva de '+card.raza};
    // Balance de progresión: las cartas de gran impacto pueden exigir una
    // ronda mínima. La ronda vive en Game (solitario) o en combat (MP).
    var currentRound = 1;
    if(ctx && ctx.round) currentRound = n(ctx.round) || 1;
    else if(ctx && ctx.host && ctx.host.round) currentRound = n(ctx.host.round) || 1;
    if(card.rondaMinima && currentRound < n(card.rondaMinima)){
      return {ok:false,reason:'Disponible desde la ronda '+card.rondaMinima};
    }
    if(hasStatus(p,'Sellado') && (card.tipoCatalogo==='Habilidad' || isTechnique(card))) return {ok:false,reason:'Estás Sellado: no puedes usar Habilidades ni Técnicas'};
    if(card.tipoCatalogo==='Equipamiento' && runtime(p).equipment.length>=3) return {ok:false,reason:'Máximo 3 Equipamientos activos'};
    if(card.tipoCatalogo==='Combo' && !comboReady(card,p,t)) return {ok:false,reason:'No has cumplido la condición del Combo'};
    switch(card.nombre){
      case 'Golpe Pesado': if(runtime(p).attacksThisTurn>0) return {ok:false,reason:'Solo puede jugarse antes de atacar este turno'}; break;
      case 'Golpe Final': if(card.tipoCatalogo==='Ataque' && (!t || health(t)>10)) return {ok:false,reason:'El objetivo debe tener 10 o menos de vida'}; break;
      case 'Golpe del Último Aliento': if(health(p)>5) return {ok:false,reason:'Necesitas 5 o menos de vida'}; break;
      case 'Recuperación de Emergencia': if(health(p)>4) return {ok:false,reason:'Necesitas 4 o menos de vida'}; break;
      case 'Último Aliento': if(card.tipoCatalogo==='Recuperación' && health(p)>5) return {ok:false,reason:'Necesitas 5 o menos de vida'}; break;
      case 'Semilla Senzu': if(card.tipoCatalogo==='Recuperación' && health(p)>10) return {ok:false,reason:'Solo puede usarse con 10 o menos de vida'}; break;
      case 'Comer una Semilla': break;
      case 'Renacer del Guerrero': if(health(p)>3) return {ok:false,reason:'Necesitas 3 o menos de vida'}; break;
      case 'Último Poder': if(health(p)>3) return {ok:false,reason:'Necesitas 3 o menos de vida'}; break;
      case 'Última Oportunidad Saiyan': if(health(p)>5) return {ok:false,reason:'Necesitas 5 o menos de vida'}; break;
    }
    return {ok:true};
  }

  function getEffectiveCost(card,p,ctx){
    if(!card) return 0; var r=runtime(p); var cost=n(card.costo); var type=card.tipoCatalogo||card.clase;
    if(hasStatus(p,'Aturdido')) cost+=2;
    cost+=n(r.buffs.nextCardPenalty);
    cost+=n(hostRuntime(ctx && ctx.host).flags.globalCostDelta);
    if(card.tipoCatalogo==='Combo' && comboReady(card,p,getTarget(ctx)) && /gratis|cuesta 0/i.test(card.efecto||'')) cost=0;
    if(r.buffs.nextCardFree) cost=0;
    else {
      cost-=n(r.buffs.nextCardDiscount);
      if(isAttack(card)) cost-=n(r.buffs.nextAttackDiscount);
      if(!r.firstCardDone && hasPermanent(p,'Botas de Entrenamiento')) cost-=1;
      if(isTechnique(card) && !r.firstTechniqueDone && hasPermanent(p,'Báculo de Ki')) cost-=1;
      if(isTechnique(card) && n(card.costo)<=3 && hasPermanent(p,'Capa del Maestro')) cost-=1;
      if(isDefense(card) && !r.firstDefenseDone && hasPermanent(p,'Armadura Ligera')) cost-=1;
      if(isDefense(card) && hasPermanent(p,'Botas de Entrenamiento Pesadas')) cost+=1;
      if(isAttack(card) && !r.firstPhysicalDone && hasPermanent(p,'Ten Shin Han - Disciplina')) cost-=1;
      if(card.nombre==='Ki Blast' && r.cardsPlayedThisTurn.length===0) cost=0;
      if(n(r.buffs.firstTypeDiscount)>0){
        r.usedTypeDiscounts=arr(r.usedTypeDiscounts);
        var typeKey=card.tipoCatalogo||card.clase||'Otro';
        if(r.usedTypeDiscounts.indexOf(typeKey)===-1) cost-=n(r.buffs.firstTypeDiscount);
      }
      var sc=scenario(ctx);
      if(sc && sc.nombre==='Planeta Namek' && isAttack(card) && isKi(card)) cost+=1;
      if(sc && sc.nombre==='Espacio Exterior' && isAttack(card)){ if(isKi(card)) cost-=1; if(isPhysical(card)) cost+=1; }
      if(sc && sc.nombre==='Torneo Mundial' && /todos|demás|varios/i.test(card.efecto||'')) cost+=1;
      var sg=saga(ctx);
      if(sg){
        if(n(sg.allCostDelta)) cost+=n(sg.allCostDelta);
        if(isAttack(card)) cost+=n(sg.attackCostDelta);
        if(isDefense(card)) cost+=n(sg.defenseCostDelta);
        if(isTechnique(card)) cost+=n(sg.techniqueCostDelta);
        if(isAttack(card) && isKi(card)) cost+=n(sg.kiAttackCostDelta);
        if(type==='Habilidad') cost+=n(sg.abilityCostDelta);
      }
    }
    if(window.Engagement && typeof window.Engagement.modifyCost==='function') cost=window.Engagement.modifyCost(card,p,cost,ctx);
    return Math.max(0,Math.round(cost));
  }

  function consumeCostModifiers(card,p){
    var r=runtime(p);
    if(hasStatus(p,'Aturdido')) removeStatus(p,'Aturdido');
    if(r.buffs.nextCardPenalty) r.buffs.nextCardPenalty=0;
    if(r.buffs.nextCardFree) r.buffs.nextCardFree=false;
    if(r.buffs.nextCardDiscount) r.buffs.nextCardDiscount=0;
    if(isAttack(card) && r.buffs.nextAttackDiscount) r.buffs.nextAttackDiscount=0;
    if(window.Engagement && typeof window.Engagement.consumeCostHook==='function') window.Engagement.consumeCostHook(card,p);
  }

  function resolveAttack(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p); if(!t) return;
    var base=n(card.damageBase);
    var hits=1;
    if(/dos veces/i.test(card.efecto||'')) hits=2;
    if(/tres veces/i.test(card.efecto||'')) hits=3;
    if(/cuatro veces/i.test(card.efecto||'')) hits=4;
    var dmg=base*hits + n(p.baseDamage);
    var ignore=0;
    var mi=(card.efecto||'').match(/ignora(?: completamente)?(?: hasta)?\s+(\d+)\s+(?:puntos? de )?(?:Defensa|defensa)/i); if(mi) ignore=parseInt(mi[1],10);
    switch(card.nombre){
      case 'Ráfaga de Ki': if(n(t.shield)>0) dmg+=1; break;
      case 'Ráfaga Concentrada': if(arr(p.dice).indexOf(6)!==-1) draw(p,1,ctx); break;
      case 'Ataque Fulgurante': if(health(t)>health(p)) dmg+=3; break;
      case 'Puñetazo Brutal': break; // bonus se comprueba después
      case 'Cañón de Ki': if(arr(p.dice).indexOf(6)!==-1) dmg+=2; break;
      case 'Golpe de Castigo': if(r.wasDamagedSinceLastAction) dmg+=3; break;
      case 'Ataque de Oportunidad': if(!(t.cardRuntime && n(t.cardRuntime.lastCardCost)>=5)) dmg=0; break;
      case 'Ataque Implacable': if(n(r.attacksThisTurn)>0) dmg=(7+n(p.baseDamage)); break;
      case 'Ataque Sacrificado': p.health=Math.max(0,health(p)-2); break;
      case 'Combo Ascendente': if(n(r.consecutiveAttacks)>=1) dmg=(6+n(p.baseDamage)); break;
      case 'Tormenta de Golpes': dmg=Math.min(10,(1+Math.floor(Math.random()*6))*2)+n(p.baseDamage); break;
      case 'Golpe del Último Aliento': dmg=8+n(p.baseDamage); break;
    }
    if(card.nombre==='Explosión Repentina'){
      var actual=dealDamage(p,t,dmg,card,ctx,{ignoreDefense:ignore});
      getTargets(ctx).filter(function(x){return x!==t;}).forEach(function(x){dealDamage(p,x,2,card,ctx,{});});
      return actual;
    }
    if(card.nombre==='Onda Expansiva'){
      var total=0; getTargets(ctx).forEach(function(x){total+=dealDamage(p,x,3+n(p.baseDamage),card,ctx,{});}); return total;
    }
    var actual=dealDamage(p,t,dmg,card,ctx,{ignoreDefense:ignore});
    if(card.nombre==='Puñetazo Brutal' && health(t)<=5 && alive(t)) actual+=dealDamage(p,t,2,card,ctx,{});
    if(card.nombre==='Golpe al Estómago' && t.cardRuntime) runtime(t).buffs.nextCardPenalty=n(runtime(t).buffs.nextCardPenalty)+1;
    if(card.nombre==='Golpe Desestabilizador' && t.cardRuntime) runtime(t).buffs.noReactions=true;
    if(card.nombre==='Ki Explosivo' && health(t)<=5 && t.hand) discardRandom(t,1,ctx);
    if(card.nombre==='Ataque de Rebote' && r.lastAttackBlocked>0 && alive(t)) dealDamage(p,t,2,card,ctx,{});
    if(r.buffs.drawOnNextAttackHit && actual>0){ draw(p,n(r.buffs.drawOnNextAttackHit),ctx); r.buffs.drawOnNextAttackHit=0; }
    return actual;
  }

  function resolveDefense(card,ctx){
    var p=ctx.player,r=runtime(p),v=n(card.defensaBase);
    switch(card.nombre){
      case 'Esquiva Rápida': r.reactions.push({name:'Reflejo Perfecto',used:false,unlimited:true}); log(ctx,'Esquiva Rápida queda preparada para el próximo ataque.'); return;
      case 'Desvío': r.buffs.counterAfterHit=2; break;
      case 'Bloqueo Perfecto': r.reactions.push({name:'Reflejo Perfecto',used:false}); log(ctx,'Bloqueo Perfecto queda preparado.'); return;
      case 'Defensa de Emergencia': v=7; break;
      case 'Contraataque Defensivo': r.buffs.counterAfterHit=3; break;
      case 'Guardia Total': r.buffs.auraProtectora=true; log(ctx,'Guardia Total anulará el próximo daño recibido.'); return;
      case 'Escudo Explosivo': r.buffs.counterAfterHit=4; break;
      case 'Desaparición': r.buffs.auraProtectora=true; return;
      case 'Armadura de Ki': r.buffs.turnIncomingReduce=n(r.buffs.turnIncomingReduce)+3; break;
      case 'Último Escudo': r.buffs.deathPreventOnce=true; return;
      case 'Evasión Perfecta': r.buffs.auraProtectora=true; return;
      case 'Intercepción': v=Math.max(v,3); break;
      case 'Defensa Reflejada': r.buffs.reflectBlocked=true; break;
      case 'Defensa Desesperada': discardRandom(p,1,ctx); v=8; break;
      case 'Defensa Suprema': r.buffs.auraProtectora=true; heal(p,2,ctx); return;
      case 'Regeneración Namekiana': heal(p,3,ctx); break;
    }
    if(!v){ var m=(card.efecto||'').match(/Reduce\s+(\d+)/i); if(m) v=parseInt(m[1],10); }
    v += n(r.buffs.turnDefenseBonus);
    p.shield=n(p.shield)+v; if(v) log(ctx,playerName(p)+' gana '+v+' de escudo con '+card.nombre+'.');
    r.defensesThisTurn=n(r.defensesThisTurn)+1;
  }

  function resolveRecovery(card,ctx){
    var p=ctx.player,r=runtime(p),v=n(card.curaBase);
    switch(card.nombre){
      case 'Último Aliento': v=7; break;
      case 'Curación Profunda': v=12; break;
      case 'Sangre Saiyan': v=5; if(n(r.turnStartHealth)<maxHealth(p)/2) draw(p,1,ctx); break;
      case 'Regeneración': v=2; r.delayed.push({turns:1,kind:'heal',amount:2,count:2}); break;
      case 'Regeneración Namekiana': v=7; clearNegativeStatuses(p,ctx); break;
      case 'Resistencia de Freezer': v=4; break;
      case 'Semilla Senzu': p.health=maxHealth(p); log(ctx,playerName(p)+' recupera toda su vida con Semilla Senzu.'); return;
      case 'Recuperar Ki': p.energy=n(p.energy)+2; return;
      case 'Reserva de Energía': r.buffs.savedEnergy=n(p.energy)>0?Math.min(6,n(p.energy)):0; log(ctx,'Guardas '+r.buffs.savedEnergy+' de energía para el próximo turno.'); return;
      case 'Recarga de Ki': p.energy=n(p.energy)+3; return;
      case 'Explosión de Energía': v=Math.min(8,Math.max(0,arr(p.dice).length)*2); break;
      case 'Meditación': r.buffs.firstDieBonus=n(r.buffs.firstDieBonus)+2; return;
      case 'Renovación de Ki': p.energy=n(p.energy)+Math.max(1,Math.round(n(r.energySpentThisTurn)/2)); return;
      case 'Volver al Combate': v=6; draw(p,2,ctx); break;
      case 'Segundo Aire': v=4; break;
      case 'Recuperación Milagrosa': v=10; clearNegativeStatuses(p,ctx); break;
      case 'Comer una Semilla': v=health(p)<=3?9:6; break;
      case 'Voluntad de Sobrevivir': v=health(p)===1?8:5; break;
      case 'Recomponerse': v=4; if(p.discard && p.discard.length) p.hand.push(p.discard.pop()); break;
      case 'Recuperación Táctica': v=3; discardRandom(p,1,ctx); draw(p,2,ctx); break;
      case 'Absorción de Energía': v=5; p.energy=n(p.energy)+2; break;
      case 'Energía Compartida': v=3; if(ctx.partner) heal(ctx.partner,3,ctx,card); break;
      case 'Recuperación Total': v=8; p.energy=n(p.energy)+2; break;
      case 'Milagro': r.buffs.deathPreventHeal=6; return;
      case 'Renacer del Guerrero': v=10; draw(p,2,ctx); p.energy=n(p.energy)+1; break;
    }
    var gained=heal(p,v,ctx,card);
    if(card.nombre==='Resistencia de Freezer' && health(p)<=5) heal(p,3,ctx,card);
    if(card.nombre==='Segundo Aire' && health(p)>maxHealth(p)/2) r.buffs.firstDieBonus=n(r.buffs.firstDieBonus)+1;
    if(gained>0) r.healedThisTurn=n(r.healedThisTurn)+0; // ya contabilizado en heal()
  }

  function resolveKiTechnique(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p),name=card.nombre;
    switch(name){
      case 'Carga de Ki': p.energy=n(p.energy)+2; break;
      case 'Concentración': if(p.dice && p.dice.length){ var i=p.dice.indexOf(Math.max.apply(null,p.dice)); p.dice[i]=Math.min(6,n(p.dice[i])+2); modifyDiceEnergy(p); } break;
      case 'Control del Ki': if(p.dice && p.dice.length){ p.dice[0]=6; modifyDiceEnergy(p); } break;
      case 'Sobrecarga': r.buffs.nextAttackDiscount=n(r.buffs.nextAttackDiscount)+2; break;
      case 'Reserva de Energía': r.buffs.savedEnergy=Math.min(6,n(p.energy)); break;
      case 'Explosión de Ki': if(p.dice && p.dice.length){ p.dice[0]=6; modifyDiceEnergy(p); } break;
      case 'Distribución de Ki': p.energy=n(p.energy)+1; break;
      case 'Fusión de Ki': p.energy=n(p.energy)+1; break;
      case 'Recuperación Instantánea': p.energy=n(p.energy)+Math.max(2,Math.round(n(r.energySpentThisTurn)/2)); break;
      case 'Última Reserva': if(n(p.energy)===0) p.energy=2; break;
      case 'Potenciar Técnica': r.buffs.nextTechniquePower=n(r.buffs.nextTechniquePower)+2; break;
      case 'Liberación de Ki': r.buffs.nextCardFree=true; r.buffs.discardAfterNext=true; break;
      case 'Ki Inestable': { var d=1+Math.floor(Math.random()*6); if(d>=4)p.energy=n(p.energy)+4; else p.energy=Math.max(0,n(p.energy)-2); log(ctx,'Ki Inestable: sale '+d+'.'); } break;
      case 'Control Absoluto': if(p.dice&&p.dice.length){ p.dice[0]=6; modifyDiceEnergy(p); } break;
      case 'Acumulación de Energía': r.buffs.savedEnergy=n(r.buffs.savedEnergy)+2; break;
      case 'Carga Forzada': r.buffs.firstDieBonus=n(r.buffs.firstDieBonus)+3; break;
      case 'Lectura de Ki': if(t && t.dice && t.dice.length){ t.dice[0]=1+Math.floor(Math.random()*6); modifyDiceEnergy(t); } break;
      case 'Drenaje de Ki': if(t){ var steal=Math.min(3,n(t.energy)); t.energy=Math.max(0,n(t.energy)-steal); p.energy=n(p.energy)+Math.min(2,steal); } else p.energy=n(p.energy)+2; break;
      case 'Interferencia Energética': if(t&&t.dice&&t.dice.length){ t.dice[0]=Math.max(1,n(t.dice[0])-2); modifyDiceEnergy(t); } break;
      case 'Robo de Energía': if(t&&t.dice&&t.dice.length){ var val=n(t.dice[0]); t.energy=Math.max(0,n(t.energy)-val); p.energy=n(p.energy)+val; } break;
      case 'Ki Compartido': if(ctx.partner){ var give=Math.min(3,n(p.energy)); p.energy-=give; ctx.partner.energy=n(ctx.partner.energy)+give; } break;
      case 'Flujo Perfecto': r.buffs.nextCardDiscount=n(r.buffs.nextCardDiscount)+2; break;
      case 'Instinto de Combate': if(t && n(t.energy)>n(p.energy)) p.energy=n(p.energy)+3; else p.energy=n(p.energy)+1; break;
      case 'Sacrificio de Ki': { var spent=Math.min(4,n(p.energy)); p.energy-=spent; draw(p,Math.floor(spent/2),ctx); } break;
      case 'Control del Campo': hostRuntime(ctx.host).flags.globalCostDelta=1; break;
      case 'Explosión de Poder': r.buffs.savedEnergy=n(r.buffs.savedEnergy)+Math.floor(n(p.energy)/2); p.energy=0; break;
      case 'Dominio Energético': r.buffs.refundHighDice=true; break;
      case 'Último Recurso': discardRandom(p,1,ctx); p.energy=n(p.energy)+3; break;
      case 'Multiplicación de Ki': if(p.dice&&p.dice.length) p.energy=n(p.energy)+Math.max.apply(null,p.dice); break;
      case 'Poder Desatado': p.dice=arr(p.dice).map(function(v){return Math.min(6,n(v)+1);}); modifyDiceEnergy(p); r.buffs.loseHpEndTurn=n(r.buffs.loseHpEndTurn)+3; break;
      default: genericTextEffects(card.efecto,card,ctx,{addBaseDamage:false});
    }
    log(ctx,playerName(p)+' usa '+card.nombre+'.');
  }

  function searchDeck(p, predicate, ctx){
    p.deck=arr(p.deck); var idx=p.deck.findIndex(predicate); if(idx===-1) return null;
    var c=p.deck.splice(idx,1)[0]; p.hand=arr(p.hand); p.hand.push(c); log(ctx,playerName(p)+' busca '+c.nombre+' y lo añade a su mano.'); return c;
  }

  function resolveAbility(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p),name=card.nombre;
    switch(name){
      case 'Robo Rápido': draw(p,2,ctx); break;
      case 'Búsqueda': if(p.deck&&p.deck.length){ var c=p.deck.pop(); p.hand.push(c); log(ctx,'Búsqueda encuentra '+c.nombre+'.'); } break;
      case 'Preparación': if(p.deck&&p.deck.length){ draw(p,1,ctx); } break;
      case 'Recambio': discardRandom(p,Math.min(2,p.hand.length),ctx); draw(p,2,ctx); break;
      case 'Mano del Guerrero': draw(p,3,ctx); discardRandom(p,1,ctx); break;
      case 'Recuperar Técnica': if(p.discard){ var i=p.discard.findIndex(isTechnique); if(i>=0)p.hand.push(p.discard.splice(i,1)[0]); } break;
      case 'Recuperar Ataque': if(p.discard){ var ia=p.discard.findIndex(isAttack); if(ia>=0)p.hand.push(p.discard.splice(ia,1)[0]); } break;
      case 'Recuperar Defensa': if(p.discard){ var id=p.discard.findIndex(isDefense); if(id>=0)p.hand.push(p.discard.splice(id,1)[0]); } break;
      case 'Último Recurso': if(p.discard&&p.discard.length){p.hand.push(p.discard.pop()); discardRandom(p,1,ctx);} break;
      case 'Robar Información': if(t&&t.hand) discardRandom(t,1,ctx); else draw(p,1,ctx); break;
      case 'Cancelar Técnica': r.buffs.cancelNextTechnique=true; break;
      case 'Romper Defensa': if(t) t.shield=0; break;
      case 'Interrupción': r.buffs.cancelNextDraw=true; break;
      case 'Cambio de Objetivo': r.buffs.redirectNext=true; break;
      case 'Provocación': r.buffs.provoking=true; break;
      case 'Desafío': r.buffs.challengeDraw=2; break;
      case 'Intercambio de Golpes': if(t) dealDamage(p,t,3,card,ctx,{}); p.health=Math.max(0,health(p)-3); draw(p,1,ctx); break;
      case 'Segundo Movimiento': r.buffs.extraAction=true; break;
      case 'Aprovechar la Apertura': if(t && (n(t.shield)>0 || runtime(t).statuses.length)) draw(p,2,ctx); break;
      case 'Presión Constante': r.buffs.discardPunish=true; break;
      case 'Voluntad Inquebrantable': if(!clearNegativeStatuses(p,ctx)) draw(p,2,ctx); break;
      case 'Adaptación': r.buffs.nextCardDiscount=n(r.buffs.nextCardDiscount)+2; break;
      case 'Imitación': { var last=r.cardHistory[r.cardHistory.length-1]; if(last&&last.cardEffect) genericTextEffects(last.cardEffect,card,ctx,{addBaseDamage:false}); } break;
      case 'Maestría': r.buffs.nextCardDiscount=n(r.buffs.nextCardDiscount)+2; break;
      case 'Instinto de Supervivencia': if(ctx.isLowestHealth!==false) draw(p,3,ctx); break;
      case 'Genio del Combate': draw(p,4,ctx); r.buffs.nextCardDiscount=n(r.buffs.nextCardDiscount)+3; break;
      case 'Intercambio': if(ctx.partner && p.hand.length && ctx.partner.hand&&ctx.partner.hand.length){ var a=p.hand.pop(),b=ctx.partner.hand.pop();p.hand.push(b);ctx.partner.hand.push(a); } break;
      default: genericTextEffects(card.efecto,card,ctx,{addBaseDamage:false});
    }
    log(ctx,playerName(p)+' usa '+card.nombre+'.');
  }

  function resolveCombo(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p),name=card.nombre,dmg=0,ignore=0;
    switch(name){
      case 'Cadena de Golpes': dmg=6; break;
      case 'Combo de Tres Golpes': dmg=9; break;
      case 'Golpe Final': dmg=7; break;
      case 'Puño -> Ki': dmg=4; break;
      case 'Ki -> Puño': dmg=5; break;
      case 'Tormenta de Golpes': dmg=8; break;
      case 'Asalto Imparable': dmg=12; break;
      case 'Contraataque Perfecto': dmg=7; break;
      case 'Defensa -> Ataque':
        r.buffs.nextAttackDiscount=n(r.buffs.nextAttackDiscount)+2;
        r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+2;
        log(ctx,'Defensa -> Ataque prepara un ataque con -2 de coste y +2 de daño.');
        return 0;
      case 'Esquiva -> Golpe': dmg=6; break;
      case 'Combo Ascendente': dmg=10; break;
      case 'Golpe Incesante':
        dmg=n(r.previousDamageAction)>0?9:6; break;
      case 'Doble Impacto': dmg=10; break;
      case 'Triple Impacto': dmg=12; break;
      case 'Combo Brutal': dmg=8; break;
      case 'Combo Desesperado': dmg=7; break;
      case 'Venganza': dmg=6; break;
      case 'Combo de Ki': dmg=7; break;
      case 'Flujo de Energía':
        p.energy=n(p.energy)+3; draw(p,2,ctx); log(ctx,'Flujo de Energía recupera 3 Ki y roba 2 cartas.'); return 0;
      case 'Cadena Perfecta': dmg=10; break;
      case 'Rompeguardia': dmg=8; ignore=3; break;
      case 'Ataque Encadenado':
        r.buffs.nextAttackDiscount=n(r.buffs.nextAttackDiscount)+2;
        r.buffs.drawOnNextAttackHit=1;
        log(ctx,'Ataque Encadenado reduce en 2 el coste del próximo ataque.');
        return 0;
      case 'Combo Devastador': dmg=8; break;
      case 'Persecución': dmg=5; break;
      case 'Combo Multitudinario': dmg=6; break;
      case 'Todos Contra Uno': dmg=8; break;
      case 'Vínculo de Combate':
        r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+4; draw(p,1,ctx); return 0;
      case 'Combo de Supervivencia':
        heal(p,5,ctx,card); draw(p,2,ctx); return 0;
      case 'Combo Infinito':
        r.buffs.extraAction=true; log(ctx,'Combo Infinito concede una acción adicional.'); return 0;
      case 'Cadena del Guerrero':
        dmg=12; draw(p,2,ctx); p.energy=n(p.energy)+3; break;
      default:
        genericTextEffects(card.efecto,card,ctx,{addBaseDamage:false});
        return 0;
    }
    if(t && dmg>0){
      var actual=dealDamage(p,t,dmg,card,ctx,{ignoreDefense:ignore});
      if(r.buffs.drawOnNextAttackHit && actual>0){draw(p,n(r.buffs.drawOnNextAttackHit),ctx);r.buffs.drawOnNextAttackHit=0;}
      return actual;
    }
    return 0;
  }

  function prepareReaction(card,ctx){
    var p=ctx.player,r=runtime(p);
    if(card.nombre==='Robo de Emergencia'){ if(p.hand.length<=2) draw(p,3,ctx); return; }
    if(card.nombre==='Último Esfuerzo'){ if(health(p)<=5) r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+4; return; }
    if(card.nombre==='Desafío Aceptado'){ p.energy=n(p.energy)+2; draw(p,1,ctx); return; }
    if(card.nombre==='Lectura Instantánea'){ draw(p,1,ctx); return; }
    if(card.nombre==='No Es Suficiente'){ r.buffs.nextDamageReduce=n(r.buffs.nextDamageReduce)+2; return; }
    if(card.nombre==='Ruptura de Barrera'){ r.buffs.nextAttackPierce=n(r.buffs.nextAttackPierce)+3; return; }
    r.reactions.push({name:card.nombre,used:false});
    log(ctx,card.nombre+' queda preparada como Reacción para el próximo ataque.');
  }

  function resolveClassic(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p); if(!t && card.nombre!=='Barrier') return;
    var dmg=n(card.damageBase)+n(p.baseDamage),ignore=0;
    switch(card.nombre){
      case 'Final Flash': ignore=3; if(arr(p.dice).indexOf(6)!==-1)dmg+=2; break;
      case 'Makankōsappō': ignore=4; break;
      case 'Genki-dama': if(!r.buffs.genkiCharged){ r.buffs.genkiCharged=true; r.buffs.genkiCard=card; log(ctx,'Genki-dama queda cargándose. La próxima vez podrá resolverse.'); return; } r.buffs.genkiCharged=false; break;
      case 'Masenko': if(health(p)<health(t)) dmg+=3; break;
      case 'Galick Gun': { var extra=Math.min(2,n(p.energy)); p.energy-=extra; dmg+=extra*2; } break;
      case 'Big Bang Attack': if(n(t.shield)>0){t.shield=0;dmg=4+n(p.baseDamage);} break;
      case 'Death Beam': ignore=2; break;
      case 'Destructo Disc': ignore=5; break;
      case 'Taiyōken': addStatus(t,'Aturdido',ctx); return;
      case 'Hellzone Grenade': r.delayed.push({turns:1,kind:'damageTarget',amount:8,targetId:t.id||t.name,cardName:card.nombre}); log(ctx,'Hellzone Grenade rodea al objetivo y explotará al inicio de tu próximo turno.'); return;
      case 'Special Beam Cannon': if(health(t)>10)ignore=5; break;
      case 'Galactic Donut': { var had=hasStatus(t,'Sellado'); addStatus(t,'Sellado',ctx); if(had)dmg+=5; } break;
      case 'Burning Attack': break;
      case 'Super Ghost Kamikaze Attack': r.delayed.push({turns:1,kind:'ghost',amount:3,count:3,targetId:t.id||t.name,cardName:card.nombre}); log(ctx,'Tres fantasmas quedan preparados.'); return;
      case 'Ki Blast': break;
      case 'Barrier': p.shield=n(p.shield)+8; r.buffs.barrierRetaliate=2; log(ctx,playerName(p)+' crea una Barrera de 8.'); return;
      case 'Wolf Fang Fist': dmg=6+n(p.baseDamage); break;
      case 'Dynamite Kick': if(n(t.shield)>0)t.shield=0; break;
      case 'Afterimage': if(r.wasDamagedSinceLastAction)r.buffs.auraProtectora=true; break;
      case 'Meteor Combination': dmg=8+n(p.baseDamage); break;
      case 'Drunken Fist': { var d=1+Math.floor(Math.random()*6); if(d>=5)dmg+=4; else if(d<=2)p.health=Math.max(0,health(p)-2); } break;
      case 'Headbutt': if(health(t)<=5)addStatus(t,'Aturdido',ctx); break;
      case 'Giant Swing': break;
      case 'Meteor Crash': if(r.attacksThisTurn>0)dmg+=3; break;
      case 'Dragon Fist': ignore=5; if(health(p)<=5)dmg+=3; break;
      case 'Arm Breaker': { var hadD=hasStatus(t,'Debilitado'); addStatus(t,'Debilitado',ctx); if(hadD)dmg+=3; } break;
      case 'Rolling Satan Punch': { var rd=1+Math.floor(Math.random()*6); if(rd>=5)draw(p,2,ctx); else if(rd===1)p.health=Math.max(0,health(p)-1); } break;
      case 'Sokidan: Persecución': break;
    }
    var actual=dealDamage(p,t,dmg,card,ctx,{ignoreDefense:ignore+n(r.buffs.nextAttackPierce)}); r.buffs.nextAttackPierce=0;
    if(card.nombre==='Death Ball' && !alive(t)) draw(p,2,ctx);
    if(card.nombre==='Burning Attack' && !alive(t)) getTargets(ctx).filter(function(x){return x!==t;}).forEach(function(x){dealDamage(p,x,2,card,ctx,{});});
    if(card.nombre==='Wolf Fang Fist' && actual>0)addStatus(t,'Debilitado',ctx);
    if(r.buffs.drawOnNextAttackHit && actual>0){ draw(p,n(r.buffs.drawOnNextAttackHit),ctx); r.buffs.drawOnNextAttackHit=0; }
    return actual;
  }

  function resolveRacialOrPower(card,ctx){
    var p=ctx.player,t=getTarget(ctx),r=runtime(p),name=card.nombre;
    switch(name){
      case 'Espíritu Saiyan': if(health(p)<maxHealth(p)/2)r.buffs.turnAttackBonus=n(r.buffs.turnAttackBonus)+3; break;
      case 'Orgullo del Guerrero': if(n(r.damageReceivedThisTurn)>0){p.energy=n(p.energy)+2;draw(p,1,ctx);} break;
      case 'Instinto de Combate': r.buffs.actionOnKill=true; break;
      case 'Última Oportunidad Saiyan': heal(p,7,ctx,card); r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+5; break;
      case 'Voluntad Indomable': r.buffs.deathPreventRacial=true; break;
      case 'Crueldad': if(t){var cd=4+(health(t)<health(p)?3:0)+n(p.baseDamage);dealDamage(p,t,cd,card,ctx,{});} break;
      case 'Tiranía': if(t)runtime(t).buffs.nextCardPenalty=n(runtime(t).buffs.nextCardPenalty)+3; else r.buffs.enemyPenalty=3; break;
      case 'Muerte desde las Sombras': if(t&&health(t)<=10)dealDamage(p,t,5+n(p.baseDamage),card,ctx,{}); break;
      case 'Dominación': if(t)runtime(t).buffs.healPenalty=3; break;
      case 'Emperador Galáctico': {var hit=0;getTargets(ctx).forEach(function(x){if(alive(x)){dealDamage(p,x,2,card,ctx,{});hit++;}});heal(p,hit,ctx,card);} break;
      case 'Regeneración Namekiana': heal(p,6,ctx,card); clearNegativeStatuses(p,ctx); break;
      case 'Sabiduría Namekiana': searchDeck(p,function(c){return isTechnique(c)||isRecovery(c);},ctx); break;
      case 'Fusión Espiritual': heal(p,3,ctx,card); p.energy=n(p.energy)+2; break;
      case 'Guardián de Namek': r.buffs.nextDamageReduce=n(r.buffs.nextDamageReduce)+3; break;
      case 'Poder Ancestral': heal(p,8,ctx,card); draw(p,2,ctx); clearNegativeStatuses(p,ctx); break;
      case 'Teletransportación': r.buffs.auraProtectora=true; break;
      case 'Sentido del Ki': log(ctx,'Sentido del Ki: energía rival '+(t?n(t.energy):0)+'.'); break;
      case 'Velocidad Sobrehumana': r.buffs.extraAction=true; break;
      case 'Fuerza Descomunal': r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+3; r.buffs.nextAttackPierce=n(r.buffs.nextAttackPierce)+5; break;
      case 'Regeneración Extrema': r.delayed.push({turns:1,kind:'heal',amount:6,count:2}); break;
      case 'Absorción de Energía': r.buffs.absorbTechnique=2; break;
      case 'Duplicación': { var last=r.cardHistory[r.cardHistory.length-1]; if(last&&last.cardEffect)genericTextEffects(last.cardEffect,card,ctx,{addBaseDamage:false}); } break;
      case 'Barrido Energético': if(t)t.energy=Math.max(0,n(t.energy)-2); break;
      case 'Presencia Intimidante': r.buffs.incomingAttackCostPenalty=2; break;
      case 'Control de Gravedad': if(t)runtime(t).buffs.dicePenalty=n(runtime(t).buffs.dicePenalty)+1; else r.buffs.enemyDicePenalty=1; break;
      case 'Aumento Repentino': r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+5; p.health=Math.max(0,health(p)-3); break;
      case 'Aura Protectora': r.buffs.auraProtectora=true; break;
      case 'Instinto Preciso': if(p.dice&&p.dice.length){p.dice[0]=1+Math.floor(Math.random()*6);modifyDiceEnergy(p);} break;
      case 'Dominio del Combate': r.buffs.firstTypeDiscount=1; break;
      case 'Liberación Total': r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+arr(p.dice).length; p.energy=0; break;
      case 'Último Poder': r.buffs.nextCardFree=true; r.buffs.doubleNextNumeric=true; break;
      case 'Poder Incontenible': r.buffs.turnAttackBonus=n(r.buffs.turnAttackBonus)+5; r.buffs.turnDefenseBonus=n(r.buffs.turnDefenseBonus)+3; r.buffs.loseHpEndTurn=n(r.buffs.loseHpEndTurn)+5; break;
      default: genericTextEffects(card.efecto,card,ctx,{addBaseDamage:false});
    }
    log(ctx,playerName(p)+' activa '+card.nombre+'.');
  }

  function resolveEvent(card,ctx){
    var p=ctx.player,t=getTarget(ctx);
    switch(card.nombre){
      case '¡Explosión Repentina!': getTargets(ctx).forEach(function(x){dealDamage(p,x,3,card,ctx,{});}); p.health=Math.max(0,health(p)-3); break;
      case 'Llegada Inesperada': draw(p,3,ctx); discardRandom(p,1,ctx); break;
      case 'Milagro': heal(p,7,ctx,card); clearNegativeStatuses(p,ctx); break;
      case 'Cambio de Suerte': p.dice=arr(p.dice).map(function(){return 1+Math.floor(Math.random()*6);}); modifyDiceEnergy(p); break;
      case 'Interferencia': if(t&&t.hand)discardRandom(t,1,ctx); draw(p,2,ctx); break;
      default: genericTextEffects(card.efecto,card,ctx,{});
    }
  }

  function applySagaStage(ctx, sagaState){
    if(!sagaState||!sagaState.card)return; var p=ctx.player,stage=n(sagaState.stage,1),name=sagaState.card.nombre,r=runtime(p);
    // Limpiar modificadores de etapa anterior.
    sagaState.attackBonus=0;sagaState.physicalBonus=0;sagaState.kiBonus=0;sagaState.allCostDelta=0;sagaState.attackCostDelta=0;sagaState.defenseCostDelta=0;sagaState.techniqueCostDelta=0;sagaState.abilityCostDelta=0;
    switch(name){
      case 'Llegada de los Saiyan': if(stage===1)sagaState.physicalBonus=1; else if(stage===2)draw(p,1,ctx); else if(stage===3)sagaState.physicalBonus=2; break;
      case 'Invasión de Namek': if(stage===1&&p.race==='Namek')r.buffs.healBonus=2; else if(stage===2)draw(p,1,ctx); else if(stage===3)sagaState.kiAttackCostDelta=1; break;
      case 'Conquista de Freezer': if(stage===1)p.health=Math.max(0,health(p)-1); else if(stage===2)sagaState.kiBonus=2; else if(stage===3)discardRandom(p,1,ctx); else if(stage===4&&ctx.target)ctx.target.health=Math.max(0,health(ctx.target)-3); break;
      case 'Entrenamiento Extremo': if(stage===1)sagaState.attackCostDelta=-1; else if(stage===2)sagaState.defenseCostDelta=-1; else if(stage===3)sagaState.techniqueCostDelta=-1; break;
      case 'Torneo Mundial': if(stage===2)sagaState.physicalBonus=1; else if(stage===3)heal(p,2,ctx); break;
      case 'Batalla por Namek': if(stage===1&&p.race==='Namek')heal(p,2,ctx); else if(stage===2)sagaState.kiBonus=1; else if(stage===3)draw(p,1,ctx); else if(stage===4)p.health=Math.max(0,health(p)-2); break;
      case 'La Amenaza Artificial': if(stage===1)sagaState.allCostDelta=1; else if(stage===2)sagaState.abilityCostDelta=-1; else if(stage===3)discardRandom(p,1,ctx); else if(stage===4)p.health=Math.max(0,health(p)-3); break;
      case 'Guerra de Guerreros': if(stage===1||stage===2)sagaState.attackBonus=2; else if(stage===3)sagaState.attackBonus=3; break;
      case 'Ascenso del Guerrero': if(stage===1)heal(p,3,ctx); else if(stage===2)p.energy=n(p.energy)+2; else if(stage===3)draw(p,2,ctx); break;
      case 'Planeta en Peligro': p.health=Math.max(0,health(p)-stage); break;
      case 'Ejército de Freezer': if(stage===1)sagaState.kiBonus=1; else if(stage===2)sagaState.attackCostDelta=-1; else if(stage===3)p.health=Math.max(0,health(p)-2); break;
      case 'Entrenamiento en la Gravedad': if(stage===1)sagaState.allCostDelta=1; else if(stage===2)r.buffs.firstDieBonus=n(r.buffs.firstDieBonus)+1; else if(stage===3)sagaState.attackBonus=2; else if(stage===4){draw(p,2,ctx);discardRandom(p,1,ctx);} break;
      case 'Resurrección': if(stage===1)r.buffs.deathPreventOnce=true; else if(stage===2)heal(p,3,ctx); else if(stage===3&&health(p)<=5)heal(p,5,ctx); break;
      case 'Batalla Final': sagaState.attackBonus=stage; break;
      case 'El Guerrero Legendario': if(stage===1)draw(p,2,ctx); else if(stage===2)heal(p,5,ctx); else if(stage===3)r.buffs.nextAttackDiscount=99; else if(stage===4)r.buffs.nextAttackBonus=n(r.buffs.nextAttackBonus)+10; break;
    }
    log(ctx,'Saga '+name+' — etapa '+stage+'.');
  }

  function resolvePermanent(card,ctx){
    var p=ctx.player,r=runtime(p),h=hostRuntime(ctx.host);
    if(card.tipoCatalogo==='Equipamiento'){
      r.equipment.push(card); log(ctx,playerName(p)+' equipa '+card.nombre+'.');
      if(card.nombre==='Cápsula de Combate' && !r.once.capsula){ r.once.capsula=true; heal(p,5,ctx,card); }
      if(card.nombre==='Semilla Senzu' && !r.once.senzuEquipo){ r.once.senzuEquipo=true; heal(p,8,ctx,card); }
      return;
    }
    if(card.tipoCatalogo==='Aliado'){
      r.allies.push(card); log(ctx,card.nombre+' se une como Aliado.');
      if(card.nombre==='Shenron - Deseo' && !r.once.shenron){r.once.shenron=true;heal(p,8,ctx,card);draw(p,3,ctx);} return;
    }
    if(card.tipoCatalogo==='Misión'){
      r.missions.push({card:card,startedTurn:r.turn||0}); log(ctx,'Misión activa: '+card.nombre+'.'); checkMissions(ctx); return;
    }
    if(card.tipoCatalogo==='Saga'){
      h.saga={card:card,stage:1}; applySagaStage(ctx,h.saga); return;
    }
    if(card.tipoCatalogo==='Escenario'){
      h.scenario={card:card}; log(ctx,'El escenario cambia a '+card.nombre+'.'); return;
    }
  }

  function missionComplete(m,p,ctx){
    var r=runtime(p),name=m.card.nombre,t=getTarget(ctx);
    switch(name){
      case 'Entrenamiento Intenso': return n(r.attacksTotal)>=3;
      case 'Supervivencia': return n(r.turnsSurvived)>=3;
      case 'Sin Rendirse': return health(p)<=3 && n(r.damageReceivedThisTurn)>0;
      case 'Cadena de Combate': return n(r.consecutiveAttacks)>=3;
      case 'Maestro del Ki': return n(r.diceRolledTotal)>=5;
      case 'Golpe Perfecto': return n(r.maxSingleHit)>=8;
      case 'Defensa Impecable': return n(r.fullBlocks)>=2;
      case 'Contraataque': return n(r.counterattacks)>=2;
      case 'Adaptación': return uniq(r.cardHistory.map(function(x){return x.type;})).length>=4;
      case 'Sin Descanso': return n(r.turnsWithAction)>=4;
      case 'Guerrero Herido': return n(r.lowHpDamageTotal)>=10;
      case 'Dominio del Combate': return uniq(r.cardHistory.filter(function(x){return x.attack;}).map(function(x){return (x.nature||'')+'|'+(x.range||'');})).length>=3;
      case 'Acumulación de Poder': return !!r.once.endedWithEnergy;
      case 'Golpe Decisivo': return !!t && health(t)<=5;
      case 'Cazador': return n(r.kills)>=1;
      case 'Rivalidad': return n(r.attackedTurns)>=3;
      case 'Venganza': return n(r.damageReceivedThisTurn)>0 && n(r.damageDealtThisTurn)>n(r.damageReceivedThisTurn);
      case 'Poder Desesperado': return !!r.once.playedAt3Hp;
      case 'Sin Miedo': return n(r.damageReceivedTotal)>=15 && health(p)>0;
      case 'Combo de Ki': return n(r.techniquesTotal)>=3;
      case 'Coleccionista': return arr(p.hand).length>=7;
      case 'Maestro de la Defensa': return n(r.damageBlockedTotal)>=15;
      case 'Golpe Tras Golpe': return n(r.actionDamageStreak)>=5;
      case 'Batalla Campal': return r.distinctTargetsThisTurn.length>=3;
      case 'El Último Guerrero': return n(r.kills)>=2;
      case 'Enemigo Jurado': return n(r.damageDealtTotal)>=20;
      case 'Derrota al Jefe': return !!r.once.bossKilled;
      case 'Superar el Desafío': return n(r.kills)>=1;
      case 'Sin Utilizar Curación': return n(r.turnsWithoutHealing)>=2;
      case 'Leyenda del Guerrero': return n(r.missionsCompleted)>=5;
      default:return false;
    }
  }

  function rewardText(card){ var e=card.efecto||''; var idx=e.toLowerCase().indexOf('recompensa:'); return idx>=0?e.slice(idx+11).trim():''; }
  function checkMissions(ctx){
    var p=ctx.player,r=runtime(p),remaining=[];
    r.missions.forEach(function(m){
      if(missionComplete(m,p,ctx)){
        r.missionsCompleted=n(r.missionsCompleted)+1; log(ctx,'✅ Misión completada: '+m.card.nombre+'.');
        var reward=rewardText(m.card);
        genericTextEffects(reward,m.card,ctx,{addBaseDamage:false});
        if(hasPermanent(p,'Medalla del Guerrero'))heal(p,3,ctx,m.card);
        if(hasPermanent(p,'Maestro Roshi - Experiencia') && !r.once.roshiMission){r.once.roshiMission=true;draw(p,3,ctx);}
      } else remaining.push(m);
    });
    r.missions=remaining;
  }

  function recordPlay(card,p,paidCost,damage){
    var r=runtime(p), type=card.tipoCatalogo||card.clase||'Otro';
    r.cardsPlayedThisTurn.push(type); r.energySpentThisTurn=n(r.energySpentThisTurn)+n(paidCost); r.energySpentTotal=n(r.energySpentTotal)+n(paidCost);
    var attack=isAttack(card) || (card.tipoCatalogo==='Combo' && /Inflige/i.test(card.efecto||''));
    if(attack){r.attacksThisTurn=n(r.attacksThisTurn)+1;r.attacksTotal=n(r.attacksTotal)+1;r.consecutiveAttacks=n(r.consecutiveAttacks)+1;}
    else if(type!=='Combo')r.consecutiveAttacks=0;
    if(isTechnique(card)){r.techniquesThisTurn=n(r.techniquesThisTurn)+1;r.techniquesTotal=n(r.techniquesTotal)+1;}
    if(isDefense(card))r.defensesThisTurn=n(r.defensesThisTurn)+1;
    var hist={type:type,nature:card.naturaleza||null,range:card.alcance||null,attack:attack,technique:isTechnique(card),damage:n(damage),cardName:card.nombre,cardEffect:card.efecto||'',cost:n(paidCost)};
    r.cardHistory.push(hist); if(r.cardHistory.length>20)r.cardHistory=r.cardHistory.slice(-20);
    r.lastCardCost=n(paidCost); r.firstCardDone=true; if(isDefense(card))r.firstDefenseDone=true; if(isTechnique(card))r.firstTechniqueDone=true;
    r.usedTypeDiscounts=arr(r.usedTypeDiscounts);
    if(n(r.buffs.firstTypeDiscount)>0){
      var tk=card.tipoCatalogo||card.clase||'Otro';
      if(r.usedTypeDiscounts.indexOf(tk)===-1) r.usedTypeDiscounts.push(tk);
    }
    if(r.buffs.refundHighDice && arr(p.dice).some(function(v){return n(v)>=5;})) p.energy=n(p.energy)+1;
    if(health(p)<=3)r.once.playedAt3Hp=true;
    if(r.buffs.discardAfterNext){discardRandom(p,1,{log:function(){}});r.buffs.discardAfterNext=false;}
    consumeCostModifiers(card,p);
  }

  function resolve(card,ctx){
    ctx=ctx||{}; var p=ctx.player,t=getTarget(ctx); if(!p||!card)return {ok:false}; runtime(p); hostRuntime(ctx.host);
    var damageBefore=n(runtime(p).damageDealtThisTurn),damage=0;
    var type=card.tipoCatalogo||card.clase;
    if(type==='Equipamiento'||type==='Aliado'||type==='Misión'||type==='Saga'||type==='Escenario') resolvePermanent(card,ctx);
    else if(type==='Estado'){ if(t)addStatus(t,card.nombre,ctx); }
    else if(type==='Reacción') prepareReaction(card,ctx);
    else if(type==='Ataque') damage=resolveAttack(card,ctx)||0;
    else if(type==='Defensa') resolveDefense(card,ctx);
    else if(type==='Recuperación') resolveRecovery(card,ctx);
    else if(type==='Técnica de Ki') resolveKiTechnique(card,ctx);
    else if(type==='Habilidad') resolveAbility(card,ctx);
    else if(type==='Combo') damage=resolveCombo(card,ctx)||0;
    else if(type==='Evento') resolveEvent(card,ctx);
    else if(type==='Racial Saiyan'||type==='Racial Freezer'||type==='Racial Namek'||type==='Poder') resolveRacialOrPower(card,ctx);
    else if(type==='Técnica clásica') damage=resolveClassic(card,ctx)||0;
    else genericTextEffects(card.efecto,card,ctx,{addBaseDamage:false});
    damage=Math.max(damage,n(runtime(p).damageDealtThisTurn)-damageBefore);
    recordPlay(card,p,n(ctx.paidCost,card.costo),damage);
    checkMissions(ctx);
    if(window.Engagement && typeof window.Engagement.afterCardPlayed==='function') window.Engagement.afterCardPlayed(card,p,ctx,damage);
    return {ok:true,damage:damage};
  }

  function getDiceCountForRound(round,p){
    var r=runtime(p), count=clamp(Math.floor(n(round,1)),1,6);
    if(hasStatus(p,'Agotado')){count=Math.max(1,count-1);removeStatus(p,'Agotado');}
    if(n(r.buffs.dicePenalty)>0){count=Math.max(1,count-n(r.buffs.dicePenalty));r.buffs.dicePenalty=0;}
    return count;
  }

  function onAfterRoll(p,ctx){
    var r=runtime(p); r.diceRolledTotal=n(r.diceRolledTotal)+arr(p.dice).length;
    if(n(r.buffs.firstDieBonus)>0 && p.dice&&p.dice.length){p.dice[0]=Math.min(6,n(p.dice[0])+n(r.buffs.firstDieBonus));r.buffs.firstDieBonus=0;modifyDiceEnergy(p);}
    if(hasPermanent(p,'Anillo de Potencia') && p.dice&&p.dice.indexOf(4)!==-1){var i=p.dice.indexOf(4);p.dice[i]=5;modifyDiceEnergy(p);}
    if(n(r.buffs.savedEnergy)>0){p.energy=n(p.energy)+n(r.buffs.savedEnergy);log(ctx,playerName(p)+' recupera '+n(r.buffs.savedEnergy)+' de energía guardada.');r.buffs.savedEnergy=0;}
    if(window.Engagement && typeof window.Engagement.afterRoll==='function') window.Engagement.afterRoll(p,ctx);
  }

  function processDelayed(p,ctx){
    var r=runtime(p), next=[];
    r.delayed.forEach(function(d){
      d.turns=n(d.turns)-1;
      if(d.turns<=0){
        if(d.kind==='heal'){heal(p,n(d.amount),ctx);d.count=n(d.count,1)-1;if(d.count>0){d.turns=1;next.push(d);}}
        else if(d.kind==='damageTarget'||d.kind==='ghost'){
          var t=getTarget(ctx); if(t)dealDamage(p,t,n(d.amount),{nombre:d.cardName||'Efecto retardado',naturaleza:'Ki',alcance:'Distancia'},ctx,{});
          d.count=n(d.count,1)-1;if(d.count>0){d.turns=1;next.push(d);}
        }
      }else next.push(d);
    });
    r.delayed=next;
  }

  function onTurnStart(p,ctx){
    var r=runtime(p); r.turn=n(r.turn)+1; r.turnStartHealth=health(p);
    r.cardsPlayedThisTurn=[];r.attacksThisTurn=0;r.techniquesThisTurn=0;r.defensesThisTurn=0;r.damageDealtThisTurn=0;r.damageReceivedThisTurn=0;r.energySpentThisTurn=0;r.distinctTargetsThisTurn=[];r.usedTypeDiscounts=[];r.firstIncomingHandled=false;r.firstPhysicalDone=false;r.firstKiDone=false;r.firstHealDone=false;r.firstCardDone=false;r.firstDefenseDone=false;r.firstTechniqueDone=false;r.evadedThisTurn=false;r.once.capaGuerreroTurn=false;r.once.armaduraReforzadaTurn=false;r.once.krilinTurn=false;r.once.videlTurn=false;
    r.buffs.turnAttackBonus=0;r.buffs.turnPhysicalBonus=0;r.buffs.turnKiBonus=0;r.buffs.turnIncomingReduce=0;
    if(window.Engagement && typeof window.Engagement.onTurnStart==='function') window.Engagement.onTurnStart(p,ctx);
    if(hasStatus(p,'Quemado')){p.health=Math.max(0,health(p)-2);log(ctx,playerName(p)+' sufre 2 de daño por Quemado.');}
    if(hasPermanent(p,'Dende - Sanador'))heal(p,2,ctx);
    if(hasPermanent(p,'Collar de Recuperación')&&health(p)<=5)heal(p,3,ctx);
    processDelayed(p,ctx);
    var h=hostRuntime(ctx.host);
    if(h.saga && h.saga.card){
      if(h.saga.ownerId && ctx.playerId && h.saga.ownerId!==ctx.playerId){/* solo avanza con su dueño */}
      else if(h.saga.stage>0 && r.turn>1){h.saga.stage=n(h.saga.stage)+1;if(h.saga.stage<=4)applySagaStage(ctx,h.saga);else{log(ctx,'La Saga '+h.saga.card.nombre+' termina.');h.saga=null;}}
    }
    onAfterRoll(p,ctx); checkMissions(ctx);
  }

  function onTurnEnd(p,ctx){
    var r=runtime(p); r.turnsSurvived=n(r.turnsSurvived)+1;
    if(r.cardsPlayedThisTurn.length>0)r.turnsWithAction=n(r.turnsWithAction)+1;
    if(n(r.healedThisTurn)>0)r.turnsWithoutHealing=0; else r.turnsWithoutHealing=n(r.turnsWithoutHealing)+1;
    r.once.endedWithEnergy=n(p.energy)>=2;
    if(n(r.buffs.loseHpEndTurn)>0){p.health=Math.max(0,health(p)-n(r.buffs.loseHpEndTurn));log(ctx,playerName(p)+' pierde '+n(r.buffs.loseHpEndTurn)+' de vida al terminar el turno.');r.buffs.loseHpEndTurn=0;}
    if(r.attacksThisTurn>0)r.attackedTurns=n(r.attackedTurns)+1;
    r.healedThisTurn=0; r.wasDamagedSinceLastAction=false;
    if(hasStatus(p,'Debilitado'))removeStatus(p,'Debilitado');
    hostRuntime(ctx && ctx.host).flags.globalCostDelta=0;
    checkMissions(ctx);
    if(window.Engagement && typeof window.Engagement.onTurnEnd==='function') window.Engagement.onTurnEnd(p,ctx);
  }

  function beforeIncomingDamage(p,attacker,amount,ctx){
    var r=runtime(p); amount=Math.max(0,n(amount));
    if(window.Engagement && typeof window.Engagement.modifyIncomingDamage==='function') amount=window.Engagement.modifyIncomingDamage(p,attacker,amount,ctx);
    if(n(r.buffs.turnIncomingReduce)>0) amount=Math.max(0,amount-n(r.buffs.turnIncomingReduce));
    return incomingReduction(p,amount,attacker,ctx);
  }

  function afterIncoming(p,attacker,actual,ctx){ afterIncomingDamage(p,attacker,actual,ctx); checkMissions(ctx); }

  function improveCard(card){
    if(!card || !card.importada) return false;
    ['damageBase','defensaBase','curaBase'].forEach(function(k){if(n(card[k])>0)card[k]=Math.max(1,Math.round(n(card[k])*1.25));});
    card.mejorada=n(card.mejorada)+1;
    return true;
  }

  function recordExternalPlay(card,p,paidCost,damage,ctx){
    if(!card||!p)return;
    recordPlay(card,p,n(paidCost,card.costo),n(damage));
    if(ctx)checkMissions(ctx);
  }

  window.CardEngine={
    runtime:runtime, hostRuntime:hostRuntime, isAttack:isAttack, isDefense:isDefense, isTechnique:isTechnique, isRecovery:isRecovery,
    getEffectiveCost:getEffectiveCost, canPlay:canPlay, resolve:resolve,
    getDiceCountForRound:getDiceCountForRound, onAfterRoll:onAfterRoll, onTurnStart:onTurnStart, onTurnEnd:onTurnEnd,
    beforeIncomingDamage:beforeIncomingDamage, afterIncomingDamage:afterIncoming, recordExternalPlay:recordExternalPlay,
    checkMissions:checkMissions, improveCard:improveCard, draw:draw, heal:heal, addStatus:addStatus, clearNegativeStatuses:clearNegativeStatuses
  };
})();
