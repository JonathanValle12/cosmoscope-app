export interface EPICImage {
    identifier: string;
    caption: string;
    image: string;
    date: string;
    centroid_coordinates: {
        lat: number;
        lon: number;
    }
}

export interface EarthImageItem extends EPICImage {
    imageUrl: string;
    formattedDate: string;
}