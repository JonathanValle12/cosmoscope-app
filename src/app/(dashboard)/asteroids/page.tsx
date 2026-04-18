import AsteroidPageContent from "@/components/asteroids/AsteroidPageContent";
import { getAsteroidsPageData } from "@/lib/nasa/asteroids";
import { cookies } from "next/headers";

export default async function Asteroids() {
    const cookieStore = cookies();
    const favCookie = (await cookieStore).get("cosmoscope-fav-ids")?.value ?? "[]";
    const data = await getAsteroidsPageData();

    return <AsteroidPageContent data={data} favCookie={favCookie} />
}