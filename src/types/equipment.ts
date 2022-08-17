export type Rarity = 'basic' | 'rare' | 'epic' | 'legendary';

export type ItemTypes =
    | 'weapon'
    | 'armor'
    | 'characterClass'
    | 'title'
    | 'shield';

export type Enchantments = {
    earth: number;
    wind: number;
    fire: number;
    water: number;
    light: number;
    darkness: number;
};

export type EnchantmentName = {
    name: string;
    enchantments: string[];
};

export type Weapon = {
    id: number;
    name: string;
    cost: number;
    damage: string;
    damage_type: string;
    properties: string[];
    rarity: Rarity;
    itemType: 'weapon';
};

export type StoredWeapon = {
    id: number;
    itemType: 'weapon';
    nickname: string | null;
    refinements: number;
    enchantments: Enchantments;
};

export type Armor = {
    id: number;
    name: string;
    cost: number;
    armorClass: number;
    properties: string[];
    rarity: Rarity;
    itemType: 'armor';
};

export type StoredArmor = {
    id: number;
    itemType: 'armor';
    nickname: string | null;
    refinements: number;
    enchantments: Enchantments;
};

export type Shield = {
    id: number;
    name: string;
    cost: number;
    armorClass: number;
    rarity: Rarity;
    properties: string[];
    itemType: 'shield';
};

export type StoredShield = {
    id: number;
    itemType: 'shield';
    nickname: string | null;
    refinements: number;
    enchantments: Enchantments;
};

export type Title = {
    id: number;
    name: string;
    bonuses: {
        str: number;
        dex: number;
        int: number;
    };
    rarity: Rarity;
    itemType: 'title';
};

export type StoredTitle = {
    id: number;
    itemType: 'title';
};

export type CharacterClass = {
    id: number;
    name: string;
    bonuses: {
        str: number;
        dex: number;
        int: number;
    };
    properties: string[];
    rarity: Rarity;
    itemType: 'characterClass';
};

export type StoredCharacterClass = {
    id: number;
    itemType: 'characterClass';
};

export type EquippableItemsDetails =
    | Weapon
    | Armor
    | Title
    | CharacterClass
    | Shield;

export type StorableItems =
    | StoredArmor
    | StoredCharacterClass
    | StoredShield
    | StoredTitle
    | StoredWeapon;
