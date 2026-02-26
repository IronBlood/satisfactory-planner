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

export const OreItemNames = {
  Limestone: "Limestone",
  IronOre: "Iron Ore",
  CopperOre: "Copper Ore",
  CateriumOre: "Caterium Ore",
  Coal: "Coal",
  RawQuartz: "Raw Quartz",
  Sulfur: "Sulfur",
  Bauxite: "Bauxite",
  SAM: "SAM",
  Uranium: "Uranium",
};

export const NonOreItemNames = {
};

export type OreItemName = typeof OreItemNames[keyof typeof OreItemNames];
export type NonOreItemName = typeof NonOreItemNames[keyof typeof NonOreItemNames];

export type ItemName = OreItemName | NonOreItemName;

interface _Item {
  category: ItemCategory;
  name: ItemName;
}

export interface OreItem extends _Item {
  category: typeof ItemCategories.Ore;
}

export interface NonOreItem extends _Item {
  category: NonOreItemCategory;
}

export type Item = OreItem | NonOreItem;

const Limestone: OreItem = {
  category: ItemCategories.Ore,
  name: ItemNames.Limestone,
};

const IronOre: OreItem = {
  category: ItemCategories.Ore,
  name: ItemNames.IronOre,
};

export const Items: Item[] = [
  Limestone,
  IronOre,
].sort((a, b) => a.name.localeCompare(b.name));

const ITEM_IMAGE_MAP: Record<ItemName, string> = {
  [OreItemNames.Limestone]: "Stone_256.png",
  [OreItemNames.IronOre]: "IconDesc_iron_new_256.png",
  [OreItemNames.CopperOre]: "IconDesc_copper_new_256.png",
  [OreItemNames.CateriumOre]: "IconDesc_CateriumOre_256.png",
  [OreItemNames.Coal]: "IconDesc_CoalOre_256.png",
  [OreItemNames.RawQuartz]: "IconDesc_QuartzCrystal_256.png",
  [OreItemNames.Sulfur]: "Sulfur_256.png",
  [OreItemNames.Bauxite]: "IconDesc_Bauxite_256.png",
  [OreItemNames.SAM]: "IconDesc_SameOre_256.png",
  [OreItemNames.Uranium]: "IconDesc_UraniumOre_256.png",
};

export function getItemImageByName(name: ItemName) {
  return imageByName[ITEM_IMAGE_MAP[name]];
}
