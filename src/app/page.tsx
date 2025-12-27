import { ActContainer } from "@/components/showcase/ActContainer";
import { HeroSection } from "@/components/showcase/HeroSection";

export default function Home(): React.JSX.Element {
  return (
    <main>
      <HeroSection />
      <ActContainer />
    </main>
  );
}
