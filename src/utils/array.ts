/* eslint-disable @typescript-eslint/no-explicit-any */
export function getRandomElement ( arr: any[] ) {
    return arr[ Math.floor( Math.random() * arr.length ) ]
}
