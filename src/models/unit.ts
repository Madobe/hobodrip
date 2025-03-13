import { Weakness } from "@/utils/defs"

/**
 * Represents any entity's properties that are constant regardless of whether they're deployed or
 * not. For the representation that can have a position, buffs, etc., see MapUnit instead.
 */
export class Unit {
    attack = 0 // Base attack
    crit_dmg = 120 // Base crit damage
    crit_rate = 20 // Base crit rate
    defense = 1 // Base defense
    health = 0 // Base health
    mobility = 0 // Base movement tile range
    name = "" // Doll name
    size: [ number, number ] = [ 1, 1 ] // Size of the unit, centered around position
    stability = 0 // Stability index for the unit
    weaknesses: Weakness = Weakness.NONE
}
