import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { CExplosion } from "./Explosion";
import { ActorInfo } from "./ActorInfo";

export class CMediumExplosion extends CExplosion {

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "MediumExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_MEDIUM_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (this.m_playGameState) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_MEDIUM_EXPLOSION);//getPosition().getX());
        }
        return super.activate();
    }
}
