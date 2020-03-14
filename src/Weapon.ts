import { CActor } from "./Actor";
import { Enums } from "./Enums";
import { gsCVector } from "./Vector";
import { GameTime } from "./Timer";
import { CPlayGameState } from "./PlayGameState";
import { CScene } from "./Scene";
import { Controls } from "./Controls";

export class CWeapon extends CActor {
    m_grade: Enums.WeaponGrade;
    m_offset: gsCVector;
    m_actor: CActor;
    m_fire_timer: GameTime;
    m_delay_fire: boolean;
    m_autofire_timer: GameTime;
    m_autofire: boolean;
    m_mode: Enums.WeaponFiringMode;
    m_direction: Enums.WeaponDirection;
    WEAPON_ONSCREEN_RADIUS: number;

    m_playGameState: CPlayGameState; // TODO: Should be protected
    protected do_fire: boolean = false;

    constructor(scene?: CScene) {
        super(scene);
        this.m_grade = Enums.WeaponGrade.WEAPON_STANDARD;
        this.m_offset = new gsCVector(0, 0);
        this.m_mode = Enums.WeaponFiringMode.WEAPON_AUTOMATIC;
        this.m_direction = Enums.WeaponDirection.WEAPON_FORWARD;
        this.m_position = new gsCVector(0, 0);
        this.WEAPON_ONSCREEN_RADIUS = 8;
        this.m_fire_timer = new GameTime();
        this.m_autofire_timer = new GameTime();
        this.m_name = "Weapon";
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_delay_fire = false;
            this.m_autofire = false;
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        //if (controls || !getOwner())
        //    return false;


        //if (this.m_name == "HomingMissileWeapon") {
        //    controls.fire = true;
        //}

        //this.m_position = this.getOwner().getPosition() + this.m_offset;
        this.m_position.x = this.getOwner().getPosition().x + this.m_offset.x;
        this.m_position.y = this.getOwner().getPosition().y + this.m_offset.y;

        if (this.m_mode == Enums.WeaponFiringMode.WEAPON_MANUAL) {
            return true;
        }

        switch (this.getOwner().getActorInfo().m_type) {
            case Enums.ActorType.ACTOR_TYPE_SHIP:
            case Enums.ActorType.ACTOR_TYPE_UPGRADE:

                //var do_fire: boolean = false;
                this.do_fire = false;

                if (this.m_autofire) {
                    if (controls.fire) {
                        if (this.m_autofire_timer.getTime() >= this.getActorInfo().m_autofire_delay) {
                            this.do_fire = true;
                            this.m_autofire_timer.start();
                        }
                    }
                    else {
                        this.m_autofire = false;
                        this.m_delay_fire = false;
                    }
                }

                if (controls.firePressed || (controls.fire && !this.m_autofire)) {
                    if (this.m_delay_fire) {
                        if (this.m_fire_timer.getTime() >= this.getActorInfo().m_fire_delay) {
                            this.m_delay_fire = false;
                        }
                    }
                    if (!this.m_delay_fire) {
                        this.do_fire = true;
                        this.m_delay_fire = true;
                        this.m_fire_timer.start();
                        if (this.getActorInfo().m_autofire_delay == 0.0) {
                            this.m_autofire = false;
                        }
                        else {
                            this.m_autofire = true;
                            this.m_autofire_timer.start();
                        }
                    }
                }

                //if (do_fire) {
                //    //var obj = this.getOwner();
                //    //this.getOwner();
                //    this.fire();
                //    controls.fire = false;
                //}
                break;

            case Enums.ActorType.ACTOR_TYPE_ALIEN:
                if (!this.m_delay_fire || this.m_fire_timer.getTime() >= this.getActorInfo().m_fire_delay) {
                    this.m_delay_fire = true;
                    this.m_fire_timer.start();
                    // This needs investigating !!! Cause of all the new objects being created !!!
                    //this.fire();
                    this.do_fire = true;
                }

                else {
                    this.do_fire = false;  /// 13/06/17
                }

                break;
        }

        return true;
    }

    //-------------------------------------------------------------

    public setGrade(grade: Enums.WeaponGrade): void {
        this.m_grade = grade;
    }

    //-------------------------------------------------------------

    public upgrade(): boolean {
        switch (this.m_grade) {
            case Enums.WeaponGrade.WEAPON_STANDARD:
                this.setGrade(Enums.WeaponGrade.WEAPON_MEDIUM);
                return true;
            case Enums.WeaponGrade.WEAPON_MEDIUM:
                this.setGrade(Enums.WeaponGrade.WEAPON_BEST);
                return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector): void {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public setFiringMode(mode: Enums.WeaponFiringMode): void {
        this.m_mode = mode;
    }

    //-------------------------------------------------------------

    public isValidFiringPosition(): boolean {
        //gsCScreen *screen = gsCApplication::getScreen();

        //if (!screen)
        //    return false;

        return true;

        // NYI
        /*
            Point pos = getOwner()->getPosition() + m_offset + m_map->getPosition();

            gsCRect rect(pos - Point(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS),
                         pos + Point(WEAPON_ONSCREEN_RADIUS,WEAPON_ONSCREEN_RADIUS));

            return screen->getRect().contains(rect);
        */
    }

    //-------------------------------------------------------------

    public setDirection(direction: Enums.WeaponDirection): void {
        this.m_direction = direction;
    }

    //-------------------------------------------------------------

    public getDirection(): Enums.WeaponDirection {
        return this.m_direction;
    }

    //-------------------------------------------------------------

    public fire(): boolean {
        return false;
    }

    //-------------------------------------------------------------

}
