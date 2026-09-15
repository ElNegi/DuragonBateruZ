import {diceForRound} from './gameRules'; import type {Combatant} from './GameState';
export const rollDice=(round:number,rng=Math.random)=>Array.from({length:diceForRound(round)},()=>Math.floor(rng()*6)+1);
export const totalKi=(c:Combatant)=>c.dice.reduce((a,b)=>a+b,0); export const remainingKi=(c:Combatant)=>totalKi(c)-c.kiSpent;
export const spendKi=(c:Combatant,cost:number)=>{if(remainingKi(c)<cost)return false;c.kiSpent+=cost;return true};
