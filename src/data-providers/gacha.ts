import { hasFlags } from "@/utils/bitwise"
import { GachaType } from "@/utils/gacha"
import { computed } from "vue"

export enum Category {
    DOLL = 1 << 0,
    WEAPON = 1 << 1,
    ELITE = 1 << 2,
    STANDARD = 1 << 3,
    RETIRED = 1 << 4,
    NONEXISTENT = 1 << 5
}

export type GachaItem = {
    category: Category,
    name: string,
    splash: string
}

const pool: GachaItem[] = [
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Andoris",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Belka",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Centaureissi",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Cheeta",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Colphne",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Daiyan",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Dushevnaya",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Faye",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Groza",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Jiangyu",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Klukai",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Krolik",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Ksenia",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Lenna",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Littara",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Lotta",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Makiatto",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Mechty",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Mosin-Nagant",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Nagant",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Nemesis",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Nikketa",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Papasha",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Peri",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Peritya",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Qiongjiu",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Qiuhua",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Sabrina",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.DOLL,
        "name": "Sharkry",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Springfield",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Suomi",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Tololo",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Ullrid",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Vector",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Vepley",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Yoohee",
        "splash": ""
    },
    {
        "category": Category.ELITE | Category.DOLL,
        "name": "Zhaohui",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "KSVK",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Hare",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Model ARM",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": ".380 Curva",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "OTs-14",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "MP7H1",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Robinson Modular Rifle",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Nagant M1895",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Vepr-12",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Pecheneg-SP",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Model Alpha",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "QBZ-191",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Sportivo Calibro 12",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Three-Line Rifle M1891",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": "Stechkin",
        "splash": ""
    },
    {
        "category": Category.STANDARD | Category.WEAPON,
        "name": ".50 Nemesis",
        "splash": ""
    }
]

const nonexistent: GachaItem = {
    category: Category.NONEXISTENT,
    name: "Wombforce BZX-6900",
    splash: "https://media.discordapp.net/attachments/1320242442120986637/1375955149641617569/images_2.jpg?ex=68d9ae97&is=68d85d17&hm=d3683f233ede2bb63e44b32f2bbf9478198eb3856a7614341d37f0fc0b91beb1&=&format=webp&width=1186&height=1034"
}

export function useGachaItems () {
    const eliteDolls = computed( () => pool.filter( i => hasFlags( i.category, Category.ELITE | Category.DOLL ) ) )
    const eliteItems = computed( () => pool.filter( i => hasFlags( i.category, Category.ELITE ) ) )
    const eliteWeapons = computed( () => pool.filter( i => hasFlags( i.category, Category.ELITE | Category.WEAPON ) ) )
    const standardDolls = computed( () => pool.filter( i => hasFlags( i.category, Category.STANDARD | Category.DOLL ) ) )
    const standardItems = computed( () => pool.filter( i => hasFlags( i.category, Category.STANDARD ) ) )
    const standardWeapons = computed( () => pool.filter( i => hasFlags( i.category, Category.STANDARD | Category.WEAPON ) ) )

    /**
     * Tries to find an elite item in the given pool.
     * @param pool The pool to search.
     * @returns The found item, or a placeholder.
     */
    function findElite ( pool: GachaItem[] ) {
        return pool.find( i => i.category & Category.ELITE ) || nonexistent
    }

    /**
     * Fetches the gacha banner items minus the given items.
     * @param type The type of gacha banner.
     * @param exceptions The items to ignore.
     * @returns A list of all gacha items minus the exceptions.
     */
    function getEliteExcept ( type: GachaType, exceptions: GachaItem[] ) {
        return type === GachaType.DOLL ?
            eliteDolls.value.filter( i => !exceptions.includes( i ) ) :
            eliteWeapons.value.filter( i => !exceptions.includes( i ) )
    }

    /**
     * Tries to find the given item name in the pool. This searches both dolls and weapons.
     * @param name The name of the item to get the record for.
     * @returns The matching record. Otherwise, returns a placeholder.
     */
    function getItem ( name: string ) {
        return pool.find( i => i.name === name ) || nonexistent
    }

    /**
     * Tries to find the given item names in the pool.
     * @param names The names of the items to retrieve.
     * @returns The matching records for each item.
     */
    function getItems ( names: string[] ) {
        return pool.filter( i => names.includes( i.name ) )
    }

    return {
        eliteDolls,
        eliteItems,
        eliteWeapons,
        findElite,
        getEliteExcept,
        getItem,
        getItems,
        nonexistent,
        pool,
        standardDolls,
        standardItems,
        standardWeapons
    }
}
