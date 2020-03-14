import { CActor } from "./Actor";

export class CAlien extends CActor {

    constructor() {
        super();
        this.m_name = "Alien";
    }

    //-------------------------------------------------------------

    public onLeavingScreen(): void {
        super.kill();
    }

    //-------------------------------------------------------------
}
