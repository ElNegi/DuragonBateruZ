import type {Card} from '../cards/cardTypes'; export const rewardsFor=(cards:Card[],race:string)=>cards.filter(c=>!c.raceRestriction||c.raceRestriction===race).slice(0,3);
