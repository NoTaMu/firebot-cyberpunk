import { SettingCategoryDefinition } from '@crowbartools/firebot-custom-scripts-types/types/modules/game-manager';
import { startGameCycle } from '../../systems/cycle';

import { verifyWorld } from '../../systems/world/world-stats';
import { registerCommands } from '../commands/register-commands';
import { logger, registerGame } from '../firebot';

const gameSettings: Record<string, SettingCategoryDefinition> = {
    generalSettings: {
        title: 'General Settings',
        description: 'General settings for the RPG.',
        sortRank: 1,
        settings: {
            currencyId: {
                type: 'currency-select',
                title: 'Currency',
                description: 'Which currency to use for this game.',
                tip: 'Select the currency players will use throughout the game.',
                default: '',
                sortRank: 1,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
        },
    },
    worldSettings: {
        title: 'World Settings',
        description: 'Your world settings.',
        sortRank: 2,
        settings: {
            cycleTime: {
                type: 'string',
                title: 'Cycle Time',
                description:
                    'How many seconds should each world cycle be? Changing this requires you restart Firebot.',
                tip: 'This is the timer used for each "round" of the game. Extending this time will slow down how often world stats change.',
                default: 60,
                sortRank: 1,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
            name: {
                type: 'string',
                title: 'Name',
                description: 'What would you like your game area to be called?',
                tip: 'This will be used to reference your game world throughout the game.',
                default: 'Firetopia',
                sortRank: 2,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
            type: {
                type: 'string',
                title: 'Type',
                description: 'What is your game area type?',
                tip: 'This just adds flavor. You could have a city, town, village, etc...',
                default: 'Kingdom',
                sortRank: 3,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
            citizens: {
                type: 'string',
                title: 'Citizens',
                description: 'What type of people inhabit your kingdom?',
                tip: 'This just adds flavor. You could have a kingdom of elves, orcs, humans, people, etc...',
                default: 'People',
                sortRank: 4,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
        },
    },
    combatSettings: {
        title: 'Combat Settings',
        description: 'Settings related to combat.',
        sortRank: 3,
        settings: {
            offHandMissChance: {
                type: 'number',
                title: 'Off hand fumble chance',
                description:
                    'If a weapon in the off hand is not "light", this is the innate miss chance.',
                tip: 'Off hand weapons will fail to attack this often in melee.',
                default: 25,
                sortRank: 1,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
            rangedInMeleePenalty: {
                type: 'number',
                title: 'Ranged in melee fumble chance',
                description:
                    'If a ranged weapon is used in melee, this is the fumble chance.',
                tip: 'Ranged weapons will fail to attack this often when in melee.',
                default: 25,
                sortRank: 1,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
            toHitBonus: {
                type: 'number',
                title: 'To hit bonus',
                description:
                    'Divide character stats by this number to determine hit bonus',
                tip: 'The lower this number, the higher the hit bonus. This will make characters hit more often.',
                default: 5,
                sortRank: 2,
                showBottomHr: false,
                validation: {
                    required: true,
                },
            },
        },
    },
};

export function registerRPG(): void {
    logger('info', 'RPG: Starting Firebot RPG...');

    registerGame({
        id: 'fbrpg',
        name: 'Firebot RPG',
        subtitle: 'A chat based RPG',
        description: 'An RPG entirely driven by Firebot and your chat.',
        icon: 'fa-swords',
        settingCategories: gameSettings,
        onLoad: async () => {
            registerCommands();
            await verifyWorld();
            await startGameCycle();
        },
        onUnload: () => {},
        onSettingsUpdate: () => {
            verifyWorld();
        },
    });
}
