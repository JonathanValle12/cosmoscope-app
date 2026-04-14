const API_KEY = process.env.NASA_API_KEY;

export async function getApod() {
    if (!API_KEY) {
        throw new Error("Falta API_KEY en las variables de entorno");
    }

    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
        {
            next: {revalidate: 3600},
        }
    );

    if (!res.ok) {
        throw new Error("No se pudo obtener el APOD");
    }

    return res.json();
}