import { Weapon } from '../types/equipment';

export const weaponList: Weapon[] = [
    {
        id: 1,
        rarity: 'basic',
        name: 'Knife',
        cost: 1,
        damage: '1d3',
        damage_type: 'slashing',
        properties: ['light', 'thrown'],
        itemType: 'weapon',
    },
    {
        id: 2,
        rarity: 'basic',
        name: 'Dagger',
        cost: 1,
        damage: '1d4',
        damage_type: 'piercing',
        properties: ['light', 'finesse', 'thrown'],
        itemType: 'weapon',
    },
    {
        id: 3,
        rarity: 'rare',
        name: 'Dagger',
        cost: 1,
        damage: '1d4',
        damage_type: 'piercing',
        properties: ['light', 'finesse', 'thrown'],
        itemType: 'weapon',
    },
    {
        id: 4,
        rarity: 'epic',
        name: 'Dagger',
        cost: 1,
        damage: '1d4',
        damage_type: 'piercing',
        properties: ['light', 'finesse', 'thrown'],
        itemType: 'weapon',
    },
    {
        id: 5,
        rarity: 'legendary',
        name: 'Dagger',
        cost: 1,
        damage: '1d4',
        damage_type: 'piercing',
        properties: ['light', 'finesse', 'thrown'],
        itemType: 'weapon',
    },
    {
        id: 6,
        rarity: 'basic',
        name: 'Broom',
        cost: 1,
        damage: '1d3',
        damage_type: 'bludgeoning',
        properties: ['two-handed'],
        itemType: 'weapon',
    },
];
