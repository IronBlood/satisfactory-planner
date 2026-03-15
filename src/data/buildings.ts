import { imageByName } from "./images";
import {
  CommunicationItemNames,
  ElectronicItemNames,
  IndustrialPartItemNames,
  MineralItemNames,
  QuantumTechnologyItemNames,
  SpecialItemNames,
  StandardPartItemNames,
  type ItemName,
} from "./items";

export const BuildingNames = {
  MinerMk1: "Miner Mk.1",
  MinerMk2: "Miner Mk.2",
  MinerMk3: "Miner Mk.3",
  OilExtractor: "Oil Extractor",
  WaterExtractor: "Water Extractor",
  ResourceWellPressurizer: "Resource Well Pressurizer",
  ResourceWellExtractor: "Resource Well Extractor",

  Smelter: "Smelter",
  Foundry: "Foundry",
  Constructor: "Constructor",
  Assembler: "Assembler",
  Manufacturer: "Manufacturer",
  Refinery: "Refinery",
  Packager: "Packager",
  Blender: "Blender",
  ParticleAccelerator: "Particle Accelerator",
  QuantumEncoder: "Quantum Encoder",
  Converter: "Converter",

  CoalPoweredGenerator: "Coal-Powered Generator",
  FuelPoweredGenerator: "Fuel-Powered Generator",
  NuclearPowerPlant: "Nuclear Power Plant",

  AwesomeSink: "AWESOME Sink",
  AwesomeCollector: "AWESOME Collector (non-existing)",
} as const;

export type BuildingName = typeof BuildingNames[keyof typeof BuildingNames];

export interface Building {
  name: BuildingName;
  image: string;
  power: number;
  ingredients: Record<ItemName, number>;
}

export const Buildings: Record<BuildingName, Building> = {
  [BuildingNames.MinerMk1]: {
    name: BuildingNames.MinerMk1,
    image: imageByName["IconDesc_MinerMk1_128.webp"],
    power: 5,
    ingredients: {
      [SpecialItemNames.PortableMiner]: 1,
      [StandardPartItemNames.IronPlate]: 10,
      [MineralItemNames.Concrete]: 10,
    },
  },
  [BuildingNames.MinerMk2]: {
    name: BuildingNames.MinerMk2,
    image: imageByName["IconDesc_MinerMk2_128.webp"],
    power: 15,
    ingredients: {
      [SpecialItemNames.PortableMiner]: 2,
      [StandardPartItemNames.EncasedIndustrialBeam]: 10,
      [StandardPartItemNames.SteelPipe]: 20,
      [StandardPartItemNames.ModularFrame]: 10,
    },
  },
  [BuildingNames.MinerMk3]: {
    name: BuildingNames.MinerMk3,
    image: imageByName["IconDesc_MinerMk3_128.webp"],
    power: 45,
    ingredients: {
      [SpecialItemNames.PortableMiner]: 3,
      [StandardPartItemNames.SteelPipe]: 50,
      [CommunicationItemNames.Supercomputer]: 5,
      [StandardPartItemNames.FusedModularFrame]: 10,
      [IndustrialPartItemNames.TurboMotor]: 3,
    },
  },
  [BuildingNames.OilExtractor]: {
    name: BuildingNames.OilExtractor,
    image: imageByName["OilPump_128.webp"],
    power: 40,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 15,
      [StandardPartItemNames.EncasedIndustrialBeam]: 20,
      [ElectronicItemNames.Cable]: 60,
    },
  },
  [BuildingNames.WaterExtractor]: {
    name: BuildingNames.WaterExtractor,
    image: imageByName["Waterpump_128.webp"],
    power: 20,
    ingredients: {
      [StandardPartItemNames.CopperSheet]: 20,
      [StandardPartItemNames.ReinforcedIronPlate]: 10,
      [IndustrialPartItemNames.Rotor]: 10,
    },
  },
  [BuildingNames.ResourceWellPressurizer]: {
    name: BuildingNames.ResourceWellPressurizer,
    image: imageByName["IconDesc_Smasher_128.webp"],
    power: 150,
    ingredients: {
      [CommunicationItemNames.RadioControlUnit]: 10,
      [StandardPartItemNames.HeavyModularFrame]: 25,
      [IndustrialPartItemNames.Motor]: 50,
      [StandardPartItemNames.AlcladAluminumSheet]: 50,
      [StandardPartItemNames.Rubber]: 100,
    },
  },
  [BuildingNames.ResourceWellExtractor]: {
    name: BuildingNames.ResourceWellExtractor,
    image: imageByName["IconDesc_Extractor_128.webp"],
    power: 0,
    ingredients: {
      [StandardPartItemNames.StealBeam]: 10,
      [StandardPartItemNames.AluminumCasing]: 10,
    },
  },

  [BuildingNames.Smelter]: {
    name: BuildingNames.Smelter,
    image: imageByName["IconDesc_SmelterMk1_128.webp"],
    power: 4,
    ingredients: {
      [StandardPartItemNames.IronRod]: 5,
      [ElectronicItemNames.Wire]: 8,
    },
  },
  [BuildingNames.Foundry]: {
    name: BuildingNames.Foundry,
    image: imageByName["IconDesc_Foundry_128.webp"],
    power: 16,
    ingredients: {
      [StandardPartItemNames.ModularFrame]: 10,
      [IndustrialPartItemNames.Rotor]: 10,
      [MineralItemNames.Concrete]: 20,
    },
  },
  [BuildingNames.Constructor]: {
    name: BuildingNames.Constructor,
    image: imageByName["IconDesc_ConstructorMk1_128.webp"],
    power: 4,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 2,
      [ElectronicItemNames.Cable]: 8,
    },
  },
  [BuildingNames.Assembler]: {
    name: BuildingNames.Assembler,
    image: imageByName["IconDesc_AssemblerMk1_128.webp"],
    power: 15,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 8,
      [IndustrialPartItemNames.Rotor]: 4,
      [ElectronicItemNames.Cable]: 10,
    },
  },
  [BuildingNames.Manufacturer]: {
    name: BuildingNames.Manufacturer,
    image: imageByName["IconDesc_Manufacturer_128.webp"],
    power: 55,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 10,
      [StandardPartItemNames.ModularFrame]: 20,
      [StandardPartItemNames.Plastic]: 50,
      [ElectronicItemNames.Cable]: 50,
    },
  },
  [BuildingNames.Refinery]: {
    name: BuildingNames.Refinery,
    image: imageByName["IconDesc_OilRefinery_128.webp"],
    power: 30,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 10,
      [StandardPartItemNames.EncasedIndustrialBeam]: 10,
      [StandardPartItemNames.SteelPipe]: 30,
      [StandardPartItemNames.CopperSheet]: 20,
    },
  },
  [BuildingNames.Packager]: {
    name: BuildingNames.Packager,
    image: imageByName["IconDesc_Packager_128.webp"],
    power: 10,
    ingredients: {
      [StandardPartItemNames.StealBeam]: 20,
      [StandardPartItemNames.Rubber]: 10,
      [StandardPartItemNames.Plastic]: 10,
    },
  },
  [BuildingNames.Blender]: {
    name: BuildingNames.Blender,
    image: imageByName["IconDesc_Blender_128.webp"],
    power: 75,
    ingredients: {
      [CommunicationItemNames.Computer]: 10,
      [StandardPartItemNames.HeavyModularFrame]: 10,
      [IndustrialPartItemNames.Motor]: 20,
      [StandardPartItemNames.AluminumCasing]: 50,
    },
  },
  [BuildingNames.ParticleAccelerator]: {
    name: BuildingNames.ParticleAccelerator,
    image: imageByName["IconDesc_HadronCollider_128.webp"],
    power: 1500,
    ingredients: {
      [IndustrialPartItemNames.TurboMotor]: 10,
      [CommunicationItemNames.Supercomputer]: 10,
      [StandardPartItemNames.FusedModularFrame]: 25,
      [IndustrialPartItemNames.CoolingSystem]: 50,
      [ElectronicItemNames.Quickwire]: 500,
    },
  },
  [BuildingNames.QuantumEncoder]: {
    name: BuildingNames.QuantumEncoder,
    image: imageByName["IconDesc_QuantumEncoder_128.webp"],
    power: 2000,
    ingredients: {
      [IndustrialPartItemNames.TurboMotor]: 20,
      [CommunicationItemNames.Supercomputer]: 20,
      [IndustrialPartItemNames.CoolingSystem]: 50,
      [QuantumTechnologyItemNames.TimeCrystal]: 50,
      [StandardPartItemNames.FicsiteTrigon]: 100,
    },
  },
  [BuildingNames.Converter]: {
    name: BuildingNames.Converter,
    image: imageByName["IconDesc_Converter_128.webp"],
    power: 400,
    ingredients: {
      [StandardPartItemNames.FusedModularFrame]: 10,
      [IndustrialPartItemNames.CoolingSystem]: 25,
      [CommunicationItemNames.RadioControlUnit]: 50,
      [ElectronicItemNames.SAMFluctuator]: 100,
    },
  },

  [BuildingNames.CoalPoweredGenerator]: {
    name: BuildingNames.CoalPoweredGenerator,
    image: imageByName["IconDesc_CoalGenerator_128.webp"],
    power: -75,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 20,
      [IndustrialPartItemNames.Rotor]: 10,
      [ElectronicItemNames.Cable]: 30,
    },
  },
  [BuildingNames.FuelPoweredGenerator]: {
    name: BuildingNames.FuelPoweredGenerator,
    image: imageByName["FuelGenerator_128.webp"],
    power: -250,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 15,
      [StandardPartItemNames.EncasedIndustrialBeam]: 15,
      [StandardPartItemNames.CopperSheet]: 30,
      [StandardPartItemNames.Rubber]: 50,
      [ElectronicItemNames.Quickwire]: 50,
    },
  },
  [BuildingNames.NuclearPowerPlant]: {
    name: BuildingNames.NuclearPowerPlant,
    image: imageByName["NuclearPowerplant_128.webp"],
    power: -2500,
    ingredients: {
      [CommunicationItemNames.Supercomputer]: 10,
      [StandardPartItemNames.HeavyModularFrame]: 25,
      [StandardPartItemNames.AlcladAluminumSheet]: 100,
      [ElectronicItemNames.Cable]: 200,
      [MineralItemNames.Concrete]: 250,
    },
  },

  [BuildingNames.AwesomeSink]: {
    name: BuildingNames.AwesomeSink,
    image: imageByName["ResourceSink_128.webp"],
    power: 30,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 15,
      [ElectronicItemNames.Cable]: 30,
      [MineralItemNames.Concrete]: 45,
    },
  },

  [BuildingNames.AwesomeCollector]: {
    name: BuildingNames.AwesomeCollector,
    image: imageByName["IconDesc_StorageContainer_128.webp"],
    power: 0,
    ingredients: {
    },
  },
};
