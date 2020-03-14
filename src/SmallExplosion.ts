import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { CExplosion } from "./Explosion";

export class CSmallExplosion extends CExplosion {

    constructor(playGameState?: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "SmallExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SMALL_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        if (this.m_playGameState) {
            this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_SMALL_EXPLOSION);//getPosition().getX());
        }
        return super.activate();
    }
}
