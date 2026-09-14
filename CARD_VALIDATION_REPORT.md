import type { PlayerState } from '../core/GameState';
export const awakeningGain=(p:PlayerState,event:'TAKE_DAMAGE'|'DEAL_DAMAGE'|'HEAL',amount:number)=>{const mult=p.race==='SAIYAN'&&event==='TAKE_DAMAGE'?1.5:p.race==='NAMEK'&&event==='HEAL'?1.3:p.race==='FREEZER'&&event==='DEAL_DAMAGE'?1.25:1;return Math.min(100,p.awakeningMeter+Math.ceil(amount*mult));};
export const canAwaken=(p:PlayerState)=>p.awakeningMeter>=100;
export const activateAwakening=(p:PlayerState)=>canAwaken(p)?{...p,awakeningMeter:0}:{...p};
