import type {Combatant} from '../core/GameState'; export const matchesCombo=(c:Combatant,sequence:string[])=>sequence.every((x,i)=>c.actionHistory[c.actionHistory.length-sequence.length+i]===x);
