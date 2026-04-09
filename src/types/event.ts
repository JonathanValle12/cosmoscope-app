
export interface NaturalEvent {
    id: string,
    title: string,
    description: string | null,
    link: string,
    categories: {
        id: string,
        title: string
    }[],
    sourceS: {
        id: string,
        url: string
    }[],
    geometry: {
        date: string,
        type: string,
        coordinates: number[]
    }[]
}