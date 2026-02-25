export const ItemCategories = {
  ALL: "All",
  Ore: "Ores",
  Ingot: "Ingots",
  Mineral: "Minerals",
  Liquid: "Liquids",
  Gas: "Gas",
  StandardPart: "Standard Parts",
  IndustrialPart: "Industrial Parts",
  Electronic: "Electronics",
  Communication: "Communications",
  QuantumTechnology: "Quantum Technology",
  Container: "Containers",
  Fuel: "Fuels",
  Consumed: "Consumed",
  Ammo: "Ammos",
  Nuclear: "Nuclear",
  Waste: "Waste",
  Special: "Special",
} as const;

export type ItemCategory = typeof ItemCategories[keyof typeof ItemCategories];
export type NonOreItemCategory = Exclude<ItemCategory, typeof ItemCategories.Ore | typeof ItemCategories.ALL>;
