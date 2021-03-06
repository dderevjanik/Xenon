﻿import { CAlien } from "./Alien";
import { CPlayGameState } from "./PlayGameState";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { Enums } from "./Enums";
import { CHighDensityDustEffect } from "./HighDensityDustEffect";
import { CDustEffect } from "./DustEffect";
import { gsCVector } from "./Vector";
import { CStandardDustEffect } from "./StandardDustEffect";
import { CExploder } from "./Exploder";
import { ActorInfo } from "./ActorInfo";

export module Asteroid {

    export class CAsteroid extends CAlien {

        constructor(playGameState: CPlayGameState) { /// Need the Options ref's
            super();
            this.m_playGameState = playGameState;
            this.m_name = "Asteroid";
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
            this.gameTime = gameTime;
            if (this.m_shield == 0) {
                this.fragment();
                return true;
            }

            this.m_position.plusEquals(this.m_velocity);
            this.animate(Enums.AnimationMode.ANIMATE_LOOP);
            return true;
        }

        //-------------------------------------------------------------

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CSmallStandardAsteroid extends CAsteroid {

        m_name = "SmallStandardAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SMALL_STANDARD_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var explode = new CExploder(this);
            this.kill();
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ASTEROID_BREAKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSmallHighDensityAsteroid extends CAsteroid {

        m_name = "SmallHighDensityAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SMALL_HIGHDENSITY_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var explode = new CExploder(this);
            this.kill();
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ASTEROID_BREAKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CSmallIndestructibleAsteroid extends CAsteroid {

        m_name = "CSmallIndestructibleAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SMALL_INDESTRUCTIBLE_ASTEROID);
        }
        //-------------------------------------------------------------
        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CMediumStandardAsteroid extends CAsteroid {

        m_name = "MediumStandardAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MEDIUM_STANDARD_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var child1: CAsteroid = new CSmallStandardAsteroid(this.m_playGameState);
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CSmallStandardAsteroid(this.m_playGameState);
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(1.0, 1.0));
            child2.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX))
            //{
            var de: CDustEffect = new CStandardDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
        }
    }

    //-------------------------------------------------------------

    export class CMediumHighDensityAsteroid extends CAsteroid {

        m_name = "MediumHighDensityAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MEDIUM_HIGHDENSITY_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var child1: CAsteroid = new CSmallHighDensityAsteroid(this.m_playGameState);
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CSmallHighDensityAsteroid(this.m_playGameState);
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(1.0, 1.0));
            child2.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CHighDensityDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ASTEROID_BREAKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CMediumIndestructibleAsteroid extends CAsteroid {

        m_name = "MediumIndestructibleAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MEDIUM_INDESTRUCTIBLE_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------

    export class CBigStandardAsteroid extends CAsteroid {

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BIG_STANDARD_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var child1: CAsteroid = new CMediumStandardAsteroid(this.m_playGameState);
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.5);

            var child2: CAsteroid = new CMediumStandardAsteroid(this.m_playGameState);
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(0.0, 1.3));
            child2.increaseScoreMultiplier(0.5);

            var child3: CAsteroid = new CMediumStandardAsteroid(this.m_playGameState);
            this.m_scene.addActor(child3);
            child3.activate();
            child3.setPosition(this.getPosition());
            child3.setVelocity(new gsCVector(1.0, 1.0));
            child3.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CStandardDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ASTEROID_BREAKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CBigHighDensityAsteroid extends CAsteroid {

        m_name = "BigHighDensityAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BIG_HIGHDENSITY_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
            var child1: CAsteroid = new CMediumHighDensityAsteroid(this.m_playGameState);
            this.m_scene.addActor(child1);
            child1.activate();
            child1.setPosition(this.getPosition());
            child1.setVelocity(new gsCVector(-1.0, 1.0));
            child1.increaseScoreMultiplier(0.50);

            var child2: CAsteroid = new CMediumHighDensityAsteroid(this.m_playGameState);
            this.m_scene.addActor(child2);
            child2.activate();
            child2.setPosition(this.getPosition());
            child2.setVelocity(new gsCVector(0.0, 1.3));
            child2.increaseScoreMultiplier(0.5);

            var child3: CAsteroid = new CMediumHighDensityAsteroid(this.m_playGameState);
            this.m_scene.addActor(child3);
            child3.activate();
            child3.setPosition(this.getPosition());
            child3.setVelocity(new gsCVector(1.0, 1.0));
            child3.increaseScoreMultiplier(0.5);

            //if (Options.getOption(OPTION_PARTICLEFX)) {
            var de: CDustEffect = new CHighDensityDustEffect();
            this.m_scene.addActor(de);
            de.activate();
            de.setOwner(null);
            de.setPosition(this.getPosition());
            de.setVelocity(new gsCVector(0.0, 0.0));
            de.setLifetime(0.5);
            //}

            this.kill();
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_ASTEROID_BREAKUP);//getPosition().getX());
        }
    }

    //-------------------------------------------------------------

    export class CBigIndestructibleAsteroid extends CAsteroid {

        m_name = "BigIndestructibleAsteroid";

        public getActorInfo(): ActorInfo {
            this.m_actorInfo = this.m_scene.GetlistOfActors();
            return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BIG_INDESTRUCTIBLE_ASTEROID);
        }

        //-------------------------------------------------------------

        public fragment(): void {
        }
    }

    //-------------------------------------------------------------
}
