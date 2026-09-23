import { SceneRuntime } from "@/components/scenes/SceneRuntime";
import { MountainOpeningScene } from "@/components/scenes/MountainOpeningScene";
import { HouseRevealScene } from "@/components/scenes/HouseRevealScene";
import { FieldDataScene } from "@/components/scenes/FieldDataScene";
import { InteriorRevealScene } from "@/components/scenes/InteriorRevealScene";
import { BedWarmthScene } from "@/components/scenes/BedWarmthScene";
import { GreenhouseScene } from "@/components/scenes/GreenhouseScene";
import { RoomsScene } from "@/components/scenes/RoomsScene";
import { HouseLifeScene } from "@/components/scenes/HouseLifeScene";
import { OutsideTransitionScene } from "@/components/scenes/OutsideTransitionScene";
import { WildlifeScene } from "@/components/scenes/WildlifeScene";
import { ActivitiesScene } from "@/components/scenes/ActivitiesScene";
import { SeasonsScene } from "@/components/scenes/SeasonsScene";
import { GettingHereScene } from "@/components/scenes/GettingHereScene";
import { StayScene } from "@/components/scenes/StayScene";

export default function Home() {
  return (
    <div data-header-overlay className="homepage-scenes">
      <SceneRuntime />
      <MountainOpeningScene />
      <HouseRevealScene />
      <FieldDataScene />
      <InteriorRevealScene />
      <BedWarmthScene />
      <GreenhouseScene />
      <RoomsScene />
      <HouseLifeScene />
      <OutsideTransitionScene />
      <WildlifeScene />
      <ActivitiesScene />
      <SeasonsScene />
      <GettingHereScene />
      <StayScene />
    </div>
  );
}
