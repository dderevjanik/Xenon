import { CGameState } from "./GameState";
import { CPlayGameState } from "./PlayGameState";
import { CScene } from "./Scene";
import { CStarfield } from "./Starfield";
import { CApplication } from "./Application";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { gsCMenu } from "./Menu";
import { CMainMenuState } from "./MainMenuState";

export class CIntroState extends CGameState {

    m_playGameState: CPlayGameState;
    m_originalState: CIntroState;
    //m_mainMenuState: CMainMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?: CMainMenuState) {
        super(font8x8, font16x16, app, ctx);

        this.m_playGameState = new CPlayGameState(scene, starfield, font8x8, font16x16, app, ctx, menuState);

        this.m_stateName = "IntroState";

        this.create(); //TEMP!
    }

    public instance(): CGameState {
        return this.m_app.instance = this.m_playGameState;
    }

    //-------------------------------------------------------------

    public create(): boolean {
    //	m_menu.clear();

    //	m_menu.addSeperator("Choose Level:");
    //	m_menu.addSeperator();

    //	gsCFile::setDirectory(DIRECTORY_LEVELS);

    //	const char *name = gsCFile::findFirst("*.fmp");

    //	while (name) {
    //		m_files.addItem(strdup(name));
    //		name = gsCFile::findNext();
    //		}

    //	gsCFile::findClose();

    //	for (int i = 0; i < m_files.getSize(); i++)
    //		m_menu.addSelection(m_files[i]);

    //	m_menu.setWrap(true);
    //	m_menu.setPosition(Point(0,100));
    //	m_menu.setSpacing(Point(0,30));
    //	m_menu.setCurrentItem(IM_FIRSTFILE);
    //	m_menu.setFont(&m_medium_font);

        this.playMusic(Enums.GameMusicType.MUSIC_INTRO);
        this.m_state = this;
        this.m_originalState = this;
    	return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: Controls): boolean {
    	if (!super.update(ctx, controls))
    		return false;

        if (this.m_state != this.m_originalState) {
            this.m_state.update(ctx, controls);
        }

        if (this.m_options.getOption(Enums.OptionType.OPTION_BACKDROP)) {
//            ctx.drawImage(this.backgroundTexture, 0, 0);
        }
    //	else
    //		m_screen.clear(gsCColour(gsBLACK));

    	//this.m_starfield.move(4);
    	//this.m_starfield.draw();

    	//this.m_menu.draw();

    //	m_screen.flip();

    //	// Temp to allow game to start & run !
    //	//switch (getKey()) {
    //	//	case gsKEY_RETURN:
    //	//	case gsKEY_ENTER:
    //	//	case gsKEY_LCONTROL:
    //	//		{
    //			int item = m_menu.getCurrentItem();

    //			strcpy(m_level_filename,m_menu.getName(item));

    //			CGameState::playSample(SAMPLE_MENU_CLICK);

        //return changeState(CPlayGameState::instance());
        //this.m_state = this.m_playGameState.instance();
        return this.changeState(this.m_playGameState.instance());
    //		//	}
    //		//	break;
    //		//case gsKEY_UP:
    //		//	m_menu.scroll(-1);
    //		//	CGameState::playSample(SAMPLE_MENU_SELECTION);
    //		//	break;
    //		//case gsKEY_DOWN:
    //		//	m_menu.scroll(1);
    //		//	CGameState::playSample(SAMPLE_MENU_SELECTION);
    //		//	break;
    //		//case gsKEY_ESCAPE:
    //		//	return changeState(CMainMenuState::instance());
    //		//}

    	//return true;
    }

    //-------------------------------------------------------------

    //bool CIntroState::destroy()
    //{
    //	for (int i = 0; i < m_files.getSize(); i++)
    //		free(m_files[i]);

    //	m_files.clear();

    //	return true;
    //}

    //-------------------------------------------------------------

    //public set mainMenuState(value: CMainMenuState) {
    //    this.m_mainMenuState = value;
    //    this.m_playGameState.mainMenuState = value;//this.mainMenuState;
    //}

}
