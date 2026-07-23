import { HomeBanner } from "@/html-port/HomeBanner";
import { HomeContent } from "@/html-port/HomeContent";
import { HomePreloader } from "@/html-port/HomePreloader";

export default function HomePage() {
  return (
    <>
      <HomePreloader />
      <HomeBanner />
      <HomeContent />
    </>
  );
}
