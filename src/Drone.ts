import { CAlien } from "./Alien";
import { CDroneGenerator } from "./DroneGenerator";
import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { Pickups } from "./Pickup";
import { CExploder } from "./Exploder";

export class CDrone extends CAlien {

    private m_generator: CDroneGenerator;
    private m_phase: number;

    constructor(playGameState: CPlayGameState, generator?: CDroneGenerator) {
        super();
        this.m_playGameState = playGameState;
        this.m_generator = generator;
        this.m_phase = 0.0;
        this.m_name = "Drone";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_DRONE);
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

        this.m_timer.update(false);

        if (this.m_shield == 0) {
            var score: number = this.m_generator.droneKilled(true);

            if (score == 0) {
                var s: Pickups.CScorePickup = new Pickups.CScorePickup(this.m_playGameState);
                this.m_scene.addActor(s);
                s.setPosition(this.getPosition());
                s.activate();
            }
            else {
                this.m_scene.createLabel(this.getPosition(), score.toString());
                this.m_playGameState.getPlayer().scoreBonus(score);
            }

            var explode = new CExploder(this);
            super.kill();
            return true;
        }

        this.m_position.X = this.m_generator.getPosition().X + 32.0 * Math.sin(((this.m_timer.getTime() / 60) + this.m_phase) * 180.0);
        this.m_position.Y = (this.m_position.Y + this.m_velocity.Y);

        super.animate(Enums.AnimationMode.ANIMATE_LOOP);

        return true;
    }

    //-------------------------------------------------------------

    public setPhase(p: number): void {
        this.m_phase = p;
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        this.m_generator.droneKilled(false);
        super.onLeavingScreen();
    }

    //-------------------------------------------------------------
}
