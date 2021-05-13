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

async function main() {
    const destinyManifest = await getDestinyManifest($http);
    const manifestTables = await getDestinyManifestSlice($http, {
        destinyManifest: destinyManifest.Response,
        tableNames: ['DestinyActivityDefinition'],
        language: 'en'
    });

    const pvpMaps = Object.entries(manifestTables.DestinyActivityDefinition)
        .filter(([, v]) => v.isPvP && v.activityModeTypes.includes(5) && !v.isPlaylist && /^\/img\/destiny_content\/pgcr\/(pvp|crucible)/.test(v.pgcrImage))
        .map(([, v]) => ({
            name: v.displayProperties.name,
            url: v.pgcrImage
        }))
        .sort((a, b) => {
            const simpA = a.name.replace('The ', '');
            const simpB = b.name.replace('The ', '');
            return simpA.localeCompare(simpB);
        })
        ;

    const map = {};
    pvpMaps.forEach(obj => (map[obj.name] = `https://bungie.net${obj.url}`));

    // console.log(JSON.stringify(pvpMaps, null, 4));
    await fs.writeFile('./data.js', `export const maps = ${JSON.stringify(map, null, 4)}\n`);
    console.log(map);
}

main();
