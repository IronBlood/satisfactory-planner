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
            rate: 30 * mul_p * mul_m,
          }],
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

  // Ingots
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
    name: "Alt.: Basic Iron Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 25,
      },
      {
        name: OreItemNames.Limestone,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 50,
      },
    ],
  },
  {
    name: "Alt.: Iron Alloy Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 40,
      },
      {
        name: OreItemNames.CopperOre,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 75,
      },
    ],
  },
  {
    name: "Alt.: Leached Iron Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 50,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 100,
      },
    ],
  },
  {
    name: "Alt.: Pure Iron Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 35,
      },
      {
        name: LiquidItemNames.Water,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 65,
      },
    ],
  },
  {
    name: "Copper Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 30,
      },
    ],
  },
  {
    name: "Alt.: Copper Alloy Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 50,
      },
      {
        name: OreItemNames.IronOre,
        rate: 50,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 100,
      },
    ],
  },
  {
    name: "Alt.: Leached Copper Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 45,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 25,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 110,
      },
    ],
  },
  {
    name: "Alt.: Pure Copper Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 15,
      },
      {
        name: LiquidItemNames.Water,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 37.5,
      },
    ],
  },
  {
    name: "Alt.: Tempered Copper Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CopperOre,
        rate: 25,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 60,
      },
    ],
  },
  {
    name: "Caterium Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 15,
      },
    ],
  },
  {
    name: "Alt.: Leached Caterium Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 54,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 36,
      },
    ],
  },
  {
    name: "Alt.: Pure Caterium Ingot",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 24,
      },
      {
        name: LiquidItemNames.Water,
        rate: 24,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 12,
      },
    ],
  },
  {
    name: "Alt.: Tempered Caterium Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.CateriumOre,
        rate: 45,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 22.5,
      },
    ],
  },
  {
    name: "Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 45,
      },
      {
        name: OreItemNames.Coal,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 45,
      },
    ],
  },
  {
    name: "Alt.: Coke Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 75,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 75,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 100,
      },
    ],
  },
  {
    name: "Alt.: Compacted Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.IronOre,
        rate: 5,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 2.5,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 10,
      },
    ],
  },
  {
    name: "Alt.: Solid Steel Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 40,
      },
      {
        name: OreItemNames.Coal,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 60,
      },
    ],
  },
  {
    name: "Aluminum Ingot",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: MineralItemNames.AluminumScrap,
        rate: 90,
      },
      {
        name: MineralItemNames.Silica,
        rate: 75,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Pure Aluminum Ingot",
    building: BuildingNames.Smelter,
    inputs: [
      {
        name: MineralItemNames.AluminumScrap,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 30,
      },
    ],
  },
  {
    name: "Ficsite Ingot (Aluminum)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 60,
      },
      {
        name: IngotItemNames.AluminumIngot,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        rate: 30,
      },
    ],
  },
  {
    name: "Ficsite Ingot (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 45,
      },
      {
        name: IngotItemNames.CateriumIngot,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        rate: 15,
      },
    ],
  },
  {
    name: "Ficsite Ingot (Iron)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 40,
      },
      {
        name: IngotItemNames.IronIngot,
        rate: 240,
      },
    ],
    outputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        rate: 10,
      },
    ],
  },

  // Minerals
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
  {
    name: "Alt.: Alternate: Fine Concrete",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: MineralItemNames.Silica,
        rate: 15,
      },
      {
        name: OreItemNames.Limestone,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        rate: 50,
      },
    ],
  },
  {
    name: "Alt.: Rubber Concrete",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.Limestone,
        rate: 100,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        rate: 90,
      },
    ],
  },
  {
    name: "Alt.: Wet Concrete",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Limestone,
        rate: 120,
      },
      {
        name: LiquidItemNames.Water,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Concrete,
        rate: 80,
      },
    ],
  },
  {
    name: "Quartz Crystal",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 37.5
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 22.5,
      },
    ],
  },
  {
    name: "Alt.: Fused Quartz Crystal",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 75,
      },
      {
        name: OreItemNames.Coal,
        rate: 36,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 54,
      },
    ],
  },
  {
    name: "Alt.: Pure Quartz Crystal",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 67.5,
      },
      {
        name: LiquidItemNames.Water,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 52.5,
      },
    ],
  },
  {
    name: "Alt.: Quartz Purification",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 120,
      },
      {
        name: LiquidItemNames.NitricAcid,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 75,
      },
      {
        name: LiquidItemNames.DissolvedSilica,
        rate: 60,
      },
    ],
  },
  {
    name: "Silica",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 22.5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        rate: 37.5,
      },
    ],
  },
  {
    name: "Alt.: Cheap Silica",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: OreItemNames.RawQuartz,
        rate: 22.5,
      },
      {
        name: OreItemNames.Limestone,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        rate: 52.5,
      },
    ],
  },
  {
    name: "Alt.: Distilled Silica",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.DissolvedSilica,
        rate: 120,
      },
      {
        name: OreItemNames.Limestone,
        rate: 50,
      },
      {
        name: LiquidItemNames.Water,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.Silica,
        rate: 270,
      },
      {
        name: LiquidItemNames.Water,
        rate: 80,
      },
    ],
  },
  {
    name: "Copper Powder",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 300,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.CopperPowder,
        rate: 50,
      },
    ],
  },
  {
    name: "Alt.: Polymer Resin",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.PolymerResin,
        rate: 130,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 20,
      },
    ],
  },
  {
    name: "Petroleum Coke",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 120,
      },
    ],
  },
  {
    name: "Aluminum Scrap",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 240,
      },
      {
        name: OreItemNames.Coal,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        rate: 360,
      },
      {
        name: LiquidItemNames.Water,
        rate: 120,
      },
    ],
  },
  {
    name: "Alt.: Electrode Aluminum Scrap",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 180,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        rate: 300,
      },
      {
        name: LiquidItemNames.Water,
        rate: 105,
      },
    ],
  },
  {
    name: "Alt.: Instant Scrap",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        rate: 150,
      },
      {
        name: OreItemNames.Coal,
        rate: 100,
      },
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 50,
      },
      {
        name: LiquidItemNames.Water,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: MineralItemNames.AluminumScrap,
        rate: 300,
      },
      {
        name: LiquidItemNames.Water,
        rate: 50,
      },
    ],
  },

  // Liquids
  {
    name: LiquidItemNames.Water,
    building: BuildingNames.WaterExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.Water,
        rate: 120,
      },
    ],
  },

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.Water} (${purity}) Resource Well`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.Water,
        rate: 30 * mul_p,
      },
    ],
  } as Recipe)),

  {
    name: "Unpackage Water",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedWater,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Water,
        rate: 120,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 120,
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

  ...purities.map(({ purity, mul_p }) => ({
    name: `${LiquidItemNames.CrudeOil} (${purity}) Resource Well`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 30 * mul_p,
      },
    ],
  } as Recipe)),

  {
    name: "Unpackage Oil",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedOil,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 60,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 60,
      },
    ],
  },

  {
    name: "Unpackage Heavy Oil Residue",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedHeavyOilResidue,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 20,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Heavy Oil Residue",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 40,
      },
      {
        name: MineralItemNames.PolymerResin,
        rate: 20,
      },
    ],
  },
  {
    name: "Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 40,
      },
      {
        name: MineralItemNames.PolymerResin,
        rate: 30,
      },
    ],
  },
  {
    name: "Unpackage Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedFuel,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 60,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Diluted Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 50,
      },
      {
        name: LiquidItemNames.Water,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 100,
      },
    ],
  },
  {
    name: "Residual Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 40,
      },
    ],
  },
  {
    name: "Turbofuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 22.5,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        rate: 18.75,
      },
    ],
  },
  {
    name: "Unpackage Turbofuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedTurbofuel,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        rate: 20,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Turbo Blend Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 15,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 30,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 22.5,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 22.5,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        rate: 45,
      },
    ],
  },
  {
    name: "Alt.: Turbo Heavy Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 37.5,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.Turbofuel,
        rate: 30,
      },
    ],
  },

  // Gas
  ...purities.map(({ purity, mul_p }) => ({
    name: `${GasItemNames.NitrogenGas} (${purity})`,
    building: BuildingNames.ResourceWellExtractor,
    inputs: [],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        rate: 30 * mul_p,
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

  // Standard Parts
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

  // Industrial Parts
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

  // Electronics
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

  // Communication
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

  // Quantum
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

  // Container
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

  // Fuel
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

  // Consumed
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

  // Ammo
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

  // Nuclear
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

  // Waste
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

  // Special
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

  // Coal and Fuel generators
  {
    name: "Power (Compacted Coal)",
    building: BuildingNames.CoalPoweredGenerator,
    inputs: [
      {
        name: FuelItemNames.CompactedCoal,
        rate: 7.14,
      },
      {
        name: LiquidItemNames.Water,
        rate: 45,
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
        rate: 15,
      },
      {
        name: LiquidItemNames.Water,
        rate: 45,
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
        rate: 25,
      },
      {
        name: LiquidItemNames.Water,
        rate: 45,
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
        rate: 3,
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
        rate: 4.17,
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
        rate: 7.5,
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
        rate: 20,
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
        rate: 20,
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
