import { GAME_RULES } from './gameRules';
export type Die = { id: string; value: number; spent: boolean; temporary?: boolean };
export const diceCountForRound = (round:number, bonus=0) => Math.max(0, Math.min(round, GAME_RULES.maxBaseDice) + bonus);
export const rollDice = (round:number, rng:()=>number=Math.random, bonus=0):Die[] => Array.from({length:diceCountForRound(round,bonus)},(_,i)=>({id:`d${i+1}`,value:Math.floor(rng()*GAME_RULES.dieSides)+1,spent:false}));
export const totalKi = (dice:Die[]) => dice.reduce((s,d)=>s+(d.spent?0:d.value),0);
export const spentKi = (dice:Die[]) => dice.reduce((s,d)=>s+(d.spent?d.value:0),0);
export function spendKi(dice:Die[], amount:number):Die[] {
  if(amount<0 || totalKi(dice)<amount) throw new Error('Ki insuficiente');
  if(amount===0) return dice.map(d=>({...d}));
  // exact subset first; otherwise minimal overspend. Dice are atomic resources, preserving individual faces.
  const open=dice.map((d,i)=>({...d,i})).filter(d=>!d.spent);
  let best:number[]|null=null, bestSum=Infinity;
  for(let mask=1; mask<(1<<open.length); mask++){
    let sum=0, ids:number[]=[];
    for(let i=0;i<open.length;i++) if(mask&(1<<i)){sum+=open[i].value; ids.push(open[i].i);}
    if(sum>=amount && (sum<bestSum || (sum===bestSum && (!best || ids.length<best.length)))){best=ids;bestSum=sum;}
  }
  if(!best) throw new Error('No se puede pagar');
  const set=new Set(best); return dice.map((d,i)=>set.has(i)?{...d,spent:true}:{...d});
}
