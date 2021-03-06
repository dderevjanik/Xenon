﻿import { CBullet } from "./Bullet";
import { CScene } from "./Scene";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { ActorInfo } from "./ActorInfo";

export class CMissile extends CBullet {

    MISSILE_FRAMES: number = 2;

    constructor(theScene: CScene, playGameState: CPlayGameState) {
        super(playGameState);
        this.m_name = "Missile";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MISSILE);
    }

    //-------------------------------------------------------------

    // Get the Speed Vector
    public getSpeed(): number {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MISSILE).m_speed.y;
    }

    //-------------------------------------------------------------

    public update(controls: Controls): boolean {
        this.m_position.x = this.m_position.x + this.m_velocity.x;
        this.m_position.y = this.m_position.y + this.m_velocity.y;
        this.m_sprite.setFrame(this.MISSILE_FRAMES * this.m_grade);
        return true;
    }
}
