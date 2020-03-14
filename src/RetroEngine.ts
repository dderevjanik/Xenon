import { CEngine } from "./Engine";
import { Enums } from "./Enums";
import { CActor } from "./Actor";
import { CActorInfoList } from "./ActorInfoList";

export class CRetroEngine extends CEngine {
    private m_direction: Enums.RetroDirection;
    //private m_actorInfo: CActorInfoList;

    act: CActor;
    m_name = "RetroEngine";

    public CRetroEngine(listOfActors: CActorInfoList) {
        this.m_direction = Enums.RetroDirection.RETRO_NW;
        this.m_actorInfo = listOfActors;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D) {
        //if (getOwner() &&  getOwner().getActorInfo().m_type == ACTOR_TYPE_SHIP &&
        //    ((CShip *) getOwner())->isCloaked())
        //    return true;

        if (this.m_thrust > 0) {
            switch (this.m_direction) {
                case Enums.RetroDirection.RETRO_NW:
                    this.animations(Enums.AnimationMode.ANIMATE_LOOP, 0, 2);
                    break;
                case Enums.RetroDirection.RETRO_NE:
                    this.animations(Enums.AnimationMode.ANIMATE_LOOP, 2, 2);
                    break;
                case Enums.RetroDirection.RETRO_SW:
                    this.animations(Enums.AnimationMode.ANIMATE_LOOP, 4, 2);
                    break;
                case Enums.RetroDirection.RETRO_SE:
                    this.animations(Enums.AnimationMode.ANIMATE_LOOP, 6, 2);
                    break;
            }

            super.Draw(ctx);
        }

        return true;
    }

    //-------------------------------------------------------------

    public setDirection(direction: Enums.RetroDirection) {
        this.m_direction = direction;
    }

    //-------------------------------------------------------------

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_RETRO_ENGINE);

    }
}
