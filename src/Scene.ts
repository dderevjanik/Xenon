﻿import { CActorInfoList } from "./ActorInfoList";
import { gsCCollisionList } from "./CollisionList";
import { gsCMap } from "./Map";
import { gsCScreen } from "./Screen";
import CLevel from "./Level";
import { gsCVector } from "./Vector";
import { CActor } from "./Actor";
import { CApplication } from "./Application";
import { gsCTiledImage } from "./TiledImage";
import { gsCRectangle } from "./Rectangle";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CShip } from "./Ship";
import { CLabel } from "./Label";
import { CSmallExplosion } from "./SmallExplosion";
import { Point } from "./Point";

export class CScene {

    private m_textures: Array<HTMLImageElement>;
    private m_listOfActors: CActorInfoList;

    //gsCList<CActor *> m_actor_list;
    //gsCList<ImageEntry *> m_image_list;
    private m_collision_list: gsCCollisionList;
    private m_frame_count: number;
    private m_map: gsCMap;
    private m_screen: gsCScreen;
    private lev: CLevel;
    private m_checkpoint_active: boolean;
    private m_checkpoint: gsCVector;
    private m_is_warping: boolean;
    private m_ship_is_cloaked: boolean;
    private m_actor_list: CActor[];
    private m_even: boolean = false;
    private time: number = 0;

    //temp!
    private m_font: HTMLImageElement;
    private m_application: CApplication;

    private COLLIDE_WITH_SHIP: number = 1;
    private COLLIDE_WITH_BULLETS: number = 2;

    constructor(image: HTMLImageElement, textures: Array<HTMLImageElement>, listOfActors: CActorInfoList, application: CApplication) {
        this.m_textures = textures;
        this.m_listOfActors = listOfActors;
        this.m_application = application;

        this.m_frame_count = 0;
        this.m_checkpoint_active = false;
        this.m_is_warping = false;
        this.m_actor_list = [];
        this.m_collision_list = new gsCCollisionList();
        //m_screen = new gsCScreen();
        this.lev = new CLevel(image, application);
    }

    //-------------------------------------------------------------

    public getImage(filename: string): gsCTiledImage {
        if (filename == "") {
            return null;
        }

        for (var i = 0; i < this.m_textures.length; i++) {
            if (this.m_textures[i] != null) {
                var name = this.m_textures[i].id;
                //console.log(name);
                var temp = name.split(".")
                if (temp[0].toLowerCase() == filename.toLowerCase()) {
                    // gsCTiledImage tile = new gsCTiledImage(name.Value, m_font);
                    var tile: gsCTiledImage = new gsCTiledImage(this.m_textures[i]);
                    tile.setTileSize(new Point(this.m_listOfActors.GetTileWidth(i), this.m_listOfActors.GetTileHeight(i)));
                    //this.m_image_list.Add(tile);
                    return tile;
                }
            }
        }
        return null;
    }

    //-------------------------------------------------------------

    loadImages() {
        //for (var i = 0; i < ActorInfoType.INFO_TOTAL; i++) {
        //    //gsCTiledImage image = getImage(m_listOfActors.GetFileName(i));
        //    var image = this.getImage(m_listOfActors.GetFileName(i));

        //    if (image != null) {
        //        image.setTileSize(new Point(m_listOfActors.GetTileWidth(i),
        //            this.m_listOfActors.GetTileHeight(i)));

        //        //			image->enableColourKey(gsCColour(gsMAGENTA));       Ian test !
        //    }
        //}

        return true;
    }

    //-------------------------------------------------------------

    public addToCollisionList(actor: CActor, rect: gsCRectangle): void {
        switch (actor.getActorInfo().m_type) {
            case Enums.ActorType.ACTOR_TYPE_SHIP:
                if (this.m_ship_is_cloaked) //<!--  added by Ian 4/3/7 -> cloaking still enabled ....
                    break;
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_SHIP),
                    (1 << Enums.ActorType.ACTOR_TYPE_PICKUP) | (1 << Enums.ActorType.ACTOR_TYPE_ALIEN));
                break;
            case Enums.ActorType.ACTOR_TYPE_UPGRADE:
                if (this.m_ship_is_cloaked)
                    break;
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_UPGRADE),
                    (1 << Enums.ActorType.ACTOR_TYPE_PICKUP) | (1 << Enums.ActorType.ACTOR_TYPE_ALIEN));
                break;
            case Enums.ActorType.ACTOR_TYPE_BULLET:
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_BULLET),
                    (1 << Enums.ActorType.ACTOR_TYPE_ALIEN) | (1 << Enums.ActorType.ACTOR_TYPE_ALIENBULLET));
                break;
            case Enums.ActorType.ACTOR_TYPE_ALIENBULLET:
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_ALIENBULLET),
                    (1 << Enums.ActorType.ACTOR_TYPE_SHIP));
                break;
            case Enums.ActorType.ACTOR_TYPE_ALIEN:
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_ALIEN),
                    0);
                break;
            case Enums.ActorType.ACTOR_TYPE_PICKUP:
                this.m_collision_list.addObject(actor,
                    rect,
                    (1 << Enums.ActorType.ACTOR_TYPE_PICKUP),
                    0);
                break;
            case Enums.ActorType.ACTOR_TYPE_WEAPON:
            case Enums.ActorType.ACTOR_TYPE_ENGINE:
            case Enums.ActorType.ACTOR_TYPE_LABEL:
            case Enums.ActorType.ACTOR_TYPE_EFFECT:
                // no collision detection
                break;
        }
    }

    //-------------------------------------------------------------

    public updateActorsOfType(type: Enums.ActorType, controls: Controls, gameTime: GameTime) {
        for (var j = 0; j < this.m_actor_list.length; j++) {
            var obj = this.m_actor_list[j];
            if (obj.isActive() && obj.getActorInfo().m_type == type) {

                //if (obj.name == "MissileWeapon") {// "HomingMissileWeapon") {
                if (obj.name == "Boss Mouth") {
                    var breakhere = true;

                }
                obj.update(controls, gameTime);
            }
        }
    }

    //-------------------------------------------------------------

    public updateAllActors(controls: Controls, gameTime: GameTime): void {
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_SHIP, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_UPGRADE, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIEN, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_WEAPON, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_ENGINE, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIENBULLET, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_BULLET, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_PICKUP, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_LABEL, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_EFFECT, controls, gameTime);
        this.updateActorsOfType(Enums.ActorType.ACTOR_TYPE_BOSS, controls, gameTime);
        controls.fire = false;
    }

    //-------------------------------------------------------------
    // Draw all active game actors - prioritized
    public drawAllActors(ctx: CanvasRenderingContext2D, map: gsCMap): void {

        this.m_map = map;
        this.m_frame_count++;
        this.m_collision_list.clear();
        var total = this.m_actor_list.length;//.getSize();
        var ship = this.findShip();

        this.m_ship_is_cloaked = ship && ship.isCloaked();

        if (ship && ship.getDiveLevel() != 0) {
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ENGINE, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_SHIP, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_UPGRADE, total, ctx);
            this.m_map.drawMap(ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_EFFECT, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_PICKUP, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIEN, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIENBULLET, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_BULLET, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_WEAPON, total, ctx);
            //this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_LABEL, total, ctx);
        }
        else {
            this.m_map.drawMap(ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_EFFECT, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_PICKUP, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIEN, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ALIENBULLET, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_BULLET, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_ENGINE, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_SHIP, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_UPGRADE, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_WEAPON, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_LABEL, total, ctx);
            this.drawActorsOfType(Enums.ActorType.ACTOR_TYPE_BOSS, total, ctx);
        }
    }

    //-------------------------------------------------------------

    // Main draw method for all Actors
    drawActorsOfType(type: Enums.ActorType, total: number, ctx: CanvasRenderingContext2D): void {
        for (var j = 0; j < this.m_actor_list.length; j++) {
            var act = this.m_actor_list[j];
            if (act.isActive() && act.getActorInfo().m_type == type) {

                if (act.name == "Spinner") {
                    var breakHere = true;
                }

                if (act.name != "MissileWeapon" && act.name != "DroneGenerator" && act.name != "SpinnerWeapon" && act.name != "HomingMissileWeapon" && act.name != "Weapon") {
                    act.Draw(ctx);
                }
            }
        }
    }

    //-------------------------------------------------------------

    public actorCollisionCallback(object1: Object, object2: Object): void {

        var actor1: CActor = <CActor>object1;
        var actor2: CActor = <CActor>object2;

        if (!actor1.isActive() ||
            !actor2.isActive())
            return;

        if (actor1.name == "laser") {
            var breakHere = true;
        }

        actor1.onCollisionWithActor(actor2);
    }

    //-------------------------------------------------------------

    public checkActorCollisions(): void {
        this.m_collision_list.scan(this.actorCollisionCallback);
        for (var i = 0; i < this.m_actor_list.length; i++) {
            if (this.m_actor_list[i].isActive()) {
                this.m_actor_list[i].postProcessCollision();
            }
        }
    }

    //-------------------------------------------------------------

    public checkMapCollisions(map: gsCMap): void {
        // check for collisions between actors and map
        for (var i = 0; i < this.m_actor_list.length; i++) {
            var actor: CActor = this.m_actor_list[i];
            if (actor.isActive()) {
                switch (actor.getActorInfo().m_type) {
                    case Enums.ActorType.ACTOR_TYPE_SHIP:
                    case Enums.ActorType.ACTOR_TYPE_UPGRADE:
                        if (this.m_ship_is_cloaked)
                            break;
                        {
                            var rect: gsCRectangle = actor.getCollisionRect();
                            //rect.move(-map.getPosition());
                            var hits = map.hitBy(rect, this.COLLIDE_WITH_SHIP);
                            if (hits > 0) {
                                actor.onCollisionWithMap(map, hits);
                            }
                        }
                        break;

                    case Enums.ActorType.ACTOR_TYPE_BULLET:
                    case Enums.ActorType.ACTOR_TYPE_ALIENBULLET:
                        {
                            var rect: gsCRectangle = actor.getCollisionRect();
                            //rect.move(-map.getPosition());
                            var hits = map.hitBy(rect, this.COLLIDE_WITH_BULLETS);
                            if (hits > 0) {
                                actor.onCollisionWithMap(map, hits);
                            }
                        }
                        break;
                }
            }
        }
    }

    //-------------------------------------------------------------

    public removeDeadActors(): void {
        var temp_actor_list = [];
        //for (var i = this.m_actor_list.length - 1; i >= 0; i--) {
        for (var i = 0; i < this.m_actor_list.length; i++) {
            if (this.m_actor_list[i].isActive()) {
                temp_actor_list.push(this.m_actor_list[i]);
            }
        }
        this.m_actor_list = [];
        this.m_actor_list = temp_actor_list;
    }

    //-------------------------------------------------------------

    public killAllActors(): void {

        for (var i = 0; i < this.m_actor_list.length; i++) {
            this.m_actor_list[i].kill();
        }

        for (i = 0; i < this.m_actor_list.length; i++) {
            delete this.m_actor_list[i];
        }

        this.m_actor_list = [];
    }

    //-------------------------------------------------------------

    public destroyAll() {

        this.m_actor_list = [];
        //this.m_image_list = [];

        //for (i = 0; i < m_actor_list.getSize(); i++)
        //    delete m_actor_list[i];

        //m_actor_list.clear();

        //for (i = 0; i < m_image_list.getSize(); i++) {
        //    m_image_list[i]->m_image.destroy();
        //    delete m_image_list[i];
        //    }

        //m_image_list.clear();
    }

    //-------------------------------------------------------------

    public findShip(): CShip | null {
        for (var i = 0; i < this.m_actor_list.length; i++) {
            if (this.m_actor_list[i].getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP) {
                return <CShip>this.m_actor_list[i];
            }
        }
        return null;
    }

    //-------------------------------------------------------------

    public createLabel(position: gsCVector, text: string /*, num?: number*/): void {
        var label: CLabel = new CLabel();
        this.addActor(label);

        label.activate();
        label.setFont(this.m_application.smallFont);
        label.setText(text);
        label.setPosition(position);
        label.setVelocity(new gsCVector(0.0, -1.25));
        label.setTime(0.5);
    }

    //-------------------------------------------------------------

    public createMapExplosion(map: gsCMap, position: Point): void {
        var exp: CSmallExplosion = new CSmallExplosion();
        this.addActor(exp);

        var tile_size: Point = map.getImage().getTileSize();
        var tile_centre: Point = new Point(tile_size.X / 2, tile_size.Y / 2);

        var pos: Point = new Point(position.X * tile_size.X + tile_centre.X, position.Y * tile_size.Y + tile_centre.Y);
        exp.setPosition(new gsCVector(pos.X, pos.Y));
        exp.activate();
    }

    //-------------------------------------------------------------

    public getActor(index: number): CActor {
        return this.m_actor_list[index];
    }

    //-------------------------------------------------------------

    public findNearestActor(type: Enums.ActorType, position: gsCVector, dir: number): CActor {
        var nearest_actor: CActor = null;
        var nearest_distance: number = 99999.0;

        for (var i = 0; i < this.m_actor_list.length; i++) {
            var actor: CActor = this.m_actor_list[i];
            if (actor.isActive() &&
                actor.getActorInfo().m_type == type) {
                if (dir != 0) {
                    var sy: number = position.Y;
                    var ay: number = actor.getPosition().Y;
                    if (dir < 0 && sy < ay)
                        continue;
                    if (dir > 0 && sy > ay)
                        continue;
                }

                var d: number = actor.getPosition().minus(position).length;
                if (nearest_actor == null || d < nearest_distance) {
                    nearest_actor = actor;
                    nearest_distance = d;
                }
            }
        }

        return nearest_actor;
    }

    //-------------------------------------------------------------

    public clearCheckpoint(): void {
        this.m_checkpoint_active = false;
    }

    //-------------------------------------------------------------

    public setNextCheckpoint(position: gsCVector): void {
        this.m_checkpoint = position;
        this.m_checkpoint_active = true;
    }

    //-------------------------------------------------------------

    public hasCheckpoint(): boolean {
        return this.m_checkpoint_active;
    }

    //-------------------------------------------------------------

    public getCheckpoint(): gsCVector {
        return this.m_checkpoint;
    }

    //-------------------------------------------------------------

    public getNumberOfActors(): number {
        return this.m_actor_list.length;
    }

    //-------------------------------------------------------------

    public addActor(actor: CActor): void {
        actor.setScene(this);
        this.m_actor_list.push(actor);
        console.log("Actor List Size : " + this.m_actor_list.length);
    }

    //-------------------------------------------------------------

    public removeActor(actor: CActor): void {
        actor.setScene(null);
        //this.m_actor_list.removeItem(actor);
    }

    //-------------------------------------------------------------

    public getNumberOfImages(): number {
        return 0;//this.m_image_list.length;
    }

    //-------------------------------------------------------------

    public setCollisionListSize(pixel_size: Point, zones: Point): void {
        this.m_collision_list.setSize(pixel_size, zones);
    }

    //-------------------------------------------------------------

    public setMap(map: gsCMap): void {
        this.m_map = map;
    }

    //-------------------------------------------------------------

    public getMap(): gsCMap {
        return this.m_map;
    }

    //-------------------------------------------------------------

    public getMapFrontLayer(): gsCMap {
        return this.lev.getMapFrontLayer();
    }

    //-------------------------------------------------------------

    public getMapBackLayer(): gsCMap {
        return this.lev.getMapBackLayer();
    }

    //-------------------------------------------------------------

    public setWarp(state: boolean): void {
        this.m_is_warping = state;
    }

    //-------------------------------------------------------------

    public isWarping(): boolean {
        return this.m_is_warping;
    }

    //-------------------------------------------------------------

    public GetLevel(): CLevel {
        return this.lev;
    }

    //-------------------------------------------------------------

    public GetlistOfActors(): CActorInfoList {
        return this.m_listOfActors;
    }

    //-------------------------------------------------------------

    public LevelLoaded(): boolean {
        return this.lev.LoadingComplete;
    }

    //-------------------------------------------------------------

    public get App(): CApplication {
        return this.m_application;
    }

    //-------------------------------------------------------------

}
