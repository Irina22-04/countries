export type Country = {
    code: string,
    name: string,
    emoji: string,
    continent: {
        name: string
    },
}

export interface CountryItem {
    code: string,
    name: string,
    emoji: string,
    continent: string,
    key: string|number
}

export enum DataIndex {
    code = 'code',
    name = 'name',
    emoji = 'emoji',
    continent = 'continent',
    key = 'key'
}
