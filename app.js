'use strict';
// @ts-check

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
