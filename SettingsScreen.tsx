export type EventChoice={id:string;label:string;requires?:(ctx:{hp:number;gold:number;race:string})=>boolean;result:string};
export const availableChoices=(choices:EventChoice[],ctx:{hp:number;gold:number;race:string})=>choices.filter(c=>!c.requires||c.requires(ctx));
