import type { GameState, PlayerState } from '../../core/GameState';
import type { StructuredEffect } from '../cardTypes';
import type { EffectContext } from '../../core/EffectEngine';
import { drawCards } from '../CardEngine';
import { gainKi } from '../../core/ResourceSystem';
type Handler=(s:GameState,e:StructuredEffect,c:EffectContext)=>GameState;
const updatePlayer=(s:GameState,id:string,fn:(p:PlayerState)=>PlayerState)=>({...s,players:s.players.map(p=>p.id===id?fn(p):p)});
const targetPlayer=(c:EffectContext)=>c.targetPlayerId??c.sourcePlayerId;
const handlers:Record<string,Handler>={
 DAMAGE:(s,e,c)=>{const n=e.amount??0;if(c.targetEnemyId)return {...s,enemies:s.enemies.map(x=>x.id===c.targetEnemyId?{...x,hp:Math.max(0,x.hp-n)}:x)};return updatePlayer(s,targetPlayer(c),p=>({...p,hp:Math.max(0,p.hp-n)}));},
 HEAL:(s,e,c)=>updatePlayer(s,targetPlayer(c),p=>({...p,hp:Math.min(p.maxHp,p.hp+(e.amount??0))})),
 DRAW:(s,e,c)=>updatePlayer(s,c.sourcePlayerId,p=>drawCards(p,e.amount??0)),
 GAIN_KI:(s,e,c)=>updatePlayer(s,c.sourcePlayerId,p=>gainKi(p,e.amount??0)),
 LOSE_KI:(s,e,c)=>updatePlayer(s,targetPlayer(c),p=>({...p,dice:p.dice.map(d=>({...d,spent:true}))})),
 BLOCK:(s)=>s,
 NEGATE_ATTACK:(s)=>s,
 DISCARD:(s,e,c)=>updatePlayer(s,targetPlayer(c),p=>({...p,hand:p.hand.slice(e.amount??1),discardPile:[...p.discardPile,...p.hand.slice(0,e.amount??1)]})),
 EXTRA_ACTION:(s,cx,c)=>({...s,log:[...s.log,`${c.card.name}: acción adicional preparada.`]}),
 CLEANSE_STATUS:(s,e,c)=>updatePlayer(s,c.sourcePlayerId,p=>({...p,statuses:[]})),
 APPLY_STATUS_FROM_CARD:(s,e,c)=>updatePlayer(s,targetPlayer(c),p=>({...p,statuses:[...p.statuses,{id:c.card.id,name:c.card.name,duration:1,stacks:1,trigger:'CARD_RULE'}]})),
 ADD_PERMANENT:(s,e,c)=>updatePlayer(s,c.sourcePlayerId,p=>{const zone=e.zone??'';const perm={...p.permanents};if(zone==='EQUIPAMIENTO')perm.equipment=[...perm.equipment,c.card.id];if(zone==='ALIADO')perm.allies=[...perm.allies,c.card.id];if(zone==='MISION')perm.missions=[...perm.missions,c.card.id];if(zone==='SAGA')perm.saga=c.card.id;if(zone==='ESCENARIO')perm.scenario=c.card.id;return {...p,permanents:perm};}),
 RULE_TEXT:(s,e,c)=>({...s,log:[...s.log,`${c.card.name}: ${e.text??c.card.rulesText}`]})
};
export const effectHandlers=handlers;
