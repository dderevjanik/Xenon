import { CDustEffect } from "./DustEffect";
import { Enums } from "./Enums";
import { ActorInfo } from "./ActorInfo";

export class CHighDensityDustEffect extends CDustEffect {

    constructor() {
        super();
        this.m_name = "HighDensityDustEffect";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_HIGHDENSITY_DUST_EFFECT);
    }
}
