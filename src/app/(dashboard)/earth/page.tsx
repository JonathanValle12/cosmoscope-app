import EarthPageContent from "@/components/earth/EarthPageContent";
import { getEarthPageData } from "@/lib/nasa/earth";
import { cookies } from "next/headers";

export default async function Earth() {
    const cookieStore = cookies();
    const favCookie = (await cookieStore).get("cosmoscope-fav-ids")?.value ?? "[]";
    const images = await getEarthPageData();

    return <EarthPageContent images={images} favCookie={favCookie} />
}