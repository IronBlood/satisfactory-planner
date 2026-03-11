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
  {
    name: "Alumina Solution",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        rate: 120,
      },
      {
        name: LiquidItemNames.Water,
        rate: 180,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 120,
      },
      {
        name: MineralItemNames.Silica,
        rate: 50,
      },
    ],
  },
  {
    name: "Unpackage Alumina Solution",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedAluminaSolution,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 120,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 120,
      },
    ],
  },
  {
    name: "Alt.: Sloppy Alumina",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Bauxite,
        rate: 200,
      },
      {
        name: LiquidItemNames.Water,
        rate: 200,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 240,
      },
    ],
  },
  {
    name: "Sulfuric Acid",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: OreItemNames.Sulfur,
        rate: 50,
      },
      {
        name: LiquidItemNames.Water,
        rate: 50,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 50,
      },
    ],
  },
  {
    name: "Unpackage Sulfuric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedSulfuricAcid,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 60,
      },
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 60,
      },
    ],
  },
  {
    name: "Nitric Acid",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: GasItemNames.NitrogenGas,
        rate: 120,
      },
      {
        name: LiquidItemNames.Water,
        rate: 30,
      },
      {
        name: StandardPartItemNames.IronPlate,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.NitricAcid,
        rate: 30,
      },
    ],
  },
  {
    name: "Unpackage Nitric Acid",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedNitricAcid,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: LiquidItemNames.NitricAcid,
        rate: 20,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        rate: 20,
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
    name: "Unpackage Nitrogen Gas",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: ContainerItemNames.PackagedNitrogenGas,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        rate: 240,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        rate: 60,
      },
    ],
  },
  {
    name: "Nitrogen Gas (Bauxite)",
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
        name: GasItemNames.NitrogenGas,
        rate: 120,
      },
    ],
  },
  {
    name: "Nitrogen Gas (Caterium)",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 10,
      },
      {
        name: OreItemNames.CateriumOre,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: GasItemNames.NitrogenGas,
        rate: 120,
      }
    ],
  },

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
    name: "Unpackage Rocket Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedRocketFuel,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        rate: 120,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Nitro Rocket Fuel",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.Fuel,
        rate: 100,
      },
      {
        name: GasItemNames.NitrogenGas,
        rate: 75,
      },
      {
        name: OreItemNames.Sulfur,
        rate: 100,
      },
      {
        name: OreItemNames.Coal,
        rate: 50,
      },
    ],
    outputs: [
      {
        name: GasItemNames.RocketFuel,
        rate: 150,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 25,
      },
    ],
  },
  {
    name: "Ionized Fuel",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: GasItemNames.RocketFuel,
        rate: 40,
      },
      {
        name: SpecialItemNames.PowerShard,
        rate: 2.5
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        rate: 40,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 5,
      },
    ],
  },
  {
    name: "Unpackage Ionized Fuel",
    building: BuildingNames.Packager,
    inputs: [
      {
        name: FuelItemNames.PackagedIonizedFuel,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        rate: 80,
      },
      {
        name: ContainerItemNames.EmptyFluidTank,
        rate: 40,
      },
    ],
  },
  {
    name: "Alt.: Dark-Ion Fuel",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: FuelItemNames.PackagedRocketFuel,
        rate: 240,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 80,
      },
    ],
    outputs: [
      {
        name: GasItemNames.IonizedFuel,
        rate: 200,
      },
      {
        name: FuelItemNames.CompactedCoal,
        rate: 40,
      },
    ],
  },
  {
    name: "Excited Photonic Matter",
    building: BuildingNames.Converter,
    inputs: [
    ],
    outputs: [
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        rate: 200,
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
  {
    name: "Alt.: Aluminum Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 7.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 52.5,
      },
    ],
  },
  {
    name: "Alt.: Steel Rod",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 12,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 48,
      },
    ],
  },
  {
    name: "Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: StandardPartItemNames.IronRod,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        rate: 40,
      },
    ],
  },
  {
    name: "Alt.: Cast Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 12.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        rate: 50,
      },
    ],
  },
  {
    name: "Alt.: Steel Screws",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Screws,
        rate: 260,
      },
    ],
  },
  {
    name: "Iron Plate",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Coated Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 37.5,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 7.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 75,
      },
    ],
  },
  {
    name: "Alt.: Steel Iron Plate",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 15,
      },
      {
        name: IngotItemNames.SteelIngot,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 45,
      },
    ],
  },
  {
    name: "Reinforced Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 30,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Adhered Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 11.25,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 3.75,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 3.75,
      },
    ],
  },
  {
    name: "Alt.: Bolted Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 90,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 250,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 15,
      },
    ],
  },
  {
    name: "Alt.: Stitched Iron Plate",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 18.75,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 5.63,
      },
    ],
  },
  {
    name: "Copper Sheet",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 10,
      },
    ],
  },
  {
    name: "Alt.: Steamed Copper Sheet",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 22.5,
      },
      {
        name: LiquidItemNames.Water,
        rate: 22.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 22.5,
      },
    ],
  },
  {
    name: "Alclad Aluminum Sheet",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 30,
      },
      {
        name: IngotItemNames.CopperIngot,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        rate: 30,
      },
    ],
  },
  {
    name: "Aluminum Casing",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 90,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Alclad Casing",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 150,
      },
      {
        name: IngotItemNames.CopperIngot,
        rate: 75,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 112.5
      },
    ],
  },
  {
    name: "Steel Pipe",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Iron Pipe",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 25,
      },
    ],
  },
  {
    name: "Alt.: Molded Steel Pipe",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 50,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 50,
      },
    ],
  },
  {
    name: "Steel Beam",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        rate: 15,
      },
    ],
  },
  {
    name: "Alt.: Aluminum Beam",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 22.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        rate: 22.5,
      },
    ],
  },
  {
    name: "Alt.: Molded Beam",
    building: BuildingNames.Foundry,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 120,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 80,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.StealBeam,
        rate: 45,
      },
    ],
  },
  {
    name: "Encased Industrial Beam",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.StealBeam,
        rate: 18,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 36,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        rate: 6,
      },
    ],
  },
  {
    name: "Alt.: Encased Industrial Pipe",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 24,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        rate: 4,
      },
    ],
  },
  {
    name: "Modular Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 3,
      },
      {
        name: StandardPartItemNames.IronRod,
        rate: 12,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 2,
      },
    ],
  },
  {
    name: "Alt.: Bolted Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 7.5,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 140,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Steeled Frame",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 2,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 3,
      },
    ],
  },
  {
    name: "Heavy Modular Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 10,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 40,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        rate: 10,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 240,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        rate: 2,
      },
    ],
  },
  {
    name: "Alt.: Heavy Encased Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 7.5,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        rate: 9.38
      },
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 33.75,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 20.63,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        rate: 2.81
      },
    ],
  },
  {
    name: "Alt.: Heavy Flexible Frame",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.ModularFrame,
        rate: 18.75,
      },
      {
        name: StandardPartItemNames.EncasedIndustrialBeam,
        rate: 11.25,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 75,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 390,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        rate: 3.75,
      },
    ],
  },
  {
    name: "Fused Modular Frame",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        rate: 1.5,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 75,
      },
      {
        name: GasItemNames.NitrogenGas,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        rate: 1.5,
      },
    ],
  },
  {
    name: "Alt.: Heat-Fused Frame",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: StandardPartItemNames.HeavyModularFrame,
        rate: 3,
      },
      {
        name: IngotItemNames.AluminumIngot,
        rate: 150,
      },
      {
        name: LiquidItemNames.NitricAcid,
        rate: 24,
      },
      {
        name: LiquidItemNames.Fuel,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        rate: 3,
      },
    ],
  },
  {
    name: "Ficsite Trigon",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.FicsiteIngot,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.FicsiteTrigon,
        rate: 30,
      },
    ],
  },
  {
    name: "Alt.: Polyester Fabric",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        rate: 30,
      },
      {
        name: LiquidItemNames.Water,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Fabric,
        rate: 30,
      },
    ],
  },
  {
    name: "Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 20,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 10,
      },
    ],
  },
  {
    name: "Alt.: Recycled Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: StandardPartItemNames.Rubber,
        rate: 30,
      },
      {
        name: LiquidItemNames.Fuel,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Residual Plastic",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        rate: 60,
      },
      {
        name: LiquidItemNames.Water,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 20,
      },
    ],
  },
  {
    name: "Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        rate: 20,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Recycled Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 30,
      },
      {
        name: LiquidItemNames.Fuel,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Residual Rubber",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: MineralItemNames.PolymerResin,
        rate: 40,
      },
      {
        name: LiquidItemNames.Water,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: StandardPartItemNames.Rubber,
        rate: 20,
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
  {
    name: "Alt.: Copper Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 22.5,
      },
      {
        name: StandardPartItemNames.Screws,
        rate: 195,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 11.25,
      },
    ],
  },
  {
    name: "Alt.: Steel Rotor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 10,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 5,
      },
    ],
  },
  {
    name: "Stator",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 15,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Stator,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Quickwire Stator",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 16,
      },
      {
        name: ElectronicItemNames.Quickwire,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Stator,
        rate: 8,
      },
    ],
  },
  {
    name: "Battery",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: LiquidItemNames.SulfuricAcid,
        rate: 50,
      },
      {
        name: LiquidItemNames.AluminaSolution,
        rate: 40,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 20,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Battery,
        rate: 20,
      },
      {
        name: LiquidItemNames.Water,
        rate: 30,
      },
    ],
  },
  {
    name: "Alt.: Classic Battery",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: OreItemNames.Sulfur,
        rate: 45,
      },
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        rate: 52.5,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 60,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 90
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Battery,
        rate: 30,
      },
    ],
  },
  {
    name: "Motor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 10,
      },
      {
        name: IndustrialPartItemNames.Stator,
        rate: 10,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Electric Motor",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        rate: 3.75,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 7.5,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        rate: 7.5,
      },
    ],
  },
  {
    name: "Alt.: Rigor Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 3.75,
      },
      {
        name: IndustrialPartItemNames.Stator,
        rate: 3.75,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 1.25,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.Motor,
        rate: 7.5,
      },
    ],
  },
  {
    name: "Heat Sink",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        rate: 37.5,
      },
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 22.5,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        rate: 7.5,
      },
    ],
  },
  {
    name: "Alt.: Heat Exchanger",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 30,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        rate: 10,
      },
    ],
  },
  {
    name: "Cooling System",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        rate: 12,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 12,
      },
      {
        name: LiquidItemNames.Water,
        rate: 30,
      },
      {
        name: GasItemNames.NitrogenGas,
        rate: 150,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        rate: 6,
      },
    ],
  },
  {
    name: "Alt.: Cooling Device",
    building: BuildingNames.Blender,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        rate: 10,
      },
      {
        name: IndustrialPartItemNames.Motor,
        rate: 2.5,
      },
      {
        name: GasItemNames.NitrogenGas,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        rate: 5,
      },
    ],
  },
  {
    name: "Turbo Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.CoolingSystem,
        rate: 7.5,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 3.75,
      },
      {
        name: IndustrialPartItemNames.Motor,
        rate: 7.5,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        rate: 1.875,
      },
    ],
  },
  {
    name: "Alt.: Turbo Electric Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Motor,
        rate: 6.56,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 8.44,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        rate: 4.69,
      },
      {
        name: IndustrialPartItemNames.Rotor,
        rate: 6.56,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        rate: 2.81,
      },
    ],
  },
  {
    name: "Alt.: Turbo Pressure Motor",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.Motor,
        rate: 7.5,
      },
      {
        name: ContainerItemNames.PressureConversionCube,
        rate: 1.88,
      },
      {
        name: ContainerItemNames.PackagedNitrogenGas,
        rate: 45,
      },
      {
        name: IndustrialPartItemNames.Stator,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: IndustrialPartItemNames.TurboMotor,
        rate: 3.75,
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
    name: "Alt.: Caterium Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 120,
      },
    ],
  },
  {
    name: "Alt.: Fused Wire",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.CopperIngot,
        rate: 12,
      },
      {
        name: IngotItemNames.CateriumIngot,
        rate: 3,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 90,
      },
    ],
  },
  {
    name: "Alt.: Iron Wire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.IronIngot,
        rate: 12.5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 22.5,
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
    name: "Alt.: Coated Cable",
    building: BuildingNames.Refinery,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 37.5,
      },
      {
        name: LiquidItemNames.HeavyOilResidue,
        rate: 15,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        rate: 67.5,
      },
    ],
  },
  {
    name: "Alt.: Insulated Cable",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Wire,
        rate: 45,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        rate: 100,
      },
    ],
  },
  {
    name: "Alt.: Quickwire Cable",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 7.5,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Cable,
        rate: 27.5,
      },
    ],
  },
  {
    name: "Quickwire",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 12,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 60,
      },
    ],
  },
  {
    name: "Alt.: Fused Quickwire",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: IngotItemNames.CateriumIngot,
        rate: 7.5,
      },
      {
        name: IngotItemNames.CopperIngot,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 90,
      },
    ],
  },
  {
    name: "Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 15,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 7.5,
      },
    ],
  },
  {
    name: "Alt.: Caterium Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.Plastic,
        rate: 12.5,
      },
      {
        name: ElectronicItemNames.Quickwire,
        rate: 37.5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 8.75,
      },
    ],
  },
  {
    name: "Alt.: Electrode Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.Rubber,
        rate: 20,
      },
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Silicon Circuit Board",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 27.5,
      },
      {
        name: MineralItemNames.Silica,
        rate: 27.5,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 12.5,
      },
    ],
  },
  {
    name: "AI Limiter",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 25,
      },
      {
        name: ElectronicItemNames.Quickwire,
        rate: 100,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.AILimiter,
        rate: 5,
      },
    ],
  },
  {
    name: "Alt.: Plastic AI Limiter",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 120,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 28,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.AILimiter,
        rate: 8,
      },
    ],
  },
  {
    name: "High-Speed Connector",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 210,
      },
      {
        name: ElectronicItemNames.Cable,
        rate: 37.5,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 3.75,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.HighSpeedConnector,
        rate: 3.75,
      },
    ],
  },
  {
    name: "Alt.: Silicon High-Speed Connector",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.Quickwire,
        rate: 90,
      },
      {
        name: MineralItemNames.Silica,
        rate: 37.5,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 3,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.HighSpeedConnector,
        rate: 3,
      },
    ],
  },
  {
    name: "Reanimated SAM",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: OreItemNames.SAM,
        rate: 120,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 30,
      },
    ],
  },
  {
    name: "SAM Fluctuator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.ReanimatedSAM,
        rate: 60,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 50,
      },
      {
        name: StandardPartItemNames.SteelPipe,
        rate: 30,
      },
    ],
    outputs: [
      {
        name: ElectronicItemNames.SAMFluctuator,
        rate: 10,
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
  {
    name: "Alt.: Caterium Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 15,
      },
      {
        name: ElectronicItemNames.Quickwire,
        rate: 52.5,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 22.5
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        rate: 3.75,
      },
    ],
  },
  {
    name: "Alt.: Crystal Computer",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 5,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 5/3,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Computer,
        rate: 10/3,
      },
    ],
  },
  {
    name: "Supercomputer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.Computer,
        rate: 7.5,
      },
      {
        name: ElectronicItemNames.AILimiter,
        rate: 3.75,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        rate: 5.625,
      },
      {
        name: StandardPartItemNames.Plastic,
        rate: 52.5,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        rate: 1.875,
      },
    ],
  },
  {
    name: "Alt.: OC Supercomputer",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 6,
      },
      {
        name: IndustrialPartItemNames.CoolingSystem,
        rate: 6,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        rate: 3,
      },
    ],
  },
  {
    name: "Alt.: Super-State Computer",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.Computer,
        rate: 7.2,
      },
      {
        name: NuclearItemNames.ElectromagneticControlRod,
        rate: 2.4,
      },
      {
        name: IndustrialPartItemNames.Battery,
        rate: 24,
      },
      {
        name: ElectronicItemNames.Wire,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.Supercomputer,
        rate: 2.4,
      },
    ],
  },
  {
    name: "Radio Control Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 40,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 1.25,
      },
      {
        name: CommunicationItemNames.Computer,
        rate: 2.5,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 2.5,
      },
    ],
  },
  {
    name: "Alt.: Radio Connection Unit",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: IndustrialPartItemNames.HeatSink,
        rate: 15,
      },
      {
        name: ElectronicItemNames.HighSpeedConnector,
        rate: 7.5,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 3.75,
      },
    ],
  },
  {
    name: "Alt.: Radio Control System",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 1.5,
      },
      {
        name: ElectronicItemNames.CircuitBoard,
        rate: 15,
      },
      {
        name: StandardPartItemNames.AluminumCasing,
        rate: 90,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 4.5
      },
    ],
  },
  {
    name: "Crystal Oscillator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 18,
      },
      {
        name: ElectronicItemNames.Cable,
        rate: 14,
      },
      {
        name: StandardPartItemNames.ReinforcedIronPlate,
        rate: 2.5,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 1,
      },
    ],
  },
  {
    name: "Alt.: Insulated Crystal Oscillator",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 1.875 * 10,
      },
      {
        name: StandardPartItemNames.Rubber,
        rate: 1.875 * 7,
      },
      {
        name: ElectronicItemNames.AILimiter,
        rate: 1.875,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 1.875,
      },
    ],
  },
  {
    name: "Superposition Oscillator",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 30,
      },
      {
        name: CommunicationItemNames.CrystalOscillator,
        rate: 5,
      },
      {
        name: StandardPartItemNames.AlcladAluminumSheet,
        rate: 45,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        rate: 125,
      },
    ],
    outputs: [
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        rate: 5,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 125,
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
  {
    name: "Alt.: Cloudy Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 240,
      },
      {
        name: OreItemNames.Limestone,
        rate: 480,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Oil-Based Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: LiquidItemNames.CrudeOil,
        rate: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 40,
      },
    ],
  },
  {
    name: "Alt.: Petroleum Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: MineralItemNames.PetroleumCoke,
        rate: 720,
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
    name: "Alt.: Pink Diamonds",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 120,
      },
      {
        name: MineralItemNames.QuartzCrystal,
        rate: 45,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 15,
      },
    ],
  },
  {
    name: "Alt.: Turbo Diamonds",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: OreItemNames.Coal,
        rate: 600,
      },
      {
        name: FuelItemNames.PackagedTurbofuel,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 60,
      },
    ],
  },
  {
    name: "Time Crystal",
    building: BuildingNames.Converter,
    inputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 12,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        rate: 6,
      },
    ],
  },
  {
    name: "Dark Matter Crystal",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: QuantumTechnologyItemNames.Diamonds,
        rate: 30,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 150,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 30,
      },
    ],
  },
  {
    name: "Alt.: Dark Matter Crystallization",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 20,
      },
    ],
  },
  {
    name: "Alt.: Dark Matter Trap",
    building: BuildingNames.ParticleAccelerator,
    inputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        rate: 30,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 150,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 60,
      },
    ],
  },
  {
    name: "Singularity Cell",
    building: BuildingNames.Manufacturer,
    inputs: [
      {
        name: SpecialItemNames.NuclearPasta,
        rate: 1,
      },
      {
        name: QuantumTechnologyItemNames.DarkMatterCrystal,
        rate: 20,
      },
      {
        name: StandardPartItemNames.IronPlate,
        rate: 100,
      },
      {
        name: MineralItemNames.Concrete,
        rate: 200,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.SingularityCell,
        rate: 10,
      },
    ],
  },
  {
    name: "Neural-Quantum Processor",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: QuantumTechnologyItemNames.TimeCrystal,
        rate: 15,
      },
      {
        name: CommunicationItemNames.Supercomputer,
        rate: 3,
      },
      {
        name: StandardPartItemNames.FicsiteTrigon,
        rate: 45,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        rate: 75,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.NeuralQuantumProcessor,
        rate: 3,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 75,
      },
    ],
  },
  {
    name: "Alien Power Matrix",
    building: BuildingNames.QuantumEncoder,
    inputs: [
      {
        name: ElectronicItemNames.SAMFluctuator,
        rate: 12.5,
      },
      {
        name: SpecialItemNames.PowerShard,
        rate: 7.5,
      },
      {
        name: CommunicationItemNames.SuperpositionOscillator,
        rate: 7.5,
      },
      {
        name: GasItemNames.ExcitedPhotonicMatter,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: QuantumTechnologyItemNames.AlienPowerMatrix,
        rate: 2.5,
      },
      {
        name: GasItemNames.DarkMatterResidue,
        rate: 60,
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
  {
    name: "Alt.: Coated Iron Canister",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.IronPlate,
        rate: 30,
      },
      {
        name: StandardPartItemNames.CopperSheet,
        rate: 15,
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
    name: "Alt.: Steel Canister",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.SteelIngot,
        rate: 40,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyCanister,
        rate: 40,
      },
    ],
  },
  {
    name: "Empty Fluid Tank",
    building: BuildingNames.Constructor,
    inputs: [
      {
        name: IngotItemNames.AluminumIngot,
        rate: 60,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.EmptyFluidTank,
        rate: 60,
      },
    ],
  },
  {
    name: "Pressure Conversion Cube",
    building: BuildingNames.Assembler,
    inputs: [
      {
        name: StandardPartItemNames.FusedModularFrame,
        rate: 1,
      },
      {
        name: CommunicationItemNames.RadioControlUnit,
        rate: 2,
      },
    ],
    outputs: [
      {
        name: ContainerItemNames.PressureConversionCube,
        rate: 1,
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
