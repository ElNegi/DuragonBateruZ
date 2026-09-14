import type { GameState } from '../core/GameState';
export const applyDamageToEnemy=(s:GameState,id:string,amount:number)=>({...s,enemies:s.enemies.map(e=>e.id===id?{...e,hp:Math.max(0,e.hp-amount)}:e)});
export const healPlayer=(s:GameState,id:string,amount:number)=>({...s,players:s.players.map(p=>p.id===id?{...p,hp:Math.min(p.maxHp,p.hp+amount)}:p)});
export function updateBossPhases(s:GameState):GameState{return {...s,enemies:s.enemies.map(e=>{const r=e.hp/e.maxHp;const phase=r<.30?3:r<.60?2:1;return phase!==e.phase?{...e,phase,intent:`FASE_${phase}_${e.intent}`}:{...e};})};}
