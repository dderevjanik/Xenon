import { CActor } from "./Actor";
import { gsCFont } from "./Font";
import { Enums } from "./Enums";
import { Controls } from "./Controls";
import { GameTime } from "./Timer";
import { Point } from "./Point";
import { ActorInfo } from "./ActorInfo";

export class CLabel extends CActor {

    //-------------------------------------------------------------

    LABEL_MAX_SIZE: number = 40;

    //-------------------------------------------------------------

    private m_text: string;
    private m_time: number;
    private m_offset: Point;
    private m_font: gsCFont;

    constructor() {
        super();
        this.m_text = "";
        this.m_time = 0.0;
        this.m_name = "Label";
    }

    //-------------------------------------------------------------

    public getActorInfo(): ActorInfo {
        this.m_actorInfo = this.m_scene.GetlistOfActors();
        return this.m_actorInfo.GetActorInfoListItem(Enums.ActorInfoType.INFO_LABEL);
    }

    //-------------------------------------------------------------

    public activate(): boolean {
        if (!this.isActive())
            this.m_timer.start();

        return super.activate();
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        this.kill();
    }

    //-------------------------------------------------------------

    public setText(format: string): void {
        this.m_text = format;
        if (this.m_font) {
            var stringLength = this.m_font.getStringSize(this.m_text);
            this.m_offset = new Point((stringLength.X / -2), stringLength.X / -2);
        } else {
            this.m_offset = new Point(0, 0);
        }
    }

    //-------------------------------------------------------------

    public setTime(seconds: number): void {
        this.m_time = seconds;
    }

    //-------------------------------------------------------------

    public setFont(font: gsCFont): void {
        this.m_font = font;
    }

    //-------------------------------------------------------------

    public update(controls: Controls, gameTime: GameTime): boolean {
        if (this.m_timer.getTime() >= this.m_time) {
            this.kill();
            return true;
        }
        this.m_position.plusEquals(this.m_velocity);
        return true;
    }

    //-------------------------------------------------------------

    public Draw(ctx: CanvasRenderingContext2D): boolean {
        if (this.m_font) {
            this.m_font.setTextCursor(new Point(this.m_position.X, this.m_position.Y).add(this.m_offset).add(this.m_scene.getMap().getPosition()));
            this.m_font.printString(this.m_text);
        }
        return true;
    }

    //-------------------------------------------------------------
}
