export type SagaConfig={id:string;name:string;enemyPool:string[];events:string[];miniboss:string;boss:string;rule:string};
export const INITIAL_SAGAS:SagaConfig[]=[
{id:'saiyan_arrival',name:'Llegada de los Saiyan',enemyPool:['Saibaman','Guerrero Saiyan'],events:['Capsula estrellada'],miniboss:'Nappa',boss:'Príncipe invasor',rule:'Presión física creciente'},
{id:'namek',name:'Namek',enemyPool:['Soldado de élite','Mercenario'],events:['Aldea Namekiana'],miniboss:'Comando de élite',boss:'Tirano en transformación',rule:'Curación y Ki disputados'},
{id:'freezer_empire',name:'Imperio de Freezer',enemyPool:['Soldado imperial','Capitán'],events:['Nave imperial'],miniboss:'General imperial',boss:'Emperador galáctico',rule:'Presión sobre objetivos heridos'}];
