﻿import { gsCVector } from "./Vector";

export class Particle {
    m_position: gsCVector;
    m_velocity:gsCVector;
    m_mass:number;
    m_age:number;
    m_lifetime: number;
    m_name = "Particle";
}
