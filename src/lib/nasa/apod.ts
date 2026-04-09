const NASA_API_KEY = "QnRtB5tIeDQ5fArJuD96Jvn430bQ7gsNAg4rkRWU";

export async function getApod() {
    if (!NASA_API_KEY) {
        throw new Error("Falta NASA_API_KEY en las variables de entorno");
    }

    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
        {
            next: {revalidate: 3600},
        }
    );

    if (!res.ok) {
        throw new Error("No se pudo obtener el APOD");
    }

    return res.json();
}