import { ActorInfo } from "./ActorInfo";
import { Enums } from "./Enums";
import { gsCVector } from "./Vector";

export class CActorInfoList {

    private INFINITE_SHIELD: number = -1;
    private m_info_list: Array<ActorInfo>;

    constructor() {
        this.m_info_list = [];
        this.m_info_list.push(new ActorInfo("ShieldPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUShield", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SpeedPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUSpeed", 32, 32, 16, 16, 2, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("WeaponPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUWeapon", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("CloakPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUInvuln", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("DivePickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUDive", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ScorePickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUScore", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ClonePickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "Clone1", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("WingtipPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "Wingtip", 32, 64, 16, 32, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MissilePickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PUMissil", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LaserPickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PULaser", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LifePickup", Enums.ActorType.ACTOR_TYPE_PICKUP, "PULife", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 50, new gsCVector(0, 0)));
        // aliens
        this.m_info_list.push(new ActorInfo("WallHugger", Enums.ActorType.ACTOR_TYPE_ALIEN, "wallhugger", 64, 64, 32, 32, 8, 5, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallStandardAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "SAster32", 32, 32, 16, 16, 16, 1, 10, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumStandardAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "SAster64", 64, 64, 32, 32, 12, 2, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigStandardAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "SAster96", 96, 96, 48, 48, 8, 3, 40, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallHighDensityAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "GAster32", 32, 32, 16, 16, 16, 2, 20, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumHighDensityAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "GAster64", 64, 64, 32, 32, 12, 4, 40, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigHighDensityAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "GAster96", 96, 96, 48, 48, 8, 4, 80, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmallIndestuctibleAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "MAster32", 32, 32, 16, 16, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumIndestuctibleAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "MAster64", 64, 64, 32, 32, 12, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigIndestuctibleAsteroid", Enums.ActorType.ACTOR_TYPE_ALIEN, "MAster96", 96, 96, 48, 48, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Rusher", Enums.ActorType.ACTOR_TYPE_ALIEN, "rusher", 64, 32, 32, 16, 16, 5, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Pod", Enums.ActorType.ACTOR_TYPE_ALIEN, "pod", 96, 96, 48, 48, 8, 10, 100, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Homer", Enums.ActorType.ACTOR_TYPE_ALIEN, "Homing", 64, 64, 32, 32, 16, 5, 100, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Drone", Enums.ActorType.ACTOR_TYPE_ALIEN, "drone", 32, 32, 16, 16, 16, 1, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("StandardLoner", Enums.ActorType.ACTOR_TYPE_ALIEN, "LonerA", 64, 64, 32, 32, 16, 2, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumLoner", Enums.ActorType.ACTOR_TYPE_ALIEN, "LonerB", 64, 64, 32, 32, 16, 4, 60, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("ArmouredLoner", Enums.ActorType.ACTOR_TYPE_ALIEN, "LonerC", 64, 64, 32, 32, 16, 6, 90, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("OrganicGun", Enums.ActorType.ACTOR_TYPE_ALIEN, "GShoot", 64, 64, 32, 32, 8, 5, 20, new gsCVector(0, 0)));
        // bullets
        this.m_info_list.push(new ActorInfo("Missile", Enums.ActorType.ACTOR_TYPE_BULLET, "missile", 16, 16, 8, 8, 0, this.INFINITE_SHIELD, 0, new gsCVector(10, 10)));
        this.m_info_list.push(new ActorInfo("HomingMissile", Enums.ActorType.ACTOR_TYPE_BULLET, "hmissile", 32, 32, 16, 16, 0, this.INFINITE_SHIELD, 0, new gsCVector(5, 5)));
        this.m_info_list.push(new ActorInfo("Laser", Enums.ActorType.ACTOR_TYPE_BULLET, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(20, 20)));
        this.m_info_list.push(new ActorInfo("HomerProjectile", Enums.ActorType.ACTOR_TYPE_ALIENBULLET, "HomProjc", 16, 16, 8, 8, 0, 1, 50, new gsCVector(3, 3)));
        this.m_info_list.push(new ActorInfo("Spinner", Enums.ActorType.ACTOR_TYPE_ALIENBULLET, "EnWeap6", 16, 16, 8, 8, 16, this.INFINITE_SHIELD, 0, new gsCVector(5, 5)));
        this.m_info_list.push(new ActorInfo("Spore", Enums.ActorType.ACTOR_TYPE_ALIENBULLET, "SporesA", 16, 16, 8, 8, 8, 1, 5, new gsCVector(1.5, 1.5)));
        // weapons
        this.m_info_list.push(new ActorInfo("MissileWeapon", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HomingMissileWeapon", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("LaserWeapon", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HomerProjectileWeapon", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SpinnerWeapon", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // ship
        this.m_info_list.push(new ActorInfo("Ship", Enums.ActorType.ACTOR_TYPE_SHIP, "Ship2", 64, 64, 32, 32, 0, 100, 0, new gsCVector(0, 0)));
        // upgrades
        this.m_info_list.push(new ActorInfo("Clone", Enums.ActorType.ACTOR_TYPE_UPGRADE, "Clone1", 32, 32, 16, 16, 8, 50, 50, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Wingtip", Enums.ActorType.ACTOR_TYPE_UPGRADE, "Wingtip", 32, 64, 16, 32, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // engines
        this.m_info_list.push(new ActorInfo("ShipEngine", Enums.ActorType.ACTOR_TYPE_ENGINE, "Burner1", 16, 32, 8, 0, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("CloneEngine", Enums.ActorType.ACTOR_TYPE_ENGINE, "Burner2", 32, 32, 16, 0, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("RetroEngine", Enums.ActorType.ACTOR_TYPE_ENGINE, "Retros", 32, 32, 16, 16, 10, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // effects
        this.m_info_list.push(new ActorInfo("SmallExplosion", Enums.ActorType.ACTOR_TYPE_ALIEN, "explode16", 16, 16, 8, 8, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("MediumExplosion", Enums.ActorType.ACTOR_TYPE_ALIEN, "explode32", 32, 32, 16, 16, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BigExplosion", Enums.ActorType.ACTOR_TYPE_ALIEN, "explode64", 64, 64, 32, 32, 40, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("StandardDustEffect", Enums.ActorType.ACTOR_TYPE_EFFECT, "SDust", 4, 4, 2, 2, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("HighDensityDustEffect", Enums.ActorType.ACTOR_TYPE_EFFECT, "GDust", 4, 4, 2, 2, 16, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SmokeEffect", Enums.ActorType.ACTOR_TYPE_EFFECT, "smoke", 32, 32, 16, 16, 8, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("Label", Enums.ActorType.ACTOR_TYPE_LABEL, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // generators
        this.m_info_list.push(new ActorInfo("DroneGenerator", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 30, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("RusherGenerator", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("SporeGenerator", Enums.ActorType.ACTOR_TYPE_WEAPON, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        // boss
        this.m_info_list.push(new ActorInfo("BossMouth", Enums.ActorType.ACTOR_TYPE_BOSS, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BossEye", Enums.ActorType.ACTOR_TYPE_BOSS, "bosseyes2", 32, 32, 16, 16, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
        this.m_info_list.push(new ActorInfo("BossControl", Enums.ActorType.ACTOR_TYPE_BOSS, "", 0, 0, 0, 0, 0, this.INFINITE_SHIELD, 0, new gsCVector(0, 0)));
    }

    //-------------------------------------------------------------

    public GetActorInfoListItem(index: number) {
        return this.m_info_list[index];
    }

    //-------------------------------------------------------------

    public GetActorSpeed(index: number) {
        return this.m_info_list[index].m_speed;
    }

    //-------------------------------------------------------------

    public GetTileWidth(index: number) {
        return this.m_info_list[index].m_tile_width;
    }

    //-------------------------------------------------------------

    public GetTileHeight(index: number) {
        return this.m_info_list[index].m_tile_height;
    }

    //-------------------------------------------------------------

    // Method to return the Actor Image File Names
    public GetActorTextureName() {
        var names = [];

        for (var i = 0; i < this.m_info_list.length; i++) {
            var split: ActorInfo = this.m_info_list[i];
            var fname: string = split.m_filename;
            names.push(fname);
        }
        return names;
    }

    //-------------------------------------------------------------

    // Instantiate a new Actor's information and push into an array
    AddValues(name: string, actorType: Enums.ActorType, info: string, one: number, two: number, three: number, four: number, five: number, shield: number, six: number, vector: gsCVector) {
        var temp = [];
        temp.push(name, actorType, info, one, two, three, four, five, shield, six, vector);
        return temp;
    }
}
