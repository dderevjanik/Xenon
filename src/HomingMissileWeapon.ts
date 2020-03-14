import { CWeapon } from "./Weapon";
import { CScene } from "./Scene";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CHomingMissile } from "./HomingMissile";
import { CAlien } from "./Alien";
import { gsCVector } from "./Vector";
import { ActorInfo } from "./ActorInfo";

export class CHomingMissileWeapon extends CWeapon {

    constructor(scene: CScene, playGameState: CPlayGameState) {
        super(scene);
        this.m_playGameState = playGameState;
        this.m_name = "HomingMissileWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_HOMING_MISSILE_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        super.update(controls, gameTime);

        if (this.do_fire) {
            this.fire();
            //controls.fire = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        if (!this.isValidFiringPosition())
            return false;

        var h: CHomingMissile = new CHomingMissile(this.m_playGameState);
        this.m_scene.addActor(h);

        var alien: CAlien = null;
        switch (this.m_direction) {
            case Enums.WeaponDirection.WEAPON_FORWARD:
                alien = <CAlien>this.m_scene.findNearestActor(Enums.ActorType.ACTOR_TYPE_ALIEN, this.getPosition(), -1);

                if (alien) {
                    h.setTarget(alien.getPosition());
                }
                else {
                    h.setTarget(new gsCVector(320.0, this.getPosition().Y - 480.0));
                }
                h.setPosition(this.getPosition().minus(new gsCVector(0.0, 24.0)));
                //h.setVelocity(new gsCVector(0.0, -h.getActorInfo().m_speed[this.m_grade]));
                h.setVelocity(new gsCVector(0.0, -5));
                break;
            case Enums.WeaponDirection.WEAPON_REVERSE:
                alien = <CAlien>this.m_scene.findNearestActor(Enums.ActorType.ACTOR_TYPE_ALIEN, this.getPosition(), 1);

                if (alien) {
                    h.setTarget(alien.getPosition());
                }
                else {
                    h.setTarget(new gsCVector(320.0, this.getPosition().Y + 480.0));
                }
                h.setPosition(this.getPosition().plus1(new gsCVector(0.0, 24.0)));
                //h.setVelocity(new gsCVector(0.0, h.getActorInfo().m_speed[this.m_grade]));
                h.setVelocity(new gsCVector(0.0, 5));
                break;
        }

        h.activate();
        var grade: number = this.m_grade;
        h.setGrade(grade);

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_FIRE_HOMING_MISSILE);
            //        CGameState::playSample(SAMPLE_FIRE_HOMING_MISSILE, getPosition().getX());
        }

        return true;
    }
}
