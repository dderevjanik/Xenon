import { gsCScreen } from "./Screen";
import { gsCFont } from "./Font";
import { Point } from "./Point";
import { gsCRectangle } from "./Rectangle";

export class MenuItem {

    m_name: string;
    m_value: number;

    constructor(name: string) {
        this.m_name = name;
        this.m_value = 0;
    }

    //-------------------------------------------------------------

    public setValue(value: number): boolean {
        return false;
    }

    //-------------------------------------------------------------

    public getValue(): number {
        return this.m_value;
    }

    //-------------------------------------------------------------

    public getName(): string {
        return this.m_name;
    }

    //-------------------------------------------------------------

    public draw(screen: gsCScreen, font: gsCFont, y: number, highlight: boolean, ctx: CanvasRenderingContext2D): void {

        if (this.m_name) {
            if (highlight) {
                var size: Point = font.getStringSize(this.m_name);
                screen.drawSolidRect(new gsCRectangle((screen.screenRectangle.Right - size.X) / 2 - 1, y - 1, size.X + 2, size.Y + 2), "gray", ctx);
            }
            font.setTextCursor(new Point(0, y));
            font.justifyString(this.m_name);
        }
    }

    //-------------------------------------------------------------

    public getSize(): number {
        return 0;//m_count;
    }

    //-------------------------------------------------------------

    public getType(): any {
        return null;
    }

    //-------------------------------------------------------------
}
