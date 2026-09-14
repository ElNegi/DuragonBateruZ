const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const sandbox = { window:{}, console:{log(){},info(){},warn(){},error(){}} };
vm.createContext(sandbox);
for (const file of ['public/data.js','public/catalog-cards.js','public/balance-system.js','public/card-engine.js']) {
  vm.runInContext(fs.readFileSync(file,'utf8'), sandbox, {filename:file});
}
const W=sandbox.window, B=W.CardBalance, E=W.CardEngine;
assert(B && E, 'Balance/engine no cargados');
assert.equal(W.FULL_CARD_CATALOG.length,370,'Debe haber 370 cartas importadas');
const total = Object.values(W.CARD_POOL).reduce((n,a)=>n+a.length,0);
assert.equal(total,402,'Debe haber 402 cartas totales');

const rarity={}; const minRound={};
for(const c of W.FULL_CARD_CATALOG){ rarity[c.rareza]=(rarity[c.rareza]||0)+1; minRound[c.rondaMinima]=(minRound[c.rondaMinima]||0)+1; }
assert((rarity.Legendaria||0)>0,'Debe haber legendarias');
assert(W.FULL_CARD_CATALOG.filter(c=>c.rareza==='Legendaria').every(c=>c.rondaMinima>=3),'Legendarias no deben salir en R1/R2');
assert(W.FULL_CARD_CATALOG.filter(c=>c.costo>=6).every(c=>c.rondaMinima>=2),'Coste 6+ debe esperar al menos R2');

function player(){
  return {name:'Tester',race:'Saiyan',health:80,_maxHealth:100,maxHealth:100,shield:0,energy:30,dice:[6,6,6,6,6,6],baseDamage:2,deck:W.FULL_CARD_CATALOG.slice(0,20),hand:[],discard:[]};
}
function enemy(){ return {name:'Dummy',health:250,_maxHealth:250,maxHealth:250,shield:10,id:'dummy'}; }
function ctx(round,p,t){ return {player:p,target:t,targets:[t],host:{round,cardRuntime:null},paidCost:0,log(){},damageOthers(){},onKill(){}}; }

const finalFlash=W.FULL_CARD_CATALOG.find(c=>c.nombre==='Final Flash');
assert(finalFlash,'Final Flash existe');
assert.equal(E.canPlay(finalFlash,player(),enemy(),ctx(1,player(),enemy())).ok,false,'Final Flash bloqueado en R1');
const df=W.FULL_CARD_CATALOG.find(c=>c.nombre==='Dragon Fist');
let p=player(),t=enemy(); assert.equal(E.canPlay(df,p,t,ctx(2,p,t)).ok,false,'Dragon Fist bloqueado en R2');
p=player();t=enemy(); assert.equal(E.canPlay(df,p,t,ctx(3,p,t)).ok,true,'Dragon Fist habilitado en R3');

// Resolver las 370 cartas directamente en un estado aislado debe ser seguro.
let errors=[];
for(const card of W.FULL_CARD_CATALOG){
  try{
    const p=player(), t=enemy(), c=ctx(6,p,t); c.paidCost=card.costo;
    E.resolve(B.cloneCard(card),c);
  }catch(err){ errors.push(card.nombre+': '+err.message); }
}
assert.deepEqual(errors,[], 'Hay cartas que fallan al resolver: '+errors.join('; '));

// Las ofertas tempranas no deben contener épicas/legendarias y las tardías sí
// deben tener acceso al pool completo (aunque no se garantice por azar).
for(let i=0;i<100;i++){
  const early=B.pickCards({race:'Saiyan',count:3,progress:0,source:'shop',owned:[]});
  assert(early.every(c=>c.rarityRank<=2),'Tienda inicial mostró rareza demasiado alta');
}
const lateEligible=['Epica','Legendaria'].some(r=>W.FULL_CARD_CATALOG.some(c=>c.rareza===r && c.progresoMinimo<=0.9));
assert(lateEligible,'Las rarezas altas deben estar desbloqueadas al final');

// Clonar y mejorar/copiar no debe mutar la carta maestra.
const master=W.FULL_CARD_CATALOG[0]; const copy=B.cloneCard(master); copy.costo=99; assert.notEqual(master.costo,99,'cloneCard debe aislar el pool maestro');

console.log(JSON.stringify({total, imported:370, rarity, minRound, resolved:370, errors:errors.length},null,2));
