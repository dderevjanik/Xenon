﻿import { CActor } from "./Actor";
import { gsCVector } from "./Vector";
import { GameTime } from "./Timer";
import { CScene } from "./Scene";
import { Controls } from "./Controls";

export class CEngine extends CActor {

    ENGINE_MAX_THRUST: number = 10;
    private m_offset: gsCVector;
    m_min_extent: gsCVector;
    m_max_extent: gsCVector;
    m_thrust_rate: number;
    m_thrust_timer: GameTime;
    m_thrust: number;

    constructor(theScene: CScene) {
        super(theScene);
        this.m_offset = new gsCVector(0.0, 0.0);
        this.m_thrust = 0;
        this.m_min_extent = new gsCVector(0.0, 0.0);
        this.m_max_extent = new gsCVector(0.0, 0.0);
        this.m_thrust_rate = 0;
        this.m_thrust_timer = new GameTime();
        this.m_name = "engine";
    }

    //-------------------------------------------------------------

    public activateEngine(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_thrust_timer.start();
        }

        return super.activate();
    }

    //-------------------------------------------------------------

    public applyThrust(thrust: number): void {
        //if (this.m_thrust_timer.getTime() > this.m_thrust_rate) {
        //    this.m_thrust_timer.start();
        // .getTime not working correctly !!!!!!

        if (thrust > 0) {
            this.m_thrust++;
            if (this.m_thrust > this.ENGINE_MAX_THRUST) {
                this.m_thrust = this.ENGINE_MAX_THRUST;
            }
        }
        else {
            this.m_thrust--;
            if (this.m_thrust < 0) {
                this.m_thrust = 0;
            }
        }
        //  }
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector): void {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        this.m_thrust_timer.update(false);

        var p: number = this.m_thrust / this.ENGINE_MAX_THRUST;
        var extent: gsCVector = new gsCVector(this.m_min_extent.x + (this.m_max_extent.x - this.m_min_extent.x) * p, this.m_min_extent.y + (this.m_max_extent.y - this.m_min_extent.y) * p);
        this.m_position.x = this.getOwner().getPosition().x + this.m_offset.x + extent.x;
        this.m_position.y = this.getOwner().getPosition().y + this.m_offset.y + extent.y;
        return true;
    }

    //-------------------------------------------------------------

    public setParams(min_extent: gsCVector, max_extent: gsCVector, thrust_rate: number): void {
        this.m_min_extent = min_extent;
        this.m_max_extent = max_extent;
        this.m_thrust_rate = thrust_rate;
    }

    //-------------------------------------------------------------
}
