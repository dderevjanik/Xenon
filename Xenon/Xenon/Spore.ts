﻿import CBullet = require("Bullet");
import CShip = require("Ship");
import gsCVector = require("Vector");
import enums = require("Enums");
import gsCControls = require("Controls");
import gsCTimer = require("Timer");
import Pickup = require("Pickup");
import CSporeGenerator = require("SporeGenerator");

class CSpore extends CBullet {

    SPORE_HOMING_DELAY: number = 0.5;
    //private gsCTimer m_delay_timer;
    m_killed_by_player: boolean;

    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            //m_timer.start();
            //m_delay_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    //public override bool update(Controls controls, GameTime gametime)
    public update(controls: gsCControls, gameTime: gsCTimer): boolean {
        this.gameTime = gameTime;
        if (this.m_shield == 0) {
            super.explode();
            super.kill();
            return true;
        }

        ////           if (m_delay_timer.getState() != gsTIMER_ACTIVE || m_delay_timer.getTime() >= SPORE_HOMING_DELAY)
        //{
        //    //               m_delay_timer.reset();

        //    var ship: CShip = this.m_scene.findShip();

        //    if (ship != null) {
        //        var rel_pos: gsCVector = ship.getPosition() - this.m_position;

        //        rel_pos.Normalize();

        //        this.m_velocity = rel_pos * this.getActorInfo().m_speed[this.m_grade];
        //    }
        //}

        //this.m_position += m_velocity;

        super.animate(enums.AnimationMode.ANIMATE_LOOP);

        return true;
    }

    //-------------------------------------------------------------

    public onKilled(): void {
        this.m_killed_by_player = true;

        super.onKilled();
    }

    //-------------------------------------------------------------

    public kill(): void {
        //if (this.getOwner() != null && ((CSporeGenerator)this.getOwner()).sporeKilled(this.m_killed_by_player))
        if (this.getOwner() != null && (<CSporeGenerator>this.getOwner()).sporeKilled(this.m_killed_by_player)) {
            var s: Pickup.CScorePickup = new Pickup.CScorePickup();
            this.m_scene.addActor(s);
            s.setPosition(this.getPosition());
            s.activate();
        }

        super.kill();
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
    }

    //-------------------------------------------------------------

}
export = CSpore;