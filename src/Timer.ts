import { Enums } from "./Enums";

export class GameTime {
    private m_base_time: number = 0;
    private m_state: Enums.gsTimerState;

    private m_freq: number = 3323581;
    private m_time0: number = 0;
    private m_previous_time: number = 0;
    private m_system_time: number = 0;
    private m_fake_time: number = 0;

    private m_ian_timer = 0;
    private m_ian_inc = 0.026;

    constructor() {
        this.m_base_time = 0;
        this.m_state = Enums.gsTimerState.gsTIMER_RESET;
        this.initialize();
    }

    //-------------------------------------------------------------

    public initialize(): void {
        this.m_time0 = Date.now();
        var t: number = this.getCurrentTime();
        this.m_system_time = t;
        this.m_previous_time = t;
    }

    //-------------------------------------------------------------
    // Update internal copy of system time
    //
    // Call once per game loop
    public update(frame_done: boolean): void {
        if (!frame_done) {
            this.m_previous_time = this.m_system_time;
        }
        this.m_system_time = this.getCurrentTime();
    }

    //-------------------------------------------------------------
    // Reset timer
    public reset(): void {
        this.m_state = Enums.gsTimerState.gsTIMER_RESET;
    }

    //-------------------------------------------------------------
    // Start timer
    public start(): void {
        this.m_base_time = this.m_system_time;
        this.m_state = Enums.gsTimerState.gsTIMER_ACTIVE;
    }

    //-------------------------------------------------------------
    // Pause timer
    public pause(): void {
        this.m_base_time = this.m_system_time;
        this.m_state = Enums.gsTimerState.gsTIMER_PAUSED;
    }

    //-------------------------------------------------------------
    // Unpause timer
    //
    // Notes:	Reported time continues from the time value when
    //			the timer was paused
    public unpause(): void {
        this.m_base_time = this.m_system_time - this.m_base_time;
        this.m_state = Enums.gsTimerState.gsTIMER_ACTIVE;
    }

    //-------------------------------------------------------------
    // Get the current state of the timer
    //
    // Returns:	One of the following states:
    //				gsTIMER_RESET
    //				gsTIMER_ACTIVE
    //				gsTIMER_PAUSED
    public getState(): Enums.gsTimerState {
        return this.m_state;
    }

    //-------------------------------------------------------------
    // Get current time
    //
    // Returns:	Current time in seconds since timer was started
    public getTime(): number {
        switch (this.m_state) {
            case Enums.gsTimerState.gsTIMER_ACTIVE:
                var time = this.m_system_time - this.m_base_time;
                time = this.m_ian_timer += this.m_ian_inc;
                return time;
            case Enums.gsTimerState.gsTIMER_PAUSED:
                return this.m_base_time;
            default:
                return 0;
        }
    }

    //-------------------------------------------------------------
    // Get delta time (between current and previous frame)
    public getDeltaTime(): number {
        return 5000 * (this.m_system_time - this.m_previous_time);
    }

    //-------------------------------------------------------------
    // Get current time
    public getCurrentTime(): number {
        var t: number = Date.now();
        t -= this.m_time0;
        var test = window.performance.now();
        return t / this.m_freq;
    }
}
