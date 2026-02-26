import {
  OreItemNames,
  IngotItemNames,
  MineralItemNames,
  LiquidItemNames,
  GasItemNames,
  StandardPartItemNames,
  IndustrialPartItemNames,
  ElectronicItemNames,
  CommunicationItemNames,
  QuantumTechnologyItemNames,
  ContainerItemNames,
  FuelItemNames,
  ConsumedItemNames,
  AmmoItemNames,
  NuclearItemNames,
  WasteItemNames,
  SpecialItemNames,
  OrePurities,
  type ItemName,
  type OrePurity,
} from "./items";
import {
  BuildingNames,
  type BuildingName,
} from "./buildings";

interface Rate {
  name: ItemName;
  rate: number;
}

export interface Recipe {
  name: string;
  inputs: Rate[];
  outputs: Rate[];
  building: BuildingName;
}

const purities: Array<{ purity: OrePurity; mul_p: number }> = [
  { purity: OrePurities.Impure, mul_p: 1 },
  { purity: OrePurities.Normal, mul_p: 2 },
  { purity: OrePurities.Pure, mul_p: 3 },
];

const miners: Array<{ mk: BuildingName; mul_m: number}> = [
  { mk: BuildingNames.MinerMk1, mul_m: 1 },
  { mk: BuildingNames.MinerMk2, mul_m: 2 },
  { mk: BuildingNames.MinerMk3, mul_m: 3 },
];

export const Recipes: Recipe[] = [
  ...(Object.values(OreItemNames).map(ore => {
    return purities.map(({ purity, mul_p }) => {
      return miners.map(({ mk, mul_m }) => {
        return {
          name: `${ore} (Mk.${mul_m} on ${purity})`,
          inputs: [],
          outputs: [{
            name: ore,
            rate: 30 * mul_p * mul_m,
          }],
          building: mk,
        } as Recipe;
      }).flat();
    }).flat();
  }).flat()),
  {
    name: "Limestone (Sulfur)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Limestone,
        rate: 120,
      },
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Iron Ore (Limestone)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Limestone,
        rate: 240,
      },
    ],
    outputs: [
      {
        name: OreItemNames.IronOre,
        rate: 120,
      },
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Copper Ore (Quartz)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.RawQuartz,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 120,
      },
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Copper Ore (Sulfur)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 120,
      },
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Caterium Ore (Copper)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.CopperOre,
        rate: 150,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 120,
      }
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Caterium Ore (Quartz)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.RawQuartz,
        rate: 120
      },
    ],
    outputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 120,
      }
    ],
    building: BuildingNames.Converter,
  },
  {
    name: "Coal (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.IronOre,
        rate: 180,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Coal,
        rate: 120,
      },
    ],
  },
  {
    name: "Coal (Limestone)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Limestone,
        rate: 360,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Coal,
        rate: 120,
      },
    ],
  },
  {
    name: "Raw Quartz (Bauxite)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Bauxite,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 120,
      },
    ],
  },
  {
    name: "Raw Quartz (Coal)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Coal,
        rate: 240,
      },
    ],
    outputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 120,
      },
    ],
  },
  {
    name: "Sulfur (Coal)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Coal,
        rate: 200,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Sulfur,
        rate: 120,
      },
    ],
  },
  {
    name: "Sulfur (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.IronOre,
        rate: 300,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Sulfur,
        rate: 120,
      },
    ],
  },
  {
    name: "Bauxite (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.CateriumOre,
        rate: 150,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Bauxite,
        rate: 120,
      },
    ],
  },
  {
    name: "Bauxite (Copper)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.CopperOre,
        rate: 180,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Bauxite,
        rate: 120,
      },
    ],
  },
  {
    name: "Uranium Ore (Bauxite)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.Bauxite,
        rate: 480,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Uranium,
        rate: 120,
      }
    ],
  },
];

export function getRecipesByOutput(o: ItemName) {
  return Recipes.filter(r => r.outputs.some(x => x.name === o));
}
