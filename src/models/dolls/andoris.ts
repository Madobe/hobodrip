import { Doll } from "../doll";
import { Aglaea } from "../weapon";

class DollAndoris extends Doll {
    attack = 591
    best_set = "Allay Support"
    defense = 642
    health = 2288
    img_path = "/src/assets/images/dolls/Andoris.png"
    name = "Andoris"
    rarity = 1
    stat_order = [ "Health Boost", "Defense Boost", "Health", "Defense" ]
    type = 0

    constructor() {
        super( { weapon: Aglaea } )
    }
}

export default new DollAndoris
