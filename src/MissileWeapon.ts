import { CWeapon } from "./Weapon";
import { CScene } from "./Scene";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CMissile } from "./Missile";
import { gsCVector } from "./Vector";
import { ActorInfo } from "./ActorInfo";

export class CMissileWeapon extends CWeapon {

    constructor(scene: CScene, playGameState: CPlayGameState) {
        super(scene);
        this.m_playGameState = playGameState;
        this.m_name = "MissileWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MISSILE_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        super.update(controls, gameTime);

        if (this.do_fire) {
            this.fire();
        }
        return true;
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var m: CMissile = new CMissile(this.m_scene, this.m_playGameState);
        this.m_scene.addActor(m);
        m.activate();
        var grade: number = this.m_grade;
        m.setGrade(grade);

        switch (this.m_direction) {
            case Enums.WeaponDirection.WEAPON_FORWARD:
                m.setPosition(new gsCVector(this.getPosition().x, this.getPosition().y - 24.0));
                //// m.setVelocity(new gsCVector(0.0, -m.getActorInfo().m_speed[this.m_grade]));
                m.setVelocity(new gsCVector(0, -m.getSpeed()));
                break;
            case Enums.WeaponDirection.WEAPON_REVERSE:
                //m.setPosition(getPosition() + new gsCVector(0.0, 24.0));
                m.setPosition(new gsCVector(this.getPosition().x - new gsCVector(0.0, 24.0).x, this.getPosition().y - new gsCVector(0.0, 24.0).y));
                //m.setVelocity(new gsCVector(0.0, m.getActorInfo().m_speed[this.m_grade]));
                m.setVelocity(new gsCVector(0, m.getSpeed()));
                break;
        }

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_FIRE_MISSILE);//getPosition().getX());
        }
        return true;
    }

}
