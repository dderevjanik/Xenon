import { CWeapon } from "./Weapon";
import { CScene } from "./Scene";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CLaser } from "./Laser";
import { gsCVector } from "./Vector";
import { ActorInfo } from "./ActorInfo";

export class CLaserWeapon extends CWeapon {

    constructor(scene: CScene, playGameState: CPlayGameState) {
        super(scene);
        this.m_playGameState = playGameState;
        this.m_name = "LaserWeapon";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_LASER_WEAPON);
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
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var l: CLaser = new CLaser(this.m_playGameState);
        this.m_scene.addActor(l);
        l.activate();
        var grade: number = this.m_grade;
        l.setGrade(grade);
        l.setPosition(this.getPosition());
        l.setVelocity(new gsCVector(0.0, -20));//l.getActorInfo().m_speed));//this.m_grade]));

        if (this.getOwner() && this.getOwner().getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_FIRE_LASER);//getPosition().getX());
        }
        return true;
    }

    //-------------------------------------------------------------
}
