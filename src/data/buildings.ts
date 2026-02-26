import { imageByName } from "./images";

export const BuildingNames = {
  MinerMk1: "Miner Mk.1",
  MinerMk2: "Miner Mk.2",
  MinerMk3: "Miner Mk.3",
} as const;

export type BuildingName = typeof BuildingNames[keyof typeof BuildingNames];

export interface Building {
  name: BuildingName;
  image: string;
  power: number;
}

export const Buildings: Record<BuildingName, Building> = {
  [BuildingNames.MinerMk1]: {
    name: BuildingNames.MinerMk1,
    image: imageByName["IconDesc_MinerMk1_256.png"],
    power: 5,
  },
  [BuildingNames.MinerMk2]: {
    name: BuildingNames.MinerMk2,
    image: imageByName["IconDesc_MinerMk2_256.png"],
    power: 15,
  },
  [BuildingNames.MinerMk3]: {
    name: BuildingNames.MinerMk3,
    image: imageByName["IconDesc_MinerMk3_256.png"],
    power: 45,
  },
};
