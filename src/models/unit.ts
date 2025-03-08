import { Alliance, Buff, Weakness } from "@/utils/defs"

/**
 * Represents any entity that can exist on and move around on a map. This may include dolls,
 * enemies, and fixtures such as turrets.
 */
export class Unit {
    alliance = Alliance.PLAYER
    attack = 0 // Base attack
    buffs = [] as { buff: Buff, duration: number }[]
    crit_dmg = 120 // Base crit damage
    crit_rate = 20 // Base crit rate
    currentHealth = 0
    defense = 1 // Base defense
    has_acted = false // Whether the unit has done its turn
    health = 0 // Base health
    mobility = 0 // Movement tile range
    name = "" // Doll name
    position: [ number, number ] = [ 0, 0 ] // Position on the MapField
    size: [ number, number ] = [ 0, 0 ] // Size of the unit, centered around position
    stability = 0 // Stability index for the unit
    weaknesses: Weakness = Weakness.NONE

    /**
     *
     * @param alliance What alliance is this unit part of? 0 = player, 1 = enemy, 2+ = other
     * enemy/neutral factions.
     * @param position The current position of the unit on the MapField.
     * @param size The size of this unit, in [ X, Y ] directions. The unit is assumed to extend
     * ( size.(X|Y) - 1 ) / 2 cells on both sides for the relevant axis. If the size is an even
     * number, the extra cell will be right or down from the "center", depending on the axis.
     */
    constructor( alliance = 0, position: [ number, number ] = [ 0, 0 ], size: [ number, number ] = [ 1, 1 ] ) {
        this.alliance = alliance
        this.position = position
        this.size = size
    }

    addBuff ( buff: Buff, duration: number ) {
        this.buffs.push( { buff, duration } )
    }
}
