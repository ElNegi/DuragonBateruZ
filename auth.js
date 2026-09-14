const fs=require('fs'), vm=require('vm'), assert=require('assert');
let src=fs.readFileSync(__dirname+'/../auth.js','utf8');
// Remove the two ESM import declarations for this isolated logic test.
src=src.replace(/import\s+\{\s*auth\s*\}\s+from\s+["'][^"']+["'];\s*/m,'');
src=src.replace(/import\s+\{[\s\S]*?\}\s+from\s+["']firebase\/auth["'];\s*/m,'');
class CL{constructor(){this.s=new Set(['hidden']);}add(x){this.s.add(x)}remove(x){this.s.delete(x)}toggle(x,v){v?this.s.add(x):this.s.delete(x)}contains(x){return this.s.has(x)}}
class E{constructor(){this.listeners={};this.classList=new CL();this.value='';this.checked=true;this.required=false;this.textContent='';this.attributes={};}addEventListener(t,f){(this.listeners[t]||(this.listeners[t]=[])).push(f)}setAttribute(k,v){this.attributes[k]=v}reset(){this.value=''}fire(t){for(const f of this.listeners[t]||[])f({preventDefault(){}})}}
const ids=['loginForm','tabLogin','tabRegister','registerPassConfirm','loginSubmitBtn','loginPass','loginUser','rememberUser','authError','quickAdmin1','quickAdmin2','logoutBtn','logoutBattleBtn'];const els={};ids.forEach(x=>els[x]=new E());
const ready=[];const document={getElementById:id=>els[id]||null,addEventListener:(t,f)=>{if(t==='DOMContentLoaded')ready.push(f)}};
let authCb=null, menuCalls=0, resetCalls=0;
const auth={currentUser:null,app:{options:{projectId:'dragonlike-3f51d',authDomain:'dragonlike-3f51d.firebaseapp.com'}}};
const sb={window:{Game:{showMainMenu(){menuCalls++},resetJuego(){resetCalls++}},location:{hostname:'test.vercel.app'}},document,console,setTimeout:(f)=>{f();return 1},clearTimeout(){},auth,
 onAuthStateChanged(a,cb){assert.strictEqual(a,auth);authCb=cb;},
 signInWithEmailAndPassword(){return Promise.resolve({user:{uid:'u1',email:'test@example.com',isAnonymous:false}})},
 createUserWithEmailAndPassword(){return Promise.resolve({user:{uid:'u2',email:'new@example.com',isAnonymous:false}})},
 signInAnonymously(){return Promise.resolve({user:{uid:'anon',isAnonymous:true}})},
 signOut(){return Promise.resolve()},setPersistence(){return Promise.resolve()},browserLocalPersistence:{},browserSessionPersistence:{}
};
sb.window.window=sb.window;vm.createContext(sb);vm.runInContext(src,sb,{filename:'auth.js'});ready.forEach(f=>f());
assert(authCb,'onAuthStateChanged no se registró');
authCb(null);assert.strictEqual(menuCalls,0,'No debe abrir menú sin sesión');
const u={uid:'abc123',email:'foo@example.com',displayName:null,isAnonymous:false};auth.currentUser=u;authCb(u);
assert.strictEqual(menuCalls,1,'Login Firebase no abrió el menú');
assert.strictEqual(sb.window.CURRENT_USER.uid,'abc123');
assert.strictEqual(sb.window.CURRENT_USER.name,'foo');
assert.strictEqual(sb.window.CURRENT_USER.firebaseAuthenticated,true);
console.log(JSON.stringify({ok:true,menuCalls,currentUser:sb.window.CURRENT_USER,projectId:sb.window.EcosAuth.getStatus().projectId},null,2));
