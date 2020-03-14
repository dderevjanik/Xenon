import { CUpgrade } from "./Upgrade";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { CShip } from "./Ship";
import { CExploder } from "./Exploder";
import { ActorInfo } from "./ActorInfo";

export class CWingtip extends CUpgrade {

    //-------------------------------------------------------------

    WINGTIP_FRAMES: number = 8;
    WINGTIP_DIVE_OFFSET: number = 8;
    WINGTIP_DIVE_FRAMES: number = 3;
    WINGTIP_CLOAK_FRAME: number = 11;

    //-------------------------------------------------------------

    SHIP_DIVE_FRAMES = 6;

    //-------------------------------------------------------------

    constructor() {
        super();
        this.m_name = "Wingtip";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_WINGTIP);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive()) {
            this.m_timer.start();
        }
        return super.activate();
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gametime: GameTime): boolean {
        var ship: CShip = <CShip>this.getOwner();

        if (!ship) {
            this.kill();
            return true;
        }

        if (this.getShield() == 0) {
            ship.detachWingtip(this);
            this.setOwner(null);
            var explode = new CExploder(this);
            this.kill();
            return true;
        }

        var d: number = ship.getDiveLevel();

        if (d == 0) {
            this.m_position = ship.getPosition().plus1(this.m_offset);
            if (ship.isCloaked()) {
                if (!ship.isCloakFlashing()) {
                    this.m_sprite.setFrame(this.WINGTIP_CLOAK_FRAME);
                }
                else {
                    this.m_sprite.setFrame(0);
                }
            }
            else {
                this.animations(Enums.AnimationMode.ANIMATE_LOOP, 0, this.WINGTIP_FRAMES);
            }

        }
        else {
            this.m_position = ship.getPosition().plus1(this.m_offset).times1(ship.getDiveScale());
            this.m_sprite.setFrame(this.WINGTIP_DIVE_OFFSET + this.WINGTIP_DIVE_FRAMES * d / this.SHIP_DIVE_FRAMES);
        }

        return true;
    }

    //-------------------------------------------------------------

}
