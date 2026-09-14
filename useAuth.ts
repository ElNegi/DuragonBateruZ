import type { Card } from '../cards/cardTypes'; import type { Race } from '../core/GameState';
export function chooseRewards(cards:Card[],race:Race,count=3){const pool=cards.filter(c=>!c.raceRestriction||c.raceRestriction===race);return [...pool].sort((a,b)=>Number(Boolean(b.raceRestriction))-Number(Boolean(a.raceRestriction))||a.cost-b.cost).slice(0,count);}
