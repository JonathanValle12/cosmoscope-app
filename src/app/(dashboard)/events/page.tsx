import EventPageContent from "@/components/events/EventPageContent";
import { getEventsPageData } from "@/lib/nasa/events";
import { cookies } from "next/headers";

export default async function Events() {
    const cookieStore = cookies();
    const favCookie = (await cookieStore).get("cosmoscope-fav-ids")?.value ?? "[]";
    const data = await getEventsPageData();

    return <EventPageContent data={data} favCookie={favCookie} />
}