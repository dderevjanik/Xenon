import { CBoss } from "./Boss";
import { GameTime } from "./Timer";
import { Controls } from "./Controls";
import { CSpinner } from "./Spinner";
import { gsCVector } from "./Vector";
import { Enums } from "./Enums";
import { ActorInfo } from "./ActorInfo";
import { CExploder } from "./Exploder";


export class CBossMouth extends CBoss {

    private m_mode: number;
    private m_shots_fired: number;
    private m_shots_total: number;
    private m_shot_delay: number;
    private m_firing_timer: GameTime;

    constructor() {
        super();
        this.m_mouth = this;
        this.m_mode = -1;
        this.m_timer = new GameTime();
        this.m_firing_timer = new GameTime();
		this.m_name = "Boss Mouth";
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
            this.m_firing_timer.reset();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {

        this.m_firing_timer.update(false);

        if (this.m_shield == 0) {
            var explode = new CExploder(this);
            this.kill();
            return true;
        }

        if (this.m_mode != -1) {
            if (this.m_firing_timer.getTime() >= this.m_shot_delay) {

                this.m_firing_timer.start();
                var s: CSpinner = null;

                if (this.m_mode == 0) {
                    s = new CSpinner(this.m_playGameState);
                    this.m_scene.addActor(s);
                    s.activate();
                    s.setPosition(new gsCVector(300, 200));//   this.getPosition());

                    var x = -2.0 + 4.0 * this.m_shots_fired / (this.m_shots_total - 1);

                    s.setVelocity(new gsCVector(x, 1.0));
                    s.setGrade(Enums.BulletGrade.BULLET_STANDARD);
                }
                else if (this.m_mode == 1) {
                    s = new CSpinner(this.m_playGameState);
                    this.m_scene.addActor(s);
                    s.activate();
                    s.setPosition(this.getPosition());

                    var x = 2.0 - 4.0 * this.m_shots_fired / (this.m_shots_total - 1);

                    s.setVelocity(new gsCVector(x, 2.0));
                    s.setGrade(Enums.BulletGrade.BULLET_MEDIUM);
                }
                else if (this.m_mode == 2) {
                    s = new CSpinner(this.m_playGameState);
                    this.m_scene.addActor(s);
                    s.activate();
                    s.setPosition(this.getPosition());

                    var x = -2.0 + 4.0 * this.m_shots_fired / (this.m_shots_total - 1);

                    s.setVelocity(new gsCVector(x, 1.0));
                    s.setGrade(Enums.BulletGrade.BULLET_BEST);
                }
                else {
                    s = new CSpinner(this.m_playGameState);
                    this.m_scene.addActor(s);
                    s.activate();
                    s.setPosition(this.getPosition());

                    var x = 2.0 - 4.0 * this.m_shots_fired / (this.m_shots_total - 1);

                    s.setVelocity(new gsCVector(x, 2.0));
                    s.setGrade(Enums.BulletGrade.BULLET_BEST);
                }

                this.m_shots_fired++;

                if (this.m_shots_fired >= this.m_shots_total) {
                    this.m_firing_timer.reset();
                    this.m_mode = -1;
                }
            }
        }

        return true;
    }

    //-------------------------------------------------------------

    public trigger(mode: number, shots: number, delay: number): void {
        this.m_mode = mode;
        this.m_shots_total = shots;
        this.m_shots_fired = 0;
        this.m_shot_delay = delay;
        this.m_firing_timer.start();
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BOSSMOUTH);
    }
}
