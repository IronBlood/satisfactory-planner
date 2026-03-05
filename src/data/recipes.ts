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

export interface Rate {
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
  { purity: OrePurities.Pure, mul_p: 4 },
];

const miners: Array<{ mk: BuildingName; mul_m: number}> = [
  { mk: BuildingNames.MinerMk1, mul_m: 1 },
  { mk: BuildingNames.MinerMk2, mul_m: 2 },
  { mk: BuildingNames.MinerMk3, mul_m: 4 },
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

  {
    name: "Iron Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 30,
      },
    ],
  },

  {
    name: "Concrete",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.Limestone,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        rate: 15,
      },
    ],
  },

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.CrudeOil} (${purity})`,
    building: BuildingNames.OilExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 60 * mul_p,
      },
    ],
  } as Recipe)),

  {
    name: "Rocket Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Turbofuel,
        rate: 60,
      },
      {
        name: LiquidItemNames.NitricAcid,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        rate: 100,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 10,
      },
    ],
  },

  {
    name: "Iron Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 15,
      },
    ],
  },

  {
    name: "Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 20,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 4,
      },
    ],
  },

  {
    name: "Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 30,
      },
    ],
  },
  {
    name: "Cable",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        rate: 60,
      },
    ],
  },

  {
    name: "Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 10,
      },
      {
        name: ElectronicItemNames.Cable,
        rate: 20,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        rate: 2.5,
      },
    ],
  },

  {
    name: "Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 600,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 30,
      },
    ],
  },

  {
    name: "Empty Canister",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 60,
      },
    ],
  },

  {
    name: "Alternate: Compacted Coal",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 25,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 25,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.CompactedCoal,
        rate: 25,
      },
    ],
  },

  {
    name: "Black Powder",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 15,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.BlackPowder,
        rate: 30,
      },
    ],
  },

  {
    name: "Iron Rebar",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.IronRebar,
        rate: 15,
      },
    ],
  },

  {
    name: "Electromagnetic Control Rod",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Stator,
        rate: 5,
      },
      {
        name: ElectronicItemNames.AILimiter,
        rate: 4,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        rate: 4,
      },
    ],
  },

  {
    name: "Uranium Waste",
    building: BuildingNames.NuclearPowerPlant,
    inputs: [
      {
        name: FuelItemNames.UraniumFuelRod,
        rate: 0.2,
      },
    ],
    outputs: [
      {
        name: WasteItemNames.UraniumWaste,
        rate: 10,
      }
    ],
  },

  {
    name: "Smart Plating",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 2,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 2,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.SmartPlating,
        rate: 2,
      },
    ],
  },
];

const RecipeNameMap: Record<string, Recipe> = {};
for (const r of Recipes) {
  if (RecipeNameMap[r.name]) {
    throw new Error("duplicated recipe names");
  }
  RecipeNameMap[r.name] = r;
}

export function getRecipeByName(n: string) {
  return RecipeNameMap[n];
}

export function getRecipesByOutput(o: ItemName) {
  return Recipes.filter(r => r.outputs.some(x => x.name === o));
}

export function getRecipesByInput(i: ItemName) {
  return Recipes.filter(r => r.inputs.some(x => x.name === i));
}
