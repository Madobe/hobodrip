import { Weakness } from "@/utils/defs";
import { Unit } from "./unit";

export class Enemy extends Unit {
    stability_damage_reduction = 0.6 // 60%
    weaknesses = ( Weakness.HYDRO * 2 ) - 1 // Default is being weak to everything
}

export const DefaultEnemy = new Enemy
