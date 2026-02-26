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

export function getItemImageByName(name: ItemName) {
  switch (name) {
    case ItemNames.Limestone: return imageByName["Stone_256.png"];
    case ItemNames.IronOre: return imageByName["IconDesc_iron_new_256.png"];
  }

  throw new Error("invalid name");
}
