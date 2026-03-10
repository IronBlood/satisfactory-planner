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
  CateriumIngot: "Caterium Ingot",
  SteelIngot: "Steel Ingot",
  AluminumIngot: "Aluminum Ingot",
  FicsiteIngot: "Ficsite Ingot",
};

export const MineralItemNames = {
  Concrete: "Concrete",
  QuartzCrystal: "Quartz Crystal",
  Silica: "Silica",
  CopperPowder: "Copper Powder",
  PolymerResin: "Polymer Resin",
  PetroleumCoke: "Petroleum Coke",
  AluminumScrap: "Aluminum Scrap",
};

export const LiquidItemNames = {
  Water: "Water",
  CrudeOil: "Crude Oil",
  HeavyOilResidue: "Heavy Oil Residue",
  Fuel: "Fuel",
  LiquidBiofuel: "Liquid Biofuel",
  Turbofuel: "Turbofuel",
  AluminaSolution: "Alumina Solution",
  SulfuricAcid: "Sulfuric Acid",
  NitricAcid: "Nitric Acid",
  DissolvedSilica: "Dissolved Silica",
};

export const GasItemNames = {
  NitrogenGas: "Nitrogen Gas",
  RocketFuel: "Rocket Fuel",
  IonizedFuel: "Ionized Fuel",
  DarkMatterResidue: "Dark Matter Residue",
  ExcitedPhotonicMatter: "Excited Photonic Matter",
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
  Cable: "Cable",
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
  DarkMatterCrystal: "Dark Matter Crystal",
  SingularityCell: "Singularity Cell",
  NeuralQuantumProcessor: "Neural-Quantum Processor",
  AlienPowerMatrix: "Alien Power Matrix",
};

export const ContainerItemNames = {
  EmptyCanister: "Empty Canister",
  EmptyFluidTank: "Empty Fluid Tank",
  PressureConversionCube: "Pressure Conversion Cube",
  PackagedWater: "Packaged Water",
  PackagedAluminaSolution: "Packaged Alumina Solution",
  PackagedSulfuricAcid: "Packaged Sulfuric Acid",
  PackagedNitricAcid: "Packaged Nitric Acid",
  PackagedNitrogenGas: "Packaged Nitrogen Gas",
};

export const FuelItemNames = {
  CompactedCoal: "Compacted Coal",
  PackagedOil: "Packaged Oil",
  PackagedHeavyOilResidue: "Packaged Heavy Oil Residue",
  PackagedFuel: "Packaged Fuel",
  PackagedLiquidBiofuel: "Packaged Liquid Biofuel",
  PackagedTurbofuel: "Packaged Turbofuel",
  PackagedRocketFuel: "Packaged Rocket Fuel",
  PackagedIonizedFuel: "Packaged Ionized Fuel",
  UraniumFuelRod: "Uranium Fuel Rod",
  PlutoniumFuelRod: "Plutonium Fuel Rod",
};

export const ConsumedItemNames = {
  BlackPowder: "Black Powder",
  SmokelessPowder: "Smokeless Powder",
  GasFilter: "Gas Filter",
  IodineInfusedFilter: "Iodine-Infused Filter",
};

export const AmmoItemNames = {
  IronRebar: "Iron Rebar",
  StunRebar: "Stun Rebar",
  ShatterRebar: "Shatter Rebar",
  ExplosiveRebar: "Explosive Rebar",
  RifleAmmo: "Rifle Ammo",
  HomingRifleAmmo: "Homing Rifle Ammo",
  TurboRifleAmmo: "Turbo Rifle Ammo",
  Nobelisk: "Nobelisk",
  GasNobelisk: "Gas Nobelisk",
  PulseNobelisk: "Pulse Nobelisk",
  ClusterNobelisk: "Cluster Nobelisk",
  NukeNobelisk: "Nuke Nobelisk",
};

export const NuclearItemNames = {
  ElectromagneticControlRod: "Electromagnetic Control Rod",
  EncasedUraniumCell: "Encased Uranium Cell",
  NonFissileUranium: "Non-Fissile Uranium",
  PlutoniumPellet: "Plutonium Pellet",
  EncasedPlutoniumCell: "Encased Plutonium Cell",
  Ficsonium: "Ficsonium",
  FicsoniumFuelRod: "Ficsonium Fuel Rod",
};

export const WasteItemNames = {
  UraniumWaste: "Uranium Waste",
  PlutoniumWaste: "Plutonium Waste",
};

export const SpecialItemNames = {
  PowerShard: "Power Shard",
  SmartPlating: "Smart Plating",
  PortableMiner: "Portable Miner",
  VersatileFramework: "Versatile Framework",
  AutomatedWiring: "Automated Wiring",
  ModularEngine: "Modular Engine",
  AdaptiveControlUnit: "Adaptive Control Unit",
  AssemblyDirectorSystem: "Assembly Director System",
  MagneticFieldGenerator: "Magnetic Field Generator",
  ThermalPropulsionRocket: "Thermal Propulsion Rocket",
  NuclearPasta: "Nuclear Pasta",
  BiochemicalSculptor: "Biochemical Sculptor",
  BallisticWarpDrive: "Ballistic Warp Drive",
  AIExpansionServer: "AI Expansion Server",
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

type ITEM_META = {
  image: string;
  sink_points: number;
};

const ITEM_MAP: Record<ItemName, ITEM_META> = {
  [OreItemNames.Limestone]: {
    image: "Stone_256.png",
    sink_points: 2,
  },
  [OreItemNames.IronOre]: {
    image: "IconDesc_iron_new_256.png",
    sink_points: 1,
  },
  [OreItemNames.CopperOre]: {
    image: "IconDesc_copper_new_256.png",
    sink_points: 3,
  },
  [OreItemNames.CateriumOre]: {
    image: "IconDesc_CateriumOre_256.png",
    sink_points: 7,
  },
  [OreItemNames.Coal]: {
    image: "IconDesc_CoalOre_256.png",
    sink_points: 3,
  },
  [OreItemNames.RawQuartz]: {
    image: "IconDesc_QuartzCrystal_256.png",
    sink_points: 15,
  },
  [OreItemNames.Sulfur]: {
    image: "Sulfur_256.png",
    sink_points: 11,
  },
  [OreItemNames.Bauxite]: {
    image: "IconDesc_Bauxite_256.png",
    sink_points: 8,
  },
  [OreItemNames.SAM]: {
    image: "IconDesc_SameOre_256.png",
    sink_points: 20,
  },
  [OreItemNames.Uranium]: {
    image: "IconDesc_UraniumOre_256.png",
    sink_points: 35,
  },
  [IngotItemNames.IronIngot]: {
    image: "IconDesc_IronIngot_256.png",
    sink_points: 2,
  },
  [IngotItemNames.CopperIngot]: {
    image: "IconDesc_CopperIngot_256.png",
    sink_points: 6,
  },
  [IngotItemNames.CateriumIngot]: {
    image: "IconDesc_CateriumIngot_256.png",
    sink_points: 42,
  },
  [IngotItemNames.SteelIngot]: {
    image: "IconDesc_SteelIngot_256.png",
    sink_points: 8,
  },
  [IngotItemNames.AluminumIngot]: {
    image: "IconDesc_AluminiumIngot_256.png",
    sink_points: 131,
  },
  [IngotItemNames.FicsiteIngot]: {
    image: "IconDesc_FicsiteIngot_256.png",
    sink_points: 1936,
  },
  [MineralItemNames.Concrete]: {
    image: "IconDesc_Concrete_256.png",
    sink_points: 12,
  },
  [MineralItemNames.QuartzCrystal]: {
    image: "IconDesc_QuartzResource_256.png",
    sink_points: 50,
  },
  [MineralItemNames.Silica]: {
    image: "IconDesc_Silica_256.png",
    sink_points: 20,
  },
  [MineralItemNames.CopperPowder]: {
    image: "IconDesc_CopperDust_256.png",
    sink_points: 72,
  },
  [MineralItemNames.PolymerResin]: {
    image: "IconDesc_PolymerResin_256.png",
    sink_points: 12,
  },
  [MineralItemNames.PetroleumCoke]: {
    image: "IconDesc_PetroleumCoke_256.png",
    sink_points: 20,
  },
  [MineralItemNames.AluminumScrap]: {
    image: "IconDesc_AluminiumScrap_256.png",
    sink_points: 27,
  },
  [LiquidItemNames.Water]: {
    image: "LiquidWater_Pipe_256.png",
    // TODO
    sink_points: 5,
  },
  [LiquidItemNames.CrudeOil]: {
    image: "LiquidOil_Pipe_256.png",
    sink_points: 30,
  },
  [LiquidItemNames.HeavyOilResidue]: {
    image: "IconDesc_LiquidHeavyOilResidue_Pipe_256.png",
    sink_points: 30,
  },
  [LiquidItemNames.Fuel]: {
    image: "IconDesc_LiquidFuel_Pipe_256.png",
    sink_points: 75,
  },
  [LiquidItemNames.LiquidBiofuel]: {
    image: "IconDesc_LiquidBiofuel_Pipe_256.png",
    sink_points: 261,
  },
  [LiquidItemNames.Turbofuel]: {
    image: "IconDesc_LiquidTurboFuel_Pipe_256.png",
    sink_points: 225,
  },
  [LiquidItemNames.AluminaSolution]: {
    image: "LiquidAlumina_Pipe_256.png",
    sink_points: 20,
  },
  [LiquidItemNames.SulfuricAcid]: {
    image: "IconDesc_LiquidSulfuricAcid_Pipe_256.png",
    sink_points: 16,
  },
  [LiquidItemNames.NitricAcid]: {
    image: "IconDesc_NitricAcid_256.png",
    sink_points: 94,
  },
  [LiquidItemNames.DissolvedSilica]: {
    image: "IconDesc_DissolvedSilica_256.png",
    sink_points: -1,
  },
  [GasItemNames.NitrogenGas]: {
    image: "IconDesc_NitricAcid_256.png",
    sink_points: 10,
  },
  [GasItemNames.RocketFuel]: {
    image: "IconDesc_RocketFuelPipe_256.png",
    sink_points: 289,
  },
  [GasItemNames.IonizedFuel]: {
    image: "IconDesc_IonizedFuel_256.png",
    sink_points: 2398,
  },
  [GasItemNames.DarkMatterResidue]: {
    image: "IconDesc_DarkEnergy_256.png",
    sink_points: 130,
  },
  [GasItemNames.ExcitedPhotonicMatter]: {
    image: "IconDesc_QuantumEnergy_256.png",
    sink_points: 100,
  },
  [StandardPartItemNames.IronRod]: {
    image: "IconDesc_IronRods_256.png",
    sink_points: 4,
  },
  [StandardPartItemNames.Screws]: {
    image: "IconDesc_IronScrews_256.png",
    sink_points: 2,
  },
  [StandardPartItemNames.IronPlate]: {
    image: "IconDesc_IronPlates_256.png",
    sink_points: 6,
  },
  [StandardPartItemNames.ReinforcedIronPlate]: {
    image: "IconDesc_ReinforcedIronPlates_256.png",
    sink_points: 120,
  },
  [StandardPartItemNames.CopperSheet]: {
    image: "IconDesc_CopperSheet_256.png",
    sink_points: 24,
  },
  [StandardPartItemNames.AlcladAluminumSheet]: {
    image: "IconDesc_AluminiumSheet_256.png",
    sink_points: 266,
  },
  [StandardPartItemNames.AluminumCasing]: {
    image: "IconDesc_AluminiumCasing_256.png",
    sink_points: 393,
  },
  [StandardPartItemNames.SteelPipe]: {
    image: "IconDesc_SteelPipe_256.png",
    sink_points: 24,
  },
  [StandardPartItemNames.StealBeam]: {
    image: "IconDesc_SteelBeam_256.png",
    sink_points: 64,
  },
  [StandardPartItemNames.EncasedIndustrialBeam]: {
    image: "IconDesc_EncasedSteelBeam_256.png",
    sink_points: 528,
  },
  [StandardPartItemNames.ModularFrame]: {
    image: "IconDesc_ModularFrame_256.png",
    sink_points: 408
  },
  [StandardPartItemNames.HeavyModularFrame]: {
    image: "IconDesc_ModularFrameHeavy_256.png",
    sink_points: 10800,
  },
  [StandardPartItemNames.FusedModularFrame]: {
    image: "IconDesc_FusedModularFrame_256.png",
    sink_points: 62840,
  },
  [StandardPartItemNames.FicsiteTrigon]: {
    image: "IconDesc_FicsiteMesh_256.png",
    sink_points: 1291,
  },
  [StandardPartItemNames.Fabric]: {
    image: "IconDesc_Fabric_256.png",
    sink_points: 140,
  },
  [StandardPartItemNames.Plastic]: {
    image: "IconDesc_Plastic_256.png",
    sink_points: 75,
  },
  [StandardPartItemNames.Rubber]: {
    image: "IconDesc_Rubber_256.png",
    sink_points: 60,
  },
  [IndustrialPartItemNames.Rotor]: {
    image: "IconDesc_Rotor_256.png",
    sink_points: 140,
  },
  [IndustrialPartItemNames.Stator]: {
    image: "IconDesc_Stator_256.png",
    sink_points: 240,
  },
  [IndustrialPartItemNames.Battery]: {
    image: "IconDesc_Battery_256.png",
    sink_points: 465,
  },
  [IndustrialPartItemNames.Motor]: {
    image: "IconDesc_Engine_256.png",
    sink_points: 1520,
  },
  [IndustrialPartItemNames.HeatSink]: {
    image: "IconDesc_Heatsink_256.png",
    sink_points: 2804,
  },
  [IndustrialPartItemNames.CoolingSystem]: {
    image: "IconDesc_CoolingSystem_256.png",
    sink_points: 12006,
  },
  [IndustrialPartItemNames.TurboMotor]: {
    image: "IconDesc_TurboMotor_256.png",
    sink_points: 240496,
  },
  [ElectronicItemNames.Wire]: {
    image: "IconDesc_Wire_256.png",
    sink_points: 6,
  },
  [ElectronicItemNames.Cable]: {
    image: "IconDesc_Cables_256.png",
    sink_points: 24,
  },
  [ElectronicItemNames.Quickwire]: {
    image: "IconDesc_Quickwire_256.png",
    sink_points: 17,
  },
  [ElectronicItemNames.CircuitBoard]: {
    image: "IconDesc_CircuitBoard_256.png",
    sink_points: 696,
  },
  [ElectronicItemNames.AILimiter]: {
    image: "IconDesc_AILimiter_256.png",
    sink_points: 920,
  },
  [ElectronicItemNames.HighSpeedConnector]: {
    image: "IconDesc_HighSpeedConnector_256.png",
    sink_points: 3776,
  },
  [ElectronicItemNames.ReanimatedSAM]: {
    image: "IconDesc_ReanimatedSam_256.png",
    sink_points: 160,
  },
  [ElectronicItemNames.SAMFluctuator]: {
    image: "IconDesc_SamFluctuator_256.png",
    sink_points: 1968,
  },
  [CommunicationItemNames.Computer]: {
    image: "IconDesc_Computer_256.png",
    sink_points: 8352,
  },
  [CommunicationItemNames.Supercomputer]: {
    image: "IconDesc_QuantumComputer_256.png",
    sink_points: 97352,
  },
  [CommunicationItemNames.RadioControlUnit]: {
    image: "IconDesc_RadioControlUnit_256.png",
    sink_points: 32352,
  },
  [CommunicationItemNames.CrystalOscillator]: {
    image: "IconDesc_CrystalOscillator_256.png",
    sink_points: 3072,
  },
  [CommunicationItemNames.SuperpositionOscillator]: {
    image: "IconDesc_SuperPositionOscillator_256.png",
    sink_points: 37292,
  },
  [QuantumTechnologyItemNames.Diamonds]: {
    image: "IconDesc_Diamonds_256.png",
    sink_points: 240,
  },
  [QuantumTechnologyItemNames.TimeCrystal]: {
    image: "IconDesc_ExoticMatter_256.png",
    sink_points: 960,
  },
  [QuantumTechnologyItemNames.DarkMatterCrystal]: {
    image: "IconDesc_TimeCrystal_256.png",
    sink_points: 1780,
  },
  [QuantumTechnologyItemNames.SingularityCell]: {
    image: "IconDesc_SingularityCell_256.png",
    sink_points: 114675,
  },
  [QuantumTechnologyItemNames.NeuralQuantumProcessor]: {
    image: "IconDesc_TemporalProcessor_256.png",
    sink_points: 248034,
  },
  [QuantumTechnologyItemNames.AlienPowerMatrix]: {
    image: "IconDesc_AlienPowerMatrix_256.png",
    sink_points: 210,
  },
  [ContainerItemNames.EmptyCanister]: {
    image: "IconDesc_EmptyCannister_256.png",
    sink_points: 60,
  },
  [ContainerItemNames.EmptyFluidTank]: {
    image: "IconDesc_PressureTank_256.png",
    sink_points: 170,
  },
  [ContainerItemNames.PressureConversionCube]: {
    image: "IconDesc_ConversionCube_256.png",
    sink_points: 255088,
  },
  [ContainerItemNames.PackagedWater]: {
    image: "IconDesc_PackagedWater_256.png",
    sink_points: 130,
  },
  [ContainerItemNames.PackagedAluminaSolution]: {
    image: "IconDesc_PackagedAluminaSolution_256.png",
    sink_points: 160,
  },
  [ContainerItemNames.PackagedSulfuricAcid]: {
    image: "IconDesc_PckagedSulphuricAcid_256.png",
    sink_points: 152,
  },
  [ContainerItemNames.PackagedNitricAcid]: {
    image: "IconDesc_PackagedNitricAcid_256.png",
    sink_points: 412,
  },
  [ContainerItemNames.PackagedNitrogenGas]: {
    image: "IconDesc_PackagedNitrogen_256.png",
    sink_points: 312,
  },
  [FuelItemNames.CompactedCoal]: {
    image: "IconDesc_CompactedCoal_256.png",
    sink_points: 28,
  },
  [FuelItemNames.PackagedOil]: {
    image: "Oil_256.png",
    sink_points: 180,
  },
  [FuelItemNames.PackagedHeavyOilResidue]: {
    image: "OilResidue_256.png",
    sink_points: 180,
  },
  [FuelItemNames.PackagedFuel]: {
    image: "IconDesc_Fuel_256.png",
    sink_points: 270,
  },
  [FuelItemNames.PackagedLiquidBiofuel]: {
    image: "IconDesc_LiquidBiofuel_256.png",
    sink_points: 370,
  },
  [FuelItemNames.PackagedTurbofuel]: {
    image: "IconDesc_TurboFuel_256.png",
    sink_points: 570,
  },
  [FuelItemNames.PackagedRocketFuel]: {
    image: "IconDesc_PackagedRocketFuel_256.png",
    sink_points: 1028,
  },
  [FuelItemNames.PackagedIonizedFuel]: {
    image: "IconDesc_IonizedRocketFuel_256.png",
    sink_points: 5246,
  },
  [FuelItemNames.UraniumFuelRod]: {
    image: "IconDesc_NuclearFuelRod_256.png",
    sink_points: 43468,
  },
  [FuelItemNames.PlutoniumFuelRod]: {
    image: "IconDesc_PlutoniumFuelRod_256.png",
    sink_points: 153184,
  },
  [ConsumedItemNames.BlackPowder]: {
    image: "IconDesc_Gunpowder_256.png",
    sink_points: 14,
  },
  [ConsumedItemNames.SmokelessPowder]: {
    image: "IconDesc_GunpowderMk2_256.png",
    sink_points: 58,
  },
  [ConsumedItemNames.GasFilter]: {
    image: "IconDesc_GasMaskFilter_256.png",
    sink_points: 608,
  },
  [ConsumedItemNames.IodineInfusedFilter]: {
    image: "IconDesc_HazmatFilter_256.png",
    sink_points: 2274,
  },
  [AmmoItemNames.IronRebar]: {
    image: "IconDesc_Rebar_256.png",
    sink_points: 8,
  },
  [AmmoItemNames.StunRebar]: {
    image: "IconDesc_StunRebar_256.png",
    sink_points: 186,
  },
  [AmmoItemNames.ShatterRebar]: {
    image: "IconDesc_ScatterRebar_256.png",
    sink_points: 332,
  },
  [AmmoItemNames.ExplosiveRebar]: {
    image: "IconDesc_ExpRebar_256.png",
    sink_points: 360,
  },
  [AmmoItemNames.RifleAmmo]: {
    image: "IconDesc_Rifle_256.png",
    sink_points: 25,
  },
  [AmmoItemNames.HomingRifleAmmo]: {
    image: "IconDesc_HomingRifle_256.png",
    sink_points: 855,
  },
  [AmmoItemNames.TurboRifleAmmo]: {
    image: "IconDesc_TurboRifle_256.png",
    sink_points: 120,
  },
  [AmmoItemNames.Nobelisk]: {
    image: "IconDesc_Explosive_256.png",
    sink_points: 152,
  },
  [AmmoItemNames.GasNobelisk]: {
    image: "IconDesc_Gas_256.png",
    sink_points: 544,
  },
  [AmmoItemNames.PulseNobelisk]: {
    image: "IconDesc_Shock_256.png",
    sink_points: 1533,
  },
  [AmmoItemNames.ClusterNobelisk]: {
    image: "IconDesc_Cluster_256.png",
    sink_points: 1376,
  },
  [AmmoItemNames.NukeNobelisk]: {
    image: "IconDesc_Nuke_256.png",
    sink_points: 19600,
  },
  [NuclearItemNames.ElectromagneticControlRod]: {
    image: "IconDesc_ElectromagneticControlRod_256.png",
    sink_points: 2560,
  },
  [NuclearItemNames.EncasedUraniumCell]: {
    image: "IconDesc_NuclearCell_256.png",
    sink_points: 147,
  },
  [NuclearItemNames.NonFissileUranium]: {
    image: "IconDesc_NonFissileUranium_256.png",
    sink_points: -1,
  },
  [NuclearItemNames.PlutoniumPellet]: {
    image: "IconDesc_PlutoniumPellet_256.png",
    sink_points: -1,
  },
  [NuclearItemNames.EncasedPlutoniumCell]: {
    image: "IconDesc_EncasedPlutoniumCell_256.png",
    sink_points: -1,
  },
  [NuclearItemNames.Ficsonium]: {
    image: "IconDesc_FicsoniumCell_256.png",
    sink_points: -1,
  },
  [NuclearItemNames.FicsoniumFuelRod]: {
    image: "IconDesc_FicsoniumFuelRod_256.png",
    sink_points: -1,
  },
  [WasteItemNames.UraniumWaste]: {
    image: "IconDesc_NuclearWaste_256.png",
    sink_points: -1,
  },
  [WasteItemNames.PlutoniumWaste]: {
    image: "IconDesc_PlutoniumWaste_256.png",
    sink_points: -1,
  },
  [SpecialItemNames.PowerShard]: {
    image: "PowerShard_256.png",
    sink_points: -1,
  },
  [SpecialItemNames.SmartPlating]: {
    image: "IconDesc_SpelevatorPart_1_256.png",
    sink_points: 520,
  },
  [SpecialItemNames.PortableMiner]: {
    image: "IconDesc_PortableMiner_256.png",
    sink_points: 56,
  },
  [SpecialItemNames.VersatileFramework]: {
    image: "IconDesc_SpelevatorPart_2_256.png",
    sink_points: 1176,
  },
  [SpecialItemNames.AutomatedWiring]: {
    image: "SpelevatorPart_3_256.png",
    sink_points: 1440,
  },
  [SpecialItemNames.ModularEngine]: {
    image: "IconDesc_SpelevatorPart_4_256.png",
    sink_points: 9960,
  },
  [SpecialItemNames.AdaptiveControlUnit]: {
    image: "IconDesc_SpelevatorPart_5_256.png",
    sink_points: 76368,
  },
  [SpecialItemNames.AssemblyDirectorSystem]: {
    image: "IconDesc_AssemblyDirectorSystem_256.png",
    sink_points: 500176,
  },
  [SpecialItemNames.MagneticFieldGenerator]: {
    image: "IconDesc_MagneticFieldGenerator_256.png",
    sink_points: 11000,
  },
  [SpecialItemNames.ThermalPropulsionRocket]: {
    image: "IconDesc_ThermalPropulsionRocket_256.png",
    sink_points: 728508,
  },
  [SpecialItemNames.NuclearPasta]: {
    image: "IconDesc_NuclearPasta_256.png",
    sink_points: 538976,
  },
  [SpecialItemNames.BiochemicalSculptor]: {
    image: "IconDesc_BiochemicalSculptor_256.png",
    sink_points: 301778,
  },
  [SpecialItemNames.BallisticWarpDrive]: {
    image: "IconDesc_BallisticWarpDrive_256.png",
    sink_points: 2895334,
  },
  [SpecialItemNames.AIExpansionServer]: {
    image: "IconDesc_AIExpension_256.png",
    sink_points: 597652,
  },
};

export function getItemImageByName(name: ItemName) {
  return imageByName[ITEM_MAP[name].image];
}

export function getItemSPByName(name: ItemName) {
  return ITEM_MAP[name].sink_points;
}

const liquidSet = new Set(Object.values(LiquidItemNames));
const gasSet = new Set(Object.values(GasItemNames));

export function isItemSinkable(name: ItemName) {
  return !liquidSet.has(name) && !gasSet.has(name);
}
