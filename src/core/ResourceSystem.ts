import type {Combatant} from './GameState'; export const heal=(c:Combatant,n:number)=>c.hp=Math.min(c.maxHp,c.hp+n); export const damage=(c:Combatant,n:number)=>c.hp=Math.max(0,c.hp-n);
