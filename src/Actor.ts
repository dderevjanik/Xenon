import { GameTime } from "./Timer";
import { CScene } from "./Scene";
import { gsCVector } from "./Vector";
import { gsCSprite } from "./Sprite";
import { gsCTiledImage } from "./TiledImage";
import { CActorInfoList } from "./ActorInfoList";
import { CApplication } from "./Application";
import { CPlayGameState } from "./PlayGameState";
import { gsCMap } from "./Map";
import { ActorInfo } from "./ActorInfo";
import { Controls } from "./Controls";
import { Enums } from "./Enums";
import { gsCRectangle } from "./Rectangle";

export class CActor {

    private ACTOR_HIT_TIME: number = 0.1;	// time in seconds for hit to register
    private INFINITE_SHIELD: number = -1;

    //-------------------------------------------------------------

    // TODO: Fix protected types, make getters
    protected m_owner: CActor;			        // owner
    protected m_is_active: boolean;
    protected m_hit_timer: GameTime;		    // for animation of hit
    m_scene: CScene;			        // scene containing this actor
    protected m_position: gsCVector;		    // relative to map
    protected m_velocity: gsCVector;
    protected m_shield: number;				    // shield strength
    protected m_sprite: gsCSprite;
    m_image: gsCTiledImage;
    protected m_timer: GameTime;			    // for animation
    protected m_is_on_screen: boolean;
    protected m_is_hit: boolean;
    protected m_score_multiplier: number;
    protected m_actorInfo: CActorInfoList;
    protected gameTime: GameTime;
    protected timerTest: number = 0.0;

    protected m_name: string = "";
    protected m_app: CApplication;
    m_playGameState: CPlayGameState;

    private frame: number = 0;

    constructor(theScene?: CScene) {
        this.m_scene = theScene;
        if (this.m_scene != null) {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
        }
        this.m_position = new gsCVector(0, 0);
        this.m_velocity = new gsCVector(0, 0);
        this.m_is_active = false;
        this.m_is_on_screen = true;
        this.m_is_hit = false;
        this.m_score_multiplier = 1.0;
        this.m_timer = new GameTime();
        this.m_hit_timer = new GameTime();
    }

    //-------------------------------------------------------------

    public isActive(): boolean {
        return this.m_is_active;
    }

    //-------------------------------------------------------------

    public getPosition(): gsCVector {
        return this.m_position;
    }

    //-------------------------------------------------------------

    public getVelocity(): gsCVector {
        return this.m_velocity;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCVector): void {
        this.m_position = new gsCVector(position.x, position.y);
    }

    //-------------------------------------------------------------

    public setVelocity(velocity: gsCVector): void {
        this.m_velocity = velocity;
    }

    //-------------------------------------------------------------

    public isOnScreen(): boolean {
        return this.m_is_on_screen;
    }

    //-------------------------------------------------------------

    public isHit(): boolean {
        return this.m_is_hit;
    }

    //-------------------------------------------------------------
    // Overridable
    //public getCollisionRect():gsCRect {
    //  return m_sprite.getRect();
    //}

    //-------------------------------------------------------------
    // Overridable
    public onLeavingScreen(): void {
        this.kill();
    }

    //-------------------------------------------------------------
    // Overridable
    public onCollisionWithActor(actor: CActor): void {
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number): void {
    }

    //-------------------------------------------------------------
    // Overridable
    public postProcessCollision(): void {
    }

    //-------------------------------------------------------------

    public setOwner(owner: CActor): void {
        this.m_owner = owner;
    }

    //-------------------------------------------------------------

    public setScene(scene: CScene): void {
        this.m_scene = scene;
    }

    //-------------------------------------------------------------

    public getOwner(): CActor {
        return this.m_owner;
    }

    //-------------------------------------------------------------

    public setShield(shield: number): void {
        this.m_shield = shield;
    }

    //-------------------------------------------------------------

    public getShield(): number {
        return this.m_shield;
    }

    //-------------------------------------------------------------

    public increaseScoreMultiplier(amount: number): void {
        this.m_score_multiplier += amount;
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.m_is_active) {
            var info: ActorInfo = this.getActorInfo();
            if (info.m_filename != "") {
                this.m_image = this.m_scene.getImage(info.m_filename);
            }
            else {
                this.m_image = null;
            }
            this.m_sprite = new gsCSprite();
            this.m_sprite.setImage(this.m_image);
            this.m_sprite.setHotspot(new gsCVector(info.m_hotspot_x, info.m_hotspot_y));
            this.m_sprite.setActive(this.m_image != null);
            this.m_shield = info.m_initial_shield;
            this.m_is_active = true;
            this.m_is_on_screen = false;
            this.m_is_hit = false;
        }
        return true;
    }

    //-------------------------------------------------------------

    public kill(): void {
        this.m_is_active = false;
    }

    //-------------------------------------------------------------

    public registerHit(energy: number, hitter: CActor): void {
        if (this.m_shield != this.INFINITE_SHIELD) {
            if (this.m_shield > 0) {
                this.m_shield -= energy;
                if (this.m_shield <= 0) {
                    this.m_shield = 0;
                    this.onKilled();
                }
            }

            this.m_is_hit = true;
            this.m_hit_timer.start();
        }
    }

    //-------------------------------------------------------------

    public onKilled(): void {
        var bonus = this.getActorInfo().m_kill_bonus;
        if (bonus > 0 && this.m_name != "Drone") {
            var score = bonus * this.m_score_multiplier;
            this.m_scene.App.playStateInstance.getPlayer().scoreBonus(score);
            this.m_scene.createLabel(this.getPosition(), score.toString());
        }
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        return true;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D): boolean {

        if (this.isActive() && this.m_image != null) {
            this.m_sprite.setPosition(new gsCVector(0, 0).plus(this.m_position, this.m_scene.getMapFrontLayer().getPosition()));

            if (this.m_is_hit) {
                if (this.m_hit_timer.getTime() > this.ACTOR_HIT_TIME) {
                    this.m_hit_timer.reset();
                    this.m_is_hit = false;
                }
            }

            if (this.m_is_hit) {
                var level = 255.0 * (1.0 - this.m_hit_timer.getTime() / this.ACTOR_HIT_TIME);
                //this.m_sprite.enableFillColour(Color(level, level, level));
            }
            else {
                this.m_sprite.disableFillColour();
            }

            var was_on_screen: boolean = this.m_is_on_screen;

            // ---> draw the Actor in the gsCSprite class
            this.m_is_on_screen = this.m_sprite.draw(ctx);

            if (was_on_screen && !this.m_is_on_screen) {
                this.onLeavingScreen();
            }

            if (this.m_is_on_screen) {
                this.m_scene.addToCollisionList(this, this.getCollisionRect());
            }
        }

        if (this.m_image == null) {
            console.log("Image is null !");
        }

        return true;
    }

    //-------------------------------------------------------------
    // animate over range of frames
    public animations(mode: Enums.AnimationMode, first_frame: number, num_frames: number): boolean {
        var finished = false;

        if (num_frames <= 1) {
            this.frame = 0;
        }
        else {
            //frame = (m_timer.getTime() * getActorInfo().m_anim_rate);
            switch (mode) {
                case Enums.AnimationMode.ANIMATE_LOOP:
                    this.frame = (this.frame + 1) % num_frames;
                    break;
                case Enums.AnimationMode.ANIMATE_ONESHOT:
                    if (this.frame >= num_frames - 1) {
                        this.frame = num_frames - 1;	// stay on last frame
                        finished = true;				// flag that we've finished
                        break;
                    }
                    this.frame++;
                    break;
            }
        }

        this.m_sprite.setFrame(first_frame + this.frame);
        return finished;
    }

    //-------------------------------------------------------------
    // animate over entire range
    public animate(mode: Enums.AnimationMode): boolean {
        return this.animations(mode, 0, this.m_image.getNumTiles());
    }

    //-------------------------------------------------------------
    // Convert velocity into a direction (0..num_dir-1)
    public getDirection(num_dir: number): number {
        if (this.m_velocity.length == 0) {
            return 0;
        }

        var angle = this.m_velocity.direction();
        var step = 360.0 / num_dir;
        return (((angle - step / 2.0 + 360.0) / step)) & (num_dir - 1);
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo | null {
        return null;
    }

    //-------------------------------------------------------------

    public getCollisionRect(): gsCRectangle {
        return this.m_sprite.getRect();
    }

    //-------------------------------------------------------------

    public get name(): string {
        return this.m_name;
    }
}
