import { CGameState } from "./GameState";
import { CScene } from "./Scene";
import { CStarfield } from "./Starfield";
import { CApplication } from "./Application";
import { Controls } from "./Controls";
import { Enums } from "./Enums";
import { Point } from "./Point";
import { CMainMenuState } from "./MainMenuState";

export class CCreditsState extends CGameState {

    private m_scroll_pos: number = 0;

    //-------------------------------------------------------------

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menu?: CMainMenuState) {
        super(font8x8, font16x16, app, ctx);
        this.m_starfield = starfield;
        this.m_mainMenuState = menu;
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public create(): boolean {
        this.m_scroll_pos = 680;//480;
        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: Controls): boolean {

        //	if (!CGameState::update())
        //		return false;

        if (this.m_options.getOption(Enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);

        this.m_medium_font.setTextCursor(new Point(0, 0 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Xenon 2000 : Project PCF");

        this.m_medium_font.setTextCursor(new Point(0, 50 + this.m_scroll_pos));
        this.m_medium_font.justifyString("A Bitmap Brothers Production");

        this.m_small_font.setTextCursor(new Point(0, 100 + this.m_scroll_pos));
        this.m_small_font.justifyString("Programming and Implementation:");

        this.m_medium_font.setTextCursor(new Point(0, 120 + this.m_scroll_pos));
        this.m_medium_font.justifyString("John M Phillips");

        this.m_small_font.setTextCursor(new Point(0, 170 + this.m_scroll_pos));
        this.m_small_font.justifyString("Concept And Level Design:");

        this.m_medium_font.setTextCursor(new Point(0, 190 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Ed Bartlett");

        this.m_small_font.setTextCursor(new Point(0, 240 + this.m_scroll_pos));
        this.m_small_font.justifyString("Graphics Design:");

        this.m_medium_font.setTextCursor(new Point(0, 260 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Mark Coleman");

        this.m_small_font.setTextCursor(new Point(0, 310 + this.m_scroll_pos));
        this.m_small_font.justifyString("Music And Sound Effects:");

        this.m_medium_font.setTextCursor(new Point(0, 330 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Chris Maule");

        this.m_small_font.setTextCursor(new Point(0, 380 + this.m_scroll_pos));
        this.m_small_font.justifyString("A big thankyou to:");

        this.m_medium_font.setTextCursor(new Point(0, 400 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Mike and all at Bitmap HQ");
        this.m_medium_font.setTextCursor(new Point(0, 420 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Dan Hutchinson");
        this.m_medium_font.setTextCursor(new Point(0, 440 + this.m_scroll_pos));
        this.m_medium_font.justifyString("Alison Beasley");

        this.m_scroll_pos--;

        if (this.m_scroll_pos == -480) { // || getKey() != gsKEY_NONE)
            return this.changeState(this.m_app.instance = this.m_mainMenuState);
        }
        return true;
    }

    //-------------------------------------------------------------

    public destroy(): boolean
    {
    	return true;
    }

    //-------------------------------------------------------------

}
