import Hero from "@/components/home/Hero";
import { QuickStats } from "@/components/home/QuickStats";
import { fetchNeoFeed } from "@/lib/nasa/asteroids";
import { fetchEPICImages } from "@/lib/nasa/earth";
import { fetchNaturalEvents } from "@/lib/nasa/events";

export default async function Home() {

    const [ neoFeed, events, epicImages ] = await Promise.all([
      fetchNeoFeed(),
      fetchNaturalEvents(50, 30),
      fetchEPICImages()
    ])
    
    const today = new Date().toISOString().split('T')[0];
    const asteroidCount = neoFeed.near_earth_objects[today]?.length || 0
    const eventCount = events.events?.length || 0
    const earthDate = epicImages[0]?.date ? new Date(epicImages[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'}) : "Latest";

  
  return (
    <>
        <Hero />
        <QuickStats asteroidCount={asteroidCount} eventCount={eventCount} imageCount={500000} earthDate={earthDate} />
    </>
  );
}
