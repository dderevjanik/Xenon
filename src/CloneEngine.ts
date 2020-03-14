import { CEngine } from "./Engine";
import { CScene } from "./Scene";
import { Enums } from "./Enums";
import { CShip } from "./Ship";
import { ActorInfo } from "./ActorInfo";

export class CCloneEngine extends CEngine {

    constructor(theScene: CScene) {
        super(theScene);
        this.m_name = "CloneEngine";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_CLONE_ENGINE);
    }

    //-------------------------------------------------------------

    public draw(ctx: CanvasRenderingContext2D): boolean {
        if (this.getOwner() != null && this.getOwner().getOwner() != null &&
            this.getOwner().getOwner().getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP &&
            (<CShip>this.getOwner().getOwner()).isCloaked())
            return true;

        if (this.m_thrust > 0) {
            this.animate(Enums.AnimationMode.ANIMATE_LOOP);
            super.Draw(ctx);
        }
        return true;
    }
}
