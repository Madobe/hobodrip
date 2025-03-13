import type { Attachment } from "@/types/attachments"
import type { MapField } from "./map-field"
import type { MapEvent, MapEventArgs } from "@/utils/defs"

interface WeaponParams {
    attack: number
    attack_boost?: number
    crit_dmg?: number
    crit_rate?: number
    handleEvent?: ( map: MapField, event: MapEvent, args: MapEventArgs ) => void
    imprint?: string
    name: string
    type: number
    unconfirmed?: boolean
}

export default class Weapon {
    attack = 0
    attachments = [] as Attachment[]
    attack_boost = 0
    crit_dmg = 0
    crit_rate = 0
    imprint = ""
    name: string = ""
    type: number = 0
    unconfirmed?: boolean

    constructor( params: WeaponParams ) {
        this.attack = params.attack
        this.crit_dmg = params.crit_dmg ?? 0
        this.handleEvent = params.handleEvent ?? this.handleEvent
        this.name = params.name
        this.type = params.type
    }

    get attackBoost () { return this.attack_boost + this.getStatTotal( "Attack Boost" ) }
    get defenseBoost () { return this.getStatTotal( "Defense Boost" ) }
    get healthBoost () { return this.getStatTotal( "Health Boost" ) }
    get critRate () { return this.crit_rate + this.getStatTotal( "Crit Rate" ) }
    get critDmg () { return this.crit_dmg + this.getStatTotal( "Crit DMG" ) }

    /**
     * Creates a clone of the calling weapon.
     */
    clone () {
        return new Weapon( {
            attack: this.attack,
            crit_dmg: this.crit_dmg,
            handleEvent: this.handleEvent,
            name: this.name,
            type: this.type
        } )
    }

    /**
     * Adds up the value of the given stat.
     * @param stat The stat to sum.
     * @returns Summed value.
     */
    getStatTotal ( stat: string ) {
        return this.attachments
            .flatMap( attachment => attachment.stats )
            .filter( s => s.stat === stat )
            .reduce( ( accumulator, attachment ) => accumulator += attachment.value, 0 )
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    handleEvent ( map: MapField, event: MapEvent, args: MapEventArgs ) { }

    resetAttachments () {
        this.attachments = []
    }

    toJSON () {
        return {
            attachments: this.attachments
        }
    }
}

export const Aglaea = new Weapon( {
    attack: 348,
    attack_boost: 15,
    imprint: "Andoris",
    name: "Aglaea",
    type: 0,
    unconfirmed: true
} )

export const Arcana = new Weapon( {
    attack: 327,
    attack_boost: 15,
    name: "Arcana",
    type: 6
} )

export const BittersweetCaramel = new Weapon( {
    attack: 390,
    crit_dmg: 25,
    name: "Bittersweet Caramel",
    type: 6
} )

export const ChasingLight = new Weapon( {
    attack: 348,
    crit_dmg: 25,
    name: "Chasing Light",
    type: 4,
    unconfirmed: true
} )

export const ClassifiedManuscript = new Weapon( {
    attack: 292,
    attack_boost: 15,
    name: "Classified Manuscript",
    type: 5
} )

export const CrownedJackalope = new Weapon( {
    attack: 313,
    attack_boost: 15,
    name: "Crowned Jackalope",
    type: 1
} )

export const CSLS6 = new Weapon( {
    attack: 251,
    type: 5,
    name: "CS/LS6",
    unconfirmed: true
} )

export const Curva = new Weapon( {
    attack: 209,
    name: ".380 Curva",
    type: 2
} )

export const CZ75 = new Weapon( {
    attack: 244,
    type: 2,
    name: "CZ75",
    unconfirmed: true
} )

export const DaewooPrecisionIndustriesK2 = new Weapon( {
    attack: 251,
    attack_boost: 15,
    type: 0,
    name: "Daewoo Precision Industries K2",
    unconfirmed: true
} )

export const Daydream = new Weapon( {
    attack: 341,
    attack_boost: 15,
    name: "Daydream",
    type: 0,
    unconfirmed: true
} )

export const EchoesOfSorrow = new Weapon( {
    attack: 348,
    attack_boost: 15,
    name: "Echoes of Sorrow",
    type: 5,
    unconfirmed: true
} )

export const Emerita = new Weapon( {
    attack: 320,
    attack_boost: 15,
    name: "Emerita",
    type: 5,
    unconfirmed: true
} )

export const EulogisticVerse = new Weapon( {
    attack: 348,
    attack_boost: 15,
    name: "Eulogistic Verse",
    type: 6
} )

export const ExpeditionaryPigeon = new Weapon( {
    attack: 306,
    attack_boost: 15,
    name: "Expeditionary Pigeon",
    type: 4
} )

export const Faithpiercer = new Weapon( {
    attack: 348,
    attack_boost: 15,
    name: "Faithpiercer",
    type: 6,
    unconfirmed: true
} )

export const ForestFaerie = new Weapon( {
    attack: 348,
    crit_dmg: 25,
    name: "Forest Faerie",
    type: 0,
    unconfirmed: true
} )

export const GoldenMelody = new Weapon( {
    attack: 369,
    attack_boost: 15,
    name: "Golden Melody",
    type: 0
} )

export const Guerno = new Weapon( {
    attack: 320,
    attack_boost: 15,
    name: "Guerno",
    type: 0
} )

export const Hare = new Weapon( {
    attack: 244,
    name: "Hare",
    type: 1
} )

export const HawkIndustriesType97 = new Weapon( {
    attack: 251,
    name: "Hawk Industries Type 97",
    type: 4,
    unconfirmed: true
} )

export const HeartSeeker = new Weapon( {
    attack: 320,
    name: "Heart Seeker",
    type: 4
} )

export const HeavyStrings = new Weapon( {
    attack: 341,
    crit_dmg: 25,
    name: "Heavy Strings",
    type: 0
} )

export const HK_G11 = new Weapon( {
    attack: 244,
    name: "Heckler & Koch G11",
    type: 0,
    unconfirmed: true
} )

export const HK_G28 = new Weapon( {
    attack: 251,
    name: "Heckler & Koch G28",
    type: 0,
    unconfirmed: true
} )

export const HK_G36 = new Weapon( {
    attack: 230,
    name: "Heckler & Koch G36",
    type: 0,
    unconfirmed: true
} )

export const HK_G36Spectre = new Weapon( {
    attack: 223,
    name: "Heckler & Koch G36 - Spectre",
    type: 0,
    unconfirmed: true
} )

export const HK_HK416 = new Weapon( {
    attack: 278,
    name: "Heckler & Koch HK416",
    type: 0,
    unconfirmed: true
} )

export const HK_MP5 = new Weapon( {
    attack: 230,
    name: "Heckler & Koch MP5",
    type: 5,
    unconfirmed: true
} )

export const HK_UMP9 = new Weapon( {
    attack: 223,
    name: "Heckler & Koch UMP9",
    type: 5,
    unconfirmed: true
} )

export const Hestia = new Weapon( {
    attack: 244,
    name: "Hestia",
    type: 2,
    unconfirmed: true
} )

export const KRISSVector = new Weapon( {
    attack: 251,
    name: "KRISS \"Shortsword\" Vector",
    type: 5,
    unconfirmed: true
} )

export const KSVK = new Weapon( {
    attack: 251,
    name: "KSVK",
    type: 6
} )

export const LeapingTiger = new Weapon( {
    attack: 369,
    crit_dmg: 25,
    name: "Leaping Tiger",
    type: 0,
    unconfirmed: true
} )

export const M1Super90 = new Weapon( {
    attack: 278,
    name: "M1 Super 90",
    type: 4
} )

export const M1903Springfield = new Weapon( {
    attack: 230,
    name: "M1903 Springfield",
    type: 6,
    unconfirmed: true
} )

export const MaidsRules = new Weapon( {
    attack: 320,
    attack_boost: 15,
    name: "Maid's Rules",
    type: 0
} )

export const Mezzaluna = new Weapon( {
    attack: 327,
    attack_boost: 15,
    name: "Mezzaluna",
    type: 4
} )

export const Mjölnir = new Weapon( {
    attack: 327,
    attack_boost: 15,
    name: "Mjölnir",
    type: 3
} )

export const ModelAlpha = new Weapon( {
    attack: 272,
    name: "Model Alpha",
    type: 0
} )

export const ModelARM = new Weapon( {
    attack: 265,
    name: "Model ARM",
    type: 3
} )

export const MP7H1 = new Weapon( {
    attack: 237,
    name: "MP7H1",
    type: 5
} )

export const NagantM1895 = new Weapon( {
    attack: 244,
    name: "Nagant M1895",
    type: 2
} )

export const Nemesis = new Weapon( {
    attack: 278,
    name: ".50 Nemesis",
    type: 6
} )

export const OpticalIllusion = new Weapon( {
    attack: 348,
    "crit_rate": 25,
    name: "Optical Illusion",
    type: 3
} )

export const OTs14 = new Weapon( {
    attack: 216,
    name: "OTs-14",
    type: 0
} )

export const PapaFigo = new Weapon( {
    attack: 285,
    attack_boost: 15,
    name: "Papa-Figo",
    type: 2
} )

export const PechenegSP = new Weapon( {
    attack: 251,
    name: "Pecheneg-SP",
    type: 3
} )

export const Planeta = new Weapon( {
    attack: 376,
    crit_dmg: 25,
    name: "Planeta",
    type: 0
} )

export const PlumaEdge = new Weapon( {
    attack: 244,
    name: "Pluma Edge",
    type: 1
} )

export const QBZ95 = new Weapon( {
    attack: 244,
    name: "QBZ-95",
    type: 0,
    unconfirmed: true
} )

export const QBZ97 = new Weapon( {
    attack: 265,
    name: "QBZ-97",
    type: 0,
    unconfirmed: true
} )

export const QBZ191 = new Weapon( {
    attack: 265,
    name: "QBZ-191",
    type: 0
} )

export const Rectrix = new Weapon( {
    attack: 341,
    "crit_rate": 25,
    name: "Rectrix",
    type: 1
} )

export const RobinsonModularRifle = new Weapon( {
    attack: 272,
    name: "Robinson Modular Rifle",
    type: 0
} )

export const Samosek = new Weapon( {
    attack: 383,
    crit_dmg: 25,
    name: "Samosek",
    type: 6
} )

export const Scylla = new Weapon( {
    attack: 390,
    attack_boost: 15,
    name: "Scylla",
    type: 0,
    unconfirmed: true
} )

export const SilverwingDreamwarden = new Weapon( {
    attack: 390,
    attack_boost: 15,
    name: "Silverwing Dreamwarden",
    type: 6,
    unconfirmed: true
} )

export const SportivoCalibro12 = new Weapon( {
    attack: 230,
    name: "Sportivo Calibro 12",
    type: 4
} )

export const StarfallSpark = new Weapon( {
    attack: 348,
    attack_boost: 15,
    name: "Starfall Spark",
    type: 0,
    unconfirmed: true
} )

export const Stechkin = new Weapon( {
    attack: 216,
    name: "Stechkin",
    type: 2
} )

export const Suomi = new Weapon( {
    attack: 223,
    name: "Suomi",
    type: 5
} )

export const Svarog = new Weapon( {
    attack: 369,
    attack_boost: 15,
    name: "Svarog",
    type: 5
} )

export const ThreeLineRifle = new Weapon( {
    attack: 272,
    name: "Three-Line Rifle M1891",
    type: 6
} )

export const UnspokenCalling = new Weapon( {
    attack: 313,
    attack_boost: 15,
    name: "Unspoken Calling",
    type: 5
} )

export const Unstoppable = new Weapon( {
    attack: 348,
    crit_dmg: 25,
    name: "Unstoppable",
    type: 5,
    unconfirmed: true
} )

export const Vepr12 = new Weapon( {
    attack: 230,
    name: "Vepr-12",
    type: 4
} )

export const WA2000 = new Weapon( {
    attack: 278,
    name: "WA2000",
    type: 6
} )

export const YoungLion = new Weapon( {
    attack: 313,
    attack_boost: 15,
    name: "Young Lion",
    type: 5,
    unconfirmed: true
} )

export const Weapons = [
    Aglaea,
    Arcana,
    BittersweetCaramel,
    ChasingLight,
    ClassifiedManuscript,
    CrownedJackalope,
    CSLS6,
    Curva,
    CZ75,
    DaewooPrecisionIndustriesK2,
    Daydream,
    EchoesOfSorrow,
    Emerita,
    EulogisticVerse,
    ExpeditionaryPigeon,
    Faithpiercer,
    ForestFaerie,
    GoldenMelody,
    Guerno,
    Hare,
    HawkIndustriesType97,
    HeartSeeker,
    HeavyStrings,
    HK_G11,
    HK_G28,
    HK_G36,
    HK_G36Spectre,
    HK_HK416,
    HK_MP5,
    HK_UMP9,
    Hestia,
    KRISSVector,
    KSVK,
    LeapingTiger,
    M1Super90,
    M1903Springfield,
    MaidsRules,
    Mezzaluna,
    Mjölnir,
    ModelAlpha,
    ModelARM,
    MP7H1,
    NagantM1895,
    Nemesis,
    OpticalIllusion,
    OTs14,
    PapaFigo,
    PechenegSP,
    Planeta,
    PlumaEdge,
    QBZ95,
    QBZ97,
    QBZ191,
    Rectrix,
    RobinsonModularRifle,
    Samosek,
    Scylla,
    SilverwingDreamwarden,
    SportivoCalibro12,
    StarfallSpark,
    Stechkin,
    Suomi,
    Svarog,
    ThreeLineRifle,
    UnspokenCalling,
    Unstoppable,
    Vepr12,
    WA2000,
    YoungLion
]
