﻿import CActor = require("Actor");
import Controls = require("Controls");
import GameTime = require("Timer");
import enums = require("Enums");

class CExplosion extends CActor {

    public activate(): boolean {
        if (!this.isActive()) {
            //	m_timer.start();
        }
        return super.activate();
    }

    public update(controls: Controls, gametime: GameTime): boolean {
        this.m_position.plusEquals(this.m_velocity);

        if (super.animate(enums.AnimationMode.ANIMATE_ONESHOT)) {
            super.kill();
        }
        return true;
    }

    public onLeavingScreen():void {
        super.kill();
    }

}
export = CExplosion;