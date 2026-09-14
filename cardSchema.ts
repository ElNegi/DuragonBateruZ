import type { Die } from './DiceSystem';
export type Race='SAIYAN'|'NAMEK'|'FREEZER';
export type StatusInstance={id:string;name:string;duration:number|null;stacks:number;trigger:string};
export type PlayerState={
 id:string; name:string; race:Race; hp:number; maxHp:number; awakeningMeter:number; dice:Die[]; deck:string[]; hand:string[]; discardPile:string[]; exile:string[];
 permanents:{equipment:string[];allies:string[];missions:string[];saga:string|null;scenario:string|null}; statuses:StatusInstance[]; actionHistory:string[]; passed:boolean;
};
export type EnemyState={id:string;name:string;hp:number;maxHp:number;phase:number;intent:string;archetype:string;statuses:StatusInstance[]};
export type GameState={version:1; round:number; phase:'ROUND_START'|'ACTIONS'|'ROUND_END'|'VICTORY'|'DEFEAT';activeCombatantIndex:number;players:PlayerState[];enemies:EnemyState[];log:string[];reactionDepth:number;seed:number};
export const serializeGameState=(state:GameState)=>JSON.stringify(state);
export const deserializeGameState=(raw:string):GameState=>JSON.parse(raw) as GameState;
