import { CAlien } from "./Alien";
import { CSpinnerWeapon } from "./SpinnerWeapon";
import { CPlayGameState } from "./PlayGameState";
import { gsCVector } from "./Vector";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CShip } from "./Ship";
import { Enums } from "./Enums";
import { ActorInfo } from "./ActorInfo";
import { CExploder } from "./Exploder";

export module Loner {

    export class CLoner extends CAlien {

        private m_weapon: CSpinnerWeapon;

        constructor(playGameState: CPlayGameState) {
            super();
            this.m_playGameState = playGameState;
            this.m_name = "Loner";
        }

        //-------------------------------------------------------------

        public activate(): boolean {
            if (!this.isActive()) {
                this.m_weapon = new CSpinnerWeapon(this.m_playGameState);
                this.m_scene.addActor(this.m_weapon);
                this.m_weapon.activate();
                this.m_weapon.setOwner(this);
                this.m_weapon.setPosition(this.getPosition());
                this.m_weapon.setOffset(new gsCVector(0.0, 0.0));
                this.m_timer.start();
            }
            return super.activate();
        }

        //-------------------------------------------------------------

        public kill(): void {
            if (this.m_weapon != null) {
                this.m_weapon.kill();
                this.m_weapon = null;
            }
            super.kill();
        }

        //-------------------------------------------------------------

        public update(controls: Controls, gameTime: GameTime): boolean {
            if (this.m_shield == 0) {
                var explode = new CExploder(this);
                super.kill();
                return true;
            }

            var ship: CShip = this.m_scene.findShip();

            //fire weapon towards ship
            if (ship != null) {
                var dir: gsCVector = ship.getPosition().minus(this.getPosition());
                dir.normalize();
                this.m_weapon.setDirectionS(dir);
            }

            this.m_position.plusEquals(this.m_velocity);
            this.animate(Enums.AnimationMode.ANIMATE_LOOP);

            return true;
        }

        //-------------------------------------------------------------
    }

    //-------------------------------------------------------------

    export class CStandardLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_STANDARD_LONER);
        }
    }

    //-------------------------------------------------------------

    export class CMediumLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MEDIUM_LONER);
        }
    }

    //-------------------------------------------------------------

    export class CArmouredLoner extends CLoner {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_ARMOURED_LONER);
        }
    }

    //-------------------------------------------------------------
}
