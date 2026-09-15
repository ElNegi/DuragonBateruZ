export const GAME_RULES={initialHand:4,roundDraw:2,maxDice:6,maxEquipment:3,reactionLimit:3,startingHp:30} as const;
export const diceForRound=(round:number)=>Math.min(Math.max(round,1),GAME_RULES.maxDice);
