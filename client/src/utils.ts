/**
 * Gets a number of random values from an array
 * @param {T[]} array the array of values to pull from
 * @param {number} numValues the number of values to return
 * @template T
 * @returns a dependent randomized selection from the array
 */
export function randomSelection<T>(array: T[], numValues: number = 1) {
    if (array.length < numValues)
        throw new Error('Too many random values requested');

    const result: T[] = [];
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

export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
}
