import { CSmallExplosion } from "./SmallExplosion";
import { CMediumExplosion } from "./MediumExplosion";
import { CBigExplosion } from "./BigExplosion";
import { Point } from "./Point";
import { CExplosion } from "./Explosion";

export class CExploder {

    constructor(parent) {
        this.explode(parent);
    }

    //-------------------------------------------------------------

    private explode(parent): void {

        var x: CExplosion = null;

        if (parent.m_image != null) {
            var size: Point = parent.m_image.getTileSize();
            var area = size.X * size.Y;

            if (area <= 32 * 32) {
                x = new CSmallExplosion(parent.m_playGameState);
            }
            else if (area <= 64 * 64) {
                x = new CMediumExplosion(parent.m_playGameState);
            }
            else {
                x = new CBigExplosion(parent.m_playGameState);
            }

            parent.m_scene.addActor(x);
            x.setPosition(parent.getPosition());
            x.activate();
        }
    }

    //-------------------------------------------------------------

}
