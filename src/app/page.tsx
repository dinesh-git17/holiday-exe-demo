import { OutroSection } from "@/components/sections/OutroSection";
import { Act2Container } from "@/components/showcase/Act2Container";
import { Act3Container } from "@/components/showcase/Act3Container";
import { ActContainer } from "@/components/showcase/ActContainer";
import { HeroSection } from "@/components/showcase/HeroSection";

export default function Home(): React.JSX.Element {
  return (
    <main>
      <HeroSection />
      <ActContainer />
      <Act2Container />
      <Act3Container />
      <OutroSection />
    </main>
  );
}
