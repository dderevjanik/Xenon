﻿import { CWeapon } from "./Weapon";
import { gsCVector } from "./Vector";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CSpinner } from "./Spinner";
import { ActorInfo } from "./ActorInfo";

export class CSpinnerWeapon extends CWeapon {
    private m_directionS: gsCVector;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_directionS = new gsCVector(0.0, 1.0);
        this.m_name = "SpinnerWeapon";
        this.do_fire = true;
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SPINNER_WEAPON);
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        super.update(controls, gameTime);
        if (this.do_fire) {
            this.fire();
            //controls.fire = false;
            this.do_fire = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        if (!this.isValidFiringPosition()) {
            return false;
        }

        var m: CSpinner = new CSpinner(this.m_playGameState);
        this.m_scene.addActor(m);
        m.setPosition(this.getPosition());
        m.activate();
        //var grade: number = 0; //this.m_grade;
        ////m.setGrade(grade);//<number>this.m_grade);
        m.setGrade(<number>this.m_grade);
        m.setPosition(this.getPosition());
        var p: gsCVector = new gsCVector(5, 5);
        var t: gsCVector = p.multVec(this.m_directionS);
        m.setVelocity(t);

        return true;
    }

    //-------------------------------------------------------------

    public setDirectionS(direction: gsCVector): void {
        this.m_directionS = direction;
    }
}
