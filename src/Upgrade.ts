import { CActor } from "./Actor";
import { gsCVector } from "./Vector";
import { CWeapon } from "./Weapon";
import { Enums } from "./Enums";
import { CPlayGameState } from "./PlayGameState";
import { CScene } from "./Scene";
import { CShip } from "./Ship";
import { gsCMap } from "./Map";
import { CMissileWeapon } from "./MissileWeapon";
import { CHomingMissileWeapon } from "./HomingMissileWeapon";
import { CLaserWeapon } from "./LaserWeapon";
import { Pickups } from "./Pickup";

export class CUpgrade extends CActor {

    //-------------------------------------------------------------
    UPGRADE_MAP_HIT: number = 10;			// energy lost if upgrade hits map
    //-------------------------------------------------------------

    m_offset: gsCVector;
    m_weapon: CWeapon;
    m_weapon_type: Enums.WeaponType;
    m_playGameState: CPlayGameState; // TODO: Should be protected

    constructor(scene?: CScene) {
        super(scene);
        this.m_offset = new gsCVector(0.0, 0.0);
        this.m_weapon = null;
        this.m_weapon_type = Enums.WeaponType.NO_WEAPON;
        this.m_name = "Upgrade";
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.setWeapon(Enums.WeaponType.MISSILE_WEAPON, 0);
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public kill(): void {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }
        super.kill();
    }

    //-------------------------------------------------------------

    public setOffset(offset: gsCVector): void {
        this.m_offset = offset;
    }

    //-------------------------------------------------------------

    public registerHit(energy: number, hitter: CActor): void {
        if (this.getOwner() && (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }
        super.registerHit(energy, hitter);
    }

    //-------------------------------------------------------------

    public onCollisionWithActor(actor: CActor): void {
        if (this.getOwner() &&
            (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }

        switch (actor.getActorInfo().m_type) {
            case Enums.ActorType.ACTOR_TYPE_PICKUP:
                const act = actor as Pickups.CPickup;
                act.collect();
                actor.kill();
                break;
            case Enums.ActorType.ACTOR_TYPE_ALIEN:
                this.registerHit(1, this);
                actor.registerHit(1, this);
                break;
        }
    }

    //-------------------------------------------------------------

    public onCollisionWithMap(map: gsCMap, hits: number): void {
        if (this.getOwner() &&
            (<CShip>this.getOwner()).getDiveLevel() > 0) {
            return;
        }
        this.registerHit(this.UPGRADE_MAP_HIT, this);
    }

    //-------------------------------------------------------------

    public setWeapon(type: Enums.WeaponType, grade: Enums.WeaponGrade): void {
        if (this.m_weapon) {
            this.m_weapon.kill();
            this.m_weapon = null;
        }

        this.m_weapon_type = type;

        switch (this.m_weapon_type) {
            case Enums.WeaponType.NO_WEAPON:
                this.m_weapon = null;
                break;
            case Enums.WeaponType.MISSILE_WEAPON:
                this.m_weapon = new CMissileWeapon(this.m_scene, this.m_playGameState);
                break;
            case Enums.WeaponType.HOMING_MISSILE_WEAPON:
                this.m_weapon = new CHomingMissileWeapon(this.m_scene, this.m_playGameState);
                break;
            case Enums.WeaponType.LASER_WEAPON:
                this.m_weapon = new CLaserWeapon(this.m_scene, this.m_playGameState);
                break;
        }

        if (this.m_weapon) {
            this.m_scene.addActor(this.m_weapon);
            this.m_weapon.activate();
            this.m_weapon.setGrade(grade);
            this.m_weapon.setOwner(this);
        }
    }

    //-------------------------------------------------------------

    public upgradeWeapon(): boolean {
        if (this.m_weapon && this.m_weapon.upgrade()) {
            return true;
        }
        return false;
    }

    //-------------------------------------------------------------

    public getWeapon(): CWeapon {
        return this.m_weapon;
    }

    //-------------------------------------------------------------

    public getWeaponType(): Enums.WeaponType {
        return this.m_weapon_type;
    }
}
