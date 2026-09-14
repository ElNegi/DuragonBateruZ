import type { GameState } from '../core/GameState';import { syncRoomState } from '../firebase/firestoreService';
export const playAction=async(roomCode:string,state:GameState)=>syncRoomState(roomCode,state);
export const pass=playAction;export const finishRound=playAction;
