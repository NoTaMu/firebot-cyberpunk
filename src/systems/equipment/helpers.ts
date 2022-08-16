import { armorList } from '../../data/armor';
import { weaponEnchantmentNames } from '../../data/enchantments';
import { weaponList } from '../../data/weapons';
import { logger } from '../../firebot/firebot';
import {
    Armor,
    Enchantments,
    Rarity,
    StoredArmor,
    StoredWeapon,
    Weapon,
} from '../../types/equipment';
import {
    filterArrayByProperty,
    getTopValuesFromObject,
    capitalize,
    addOrSubtractRandomPercentage,
} from '../utils';

/**
 * This will choose a rarity from one of the given raritys, weighting them so that lower rarities show more often.
 * @param rarity
 * @returns
 */
export function getWeightedRarity(rarity: Rarity[]) {
    logger('debug', 'Calculating weighted rarity.');
    const weights: number[] = [];

    // Here we're defining the rarity of each rarity type.
    // If the rarity array is a full list of all rarities, then these are basically percentages. Otherwise they're weighted.
    rarity.forEach((item) => {
        switch (item) {
            case 'basic':
                weights.push(50);
                break;
            case 'rare':
                weights.push(35);
                break;
            case 'epic':
                weights.push(10);
                break;
            case 'legendary':
                weights.push(5);
                break;
            default:
        }
    });

    let i;

    // eslint-disable-next-line no-plusplus, no-param-reassign
    for (i = 0; i < weights.length; i++) weights[i] += weights[i - 1] || 0;

    const random = Math.random() * weights[weights.length - 1];

    // eslint-disable-next-line no-plusplus
    for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

    return rarity[i];
}

// eslint-disable-next-line no-unused-vars
function isStoredWeapon(
    item: StoredWeapon | StoredArmor
): item is StoredWeapon {
    return item.itemType === 'weapon';
}

// eslint-disable-next-line no-unused-vars
function isStoredArmor(item: StoredWeapon | StoredArmor): item is StoredArmor {
    return item.itemType === 'armor';
}

function isWeapon(item: Weapon | Armor): item is Weapon {
    return (item as Weapon).damage != null;
}

function isArmor(item: Weapon | Armor): item is Armor {
    return (item as Armor).armor_class != null;
}

/**
 * Takes an ID and Item Type, and will return that item from it's list.
 * @param id
 * @param type
 * @returns
 */
export function getItemByID(id: number, type: string): Weapon | Armor | null {
    if (id == null || type == null) {
        return null;
    }

    logger('debug', `Getting ${id} in ${type} list.`);
    let item = null;

    switch (type) {
        case 'weapon':
            [item] = filterArrayByProperty(weaponList, ['id'], id) as Weapon[];
            break;
        case 'armor':
            [item] = filterArrayByProperty(armorList, ['id'], id) as Armor[];
            break;
        default:
    }

    return item;
}

/**
 * Takes a list of enchantments and item type, and returns a neat enchantment name based on that combination.
 * @param enchantments
 * @param itemType
 */
export function getEnchantmentName(
    enchantments: Enchantments,
    itemType: string
): string | null {
    const topValues = getTopValuesFromObject(enchantments, 2);
    let enchantmentName = null;

    if (topValues.length === 0 || topValues == null) {
        return null;
    }

    logger(
        'debug',
        `Generating enchantment name. Top values were ${topValues[0]} and ${topValues[1]}.`
    );

    switch (itemType) {
        case 'weapon':
            enchantmentName = filterArrayByProperty(
                weaponEnchantmentNames,
                ['enchantments'],
                topValues
            );
            break;
        case 'armor':
            enchantmentName = [
                {
                    name: 'Protection',
                },
            ];
            break;
        default:
            enchantmentName = [
                {
                    name: 'Magic',
                },
            ];
    }

    return enchantmentName[0].name;
}

/**
 * This takes a stored item, and assembles its full name using it's reinforcements and enchantments.
 * @param item
 */
export function getFullItemName(
    item: StoredWeapon | StoredArmor | null
): string {
    logger('debug', 'Compiling full item name.');
    const dbItem = getItemByID(item.id, item.itemType);

    if (dbItem == null) {
        return 'Nothing';
    }

    let itemName = `${capitalize(dbItem.rarity)} ${dbItem.name}`;
    const { enchantments } = item;
    const enchantmentName = getEnchantmentName(enchantments, item.itemType);

    if (enchantmentName != null) {
        itemName = `${itemName} of ${enchantmentName}`;
    }

    if (item.refinements !== 0) {
        itemName = `${itemName} +${item.refinements}`;
    }

    return itemName;
}

export function getFullItemTextWithStats(
    item: StoredWeapon | StoredArmor | null
) {
    logger('debug', 'Compiling full item name with stats.');

    if (item == null) {
        logger('debug', 'Null item passed to getFullItemTextWithStats');
        return 'Nothing';
    }

    const dbItem = getItemByID(item.id, item.itemType);
    let message;

    if (dbItem == null) {
        logger('debug', 'Could not find weapon in database.');
        return 'Nothing';
    }

    const fullName = getFullItemName(item);
    if (fullName == null) {
        return 'Nothing';
    }

    if (isWeapon(dbItem)) {
        message = `${fullName} | ${dbItem.damage} DMG | ${
            dbItem.damage_type
        } | ${dbItem.properties.join(', ')} | ${capitalize(dbItem.rarity)}`;
    } else if (isArmor(dbItem)) {
        message = 'soon';
    }

    return message;
}

export function generateEnchantmentListForUser(
    baseEnchantmentValue: number
): Enchantments {
    let availablePoints = addOrSubtractRandomPercentage(baseEnchantmentValue);
    const enchantments = {
        earth: 0,
        wind: 0,
        fire: 0,
        water: 0,
        light: 0,
        darkness: 0,
    };
    const enchantmentKeys = Object.keys(enchantments);

    // TODO: This could probably be improved.
    // Randomly assign our pool of points until we're out of them.
    while (availablePoints > 0) {
        const selectedEnchantment =
            enchantmentKeys[Math.floor(Math.random() * enchantmentKeys.length)];
        // @ts-ignore
        enchantments[selectedEnchantment] += 1;
        availablePoints -= 1;
    }

    return enchantments;
}
