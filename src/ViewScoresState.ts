import { CGameState } from "./GameState";
import { CScene } from "./Scene";
import { CStarfield } from "./Starfield";
import { CApplication } from "./Application";
import { Controls } from "./Controls";
import { Enums } from "./Enums";
import { Point } from "./Point";
import { CMainMenuState } from "./MainMenuState";

export class CViewScoresState extends CGameState {

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menu?: CMainMenuState) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menu;

        this.m_stateName = "VViewScoresState";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        this.m_score_table.setCurrentItem(-1);
        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: Controls): boolean {

        if (this.m_options.getOption(Enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);

        this.m_medium_font.setTextCursor(new Point(0, 50));
        this.m_medium_font.justifyString("Xenon 2000 High Scores");
        this.m_score_table.draw(this.m_medium_font, ctx);
        this.m_medium_font.setTextCursor(new Point(0, 450));
        this.m_medium_font.justifyString("Press Fire For Main Menu");

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;

            super.playSample(Enums.GameSampleType.SAMPLE_MENU_BACK);
            return this.changeState(this.m_app.instance = this.m_mainMenuState);
        }

        return true;
    }

    //-------------------------------------------------------------

}
