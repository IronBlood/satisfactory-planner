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

export const IngotItemNames = {
  IronIngot: "Iron Ingot",
  CopperIngot: "Copper Ingot",
};

export const MineralItemNames = {
  Concrete: "Concrete",
};

export const LiquidItemNames = {
  Water: "Water",
  CrudeOil: "Crude Oil",
  Turbofuel: "Turbofuel",
  NitricAcid: "Nitric Acid",
};

export const GasItemNames = {
  NitrogenGas: "Nitrogen Gas",
  RocketFuel: "Rocket Fuel",
};

export const StandardPartItemNames = {
  IronRod: "Iron Rod",
  Screws: "Screws",
  IronPlate: "Iron Plate",
  ReinforcedIronPlate: "Reinforced Iron Plate",
  CopperSheet: "Copper Sheet",
  AlcladAluminumSheet: "Alclad Aluminum Sheet",
  AluminumCasing: "Aluminum Casing",
  SteelPipe: "Steel Pipe",
  StealBeam: "Steel Beam",
  EncasedIndustrialBeam: "Encased Industrial Beam",
  ModularFrame: "Modular Frame",
  HeavyModularFrame: "Heavy Modular Frame",
  FusedModularFrame: "Fused Modular Frame",
  FicsiteTrigon: "Ficsite Trigon",
  Fabric: "Fabric",
  Plastic: "Plastic",
  Rubber: "Rubber",
};

export const IndustrialPartItemNames = {
  Rotor: "Rotor",
  Stator: "Stator",
  Battery: "Battery",
  Motor: "Motor",
  HeatSink: "Heat Sink",
  CoolingSystem: "Cooling System",
  TurboMotor: "Turbo Motor",
};

export const ElectronicItemNames = {
  Wire: "Wire",
  Cable: "Cabel",
  Quickwire: "Quickwire",
  CircuitBoard: "Circuit Board",
  AILimiter: "AI Limiter",
  HighSpeedConnector: "High-Speed Connector",
  ReanimatedSAM: "Reanimated SAM",
  SAMFluctuator: "SAM Fluctuator",
};

export const CommunicationItemNames = {
  Computer: "Computer",
  Supercomputer: "Supercomputer",
  RadioControlUnit: "Radio Control Unit",
  CrystalOscillator: "Crystal Oscillator",
  SuperpositionOscillator: "Superposition Oscillator",
};

export const QuantumTechnologyItemNames = {
  Diamonds: "Diamonds",
  TimeCrystal: "Time Crystal",
};

export const ContainerItemNames = {
  EmptyCanister: "Empty Canister",
};

export const FuelItemNames = {
  CompactedCoal: "Compacted Coal",
  UraniumFuelRod: "Uranium Fuel Rod",
};

export const ConsumedItemNames = {
  BlackPowder: "Black Powder",
};

export const AmmoItemNames = {
  IronRebar: "Iron Rebar",
};

export const NuclearItemNames = {
  ElectromagneticControlRod: "Electromagnetic Control Rod",
};

export const WasteItemNames = {
  UraniumWaste: "Uranium Waste",
};

export const SpecialItemNames = {
  SmartPlating: "Smart Plating",
  PortableMiner: "Portable Miner",
};

export type OreItemName = typeof OreItemNames[keyof typeof OreItemNames];
export type IngotItemName = typeof IngotItemNames[keyof typeof IngotItemNames];
export type MineralItemName = typeof MineralItemNames[keyof typeof MineralItemNames];
export type LiquidItemName = typeof LiquidItemNames[keyof typeof LiquidItemNames];
export type GasItemName = typeof GasItemNames[keyof typeof GasItemNames];
export type StandardPartItemName = typeof StandardPartItemNames[keyof typeof StandardPartItemNames];
export type IndustrialPartItemName = typeof IndustrialPartItemNames[keyof typeof IndustrialPartItemNames];
export type ElectronicItemName = typeof ElectronicItemNames[keyof typeof ElectronicItemNames];
export type CommunicationItemName = typeof CommunicationItemNames[keyof typeof CommunicationItemNames];
export type QuantumTechnologyItemName = typeof QuantumTechnologyItemNames[keyof typeof QuantumTechnologyItemNames];
export type ContainerItemName = typeof ContainerItemNames[keyof typeof ContainerItemNames];
export type FuelItemName = typeof FuelItemNames[keyof typeof FuelItemNames];
export type ConsumedItemName = typeof ConsumedItemNames[keyof typeof ConsumedItemNames];
export type AmmoItemName = typeof AmmoItemNames[keyof typeof AmmoItemNames];
export type NuclearItemName = typeof NuclearItemNames[keyof typeof NuclearItemNames];
export type WasteItemName = typeof WasteItemNames[keyof typeof WasteItemNames];
export type SpecialItemName = typeof SpecialItemNames[keyof typeof SpecialItemNames];

export type NonOreItemName =
  | IngotItemName
  | MineralItemName
  | LiquidItemName
  | GasItemName
  | StandardPartItemName
  | IndustrialPartItemName
  | ElectronicItemName
  | CommunicationItemName
  | QuantumTechnologyItemName
  | ContainerItemName
  | FuelItemName
  | ConsumedItemName
  | AmmoItemName
  | NuclearItemName
  | WasteItemName
  | SpecialItemName
;

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

export const Items: Item[] = [
  // Ores
  ...Object.values(OreItemNames).map(name => ({
    category: ItemCategories.Ore,
    name,
  })),
  // Ingots
  ...Object.values(IngotItemNames).map(name => ({
    category: ItemCategories.Ingot,
    name,
  })),
  // Minerals
  ...Object.values(MineralItemNames).map(name => ({
    category: ItemCategories.Mineral,
    name,
  })),
  // Liquid
  ...Object.values(LiquidItemNames).map(name => ({
    category: ItemCategories.Liquid,
    name,
  })),
  // Gas
  ...Object.values(GasItemNames).map(name => ({
    category: ItemCategories.Gas,
    name,
  })),
  // Standard parts
  ...Object.values(StandardPartItemNames).map(name => ({
    category: ItemCategories.StandardPart,
    name,
  })),
  // Industrial parts
  ...Object.values(IndustrialPartItemNames).map(name => ({
    category: ItemCategories.IndustrialPart,
    name,
  })),
  // Electronics
  ...Object.values(ElectronicItemNames).map(name => ({
    category: ItemCategories.Electronic,
    name,
  })),
  // Communication
  ...Object.values(CommunicationItemNames).map(name => ({
    category: ItemCategories.Communication,
    name,
  })),
  // Quantum technology
  ...Object.values(QuantumTechnologyItemNames).map(name => ({
    category: ItemCategories.QuantumTechnology,
    name,
  })),
  // Container
  ...Object.values(ContainerItemNames).map(name => ({
    category: ItemCategories.Container,
    name,
  })),
  // Fuel
  ...Object.values(FuelItemNames).map(name => ({
    category: ItemCategories.Fuel,
    name,
  })),
  // Consumed
  ...Object.values(ConsumedItemNames).map(name => ({
    category: ItemCategories.Consumed,
    name,
  })),
  // Ammo
  ...Object.values(AmmoItemNames).map(name => ({
    category: ItemCategories.Ammo,
    name,
  })),
  // Nuclear
  ...Object.values(NuclearItemNames).map(name => ({
    category: ItemCategories.Nuclear,
    name,
  })),
  // Waste
  ...Object.values(WasteItemNames).map(name => ({
    category: ItemCategories.Waste,
    name,
  })),
  // Special
  ...Object.values(SpecialItemNames).map(name => ({
    category: ItemCategories.Special,
    name,
  })),
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
  [IngotItemNames.IronIngot]: "IconDesc_IronIngot_256.png",
  [IngotItemNames.CopperIngot]: "IconDesc_CopperIngot_256.png",
  [MineralItemNames.Concrete]: "IconDesc_Concrete_256.png",
  [LiquidItemNames.Water]: "LiquidWater_Pipe_256.png",
  [LiquidItemNames.CrudeOil]: "LiquidOil_Pipe_256.png",
  [LiquidItemNames.Turbofuel]: "IconDesc_LiquidTurboFuel_Pipe_256.png",
  [LiquidItemNames.NitricAcid]: "IconDesc_NitricAcid_256.png",
  [GasItemNames.NitrogenGas]: "IconDesc_NitricAcid_256.png",
  [GasItemNames.RocketFuel]: "IconDesc_RocketFuelPipe_256.png",
  [StandardPartItemNames.IronRod]: "IconDesc_IronRods_256.png",
  [StandardPartItemNames.Screws]: "IconDesc_IronScrews_256.png",
  [StandardPartItemNames.IronPlate]: "IconDesc_IronPlates_256.png",
  [StandardPartItemNames.ReinforcedIronPlate]: "IconDesc_ReinforcedIronPlates_256.png",
  [StandardPartItemNames.CopperSheet]: "IconDesc_CopperSheet_256.png",
  [StandardPartItemNames.AlcladAluminumSheet]: "IconDesc_AluminiumSheet_256.png",
  [StandardPartItemNames.AluminumCasing]: "IconDesc_AluminiumCasing_256.png",
  [StandardPartItemNames.SteelPipe]: "IconDesc_SteelPipe_256.png",
  [StandardPartItemNames.StealBeam]: "IconDesc_SteelBeam_256.png",
  [StandardPartItemNames.EncasedIndustrialBeam]: "IconDesc_EncasedSteelBeam_256.png",
  [StandardPartItemNames.ModularFrame]: "IconDesc_ModularFrame_256.png",
  [StandardPartItemNames.HeavyModularFrame]: "IconDesc_ModularFrameHeavy_256.png",
  [StandardPartItemNames.FusedModularFrame]: "IconDesc_FusedModularFrame_256.png",
  [StandardPartItemNames.FicsiteTrigon]: "IconDesc_FicsiteMesh_256.png",
  [StandardPartItemNames.Fabric]: "IconDesc_Fabric_256.png",
  [StandardPartItemNames.Plastic]: "IconDesc_Plastic_256.png",
  [StandardPartItemNames.Rubber]: "IconDesc_Rubber_256.png",
  [IndustrialPartItemNames.Rotor]: "IconDesc_Rotor_256.png",
  [IndustrialPartItemNames.Stator]: "IconDesc_Stator_256.png",
  [IndustrialPartItemNames.Battery]: "IconDesc_Battery_256.png",
  [IndustrialPartItemNames.Motor]: "IconDesc_Engine_256.png",
  [IndustrialPartItemNames.HeatSink]: "IconDesc_Heatsink_256.png",
  [IndustrialPartItemNames.CoolingSystem]: "IconDesc_CoolingSystem_256.png",
  [IndustrialPartItemNames.TurboMotor]: "IconDesc_TurboMotor_256.png",
  [ElectronicItemNames.Wire]: "IconDesc_Wire_256.png",
  [ElectronicItemNames.Cable]: "IconDesc_Cables_256.png",
  [ElectronicItemNames.Quickwire]: "IconDesc_Quickwire_256.png",
  [ElectronicItemNames.CircuitBoard]: "IconDesc_CircuitBoard_256.png",
  [ElectronicItemNames.AILimiter]: "IconDesc_AILimiter_256.png",
  [ElectronicItemNames.HighSpeedConnector]: "IconDesc_HighSpeedConnector_256.png",
  [ElectronicItemNames.ReanimatedSAM]: "IconDesc_ReanimatedSam_256.png",
  [ElectronicItemNames.SAMFluctuator]: "IconDesc_SamFluctuator_256.png",
  [CommunicationItemNames.Computer]: "IconDesc_Computer_256.png",
  [CommunicationItemNames.Supercomputer]: "IconDesc_QuantumComputer_256.png",
  [CommunicationItemNames.RadioControlUnit]: "IconDesc_RadioControlUnit_256.png",
  [CommunicationItemNames.CrystalOscillator]: "IconDesc_CrystalOscillator_256.png",
  [CommunicationItemNames.SuperpositionOscillator]: "IconDesc_SuperPositionOscillator_256.png",
  [QuantumTechnologyItemNames.Diamonds]: "IconDesc_Diamonds_256.png",
  [QuantumTechnologyItemNames.TimeCrystal]: "IconDesc_ExoticMatter_256.png",
  [ContainerItemNames.EmptyCanister]: "IconDesc_EmptyCannister_256.png",
  [FuelItemNames.CompactedCoal]: "IconDesc_CompactedCoal_256.png",
  [FuelItemNames.UraniumFuelRod]: "IconDesc_NuclearFuelRod_256.png",
  [ConsumedItemNames.BlackPowder]: "IconDesc_Gunpowder_256.png",
  [AmmoItemNames.IronRebar]: "IconDesc_Rebar_256.png",
  [NuclearItemNames.ElectromagneticControlRod]: "IconDesc_ElectromagneticControlRod_256.png",
  [WasteItemNames.UraniumWaste]: "IconDesc_NuclearWaste_256.png",
  [SpecialItemNames.SmartPlating]: "IconDesc_SpelevatorPart_1_256.png",
  [SpecialItemNames.PortableMiner]: "IconDesc_PortableMiner_256.png",
};

export function getItemImageByName(name: ItemName) {
  return imageByName[ITEM_IMAGE_MAP[name]];
}
