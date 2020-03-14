﻿import { CBoss } from "./Boss";
import { GameTime } from "./Timer";
import { CBossEye } from "./BossEye";
import { CPlayGameState } from "./PlayGameState";
import { CBossMouth } from "./BossMouth";
import { gsCVector } from "./Vector";
import { Controls } from "./Controls";
import { Enums } from "./Enums";
import { gsCMapTile } from "./MapTile";
import { CBigExplosion } from "./BigExplosion";
import { Point } from "./Point";
import { ActorInfo } from "./ActorInfo";

export enum BossState {
    BOSS_MOVE_DOWN,
    BOSS_STATIC,
    BOSS_MOVE_UP,
    BOSS_BEGIN_LOOP,
    BOSS_END_LOOP,
    BOSS_TRIGGER,
    BOSS_DESTROY,
    BOSS_ROAR,
    BOSS_SNORT,
    BOSS_DEAD,
    BOSS_OPEN_EYES,
    BOSS_SHUT_EYES,
}

export class CBossControl extends CBoss {

    private m_is_started: boolean;
    private m_yscroll: number = 0; boolean;
    private m_state: BossState;
    private m_counter: number;
    private m_script: Array<BossScriptItem>;
    private m_script_pointer: BossScriptItem;
    private m_loop_point: number;
    private m_script_pointer_count = 0;
    private m_tile_pos: Point;
    private m_size: number;
    private m_destruction_timer: GameTime;
    private m_eye: CBossEye;

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_is_started = false;
        this.m_timer = new GameTime();

        this.m_script = [];
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 500));
        this.m_script.push(new BossScriptItem(BossState.BOSS_BEGIN_LOOP, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 1));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 1));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 2));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 2));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_ROAR, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_OPEN_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_UP, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SNORT, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 3));
        this.m_script.push(new BossScriptItem(BossState.BOSS_STATIC, 50));
        this.m_script.push(new BossScriptItem(BossState.BOSS_TRIGGER, 3));
        this.m_script.push(new BossScriptItem(BossState.BOSS_SHUT_EYES, 0));
        this.m_script.push(new BossScriptItem(BossState.BOSS_MOVE_DOWN, 200));
        this.m_script.push(new BossScriptItem(BossState.BOSS_END_LOOP, 0));
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_is_started = true;
            this.m_yscroll = 0;
            this.m_active_eyes = this.BOSS_EYES_TOTAL;

            for (var i = 0; i < this.BOSS_EYES_TOTAL; i++) {
                this.m_eye = new CBossEye(this.m_playGameState);
            }

            this.m_mouth = new CBossMouth();
            this.m_scene.addActor(this.m_mouth);
            this.m_mouth.setPosition(new gsCVector(0.0, 0.0));
            this.m_mouth.setVelocity(new gsCVector(0.0, 0.0));
            this.m_mouth.activate();
            //this.m_mouth_active = true;
            //this.m_state = BossState.BOSS_MOVE_DOWN;
            this.m_script_pointer = this.m_script[0];
            this.interpretScript();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        this.m_is_started = false;
        super.kill();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        if (this.m_state == BossState.BOSS_DEAD) {
            return true;
        }

        if (this.m_active_eyes == 0 && this.m_state != BossState.BOSS_DESTROY) {
            this.initiateDestructionSequence();
        }
        if (this.m_state == BossState.BOSS_DESTROY) {
            this.updateDestructionSequence();
        }
        else {
            if (this.m_counter <= 0)
                this.interpretScript();

            switch (this.m_state) {
                case BossState.BOSS_MOVE_DOWN:
                    this.m_yscroll = 1;
                    break;
                case BossState.BOSS_STATIC:
                    this.m_yscroll = 0;
                    break;
                case BossState.BOSS_MOVE_UP:
                    this.m_yscroll = -1;
                    break;
            }

            this.m_counter--;
        }
        return true;
    }

    //-------------------------------------------------------------

    public interpretScript(): void {
        if (this.m_script_pointer.m_state == BossState.BOSS_BEGIN_LOOP) {
            this.m_loop_point = ++this.m_script_pointer_count;
        }
        if (this.m_script_pointer.m_state == BossState.BOSS_END_LOOP) {
            this.m_script_pointer_count = this.m_loop_point;
        }

        if (this.m_script_pointer == null || this.m_script_pointer == undefined) {
            var stopHere = true;
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_TRIGGER) {
            switch (this.m_script_pointer.m_param) {
                case 0:
                    this.m_mouth.trigger(0, 16, 0.05);
                    break;
                case 1:
                    this.m_mouth.trigger(1, 16, 0.05);
                    break;
                case 2:
                    this.m_mouth.trigger(2, 16, 0.05);
                    break;
                case 3:
                    this.m_mouth.trigger(3, 16, 0.05);
                    break;
            }
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_ROAR) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ROAR);
            this.m_script_pointer = this.m_script[++this.m_script_pointer_count];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_SNORT) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_SNORT);
            this.m_script_pointer = this.m_script[++this.m_script_pointer_count];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_OPEN_EYES) {
            this.m_eye.setState(Enums.BossEyeState.BOSSEYE_OPEN);
            this.m_script_pointer = this.m_script[++this.m_script_pointer_count];
        }

        if (this.m_script_pointer.m_state == BossState.BOSS_SHUT_EYES) {
            this.m_eye.setState(Enums.BossEyeState.BOSSEYE_SHUT);
            this.m_script_pointer = this.m_script[++this.m_script_pointer_count];
        }

        this.m_counter = this.m_script_pointer.m_param;
        this.m_state = this.m_script_pointer.m_state;
        this.m_script_pointer = this.m_script[++this.m_script_pointer_count];
    }

    //-------------------------------------------------------------

    public isStarted(): boolean {
        return this.m_is_started;
    }

    //-------------------------------------------------------------

    public getYScroll(): number {
        return this.m_yscroll;
    }

    //-------------------------------------------------------------

    public initiateDestructionSequence(): void {
        this.m_state = BossState.BOSS_DESTROY;
        this.m_scene.findShip().setCloak(1000.0);
        this.m_yscroll = 1;
        var epicentre: gsCVector = this.m_mouth.getPosition();
        var tile_size: Point = this.m_scene.getMap().getImage().getTileSize();
        this.m_tile_pos = <Point>(epicentre).divide(tile_size);
        this.m_size = 1;
        this.m_destruction_timer.start();
    }

    //-------------------------------------------------------------

    public updateDestructionSequence(): void {
        if (this.m_destruction_timer.getTime() > 0.1) {
            this.m_destruction_timer.start();

            for (var x = 0; x < this.m_size; x++) {
                this.explodeTile(this.m_tile_pos.add(new Point(x, 0)));
                this.explodeTile(this.m_tile_pos.add(new Point(x, this.m_size - 1)));
                this.explodeTile(this.m_tile_pos.add(new Point(0, x)));
                this.explodeTile(this.m_tile_pos.add(new Point(this.m_size - 1, x)));
            }

            this.m_tile_pos = this.m_tile_pos.subtract(new Point(1, 1));
            this.m_size += 2;

            if (this.m_size > 21) {
                this.m_state = BossState.BOSS_DEAD;
            }
        }
    }

    //-------------------------------------------------------------

    public explodeTile(pos: Point): void {
        var map = this.m_scene.getMap();

        var tile: gsCMapTile = map.getMapTile(pos);

        if (tile) {
            if (!tile.isEmpty() && !tile.isHidden()) {
                tile.setHidden(true); //?
                var exp: CBigExplosion = new CBigExplosion(this.m_playGameState);
                this.m_scene.addActor(exp);
                var tile_size: Point = map.getImage().getTileSize();
                //var tile_centre: Point = tile_size / new Point(2, 2);
                var tile_centre: Point = tile_size.divide(new Point(2, 2));
                //var p: Point = pos * tile_size + tile_centre;
                var p: Point = pos.multiply(tile_size.add(tile_centre));
                exp.setPosition(new gsCVector(p.X, p.Y));
                exp.activate();
            }
        }
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BOSSCONTROL);
    }
}

export class BossScriptItem {
    public m_state: BossState;
    public m_param: number;

    constructor(state: BossState, param: number) {
        this.m_state = state;
        this.m_param = param;
    }
}
