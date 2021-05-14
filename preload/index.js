import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import { getDestinyManifest, getDestinyManifestSlice } from 'bungie-api-ts/destiny2';
import fs from 'fs/promises';

const $http = async (config) => {
    const res = await fetch(config.url, {
        headers: {
            'X-API-Key': process.env.API_KEY,
        }
    });
    return res.json();
}

function stringifyExport(varName, obj) {
    return `export const ${varName} = ${JSON.stringify(obj, null, 4)};\n`;
}

async function main() {
    const destinyManifest = await getDestinyManifest($http);
    const manifestTables = await getDestinyManifestSlice($http, {
        destinyManifest: destinyManifest.Response,
        tableNames: ['DestinyActivityDefinition', 'DestinyInventoryItemDefinition'],
        language: 'en'
    });

    const pvpMaps = Object.values(manifestTables.DestinyActivityDefinition)
        .filter(act => act.isPvP && act.activityModeTypes.includes(5) && !act.isPlaylist && /^\/img\/destiny_content\/pgcr\/(pvp|crucible)/.test(act.pgcrImage))
        .map(act => ({
            name: act.displayProperties.name,
            url: act.pgcrImage
        }))
        .sort((a, b) => {
            const simpA = a.name.replace('The ', '');
            const simpB = b.name.replace('The ', '');
            return simpA.localeCompare(simpB);
        });

    const subclasses = Object.values(manifestTables.DestinyInventoryItemDefinition)
        .filter(item => / Subclass$/.test(item.itemTypeDisplayName) && /^\w+$/.test(item.displayProperties.name))
        .map(item => {
            let [, damageType, classType] = /^(\w+)_(\w+)$/.exec(item.talentGrid?.buildName);
            let { displayProperties: { name, icon } } = item;
            icon = `https://bungie.net${icon}`;

            if (damageType === 'thermal')
                damageType = 'solar';

            return {
                name,
                icon,
                damageType,
                classType,
            };
        });

    const classes = subclasses;
    console.log(subclasses);


    const unvaultedMaps = [
        'Altar of Flame',
        'The Anomaly',
        'Bannerfall',
        'The Burnout',
        'Cauldron',
        'Convergence',
        'The Dead Cliffs',
        'Distant Shore',
        'Endless Vale',
        'Exodus Blue',
        'The Fortress',
        'Fragment',
        'Javelin-4',
        'Midtown',
        'Pacifica',
        'Radiant Cliffs',
        'Rusted Lands',
        'Twilight Gap',
        "Widow's Court",
        'Wormhaven',
    ];
    const maps = {};
    pvpMaps.forEach(({ name, url }) => {
        if (unvaultedMaps.includes(name))
            maps[name] = `https://bungie.net${url}`;
    });

    await fs.writeFile('./data.js', stringifyExport('maps', maps) + stringifyExport('classes', classes));
}

main();
