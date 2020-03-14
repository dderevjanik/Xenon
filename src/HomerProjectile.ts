import { CBullet } from "./Bullet";
import { Enums } from "./Enums";
import { CExploder } from "./Exploder";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";

export class CHomerProjectile extends CBullet {

    m_name = "HomerProjectile";

    public getActorInfo() {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_HOMER_PROJECTILE);
    }

    //-------------------------------------------------------------
    public update(controls: Controls, gametime: GameTime): boolean {
        if (this.m_shield == 0) {
            var explode = new CExploder(this);
            this.kill();
            return true;
        }

        this.m_position.plusEquals(this.m_velocity);
        var num_frames = this.m_image.getNumTiles();
        var frame = (this.getDirection(num_frames) + 3) & (num_frames - 1);
        this.m_sprite.setFrame((this.getDirection(num_frames) + 3) & (num_frames - 1));
        return true;
    }

    //-------------------------------------------------------------

    public set Name(value: string) {
        this.m_name = value;
    }

}
