import { CDustEffect } from "./DustEffect";
import { Enums } from "./Enums";
import { ActorInfo } from "./ActorInfo";

export class CStandardDustEffect extends CDustEffect {

    m_name = "StandardDustEffect";
    constructor() {
        super();
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_STANDARD_DUST_EFFECT);
    }
}
