import { CEngine } from "./Engine";
import { CScene } from "./Scene";
import { Enums } from "./Enums";
import { CShip } from "./Ship";

export class CShipEngine extends CEngine {

    constructor(theScene: CScene) {
        super(theScene);
        this.m_name = "ShipEngine";
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_SHIP_ENGINE);
    }

    //-------------------------------------------------------------

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.getOwner() && this.getOwner().getActorInfo().m_type == Enums.ActorType.ACTOR_TYPE_SHIP &&
            (<CShip>this.getOwner()).isCloaked())
            return true;

        if (this.m_thrust > 0) {
            this.animate(Enums.AnimationMode.ANIMATE_LOOP);
            this.draw(ctx);
        }
        return false;
    }
}
