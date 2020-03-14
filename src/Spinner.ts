import { CBullet } from "./Bullet";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { ActorInfo } from "./ActorInfo";

export class CSpinner extends CBullet {
    private SPINNER_FRAMES: number = 8;

    constructor(playGameState: CPlayGameState) {
        super(playGameState);
        this.m_name = "Spinner";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SPINNER);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive())
            this.m_timer.start();
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        //super.update(controls, gameTime);
        if (this.m_shield == 0) {
            this.kill();
            return true;
        }
        this.m_position.plusEquals(this.m_velocity);
        //console.log("pos x = " + this.m_position.x + " pos y = " + this.m_position.y);
        this.animations(Enums.AnimationMode.ANIMATE_LOOP, this.m_grade * this.SPINNER_FRAMES, this.SPINNER_FRAMES);
        return true;
    }

}
