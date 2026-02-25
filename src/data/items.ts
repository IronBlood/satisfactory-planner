import type { Building } from "./buildings";
import { imageByName } from "./images";
import {
  ItemCategories,
  type ItemCategory,
  type NonOreItemCategory,
} from "./categories";

export const OrePurities = {
  Pure: "Pure",
  Normal: "Normal",
  Impure: "Impure",
} as const;

export type OrePurity = typeof OrePurities[keyof typeof OrePurities];

export const ItemNames = {
  Limestone: "Limestone",
};

export type ItemName = typeof ItemNames[keyof typeof ItemNames];

interface Rate {
  name: ItemName;
  rate: number;
}

interface Recipe {
  name: string;
  inputs: Rate[];
  outputs: Rate[];
  building: Building;
}

interface _Item {
  category: ItemCategory;
  name: ItemName;
  image: string;
}

export interface OreItem extends _Item {
  category: typeof ItemCategories.Ore;
}

export interface NonOreItem extends _Item {
  category: NonOreItemCategory;
  recipe: Recipe;
}

export type Item = OreItem | NonOreItem;

const LimestoneOre: OreItem = {
  category: ItemCategories.Ore,
  name: "Limestone",
  image: imageByName["Stone_256.png"],
};

export const Items: Item[] = [
  LimestoneOre,
].sort((a, b) => a.name.localeCompare(b.name));
