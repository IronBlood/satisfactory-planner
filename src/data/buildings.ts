import { imageByName } from "./images";

export const BuildingNames = {
  MinerMk1: "Miner Mk.1",
  // MinerMk2: "Miner Mk.2",
  // MinerMk3: "Miner Mk.3",
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
    image: imageByName["MinerMk1_256.png"],
    power: 5,
  },
};
