import { UserCommand } from "@crowbartools/firebot-custom-scripts-types/types/modules/command-manager";
import { getCharacterMeta, logger, updateCharacterMeta } from "../../firebot/firebot";

export type Character = {
    name: string;
    totalHP: number;
    currentHP: number;
    str: number;
    dex: number;
    int: number;
    backpack: any;
    armor: any;
    main_hand: any;
    off_hand: any;
    potion: any;
    class: any;
    title: any;
}

/**
 * Returns the raw character meta data.
 * @param firebot 
 * @param username 
 * @returns 
 */
export async function getCharacterData(username: string) : Promise<Character>{
    const characterMeta = await getCharacterMeta(username);
    return characterMeta;
}

/**
 * Verifies the character is properly built. If it's not, then it sets missing settings to default.
 * Also serves to build an initial character.
 * @param firebot
 */
export async function verifyCharacter(userCommand : UserCommand){
    const userName = userCommand.commandSender;
    logger('debug', `Verifying the character state for ${userName}...`);

    const characterStats = await getCharacterData(userName);

    if(characterStats == null){
        logger('debug', `RPG: ${userName} doesn't exist yet! Creating a new character.`);
        const newCharacter : Character = {
            "name": userName,
            "totalHP": 10,
            "currentHP": 10,
            "str": 10,
            "dex": 10,
            "int": 10,
            "backpack": {},
            "armor": {},
            "main_hand": {},
            "off_hand": {},
            "potion": {},
            "class": {
                "name": "Commoner",
                "str": 0,
                "dex": 0,
                "int": 0,
                "hp": 0,
            },
            "title": {
                "name": "Worker",
                "str": 0,
                "dex": 0,
                "int": 0,
                "hp": 0,
            }
        };

        updateCharacterMeta(userName, newCharacter);
    }
}

export async function updateCharacter(username: string, property : string, value : any){
    const characterMeta = await getCharacterData(username);

    if(characterMeta == null){
        // TODO: Create a new base character.
    }

    // TODO: Update specific meta data.
}