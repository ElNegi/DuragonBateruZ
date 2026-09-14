import type { PlayerState } from '../core/GameState';
import type { Card } from './cardTypes';
import { canAfford, payCost } from '../core/ResourceSystem';
export function reshuffleIfNeeded(p:PlayerState,rng:()=>number=Math.random):PlayerState{
 if(p.deck.length || !p.discardPile.length) return p;
 const deck=[...p.discardPile]; for(let i=deck.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
 return {...p,deck,discardPile:[]};
}
export function drawCards(p:PlayerState,count:number,rng:()=>number=Math.random):PlayerState{
 let s={...p,deck:[...p.deck],hand:[...p.hand],discardPile:[...p.discardPile]};
 for(let i=0;i<count;i++){s=reshuffleIfNeeded(s,rng);const card=s.deck.shift();if(!card) break;s.hand.push(card);} return s;
}
export function validateCardPlay(p:PlayerState,c:Card){if(c.raceRestriction && c.raceRestriction!==p.race)return {ok:false,reason:'Carta restringida a otra raza'};if(!canAfford(p,c.cost))return {ok:false,reason:'Ki insuficiente'};return {ok:true as const};}
export function payAndDiscard(p:PlayerState,c:Card){const paid=payCost(p,c.cost);return {...paid,hand:paid.hand.filter(id=>id!==c.id),discardPile:[...paid.discardPile,c.id],actionHistory:[...paid.actionHistory,c.id]};}
