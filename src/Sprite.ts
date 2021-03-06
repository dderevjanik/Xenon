﻿import { gsCTiledImage } from "./TiledImage";
import { gsCVector } from "./Vector";
import { gsCRectangle } from "./Rectangle";

export class gsCSprite {

    private m_image: gsCTiledImage;
    private m_position: gsCVector;
    private m_hotspot: gsCVector;
    private m_active: boolean;
    private m_frame: number;
    private m_fill_colour: string;
    private m_use_fill_colour: boolean = false;
    private m_rect: gsCRectangle;
    private m_rect_valid: boolean;
    private m_texture: HTMLImageElement;

    constructor() {
        this.m_image = null;
        this.m_position = new gsCVector(300, 100);
        this.m_hotspot = new gsCVector(0, 0);
        this.m_frame = 0;
        this.m_active = false;
        this.m_use_fill_colour = false;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public getRect(): gsCRectangle {
        if (!this.m_rect_valid) {
            if (this.m_image == null) {
                this.m_rect = new gsCRectangle(0, 0, 0, 0);
            }
            else {
                var p: gsCVector = new gsCVector(this.m_position.x - this.m_hotspot.x, this.m_position.y - this.m_hotspot.y)
                this.m_rect = new gsCRectangle(p.x, p.y, p.x + this.m_image.getTileSize().X, p.y + this.m_image.getTileSize().Y);
            }
            this.m_rect_valid = true;
        }
        return this.m_rect;
    }

    //-------------------------------------------------------------

    public setActive(state: boolean): void {
        this.m_active = state;
    }

    //-------------------------------------------------------------

    public isActive(): boolean {
        return this.m_active;
    }

    //-------------------------------------------------------------

    public setPosition(position: gsCVector): void {
        this.m_position = position;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public setHotspot(hotspot: gsCVector): void {
        this.m_hotspot = hotspot;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public setImage(image: gsCTiledImage): void {
        this.m_image = image;
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    public getPosition(): gsCVector {
        return this.m_position;
    }

    //-------------------------------------------------------------

    public getHotspot(): gsCVector {
        return this.m_hotspot;
    }

    //-------------------------------------------------------------

    public getImage(): HTMLImageElement {
        return this.m_texture;
    }

    //-------------------------------------------------------------

    public move(offset: gsCVector): void {
        this.m_position.plusEquals(offset);
        this.m_rect_valid = false;
    }

    //-------------------------------------------------------------

    // From Actor
    public draw(ctx: CanvasRenderingContext2D): boolean {
        if (this.m_image == null || !this.m_active) {
            return false;
        }
        if (!this.m_use_fill_colour) {
            return this.m_image.draw(this.m_frame, new gsCVector(this.m_position.x - this.m_hotspot.x, this.m_position.y - this.m_hotspot.y), ctx);
        }
        else {
            return this.m_image.drawSolid(this.m_frame, new gsCVector(this.m_position.x - this.m_hotspot.x, this.m_position.y - this.m_hotspot.y), this.m_fill_colour, ctx);
        }
    }

    //-------------------------------------------------------------

    public setFrame(frame: number): void {
        this.m_frame = frame;
    }

    //-------------------------------------------------------------

    public getFrame(): number {
        return this.m_frame;
    }

    //-------------------------------------------------------------

    public enableFillColour(fill_colour: any) /*): Color)*/ {
        //this.m_fill_colour = fill_colour;
        this.m_use_fill_colour = true;
    }

    //-------------------------------------------------------------

    public disableFillColour(): void {
        this.m_use_fill_colour = false;
    }

    //-------------------------------------------------------------
}
