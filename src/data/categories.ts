export const ItemCategories = {
  Ore: "Ore",
  Ingot: "Ingot",
  Mineral: "Mineral",
  Liquid: "Liquid",
  Gas: "Gas",
  StandardPart: "StandardPart",
  IndustrialPart: "IndustrialPart",
  Electronic: "Electronic",
  Communication: "Communication",
  QuantumTechnology: "QuantumTechnology",
  Container: "Container",
  Fuel: "Fuel",
  Consumed: "Consumed",
  Ammo: "Ammo",
  Nuclear: "Nuclear",
  Waste: "Waste",
  Special: "Special",
} as const;

export type ItemCategory = typeof ItemCategories[keyof typeof ItemCategories];
export type NonOreItemCategory = Exclude<ItemCategory, typeof ItemCategories.Ore>;
