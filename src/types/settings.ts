export type GameSettings = {
    generalSettings: {
        currencyId: string;
        resetId: string;
    };
    worldSettings: {
        name: string;
        type: string;
        citizens: string;
        cycleTime: number;
    };
    creatureSettings: {
        easyMinHP: number;
        mediumMinHP: number;
        hardMinHP: number;
        legendaryMinHP: number;
    };
    shops: {
        refinementBaseCost: number;
        refinementMultiplier: number;
        refinementsPerLevel: number;
        enchantmentBaseCost: number;
        enchantmentMultiplier: number;
        enchantmentsPerLevel: number;
        trainingBaseCost: number;
        trainingMultiplier: number;
        trainingsPerLevel: number;
    };
    combatSettings: {
        offHandMissChance: number;
        rangedInMeleePenalty: number;
        hitBonus: number;
        damageBonus: number;
        heavyMovementSpeed: number;
        mediumMovementSpeed: number;
        lightMovementSpeed: number;
        nakedMovementSpeed: number;
        heavyDexBonus: number;
        mediumDexBonus: number;
        lightDexBonus: number;
        nakedDexBonus: number;
    };
};
