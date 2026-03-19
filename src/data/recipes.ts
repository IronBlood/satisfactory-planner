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

export interface IngredientAmount {
  name: ItemName;
  amount: number;
}

export interface Recipe {
  name: string;
  inputs: IngredientAmount[];
  outputs: IngredientAmount[];
  /** unit: second */
  duration: number;
  building: BuildingName;
}

const purities: Array<{ purity: OrePurity; mul_p: number }> = [
  { purity: OrePurities.Impure, mul_p: 1 },
  { purity: OrePurities.Normal, mul_p: 2 },
  { purity: OrePurities.Pure, mul_p: 4 },
];

const miners: Array<{ building: BuildingName; mk: number; mul_m: number}> = [
  { building: BuildingNames.MinerMk1, mk: 1, mul_m: 1 },
  { building: BuildingNames.MinerMk2, mk: 2, mul_m: 2 },
  { building: BuildingNames.MinerMk3, mk: 3, mul_m: 4 },
];

export const Recipes: Recipe[] = [
  // Ores
  ...(Object.values(OreItemNames).map(ore => {
    return purities.map(({ purity, mul_p }) => {
      return miners.map(({ building, mk, mul_m }) => {
        return {
          name: `${ore} (Mk.${mk} on ${purity})`,
          inputs: [],
          outputs: [{
            name: ore,
            amount: 1,
          }],
          duration: 60 / (30 * mul_p * mul_m),
          building,
        } as Recipe;
      }).flat();
    }).flat();
  }).flat()),
  {
    name: "Limestone (Sulfur)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Limestone,
        amount: 12,
      },
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Iron Ore (Limestone)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Limestone,
        amount: 24,
      },
    ],
    outputs: [
      {
        name: OreItemNames.IronOre,
        amount: 12,
      },
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Copper Ore (Quartz)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.RawQuartz,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 12,
      },
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Copper Ore (Sulfur)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 12,
      },
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Caterium Ore (Copper)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.CopperOre,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 12,
      }
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Caterium Ore (Quartz)",
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.RawQuartz,
        amount: 12
      },
    ],
    outputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 12,
      }
    ],
    duration: 6,
    building: BuildingNames.Converter,
  },
  {
    name: "Coal (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.IronOre,
        amount: 18,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Coal,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Coal (Limestone)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Limestone,
        amount: 36,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Coal,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Raw Quartz (Bauxite)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Bauxite,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Raw Quartz (Coal)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Coal,
        amount: 24,
      },
    ],
    outputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Sulfur (Coal)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Coal,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Sulfur,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Sulfur (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.IronOre,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Sulfur,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Bauxite (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.CateriumOre,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Bauxite,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Bauxite (Copper)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.CopperOre,
        amount: 18,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Bauxite,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Uranium Ore (Bauxite)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Bauxite,
        amount: 48,
      },
    ],
    outputs: [
      {
        name: OreItemNames.Uranium,
        amount: 12,
      }
    ],
    duration: 6,
  },

  // Ingots
  {
    name: "Iron Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "Alt.: Basic Iron Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 5,
      },
      {
        name: OreItemNames.Limestone,
        amount: 8,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 10,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Iron Alloy Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 8,
      },
      {
        name: OreItemNames.CopperOre,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 15,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Leached Iron Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 5,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 10,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Pure Iron Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 7,
      },
      {
        name: LiquidItemNames.Water,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 13,
      },
    ],
    duration: 12,
  },
  {
    name: "Copper Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "Alt.: Copper Alloy Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 5,
      },
      {
        name: OreItemNames.IronOre,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 10,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Leached Copper Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 9,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 22,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Pure Copper Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 6,
      },
      {
        name: LiquidItemNames.Water,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 15,
      },
    ],
    duration: 24,
  },
  {
    name: "Alt.: Tempered Copper Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        amount: 5,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 8,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 12,
      },
    ],
    duration: 12,
  },
  {
    name: "Caterium Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Leached Caterium Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 9,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 6,
      },
    ],
    duration: 10,
  },
  {
    name: "Alt.: Pure Caterium Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 2,
      },
      {
        name: LiquidItemNames.Water,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
    ],
    duration: 5,
  },
  {
    name: "Alt.: Tempered Caterium Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        amount: 6,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 3,
      },
    ],
    duration: 8,
  },
  {
    name: "Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 3,
      },
      {
        name: OreItemNames.Coal,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 3,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Coke Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 15,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 20,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Compacted Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        amount: 2,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 4,
      },
    ],
    duration: 24,
  },
  {
    name: "Alt.: Solid Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 2,
      },
      {
        name: OreItemNames.Coal,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 3,
      },
    ],
    duration: 3,
  },
  {
    name: "Aluminum Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: MineralItemNames.AluminumScrap,
        amount: 6,
      },
      {
        name: MineralItemNames.Silica,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 4,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Pure Aluminum Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: MineralItemNames.AluminumScrap,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "Ficsite Ingot (Aluminum)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 2,
      },
      {
        name: IngotItemNames.AluminumIngot,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        amount: 1
      },
    ],
    duration: 2,
  },
  {
    name: "Ficsite Ingot (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 3,
      },
      {
        name: IngotItemNames.CateriumIngot,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        amount: 1,
      },
    ],
    duration: 4,
  },
  {
    name: "Ficsite Ingot (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 4,
      },
      {
        name: IngotItemNames.IronIngot,
        amount: 24,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        amount: 1,
      },
    ],
    duration: 5,
  },

  // Minerals
  {
    name: "Concrete",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.Limestone,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        amount: 1,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Alternate: Fine Concrete",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: MineralItemNames.Silica,
        amount: 3,
      },
      {
        name: OreItemNames.Limestone,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        amount: 10,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Rubber Concrete",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Limestone,
        amount: 10,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        amount: 9,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Wet Concrete",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Limestone,
        amount: 6,
      },
      {
        name: LiquidItemNames.Water,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        amount: 4,
      },
    ],
    duration: 3,
  },
  {
    name: "Quartz Crystal",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 5
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 3,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Fused Quartz Crystal",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 25,
      },
      {
        name: OreItemNames.Coal,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 18,
      },
    ],
    duration: 20,
  },
  {
    name: "Alt.: Pure Quartz Crystal",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 9,
      },
      {
        name: LiquidItemNames.Water,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 7,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Quartz Purification",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 24,
      },
      {
        name: LiquidItemNames.NitricAcid,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 15,
      },
      {
        name: LiquidItemNames.DissolvedSilica,
        amount: 12,
      },
    ],
    duration: 12,
  },
  {
    name: "Silica",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        amount: 5,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Cheap Silica",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        amount: 3,
      },
      {
        name: OreItemNames.Limestone,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        amount: 7,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Distilled Silica",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.DissolvedSilica,
        amount: 12,
      },
      {
        name: OreItemNames.Limestone,
        amount: 5,
      },
      {
        name: LiquidItemNames.Water,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        amount: 27,
      },
      {
        name: LiquidItemNames.Water,
        amount: 8,
      },
    ],
    duration: 6,
  },
  {
    name: "Copper Powder",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.CopperPowder,
        amount: 5,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Polymer Resin",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.PolymerResin,
        amount: 13,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Petroleum Coke",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Aluminum Scrap",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 4,
      },
      {
        name: OreItemNames.Coal,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        amount: 6,
      },
      {
        name: LiquidItemNames.Water,
        amount: 2,
      },
    ],
    duration: 1,
  },
  {
    name: "Alt.: Electrode Aluminum Scrap",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 12,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        amount: 20,
      },
      {
        name: LiquidItemNames.Water,
        amount: 7,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Instant Scrap",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        amount: 15,
      },
      {
        name: OreItemNames.Coal,
        amount: 10,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 5,
      },
      {
        name: LiquidItemNames.Water,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        amount: 30,
      },
      {
        name: LiquidItemNames.Water,
        amount: 5,
      },
    ],
    duration: 6,
  },

  // Liquids
  {
    name: LiquidItemNames.Water,
    building: BuildingNames.WaterExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.Water,
        amount: 1,
      },
    ],
    duration: 0.5,
  },

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.Water} (${purity}) Resource Well`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.Water,
        amount: 1,
      },
    ],
    duration: 2 / mul_p,
  } as Recipe)),

  {
    name: "Unpackage Water",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedWater,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Water,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 1,
  },

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.CrudeOil} (${purity})`,
    building: BuildingNames.OilExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 1,
      },
    ],
    duration: 1 / mul_p,
  } as Recipe)),

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.CrudeOil} (${purity}) Resource Well`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 1,
      },
    ],
    duration: 2 / mul_p,
  } as Recipe)),

  {
    name: "Unpackage Oil",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedOil,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 2,
  },

  {
    name: "Unpackage Heavy Oil Residue",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedHeavyOilResidue,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Heavy Oil Residue",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 4,
      },
      {
        name: MineralItemNames.PolymerResin,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 4,
      },
      {
        name: MineralItemNames.PolymerResin,
        amount: 3,
      },
    ],
    duration: 6,
  },
  {
    name: "Unpackage Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedFuel,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 2,
  },
  {
    name: "Alt.: Diluted Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 5,
      },
      {
        name: LiquidItemNames.Water,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 10,
      },
    ],
    duration: 6,
  },
  {
    name: "Residual Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 4,
      },
    ],
    duration: 6,
  },
  {
    name: "Turbofuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 6,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 5,
      },
    ],
    duration: 16,
  },
  {
    name: "Unpackage Turbofuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedTurbofuel,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Turbo Blend Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 2,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 4,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 3,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 6,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Turbo Heavy Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 5,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 4,
      },
    ],
    duration: 8,
  },
  {
    name: "Alumina Solution",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        amount: 12,
      },
      {
        name: LiquidItemNames.Water,
        amount: 18,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 12,
      },
      {
        name: MineralItemNames.Silica,
        amount: 5,
      },
    ],
    duration: 6,
  },
  {
    name: "Unpackage Alumina Solution",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedAluminaSolution,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 2,
      },
    ],
    duration: 1,
  },
  {
    name: "Alt.: Sloppy Alumina",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        amount: 10,
      },
      {
        name: LiquidItemNames.Water,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 12,
      },
    ],
    duration: 3,
  },
  {
    name: "Sulfuric Acid",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Sulfur,
        amount: 5,
      },
      {
        name: LiquidItemNames.Water,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 5,
      },
    ],
    duration: 6,
  },
  {
    name: "Unpackage Sulfuric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedSulfuricAcid,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 1,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 1,
      },
    ],
    duration: 1,
  },
  {
    name: "Nitric Acid",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 12,
      },
      {
        name: LiquidItemNames.Water,
        amount: 3,
      },
      {
        name: StandardPartItemNames.IronPlate,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.NitricAcid,
        amount: 3,
      },
    ],
    duration: 6,
  },
  {
    name: "Unpackage Nitric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedNitricAcid,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.NitricAcid,
        amount: 1,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 1,
      },
    ],
    duration: 3,
  },

  // Gas
  ...purities.map(({ purity, mul_p }) => ({
    name: `${GasItemNames.NitrogenGas} (${purity})`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 1,
      },
    ],
    duratioin: 1 / mul_p,
  } as Recipe)),
  {
    name: "Unpackage Nitrogen Gas",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedNitrogenGas,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 4,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 1,
      },
    ],
    duration: 1,
  },
  {
    name: "Nitrogen Gas (Bauxite)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.Bauxite,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 12,
      },
    ],
    duration: 6,
  },
  {
    name: "Nitrogen Gas (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
      {
        name: OreItemNames.CateriumOre,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 12,
      }
    ],
    duration: 6,
  },

  {
    name: "Rocket Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 6,
      },
      {
        name: LiquidItemNames.NitricAcid,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 10,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 1,
      },
    ],
    duration: 6,
  },
  {
    name: "Unpackage Rocket Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedRocketFuel,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 2,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 1,
      },
    ],
    duration: 1,
  },
  {
    name: "Alt.: Nitro Rocket Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 4,
      },
      {
        name: GasItemNames.NitrogenGas,
        amount: 3,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 4,
      },
      {
        name: OreItemNames.Coal,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 6,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 1,
      },
    ],
    duration: 2.4,
  },
  {
    name: "Ionized Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 16,
      },
      {
        name: SpecialItemNames.PowerShard,
        amount: 1
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        amount: 16,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 2,
      },
    ],
    duration: 24,
  },
  {
    name: "Unpackage Ionized Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedIonizedFuel,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        amount: 4,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 2,
      },
    ],
    duration: 3,
  },
  {
    name: "Alt.: Dark-Ion Fuel",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: FuelItemNames.PackagedRocketFuel,
        amount: 12,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        amount: 10,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 2,
      },
    ],
    duration: 3,
  },
  {
    name: "Excited Photonic Matter",
    building: BuildingNames.Converter,
    inputs: [
    ],
    outputs: [
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 10,
      },
    ],
    duration: 3,
  },

  // Standard Parts
  {
    name: "Iron Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 1,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Aluminum Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 7,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Steel Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 4,
      },
    ],
    duration: 5,
  },
  {
    name: "Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        amount: 4,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Cast Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        amount: 20,
      },
    ],
    duration: 24,
  },
  {
    name: "Alt.: Steel Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        amount: 52,
      },
    ],
    duration: 12,
  },
  {
    name: "Iron Plate",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Coated Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 5,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 10,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Steel Iron Plate",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 1,
      },
      {
        name: IngotItemNames.SteelIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 3,
      },
    ],
    duration: 4,
  },
  {
    name: "Reinforced Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 6,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Adhered Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 1,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Bolted Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 18,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 50,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 3,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Stitched Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 10,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 3,
      },
    ],
    duration: 32,
  },
  {
    name: "Copper Sheet",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 1,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Steamed Copper Sheet",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 3,
      },
      {
        name: LiquidItemNames.Water,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 3,
      },
    ],
    duration: 8,
  },
  {
    name: "Alclad Aluminum Sheet",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 3,
      },
      {
        name: IngotItemNames.CopperIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        amount: 3,
      },
    ],
    duration: 6,
  },
  {
    name: "Aluminum Casing",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 2,
      },
    ],
    duration: 2,
  },
  {
    name: "Alt.: Alclad Casing",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 20,
      },
      {
        name: IngotItemNames.CopperIngot,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 15
      },
    ],
    duration: 8,
  },
  {
    name: "Steel Pipe",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Iron Pipe",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 5,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Molded Steel Pipe",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 5,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 5,
      },
    ],
    duration: 6,
  },
  {
    name: "Steel Beam",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        amount: 1,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Aluminum Beam",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        amount: 3,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Molded Beam",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 24,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 16,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        amount: 9,
      },
    ],
    duration: 12,
  },
  {
    name: "Encased Industrial Beam",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.StealBeam,
        amount: 3,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 1,
      },
    ],
    duration: 10,
  },
  {
    name: "Alt.: Encased Industrial Pipe",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 6,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 1,
      },
    ],
    duration: 15,
  },
  {
    name: "Modular Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 3,
      },
      {
        name: StandardPartItemNames.IronRod,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 2,
      },
    ],
    duration: 60,
  },
  {
    name: "Alt.: Bolted Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 56,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 2,
      },
    ],
    duration: 24,
  },
  {
    name: "Alt.: Steeled Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 2,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 3,
      },
    ],
    duration: 60,
  },
  {
    name: "Heavy Modular Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 5,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 20,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 5,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 120,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 1,
      },
    ],
    duration: 30,
  },
  {
    name: "Alt.: Heavy Encased Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 8,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 10,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 36,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 22,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 3,
      },
    ],
    duration: 64,
  },
  {
    name: "Alt.: Heavy Flexible Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 5,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 20,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 104,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 1,
      },
    ],
    duration: 16,
  },
  {
    name: "Fused Modular Frame",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 1,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 50,
      },
      {
        name: GasItemNames.NitrogenGas,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        amount: 1,
      },
    ],
    duration: 40,
  },
  {
    name: "Alt.: Heat-Fused Frame",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 1,
      },
      {
        name: IngotItemNames.AluminumIngot,
        amount: 50,
      },
      {
        name: LiquidItemNames.NitricAcid,
        amount: 8,
      },
      {
        name: LiquidItemNames.Fuel,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        amount: 1,
      },
    ],
    duration: 20,
  },
  {
    name: "Ficsite Trigon",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FicsiteTrigon,
        amount: 3,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Polyester Fabric",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        amount: 1,
      },
      {
        name: LiquidItemNames.Water,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Fabric,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 2,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 1,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Recycled Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: StandardPartItemNames.Rubber,
        amount: 6,
      },
      {
        name: LiquidItemNames.Fuel,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 12,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Residual Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        amount: 6,
      },
      {
        name: LiquidItemNames.Water,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        amount: 2,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 2,
      },
    ],
    duration: 6,
  },
  {
    name: "Alt.: Recycled Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 6,
      },
      {
        name: LiquidItemNames.Fuel,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        amount: 12,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Residual Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        amount: 4,
      },
      {
        name: LiquidItemNames.Water,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        amount: 2,
      },
    ],
    duration: 6,
  },

  // Industrial Parts
  {
    name: "Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 5,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 1,
      },
    ],
    duration: 15,
  },
  {
    name: "Alt.: Copper Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 6,
      },
      {
        name: StandardPartItemNames.Screws,
        amount: 52,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 3,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Steel Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 2,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Stator",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 3,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 8,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Quickwire Stator",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 4,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 2,
      },
    ],
    duration: 15,
  },
  {
    name: "Battery",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 2.5,
      },
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 2,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Battery,
        amount: 1,
      },
      {
        name: LiquidItemNames.Water,
        amount: 1.5,
      },
    ],
    duration: 3,
  },
  {
    name: "Alt.: Classic Battery",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: OreItemNames.Sulfur,
        amount: 6,
      },
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        amount: 7,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 8,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Battery,
        amount: 4,
      },
    ],
    duration: 8,
  },
  {
    name: "Motor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 2,
      },
      {
        name: IndustrialPartItemNames.Stator,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Electric Motor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 1,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 2,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Rigor Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 3,
      },
      {
        name: IndustrialPartItemNames.Stator,
        amount: 3,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 6,
      },
    ],
    duration: 48,
  },
  {
    name: "Heat Sink",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        amount: 5,
      },
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 1,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Heat Exchanger",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 1,
      },
    ],
    duration: 6,
  },
  {
    name: "Cooling System",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 2,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 2,
      },
      {
        name: LiquidItemNames.Water,
        amount: 5,
      },
      {
        name: GasItemNames.NitrogenGas,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        amount: 1,
      },
    ],
    duration: 10,
  },
  {
    name: "Alt.: Cooling Device",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 4,
      },
      {
        name: IndustrialPartItemNames.Motor,
        amount: 1,
      },
      {
        name: GasItemNames.NitrogenGas,
        amount: 24,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        amount: 2,
      },
    ],
    duration: 24,
  },
  {
    name: "Turbo Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        amount: 4,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 2,
      },
      {
        name: IndustrialPartItemNames.Motor,
        amount: 4,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 24,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        amount: 1,
      },
    ],
    duration: 32,
  },
  {
    name: "Alt.: Turbo Electric Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 7,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 9,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 5,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 7,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        amount: 3,
      },
    ],
    duration: 64,
  },
  {
    name: "Alt.: Turbo Pressure Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 4,
      },
      {
        name: ContainerItemNames.PressureConversionCube,
        amount: 1,
      },
      {
        name: ContainerItemNames.PackagedNitrogenGas,
        amount: 24,
      },
      {
        name: IndustrialPartItemNames.Stator,
        amount: 8,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        amount: 2,
      },
    ],
    duration: 32,
  },

  // Electronics
  {
    name: "Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 2,
      },
    ],
    duration: 15,
  },
  {
    name: "Alt.: Caterium Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 8,
      },
    ],
    duration: 4,
  },
  {
    name: "Alt.: Fused Wire",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        amount: 4,
      },
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 30,
      },
    ],
    duration: 20,
  },
  {
    name: "Alt.: Iron Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 9,
      },
    ],
    duration: 24,
  },
  {
    name: "Cable",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "Alt.: Coated Cable",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 5,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        amount: 9,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Insulated Cable",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        amount: 9,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        amount: 20,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Quickwire Cable",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        amount: 11,
      },
    ],
    duration: 24,
  },
  {
    name: "Quickwire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 5,
      },
    ],
    duration: 5,
  },
  {
    name: "Alt.: Fused Quickwire",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        amount: 1,
      },
      {
        name: IngotItemNames.CopperIngot,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 12,
      },
    ],
    duration: 8,
  },
  {
    name: "Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 2,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 1,
      },
    ],
    duration: 8,
  },
  {
    name: "Alt.: Caterium Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 10,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 7,
      },
    ],
    duration: 48,
  },
  {
    name: "Alt.: Electrode Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.Rubber,
        amount: 4,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 8,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Silicon Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 11,
      },
      {
        name: MineralItemNames.Silica,
        amount: 11,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 5,
      },
    ],
    duration: 24,
  },
  {
    name: "AI Limiter",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 5,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.AILimiter,
        amount: 1,
      },
    ],
    duration: 12,
  },
  {
    name: "Alt.: Plastic AI Limiter",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 30,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 7,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.AILimiter,
        amount: 2,
      },
    ],
    duration: 15,
  },
  {
    name: "High-Speed Connector",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 56,
      },
      {
        name: ElectronicItemNames.Cable,
        amount: 10,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 1,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Silicon High-Speed Connector",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        amount: 60,
      },
      {
        name: MineralItemNames.Silica,
        amount: 25,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 2,
      },
    ],
    duration: 40,
  },
  {
    name: "Reanimated SAM",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.SAM,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 1,
      },
    ],
    duration: 2,
  },
  {
    name: "SAM Fluctuator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        amount: 6,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 5,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.SAMFluctuator,
        amount: 1,
      },
    ],
    duration: 6,
  },

  // Communication
  {
    name: "Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 4,
      },
      {
        name: ElectronicItemNames.Cable,
        amount: 8,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 16,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        amount: 1,
      },
    ],
    duration: 24,
  },
  {
    name: "Alt.: Caterium Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 4,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 14,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 6,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        amount: 1,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Crystal Computer",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 3,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        amount: 2,
      },
    ],
    duration: 36,
  },
  {
    name: "Supercomputer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.Computer,
        amount: 4,
      },
      {
        name: ElectronicItemNames.AILimiter,
        amount: 2,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 3,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 28,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        amount: 1,
      },
    ],
    duration: 32,
  },
  {
    name: "Alt.: OC Supercomputer",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 2,
      },
      {
        name: IndustrialPartItemNames.CoolingSystem,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        amount: 1,
      },
    ],
    duration: 20,
  },
  {
    name: "Alt.: Super-State Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.Computer,
        amount: 3,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 1,
      },
      {
        name: IndustrialPartItemNames.Battery,
        amount: 10,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        amount: 1,
      },
    ],
    duration: 25,
  },
  {
    name: "Radio Control Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 32,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
      {
        name: CommunicationItemNames.Computer,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 2,
      },
    ],
    duration: 48,
  },
  {
    name: "Alt.: Radio Connection Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 4,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 2,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 1,
      },
    ],
    duration: 16,
  },
  {
    name: "Alt.: Radio Control System",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 10,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 60,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 3,
      },
    ],
    duration: 40,
  },
  {
    name: "Crystal Oscillator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 36,
      },
      {
        name: ElectronicItemNames.Cable,
        amount: 28,
      },
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 5,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 2,
      },
    ],
    duration: 120,
  },
  {
    name: "Alt.: Insulated Crystal Oscillator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 10,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 7,
      },
      {
        name: ElectronicItemNames.AILimiter,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
    ],
    duration: 32,
  },
  {
    name: "Superposition Oscillator",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 6,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        amount: 9,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        amount: 1,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 25,
      },
    ],
    duration: 12,
  },

  // Quantum
  {
    name: "Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 600,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 30,
      },
    ],
  },
  {
    name: "Alt.: Cloudy Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 240,
      },
      {
        name: OreItemNames.Limestone,
        amount: 480,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 20,
      },
    ],
  },
  {
    name: "Alt.: Oil-Based Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 40,
      },
    ],
  },
  {
    name: "Alt.: Petroleum Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 720,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 30,
      },
    ],
  },
  {
    name: "Alt.: Pink Diamonds",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 120,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 45,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 15,
      },
    ],
  },
  {
    name: "Alt.: Turbo Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 600,
      },
      {
        name: FuelItemNames.PackagedTurbofuel,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 60,
      },
    ],
  },
  {
    name: "Time Crystal",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 12,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        amount: 6,
      },
    ],
  },
  {
    name: "Dark Matter Crystal",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        amount: 30,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 150,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 30,
      },
    ],
  },
  {
    name: "Alt.: Dark Matter Crystallization",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 20,
      },
    ],
  },
  {
    name: "Alt.: Dark Matter Trap",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        amount: 30,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 150,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 60,
      },
    ],
  },
  {
    name: "Singularity Cell",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: SpecialItemNames.NuclearPasta,
        amount: 1,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 20,
      },
      {
        name: StandardPartItemNames.IronPlate,
        amount: 100,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.SingularityCell,
        amount: 10,
      },
    ],
  },
  {
    name: "Neural-Quantum Processor",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        amount: 15,
      },
      {
        name: CommunicationItemNames.Supercomputer,
        amount: 3,
      },
      {
        name: StandardPartItemNames.FicsiteTrigon,
        amount: 45,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 75,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.NeuralQuantumProcessor,
        amount: 3,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 75,
      },
    ],
  },
  {
    name: "Alien Power Matrix",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: ElectronicItemNames.SAMFluctuator,
        amount: 12.5,
      },
      {
        name: SpecialItemNames.PowerShard,
        amount: 7.5,
      },
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        amount: 7.5,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.AlienPowerMatrix,
        amount: 2.5,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 60,
      },
    ],
  },

  // Container
  {
    name: "Empty Canister",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 60,
      },
    ],
  },
  {
    name: "Alt.: Coated Iron Canister",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        amount: 30,
      },
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 60,
      },
    ],
  },
  {
    name: "Alt.: Steel Canister",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 40,
      },
    ],
  },
  {
    name: "Empty Fluid Tank",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 60,
      },
    ],
  },
  {
    name: "Pressure Conversion Cube",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        amount: 1,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PressureConversionCube,
        amount: 1,
      },
    ],
  },
  {
    name: "Packaged Water",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.Water,
        amount: 60,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PackagedWater,
        amount: 60,
      },
    ],
  },
  {
    name: "Packaged Alumina Solution",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        amount: 120,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 120,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PackagedAluminaSolution,
        amount: 120,
      },
    ],
  },
  {
    name: "Packaged Sulfuric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 40,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PackagedSulfuricAcid,
        amount: 40,
      },
    ],
  },
  {
    name: "Packaged Nitric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.NitricAcid,
        amount: 30,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PackagedNitricAcid,
        amount: 30,
      },
    ],
  },
  {
    name: "Packaged Nitrogen Gas",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: GasItemNames.NitrogenGas,
        amount: 240,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PackagedNitrogenGas,
        amount: 60,
      },
    ],
  },

  // Fuel
  {
    name: "Alternate: Compacted Coal",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 25,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.CompactedCoal,
        amount: 25,
      },
    ],
  },
  {
    name: "Packaged Oil",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        amount: 30,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedOil,
        amount: 30,
      },
    ],
  },
  {
    name: "Packaged Heavy Oil Residue",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 30,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedHeavyOilResidue,
        amount: 30,
      },
    ],
  },
  {
    name: "Packaged Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 40,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedFuel,
        amount: 40,
      },
    ],
  },
  {
    name: "Alt.: Diluted Packaged Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 30,
      },
      {
        name: ContainerItemNames.PackagedWater,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedFuel,
        amount: 60,
      },
    ],
  },
  {
    name: "Packaged Liquid Biofuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.LiquidBiofuel,
        amount: 40,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedLiquidBiofuel,
        amount: 40,
      },
    ],
  },
  {
    name: "Packaged Turbofuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 20,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedTurbofuel,
        amount: 20,
      },
    ],
  },
  {
    name: "Packaged Rocket Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 120,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedRocketFuel,
        amount: 60,
      },
    ],
  },
  {
    name: "Packaged Ionized Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: GasItemNames.IonizedFuel,
        amount: 80,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PackagedIonizedFuel,
        amount: 40,
      },
    ],
  },
  {
    name: "Uranium Fuel Rod",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: NuclearItemNames.EncasedUraniumCell,
        amount: 20,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        amount: 1.2,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.UraniumFuelRod,
        amount: 0.4,
      },
    ],
  },
  {
    name: "Alt.: Uranium Fuel Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: NuclearItemNames.EncasedUraniumCell,
        amount: 20,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 2,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 0.6,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.UraniumFuelRod,
        amount: 0.6,
      },
    ],
  },
  {
    name: "Plutonium Fuel Rod",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: NuclearItemNames.EncasedPlutoniumCell,
        amount: 7.5,
      },
      {
        name: StandardPartItemNames.StealBeam,
        amount: 4.5,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 1.5,
      },
      {
        name: IndustrialPartItemNames.HeatSink,
        amount: 2.5,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PlutoniumFuelRod,
        amount: 0.25,
      },
    ],
  },
  {
    name: "Alt.: Plutonium Fuel Unit",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: NuclearItemNames.EncasedPlutoniumCell,
        amount: 10,
      },
      {
        name: ContainerItemNames.PressureConversionCube,
        amount: 0.5,
      },
    ],
    outputs: [
      {
        name: FuelItemNames.PlutoniumFuelRod,
        amount: 0.5,
      },
    ],
  },

  // Consumed
  {
    name: "Black Powder",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 15,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.BlackPowder,
        amount: 30,
      },
    ],
  },
  {
    name: "Alt.: Fine Black Powder",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Sulfur,
        amount: 7.5,
      },
      {
        name: FuelItemNames.CompactedCoal,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.BlackPowder,
        amount: 45,
      },
    ],
  },
  {
    name: "Smokeless Powder",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: ConsumedItemNames.BlackPowder,
        amount: 20,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.SmokelessPowder,
        amount: 20,
      },
    ],
  },
  {
    name: "Gas Filter",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.Fabric,
        amount: 15,
      },
      {
        name: OreItemNames.Coal,
        amount: 30,
      },
      {
        name: StandardPartItemNames.IronPlate,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.GasFilter,
        amount: 7.5,
      },
    ],
  },
  {
    name: "Iodine-Infused Filter",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ConsumedItemNames.GasFilter,
        amount: 3.75,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 30,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 3.75,
      },
    ],
    outputs: [
      {
        name: ConsumedItemNames.IodineInfusedFilter,
        amount: 3.75,
      },
    ],
  },

  // Ammo
  {
    name: "Iron Rebar",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.IronRebar,
        amount: 15,
      },
    ],
  },
  {
    name: "Stun Rebar",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.IronRebar,
        amount: 10,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 50,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.StunRebar,
        amount: 10,
      },
    ],
  },
  {
    name: "Shatter Rebar",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.IronRebar,
        amount: 10,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.ShatterRebar,
        amount: 5,
      },
    ],
  },
  {
    name: "Explosive Rebar",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: AmmoItemNames.IronRebar,
        amount: 10,
      },
      {
        name: ConsumedItemNames.SmokelessPowder,
        amount: 10,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.ExplosiveRebar,
        amount: 5,
      },
    ],
  },
  {
    name: "Rifle Ammo",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        amount: 15,
      },
      {
        name: ConsumedItemNames.SmokelessPowder,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.RifleAmmo,
        amount: 75,
      },
    ],
  },
  {
    name: "Homing Rifle Ammo",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.RifleAmmo,
        amount: 50,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 2.5,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.HomingRifleAmmo,
        amount: 25,
      },
    ],
  },
  {
    name: "Turbo Rifle Ammo",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: AmmoItemNames.RifleAmmo,
        amount: 125,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 15,
      },
      {
        name: FuelItemNames.PackagedTurbofuel,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.TurboRifleAmmo,
        amount: 250,
      },
    ],
  },
  {
    name: "Alt.: Turbo Rifle Ammo",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: AmmoItemNames.RifleAmmo,
        amount: 125,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 15,
      },
      {
        name: LiquidItemNames.Turbofuel,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.TurboRifleAmmo,
        amount: 250,
      },
    ],
  },
  {
    name: "Nobelisk",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ConsumedItemNames.BlackPowder,
        amount: 20,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.Nobelisk,
        amount: 10,
      },
    ],
  },
  {
    name: "Gas Nobelisk",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.Nobelisk,
        amount: 5,
      },
      {
        name: FuelItemNames.Biomass,
        amount: 50,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.GasNobelisk,
        amount: 5,
      },
    ],
  },
  {
    name: "Pulse Nobelisk",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.Nobelisk,
        amount: 5,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.PulseNobelisk,
        amount: 5,
      },
    ],
  },
  {
    name: "Cluster Nobelisk",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: AmmoItemNames.Nobelisk,
        amount: 7.5,
      },
      {
        name: ConsumedItemNames.SmokelessPowder,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.ClusterNobelisk,
        amount: 2.5,
      },
    ],
  },
  {
    name: "Nuke Nobelisk",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: AmmoItemNames.Nobelisk,
        amount: 2.5,
      },
      {
        name: NuclearItemNames.EncasedUraniumCell,
        amount: 10,
      },
      {
        name: ConsumedItemNames.SmokelessPowder,
        amount: 5,
      },
      {
        name: ElectronicItemNames.AILimiter,
        amount: 3,
      },
    ],
    outputs: [
      {
        name: AmmoItemNames.NukeNobelisk,
        amount: 0.5,
      },
    ],
  },

  // Nuclear
  {
    name: "Electromagnetic Control Rod",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 6,
      },
      {
        name: ElectronicItemNames.AILimiter,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 4,
      },
    ],
  },
  {
    name: "Alt.: Electromagnetic Connection Rod",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 8,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 4,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 8,
      },
    ],
  },
  {
    name: "Encased Uranium Cell",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: OreItemNames.Uranium,
        amount: 50,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 15,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.EncasedUraniumCell,
        amount: 25,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 10,
      },
    ],
  },
  {
    name: "Alt.: Infused Uranium Cell",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: OreItemNames.Uranium,
        amount: 25,
      },
      {
        name: MineralItemNames.Silica,
        amount: 15,
      },
      {
        name: OreItemNames.Sulfur,
        amount: 25,
      },
      {
        name: ElectronicItemNames.Quickwire,
        amount: 75,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.EncasedUraniumCell,
        amount: 20,
      },
    ],
  },
  {
    name: "Non-Fissile Uranium",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: WasteItemNames.UraniumWaste,
        amount: 37.5,
      },
      {
        name: MineralItemNames.Silica,
        amount: 25,
      },
      {
        name: LiquidItemNames.NitricAcid,
        amount: 15,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 15,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.NonFissileUranium,
        amount: 50,
      },
      {
        name: LiquidItemNames.Water,
        amount: 15,
      },
    ],
  },
  {
    name: "Alt.: Fertile Uranium",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: OreItemNames.Uranium,
        amount: 25,
      },
      {
        name: WasteItemNames.UraniumWaste,
        amount: 25,
      },
      {
        name: LiquidItemNames.NitricAcid,
        amount: 15,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.NonFissileUranium,
        amount: 100,
      },
      {
        name: LiquidItemNames.Water,
        amount: 40,
      },
    ],
  },
  {
    name: "Plutonium Pellet",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: NuclearItemNames.NonFissileUranium,
        amount: 100,
      },
      {
        name: WasteItemNames.UraniumWaste,
        amount: 25,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.PlutoniumPellet,
        amount: 30,
      },
    ],
  },
  {
    name: "Encased Plutonium Cell",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: NuclearItemNames.PlutoniumPellet,
        amount: 10,
      },
      {
        name: MineralItemNames.Concrete,
        amount: 20,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.EncasedPlutoniumCell,
        amount: 5,
      },
    ],
  },
  {
    name: "Alt.: Instant Plutonium Cell",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: NuclearItemNames.NonFissileUranium,
        amount: 75,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.EncasedPlutoniumCell,
        amount: 10,
      },
    ],
  },
  {
    name: "Ficsonium",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: WasteItemNames.PlutoniumWaste,
        amount: 10,
      },
      {
        name: QuantumTechnologyItemNames.SingularityCell,
        amount: 10,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 200,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.Ficsonium,
        amount: 10,
      },
    ],
  },
  {
    name: "Ficsonium Fuel Rod",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: NuclearItemNames.Ficsonium,
        amount: 5,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 5,
      },
      {
        name: StandardPartItemNames.FicsiteTrigon,
        amount: 100,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 50,
      },
    ],
    outputs: [
      {
        name: NuclearItemNames.FicsoniumFuelRod,
        amount: 2.5,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 50,
      },
    ],
  },

  // Waste
  {
    name: "Uranium Waste",
    building: BuildingNames.NuclearPowerPlant,
    inputs: [
      {
        name: FuelItemNames.UraniumFuelRod,
        amount: 0.2,
      },
    ],
    outputs: [
      {
        name: WasteItemNames.UraniumWaste,
        amount: 10,
      }
    ],
  },
  {
    name: "Plutonium Waste",
    building: BuildingNames.NuclearPowerPlant,
    inputs: [
      {
        name: FuelItemNames.PlutoniumFuelRod,
        amount: 0.1,
      },
    ],
    outputs: [
      {
        name: WasteItemNames.PlutoniumWaste,
        amount: 1,
      },
    ],
  },

  // Special
  {
    name: "Synthetic Power Shard",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        amount: 10,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 10,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        amount: 60,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 60,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.PowerShard,
        amount: 5,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 60,
      },
    ],
  },
  {
    name: "Smart Plating",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 2,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.SmartPlating,
        amount: 2,
      },
    ],
  },
  {
    name: "Alt.: Plastic Smart Plating",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        amount: 2.5,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        amount: 2.5,
      },
      {
        name: StandardPartItemNames.Plastic,
        amount: 7.5,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.SmartPlating,
        amount: 5,
      },
    ],
  },
  {
    name: "Versatile Framework",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 2.5,
      },
      {
        name: StandardPartItemNames.StealBeam,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.VersatileFramework,
        amount: 5,
      },
    ],
  },
  {
    name: "Alt.: Flexible Framework",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        amount: 3.75,
      },
      {
        name: StandardPartItemNames.StealBeam,
        amount: 22.5,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 30,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.VersatileFramework,
        amount: 7.5,
      },
    ],
  },
  {
    name: "Automated Wiring",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 2.5,
      },
      {
        name: ElectronicItemNames.Cable,
        amount: 50,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.AutomatedWiring,
        amount: 2.5,
      },
    ],
  },
  {
    name: "Alt.: Automated Speed Wiring",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Stator,
        amount: 3.75,
      },
      {
        name: ElectronicItemNames.Wire,
        amount: 75,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        amount: 1.875,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.AutomatedWiring,
        amount: 7.5,
      },
    ],
  },
  {
    name: "Modular Engine",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Motor,
        amount: 2,
      },
      {
        name: StandardPartItemNames.Rubber,
        amount: 15,
      },
      {
        name: SpecialItemNames.SmartPlating,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.ModularEngine,
        amount: 1,
      },
    ],
  },
  {
    name: "Adaptive Control Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: SpecialItemNames.AutomatedWiring,
        amount: 5,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        amount: 5,
      },
      {
        name: StandardPartItemNames.HeavyModularFrame,
        amount: 1,
      },
      {
        name: CommunicationItemNames.Computer,
        amount: 2,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.AdaptiveControlUnit,
        amount: 1,
      },
    ],
  },
  {
    name: "Assembly Director System",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: SpecialItemNames.AdaptiveControlUnit,
        amount: 1.5,
      },
      {
        name: CommunicationItemNames.Supercomputer,
        amount: 0.75,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.AssemblyDirectorSystem,
        amount: 0.75,
      },
    ],
  },
  {
    name: "Magnetic Field Generator",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: SpecialItemNames.VersatileFramework,
        amount: 2.5,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.MagneticFieldGenerator,
        amount: 1,
      },
    ],
  },
  {
    name: "Thermal Propulsion Rocket",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: SpecialItemNames.ModularEngine,
        amount: 2.5,
      },
      {
        name: IndustrialPartItemNames.TurboMotor,
        amount: 1,
      },
      {
        name: IndustrialPartItemNames.CoolingSystem,
        amount: 3,
      },
      {
        name: StandardPartItemNames.FusedModularFrame,
        amount: 1,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.ThermalPropulsionRocket,
        amount: 1,
      },
    ],
  },
  {
    name: "Nuclear Pasta",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: MineralItemNames.CopperPowder,
        amount: 100,
      },
      {
        name: ContainerItemNames.PressureConversionCube,
        amount: 0.5,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.NuclearPasta,
        amount: 0.5,
      },
    ],
  },
  {
    name: "Biochemical Sculptor",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: SpecialItemNames.AssemblyDirectorSystem,
        amount: 0.5,
      },
      {
        name: StandardPartItemNames.FicsiteTrigon,
        amount: 40,
      },
      {
        name: LiquidItemNames.Water,
        amount: 10,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.BiochemicalSculptor,
        amount: 2,
      },
    ],
  },
  {
    name: "Ballistic Warp Drive",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: SpecialItemNames.ThermalPropulsionRocket,
        amount: 1,
      },
      {
        name: QuantumTechnologyItemNames.SingularityCell,
        amount: 5,
      },
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        amount: 2,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        amount: 40,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.BallisticWarpDrive,
        amount: 1,
      },
    ],
  },
  {
    name: "AI Expansion Server",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: SpecialItemNames.MagneticFieldGenerator,
        amount: 4,
      },
      {
        name: QuantumTechnologyItemNames.NeuralQuantumProcessor,
        amount: 4,
      },
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        amount: 4,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        amount: 100,
      },
    ],
    outputs: [
      {
        name: SpecialItemNames.AIExpansionServer,
        amount: 4,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        amount: 100,
      },
    ],
  },

  // Coal and Fuel generators
  {
    name: "Power (Compacted Coal)",
    building: BuildingNames.CoalPoweredGenerator,
    inputs: [
      {
        name: FuelItemNames.CompactedCoal,
        amount: 50/7,
      },
      {
        name: LiquidItemNames.Water,
        amount: 45,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Coal)",
    building: BuildingNames.CoalPoweredGenerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        amount: 15,
      },
      {
        name: LiquidItemNames.Water,
        amount: 45,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Petroleum Coke)",
    building: BuildingNames.CoalPoweredGenerator,
    inputs: [
      {
        name: MineralItemNames.PetroleumCoke,
        amount: 25,
      },
      {
        name: LiquidItemNames.Water,
        amount: 45,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Ionized Fuel)",
    building: BuildingNames.FuelPoweredGenerator,
    inputs: [
      {
        name: GasItemNames.IonizedFuel,
        amount: 3,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Rocket Fuel)",
    building: BuildingNames.FuelPoweredGenerator,
    inputs: [
      {
        name: GasItemNames.RocketFuel,
        amount: 60/14.4,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Turbofuel)",
    building: BuildingNames.FuelPoweredGenerator,
    inputs: [
      {
        name: LiquidItemNames.Turbofuel,
        amount: 7.5,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Liquid Biofuel)",
    building: BuildingNames.FuelPoweredGenerator,
    inputs: [
      {
        name: LiquidItemNames.LiquidBiofuel,
        amount: 20,
      },
    ],
    outputs: [
    ],
  },
  {
    name: "Power (Fuel)",
    building: BuildingNames.FuelPoweredGenerator,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        amount: 20,
      },
    ],
    outputs: [
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

export function getRecipesByBuilding(b: BuildingName) {
  return Recipes.filter(r => r.building === b);
}
