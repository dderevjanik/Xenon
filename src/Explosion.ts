import { CActor } from "./Actor";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";

export class CExplosion extends CActor {

    constructor() {
        super();
        this.m_name = "explosion";
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gametime: GameTime): boolean {
        this.m_position.plusEquals(this.m_velocity);

        if (super.animate(Enums.AnimationMode.ANIMATE_ONESHOT)) {
            super.kill();
        }
        return true;
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        super.kill();
    }

}
