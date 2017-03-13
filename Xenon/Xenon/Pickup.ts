﻿import CActor = require("Actor");
import CShip = require("Ship");
import Controls = require("Controls");
import enums = require("Enums");
import gsCTimer = require("Timer");

export = Pickups;
module Pickups {

    export class CPickup extends CActor {

        CLOAK_TIME: number = 5.0;			// total length of cloaking

        constructor() {
            super();
        }

        public activate() {
            if (!this.isActive())
                this.m_timer.start();

            return super.activate();
        }

        public update(controls: Controls, gametime: gsCTimer) {
            this.animate(enums.AnimationMode.ANIMATE_LOOP);
            return true;
        }

        public onLeavingScreen() {
            this.kill();
        }

        public collect() {
        }
    }

    //-------------------------------------------------------------

    export class CClonePickup extends CPickup {

        CLONE_FRAMES: number = 16;

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLONE_PICKUP);
        }

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "CLONE");

            if (this.getPosition().X <= ship.getPosition().X)
                ship.attachClone(-1);
            else
                ship.attachClone(1);

            //CGameState::playSample(SAMPLE_PICKUP, getPosition().getX());
        }

        public update(controls: Controls, gametime: gsCTimer) {
            this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, this.CLONE_FRAMES);
            return true;
        }
    }

    //-------------------------------------------------------------

    export class CDivePickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_DIVE_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "DIVE");
            //CPlayGameState::getPlayer().diveBonus();
            //CGameState::playSample(SAMPLE_BONUS, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CHomingMissilePickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_HOMING_MISSILE_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            //this.m_scene.createLabel(this.getPosition(), "HOMING MISSILE");
            //ship.addWeapon(enums.WeaponType.HOMING_MISSILE_WEAPON);
            //CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CCloakPickup extends CPickup {


        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_CLOAK_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "CLOAK");
            ship.setCloak(this.CLOAK_TIME);
            //CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CLaserPickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_LASER_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "LASER");
            ship.addWeapon(enums.WeaponType.LASER_WEAPON);
            //CGameState::playSample(SAMPLE_PICKUP,getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CScorePickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SCORE_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), this.getActorInfo().m_kill_bonus.toString());
            //CPlayGameState::getPlayer() ->scoreBonus(getActorInfo().m_kill_bonus);
            //CGameState::playSample(SAMPLE_BONUS, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CShieldPickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SHIELD_PICKUP);
        }

        public collect() {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "SHIELD UP");
            var max: number = ship.getActorInfo().m_initial_shield;
            var new_shield: number = ship.getShield() + max / 2;

            if (new_shield > max)
                new_shield = max;

            ship.setShield(new_shield);
            //CGameState::playSample(SAMPLE_PICKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSpeedPickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_SPEED_PICKUP);
        }

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            switch (ship.getHandling()) {
                case enums.ShipHandling.HANDLING_BAD:
                    ship.setHandling(enums.ShipHandling.HANDLING_NORMAL);
                    this.m_scene.createLabel(this.getPosition(), "SPEED UP");
                    break;
                case enums.ShipHandling.HANDLING_NORMAL:
                    ship.setHandling(enums.ShipHandling.HANDLING_GOOD);
                    this.m_scene.createLabel(this.getPosition(), "SPEED UP");
                    break;
            }
            //CGameState::playSample(SAMPLE_PICKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CWeaponPickup extends CPickup {

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WEAPON_PICKUP);
        }

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            if (ship.upgradeWeapon()) {
                this.m_scene.createLabel(this.getPosition(), "WEAPON UP");
            } else {
                this.m_scene.createLabel(this.getPosition(), "WEAPON FULL");
            }
            //CGameState::playSample(SAMPLE_PICKUP, getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CWingtipPickup extends CPickup {
        WINGTIP_FRAMES: number = 8;

        public getActorInfo() {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(enums.ActorInfoType.INFO_WINGTIP_PICKUP);
        }

        public collect(): void {
            var ship: CShip = this.m_scene.findShip();

            if (!ship)
                return;

            this.m_scene.createLabel(this.getPosition(), "WINGTIP");
            if (this.getPosition().X <= ship.getPosition().X) {
                ship.attachWingtip(-1);
            } else {
                ship.attachWingtip(1);
            }
            //CGameState::playSample(SAMPLE_PICKUP, getPosition().getX());
        }

        public update(controls: Controls, gametime: gsCTimer) {
            this.animations(enums.AnimationMode.ANIMATE_LOOP, 0, this.WINGTIP_FRAMES);
            return true;
        }
    }

    //-------------------------------------------------------------
}