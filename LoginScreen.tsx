export class AudioManager{music=.7;sfx=.8;muted=false;setMusic(v:number){this.music=Math.max(0,Math.min(1,v))}setSfx(v:number){this.sfx=Math.max(0,Math.min(1,v))}toggleMute(){this.muted=!this.muted}}
