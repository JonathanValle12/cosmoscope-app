import FeaturedGallery from "@/components/home/FeaturedGallery";
import Hero from "@/components/home/Hero";
import { QuickStats } from "@/components/home/QuickStats";
import { getQuickStatsData } from "@/lib/nasa/stats";

export default async function Home() {

  const stats = await getQuickStatsData();
  
  return (
    <>
        <Hero />
        <QuickStats {...stats} />
        <FeaturedGallery  />
    </>
  );
}
