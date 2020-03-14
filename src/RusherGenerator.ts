import { CActor } from "./Actor";
import { GameTime } from "./Timer";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { CRusher } from "./Rusher";

export class CRusherGenerator extends CActor {

    private RUSHER_TOTAL: number = 6;	// total segments in chain
    private RUSHER_DELAY: number = 0.5;	// time delay between generation

    //-------------------------------------------------------------

    private m_rushers_created: number;
    private m_delay_timer: GameTime;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_rushers_created = 0;
        //this.m_timer = new gsCTimer();
        this.m_delay_timer = new GameTime();
        this.m_name = "RusherGenerator";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_RUSHER_GENERATOR);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_delay_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime) {
        //this.gameTime = gameTime;
        this.m_delay_timer.update(false);
        if (this.m_delay_timer.getTime() < this.RUSHER_DELAY) {
            return true;
        }
        this.m_delay_timer.start();

        var r: CRusher = new CRusher(this.m_playGameState);
        this.m_scene.addActor(r);
        r.setPosition(this.getPosition());
        r.setVelocity(this.getVelocity());
        r.activate();

        this.m_rushers_created++;
        if (this.m_rushers_created >= this.RUSHER_TOTAL) {
            //super.kill();
            this.kill();
        }
        return true;
    }
    //-------------------------------------------------------------

}
