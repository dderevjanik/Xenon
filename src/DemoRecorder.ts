﻿import { Controls } from "./Controls";

export class DemoRecorder {

    m_event_list: Array<Controls>;
    m_event_index: number;
    m_has_level: boolean;
    m_level: string;

    constructor() {
        this.m_event_list = [];
        this.m_event_index = 0;
        this.m_has_level = false;
        this.m_level = "";
    }

    //-------------------------------------------------------------

    public destroy(): void {
        this.m_event_list = [];
        this.m_has_level = false;
    }

    //-------------------------------------------------------------

    public record(): void {
        //this.destroy();
    }

    //-------------------------------------------------------------

    public addEvent(controls: Controls): boolean {
        this.m_event_list.push(controls);
        return true;
    }

    //-------------------------------------------------------------

    public playback(): void {
        this.m_event_index = 0;
    }

    //-------------------------------------------------------------

    public getEvent(controls: Controls): boolean {
        if (this.m_event_index < this.m_event_list.length) {
            this.m_event_list.push(controls);
            this.m_event_index++;
            return true;
        }

        else {
            return false;
        }
    }

    //-------------------------------------------------------------

    public setLevel(filename: string): void {
        //if (filename) {
        //	strcpy(m_level,filename);
        //	m_has_level = true;
        //	}
        //else
        //	m_has_level = false;
    }

    //-------------------------------------------------------------

    public getLevel(): string | null {
        if (this.m_has_level)
            return this.m_level;
        else
            return null;
    }

    //-------------------------------------------------------------

}
