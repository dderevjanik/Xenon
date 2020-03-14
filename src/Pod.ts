import { CAlien } from "./Alien";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CSporeGenerator } from "./SporeGenerator";
import { CShip } from "./Ship";
import { gsCVector } from "./Vector";
import { CExploder } from "./Exploder";
import { ActorInfo } from "./ActorInfo";

export class CPod extends CAlien {

    //-------------------------------------------------------------

    POD_MAX_XSPEED: number = 0.5;
    POD_XSPEED_SCALE: number = 0.01;

    //-------------------------------------------------------------

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "POD";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_POD);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        this.gameTime = gameTime;
        if (this.m_shield == 0) {

            var gen: CSporeGenerator = new CSporeGenerator(this.m_playGameState);
            this.m_scene.addActor(gen);
            gen.activate();
            gen.setPosition(this.getPosition());

            var explode = new CExploder(this);
            super.kill();
            return true;
        }

        var ship: CShip = this.m_scene.findShip();

        var dx: number = 0.0;

        if (ship != null) {
            dx = ship.getPosition().X - this.m_position.X;
        }

        dx *= this.POD_XSPEED_SCALE;

        if (dx < -this.POD_MAX_XSPEED) {
            dx = -this.POD_MAX_XSPEED;
        }
        if (dx > this.POD_MAX_XSPEED) {
            dx = this.POD_MAX_XSPEED;
        }

        //this.m_position += new gsCVector(dx, this.m_velocity.Y);
        this.m_position.plusEquals(new gsCVector(dx, this.m_velocity.Y));
        super.animate(Enums.AnimationMode.ANIMATE_LOOP);

        return true;
    }

    //-------------------------------------------------------------
}
