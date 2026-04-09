export interface EPICImage {
    identifier: string,
    caption: string,
    image: string,
    date: string,
    centroid_coordinates: {
        lat: number,
        lon: number
    }
}