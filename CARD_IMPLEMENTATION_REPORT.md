import { GAME_RULES } from '../core/gameRules';
export const canOpenReaction=(depth:number)=>depth<GAME_RULES.reactionDepthLimit;
export const openReaction=(depth:number)=>{if(!canOpenReaction(depth))throw new Error('Límite de reacciones alcanzado');return depth+1;};
