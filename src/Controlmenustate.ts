﻿import { CGameState } from "./GameState";
import { COptionsMenuState } from "./OptionsMenuState";
import { CScene } from "./Scene";
import { CStarfield } from "./Starfield";
import { CApplication } from "./Application";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { Point } from "./Point";
import { gsCMenu } from "./Menu";
import { CMainMenuState } from "./MainMenuState";

export class CControlmenustate extends CGameState {

    m_optionState: COptionsMenuState;

    constructor(scene?: CScene, starfield?: CStarfield, font8x8?: HTMLImageElement, font16x16?: HTMLImageElement, app?: CApplication, ctx?: CanvasRenderingContext2D, menuState?: CMainMenuState, menu?: gsCMenu, optionState?: COptionsMenuState) {
        super(font8x8, font16x16, app, ctx);

        this.m_starfield = starfield;
        this.m_mainMenuState = menuState;
        this.m_menu = menu;
        this.m_optionState = optionState;

        this.m_stateName = "Controlmenustate";
    }

    //-------------------------------------------------------------

    public instance(): CGameState {
        return this.m_app.instance = this;
    }

    //-------------------------------------------------------------

    public copyOptionsToMenu(): void {
        this.m_menu.setValue(Enums.ControlMenuItem.CM_CONTROL1, this.m_options.getOption(Enums.OptionType.OPTION_CONTROL1));
        this.m_menu.setValue(Enums.ControlMenuItem.CM_CONTROL2, this.m_options.getOption(Enums.OptionType.OPTION_CONTROL2));
    }

    //-------------------------------------------------------------

    public copyMenuToOptions(): void {
        this.m_options.setOption(Enums.OptionType.OPTION_CONTROL1, this.m_menu.getValue(Enums.ControlMenuItem.CM_CONTROL1));
        this.m_options.setOption(Enums.OptionType.OPTION_CONTROL2, this.m_menu.getValue(Enums.ControlMenuItem.CM_CONTROL2));
    }

    //-------------------------------------------------------------

    public create(): boolean {
        this.m_menu.clear();

        //	m_menu.addOptionList("Player 1","Keyboard Layout A","Keyboard Layout B","Joystick 1","Joystick 2",0);
        //	m_menu.addOptionList("Player 2","Keyboard Layout A","Keyboard Layout B","Joystick 1","Joystick 2",0);

        this.m_menu.addOptionList("Player 1" + "Keyboard Layout A" + "Keyboard Layout B", 0);
        this.m_menu.addOptionList("Player 2" + "Keyboard Layout A" + "Keyboard Layout B", 0);

        //this.m_menu.addSeperator();
        this.m_menu.addSelection("Apply");
        this.m_menu.addSelection("Cancel");

        this.m_menu.setWrap(true);
        this.m_menu.setPosition(new Point(0, 100));
        this.m_menu.setSpacing(new Point(0, 30));
        this.m_menu.setCurrentItem(Enums.ControlMenuItem.CM_CANCEL);
        this.m_menu.setFont(this.m_medium_font);

        this.copyOptionsToMenu();

        return true;
    }

    //-------------------------------------------------------------

    public update(ctx: CanvasRenderingContext2D, controls: Controls): boolean {
        var move_names = ["Cursor Keys", "Cursor Keys", "Joystick 1", "Joystick 2"];
        var fire_names = ["Left Control", "A", "Button 0", "Button 0"];
        var rev_names = ["Left Alt", "S", "Button 1", "Button 1"];
        var dive_names = ["Left Shift", "D", "Button 2", "Button 2"];

        //	if (!CGameState::update())
        //		return false;

        if (this.m_options.getOption(Enums.OptionType.OPTION_BACKDROP)) {
            ctx.drawImage(this.backgroundTexture, 0, 0);
        }

        this.m_starfield.Update(4);
        this.m_starfield.Draw(ctx);;

        this.m_medium_font.setTextCursor(new Point(0, 50));
        this.m_medium_font.justifyString("Control Options");

        this.m_menu.draw(ctx);

        this.m_small_font.setTextCursor(new Point(200, 300));
        this.m_small_font.printString("Player 1");
        this.m_small_font.setTextCursor(new Point(400, 300));
        this.m_small_font.printString("Player 2");

        this.m_small_font.setTextCursor(new Point(50, 330));
        this.m_small_font.printString("Movement:");
        this.m_small_font.setTextCursor(new Point(50, 350));
        this.m_small_font.printString("Fire:");
        this.m_small_font.setTextCursor(new Point(50, 370));
        this.m_small_font.printString("Reverse:");
        this.m_small_font.setTextCursor(new Point(50, 390));
        this.m_small_font.printString("Dive:");

        var control1 = this.m_menu.getValue(Enums.ControlMenuItem.CM_CONTROL1);
        this.m_small_font.setTextCursor(new Point(200, 330));
        this.m_small_font.printString(move_names[control1]);
        this.m_small_font.setTextCursor(new Point(200, 350));
        this.m_small_font.printString(fire_names[control1]);
        this.m_small_font.setTextCursor(new Point(200, 370));
        this.m_small_font.printString(rev_names[control1]);
        this.m_small_font.setTextCursor(new Point(200, 390));
        this.m_small_font.printString(dive_names[control1]);

        var control2: number = this.m_menu.getValue(Enums.ControlMenuItem.CM_CONTROL2);
        this.m_small_font.setTextCursor(new Point(400, 330));
        this.m_small_font.printString(move_names[control2]);
        this.m_small_font.setTextCursor(new Point(400, 350));
        this.m_small_font.printString(fire_names[control2]);
        this.m_small_font.setTextCursor(new Point(400, 370));
        this.m_small_font.printString(rev_names[control2]);
        this.m_small_font.setTextCursor(new Point(400, 390));
        this.m_small_font.printString(dive_names[control2]);

        var item: Enums.ControlMenuItem = <Enums.ControlMenuItem>this.m_menu.getCurrentItem();

        if (controls.returnPressed || controls.enterPressed || controls.lcontrolPressed) {
            controls.returnPressed = false;
            controls.enterPressed = false;
            controls.lcontrolPressed = false;

            if (item == Enums.ControlMenuItem.CM_APPLY) {
                super.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
                this.copyMenuToOptions();
                if (this.m_options.areChanged()) {
                    //					gsCFile::setDirectory(DIRECTORY_ROOT);
                    //					Options.save(OPTIONS_FILENAME);
                    //					updateVolume();

                    if (this.m_options.requireReload()) {
                        //						CMessageBoxState::setup("Restart to apply options ?",
                        //												"Yes",0,
                        //												"No",COptionsMenuState::instance(),
                        //												true);
                        //						return;// changeState(CMessageBoxState::instance());
                    }
                    else {
                        return this.changeState(this.m_app.instance = this.m_optionState);
                    }
                }
                else {
                    return this.changeState(this.m_app.instance = this.m_optionState);
                }
            }
            else if (item == Enums.ControlMenuItem.CM_CANCEL) {
                super.playSample(Enums.GameSampleType.SAMPLE_MENU_BACK);
                this.m_optionState.create();
                return this.changeState(this.m_app.instance = this.m_optionState);
            }
        }
        if (controls.up) {
            controls.up = false;
            super.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(-1);
        }

        if (controls.down) {
            controls.down = false;
            super.playSample(Enums.GameSampleType.SAMPLE_MENU_SELECTION);
            this.m_menu.scroll(1);
        }

        if (controls.left) {
            controls.left = false;
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) - 1)) {
                super.playSample(Enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }

        if (controls.right) {
            controls.right = false;
            if (this.m_menu.setValue(item, this.m_menu.getValue(item) + 1)) {
                super.playSample(Enums.GameSampleType.SAMPLE_MENU_OPTION);
            }
        }

        return true;
    }

    //-------------------------------------------------------------
}
