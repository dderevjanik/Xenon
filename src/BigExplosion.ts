import { CPlayGameState } from "./PlayGameState";
import { Enums } from "./Enums";
import { CExplosion } from "./Explosion";

export class CBigExplosion extends CExplosion {

    constructor(playGameState: CPlayGameState) {
        super();
        this.m_playGameState = playGameState;
        this.m_name = "BigExplosion";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_BIG_EXPLOSION);
    }

    //-------------------------------------------------------------

    public activate() {
        this.m_playGameState.playSample(Enums.GameSampleType.SAMPLE_BIG_EXPLOSION);//getPosition().getX());
        return super.activate();
    }
}
