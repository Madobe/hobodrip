

/**
 * Represents any entity that can exist on and move around on a map. This may include dolls,
 * enemies, and fixtures such as turrets.
 */
export class Unit {
    alliance = 0
    position: [ number, number ] = [ 0, 0 ]
    size: [ number, number ] = [ 0, 0 ]

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
}
