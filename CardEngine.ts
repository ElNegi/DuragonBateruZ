import type { Card, StructuredEffect } from '../cards/cardTypes';
import type { GameState } from './GameState';
import { effectHandlers } from '../cards/effectHandlers';
export type EffectContext={sourcePlayerId:string;targetPlayerId?:string;targetEnemyId?:string;card:Card};
export function resolveEffects(state:GameState,card:Card,ctx:EffectContext):GameState{
 return card.structuredEffects.reduce((s,e)=>{
   const h=effectHandlers[e.type]; if(!h) throw new Error(`Efecto no conocido: ${e.type}`); return h(s,e,ctx);
 },state);
}
