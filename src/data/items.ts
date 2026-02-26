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

export type ItemName = typeof ItemNames[keyof typeof ItemNames];

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
  [ItemNames.Limestone]: "Stone_256.png",
  [ItemNames.IronOre]: "IconDesc_iron_new_256.png",
  [ItemNames.CopperOre]: "IconDesc_copper_new_256.png",
  [ItemNames.CateriumOre]: "IconDesc_CateriumOre_256.png",
  [ItemNames.Coal]: "IconDesc_CoalOre_256.png",
  [ItemNames.RawQuartz]: "IconDesc_QuartzCrystal_256.png",
  [ItemNames.Sulfur]: "Sulfur_256.png",
  [ItemNames.Bauxite]: "IconDesc_Bauxite_256.png",
  [ItemNames.SAM]: "IconDesc_SameOre_256.png",
  [ItemNames.Uranium]: "IconDesc_UraniumOre_256.png",
};

export function getItemImageByName(name: ItemName) {
  return imageByName[ITEM_IMAGE_MAP[name]];
}
