import type { PlayerState } from './GameState';
import { spendKi, totalKi } from './DiceSystem';
export const canAfford=(p:PlayerState,cost:number)=>totalKi(p.dice)>=cost;
export const payCost=(p:PlayerState,cost:number):PlayerState=>({...p,dice:spendKi(p.dice,cost)});
export const gainKi=(p:PlayerState,amount:number):PlayerState=>({...p,dice:[...p.dice,{id:`bonus-${Date.now()}-${p.dice.length}`,value:amount,spent:false,temporary:true}]});
