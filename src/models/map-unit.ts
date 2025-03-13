import { Alliance, type Buff } from "@/utils/defs";
import { Unit } from "./unit";
import { Doll } from "./doll";

/**
 * Represents a unit's on field instance. Any values that can change in a battle are part of this.
 */
export default class MapUnit {
    alliance = Alliance.PLAYER
    buffs = [] as { buff: Buff, duration: number }[]
    confectance = 0
    currentHealth = 0
    has_acted = false // Whether the unit has done its turn
    // Values that are only used when in a combat simulator
    position: [ number, number ] = [ 0, 0 ] // Position on the MapField
    unit: Unit

    constructor( unit: Unit ) {
        this.currentHealth = unit.health
        this.unit = unit
    }

    addBuff ( buff: Buff, duration: number ) {
        this.buffs.push( { buff, duration } )
    }

    /**
     * Heals the given amount, up to a maximum HP.
     * @param amount A scalar amount to heal.
     */
    heal ( amount: number ) {
        if ( this.unit instanceof Doll ) this.currentHealth = Math.min( this.unit.totalHealth, this.currentHealth + amount )
        else this.currentHealth = Math.min( this.unit.health, this.currentHealth + amount )
    }

    /**
     * Heals the unit based on its max HP.
     * @param percent A percentage of the target's max HP to heal.
     */
    healPercent ( percent: number ) {
        if ( this.unit instanceof Doll ) this.heal( Math.floor( this.unit.totalHealth * percent ) )
        else this.heal( Math.floor( this.unit.health * percent ) )
    }

    /**
     * Calculates the amount of damage taken.
     * @param damage The amount of damage received.
     */
    receiveDamage ( damage: number ) {
        this.currentHealth -= damage
    }
}

export const DefaultMapUnit = new MapUnit( new Unit )
