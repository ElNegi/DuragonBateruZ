const fs=require('fs'), vm=require('vm'), assert=require('assert');
const sandbox={window:{},console:{log(){},info(){},warn(){},error(){}},document:{addEventListener(){},getElementById(){return null;},querySelectorAll(){return[];}},setTimeout(fn){return 0;},clearTimeout(){},Math};
sandbox.window.window=sandbox.window; sandbox.window.document=sandbox.document;
vm.createContext(sandbox);
for(const f of ['public/data.js','public/catalog-cards.js','public/balance-system.js','public/engagement-system.js','public/card-engine.js','public/map.js']){
  vm.runInContext(fs.readFileSync(f,'utf8'),sandbox,{filename:f});
}
const W=sandbox.window,E=W.CardEngine,G=W.Engagement;
assert(E&&G,'Motores no cargados');
assert.equal(Object.values(W.CARD_POOL).reduce((n,a)=>n+a.length,0),402,'Catálogo total');

function p(race='Saiyan'){return {name:'Tester',race,health:80,_maxHealth:100,maxHealth:100,shield:0,energy:0,dice:[],baseDamage:2,deck:[],hand:[],discard:[]};}
function e(){return {name:'Dummy',health:100,_maxHealth:100,maxHealth:100,shield:0,pattern:[{tipo:'ataque',valor:4}],patternIndex:0};}
function ctx(player,target,host={round:1,sagaAct:1},logs=[]){return {player,target,targets:target?[target]:[],host,round:host.round||1,paidCost:0,log(m){logs.push(m);}};}

// Regla inviolable de dados por ronda.
const pd=p();
for(let r=1;r<=8;r++) assert.equal(E.getDiceCountForRound(r,pd),Math.min(6,r),'dados ronda '+r);

// Resonancias conservan suma base y añaden bonus tácticos.
let pr=p(), logs=[]; pr.dice=[2,2,5]; pr.energy=9; E.onTurnStart(pr,ctx(pr,e(),{round:1,sagaAct:1},logs)); assert.equal(pr.energy,10,'pareja +1 energía');
pr=p(); pr.dice=[1,2,3]; pr.energy=6; E.onTurnStart(pr,ctx(pr,e(),{round:3,sagaAct:1},[])); assert(E.runtime(pr).buffs.nextCardDiscount>=1,'escalera da descuento');
pr=p(); pr.dice=[4,4,4]; pr.energy=12; E.onTurnStart(pr,ctx(pr,e(),{round:3,sagaAct:1},[])); assert(pr.shield>=2,'trío da escudo');

// Sagas alteran estilo sin tocar el número de dados.
let ps=p(), target=e();
assert.equal(G.modifyOutgoingDamage(ps,target,{naturaleza:'Físico',tipoCatalogo:'Ataque'},5,ctx(ps,target,{round:2,sagaAct:1})),6,'Acto 1 físico +1');
assert.equal(G.modifyOutgoingDamage(ps,target,{naturaleza:'Ki',tipoCatalogo:'Ataque'},5,ctx(ps,target,{round:2,sagaAct:2})),6,'Acto 2 Ki +1');
assert.equal(G.modifyHeal(ps,5,ctx(ps,target,{round:2,sagaAct:2}),{tipoCatalogo:'Recuperación'}),6,'Acto 2 cura +1');

// Despertar.
let pa=p(); G.resetCombat(pa); G.addAwakening(pa,100,ctx(pa,target,{round:3,sagaAct:1},[])); let aw=G.activateAwakening(pa,ctx(pa,target,{round:3,sagaAct:1},[])); assert(aw.ok&&G.state(pa).awakened,'Despertar activo');

// Flujo: alternar tipos alcanza bonificación.
let pf=p(); G.resetCombat(pf); let ch=ctx(pf,target,{round:3,sagaAct:1},[]);
G.afterCardPlayed({tipoCatalogo:'Ataque',naturaleza:'Físico',efecto:'Inflige 2'},pf,ch,2);
G.afterCardPlayed({tipoCatalogo:'Defensa',efecto:'Reduce 3'},pf,ch,0);
G.afterCardPlayed({tipoCatalogo:'Técnica de Ki',naturaleza:'Ki',efecto:'Técnica'},pf,ch,0);
assert(G.state(pf).flow>=3,'Flujo alcanza 3'); assert(E.runtime(pf).buffs.nextAttackBonus>=1,'Flujo da bonus');

// Resistencia de estados: bloquea la primera, no inmuniza permanentemente.
let boss=e(); boss.statusResistances=['Aturdido']; let pc=p(), c=ctx(pc,boss,{round:3,sagaAct:3},[]);
assert.equal(E.addStatus(boss,'Aturdido',c),false,'primera aplicación resistida');
assert.equal(E.addStatus(boss,'Aturdido',c),true,'segunda aplicación entra');

// Cartas antiguas también usan el motor moderno: Aturdido modifica coste y se consume.
let po=p(); let old=W.CARD_POOL.Saiyan.find(x=>x.nombre==='Puñetazo Saiyan'); E.addStatus(po,'Aturdido',ctx(po,target,{round:2,sagaAct:1},[]));
let oldCtx=ctx(po,target,{round:2,sagaAct:1},[]); assert.equal(E.getEffectiveCost(old,po,oldCtx),old.costo+2,'Aturdido sube coste de carta antigua'); E.recordExternalPlay(old,po,old.costo+2,5,oldCtx); assert(!E.runtime(po).statuses.some(s=>s.name==='Aturdido'),'Aturdido se consume');

// Mapa con 3 bifurcaciones y jefes con fases.
let map=W.generarMapa(35); assert.equal(map.length,35); assert.equal(map.filter(n=>n.branchGroup).length,6,'dos opciones por acto');
const firstBranch=map.findIndex(n=>n.branchGroup); const group=map[firstBranch].branchGroup; W.seleccionarRamaMapa(map,firstBranch); assert(map.some((n,i)=>i!==firstBranch&&n.branchGroup===group&&n.estado==='omitido'),'rama alternativa omitida');
let bossNode=map.find(n=>n.tipo==='Jefe'&&n.acto===3); bossNode.index=34; let bd=W.pickEnemyForNode(bossNode,35); assert(bd.boss&&bd.phases.length>=1,'jefe final con fases'); assert(Array.isArray(bd.statusResistances),'resistencias copiadas');

// Recursos de UI/coop presentes en fuentes.
const html=fs.readFileSync('index.html','utf8'), mp=fs.readFileSync('multiplayer.js','utf8');
for(const id of ['combatObjective','flowIndicator','awakeningBtn','diceInsight','combatSaga','mpCombatObjective','mpTeamSync','mpShareKiBtn','mpCombatSaga']) assert(html.includes('id="'+id+'"'),id+' en HTML');
assert(mp.includes('actualizarSincroniaEquipo')&&mp.includes('compartirKiMP'),'mecánicas cooperativas incluidas');

console.log(JSON.stringify({ok:true,cards:402,diceRule:'1-2-3-4-5-6',branches:3,sagas:3,awakening:true,flow:true,resonance:true,statusResistance:true,coopSync:true},null,2));
