import { CGameState } from "./GameState";
import { CVideoMenuState } from "./VideoMenuState";
import { CAudioMenuState } from "./AudioMenuState";
import { CScene } from "./Scene";
import { CStarfield } from "./Starfield";
import { CApplication } from "./Application";
import { Controls } from "./Controls";
import { Enums } from "./Enums";
import { Point } from "./Point";
import { Options } from "./Options";
import { CControlmenustate } from "./Controlmenustate";

export class COptionsMenuState extends CGameState {

    m_options: Options;
    m_controlMenuState: CControlmenustate;
    m_videoMenuState: CVideoMenuState;
    m_audioMenuState: CAudioMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?, menu?) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;
        this.m_menu = menu;

        this.m_controlMenuState = new CControlmenustate(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);
        this.m_videoMenuState = new CVideoMenuState(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);
        this.m_audioMenuState = new CAudioMenuState(scene, starfield, font8x8, font16x16, app, ctx, menuState, menu, this);

        this.m_stateName = "OptionsMenuState";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public create(): boolean {

        this.m_menu.clear();
        this.m_menu.addSelection("Control Options");
        this.m_menu.addSelection("Video Options");
        this.m_menu.addSelection("Audio Options");
        //this.m_menu.addSeperator();
        this.m_menu.addSelection("Back To Main Menu");
        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new Point(0, 150));
        this.m_menu.setSpacing(new Point(0, 30));
        // this.m_menu.setCurrentItem(Enums.OptionsMenuItem.OM_BACK);
        this.m_menu.setFont(this.m_medium_font);

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
        this.m_medium_font.justifyString("Options Menu");
        this.m_menu.draw(ctx);

        var item: Enums.OptionsMenuItem = <Enums.OptionsMenuItem>this.m_menu.getCurrentItem();

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;
            switch (item) {
                case Enums.OptionsMenuItem.OM_CONTROL:
                    this.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_controlMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_controlMenuState);
                case Enums.OptionsMenuItem.OM_VIDEO:
                    this.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_videoMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_videoMenuState);
                case Enums.OptionsMenuItem.OM_AUDIO:
                    this.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
                    this.m_audioMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_audioMenuState);
                case Enums.OptionsMenuItem.OM_BACK:
                    this.playSample(Enums.GameSampleType.SAMPLE_MENU_BACK);
                    this.m_mainMenuState.create();
                    return this.changeState(this.m_app.instance = this.m_mainMenuState);
                    //return this.changeState(this.m_mainMenuState.instance());
            }
        }
        if (controls.up) {
            controls.up = false;
            this.m_menu.scroll(-1);
            this.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }

        if (controls.down) {
            controls.down = false;
            this.m_menu.scroll(1);
            this.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
        }
        return true;
    }

    //-------------------------------------------------------------
}
