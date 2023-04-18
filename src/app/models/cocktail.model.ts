export class Cocktail {
    constructor(public id: number,
                public name: string,
                public type: string,
                public glass: string,
                public instructions: string,
                public thumbnail: string,
                public ingredients: string[],
                public measures: string[]){}
}