'use strict';
// @ts-check
import { maps, classes } from './data.js';

/**
 * Gets a number of random values from an array
 * @param {T[]} array the array of values to pull from
 * @param {number} numValues the number of values to return
 * @template T
 * @returns a dependent randomized selection from the array
 */
function randomSelection(array, numValues = 1) {
    if (array.length < numValues)
        throw new Error('Too many random values requested');

    const result = [];
    for (let i = 0; i < numValues; i++) {
        let valueToInsert;
        do {
            const randomIndex = Math.floor(Math.random() * array.length);
            valueToInsert = array[randomIndex];
        } while (result.includes(valueToInsert));
        result.push(valueToInsert);
    }
    return result;
}

console.log(randomSelection(Object.keys(maps), 1)[0]);

const selectedClass = 'warlock';

const subclass = randomSelection(Object.keys(classes[selectedClass]), 1)[0];
const tree = randomSelection(['Bottom', 'Middle', 'Top'], 1)[0];

console.log(getDisplay(selectedClass, subclass, tree));

function getDisplay(selectedClass, subclass, tree) {
    const { name } = classes[selectedClass][subclass];
    return `${tree} Tree ${name}`;
}
