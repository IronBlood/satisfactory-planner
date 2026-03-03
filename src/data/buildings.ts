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

  NuclearPowerPlant: "Nuclear Power Plant",
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
    image: imageByName["IconDesc_MinerMk1_256.png"],
    power: 5,
    ingredients: {
      [SpecialItemNames.PortableMiner]: 1,
      [StandardPartItemNames.IronPlate]: 10,
      [MineralItemNames.Concrete]: 10,
    },
  },
  [BuildingNames.MinerMk2]: {
    name: BuildingNames.MinerMk2,
    image: imageByName["IconDesc_MinerMk2_256.png"],
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
    image: imageByName["IconDesc_MinerMk3_256.png"],
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
    image: imageByName["OilPump_256.png"],
    power: 40,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 15,
      [StandardPartItemNames.EncasedIndustrialBeam]: 20,
      [ElectronicItemNames.Cabel]: 60,
    },
  },
  [BuildingNames.WaterExtractor]: {
    name: BuildingNames.WaterExtractor,
    image: imageByName["Waterpump_256.png"],
    power: 20,
    ingredients: {
      [StandardPartItemNames.CopperSheet]: 20,
      [StandardPartItemNames.ReinforcedIronPlate]: 10,
      [IndustrialPartItemNames.Rotor]: 10,
    },
  },
  [BuildingNames.ResourceWellPressurizer]: {
    name: BuildingNames.ResourceWellPressurizer,
    image: imageByName["IconDesc_Smasher_256.png"],
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
    image: imageByName["IconDesc_Extractor_256.png"],
    power: 0,
    ingredients: {
      [StandardPartItemNames.StealBeam]: 10,
      [StandardPartItemNames.AluminumCasing]: 10,
    },
  },

  [BuildingNames.Smelter]: {
    name: BuildingNames.Smelter,
    image: imageByName["IconDesc_SmelterMk1_256.png"],
    power: 4,
    ingredients: {
      [StandardPartItemNames.IronRod]: 5,
      [ElectronicItemNames.Wire]: 8,
    },
  },
  [BuildingNames.Foundry]: {
    name: BuildingNames.Foundry,
    image: imageByName["IconDesc_Foundry_256.png"],
    power: 16,
    ingredients: {
      [StandardPartItemNames.ModularFrame]: 10,
      [IndustrialPartItemNames.Rotor]: 10,
      [MineralItemNames.Concrete]: 20,
    },
  },
  [BuildingNames.Constructor]: {
    name: BuildingNames.Constructor,
    image: imageByName["IconDesc_ConstructorMk1_256.png"],
    power: 4,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 2,
      [ElectronicItemNames.Cabel]: 8,
    },
  },
  [BuildingNames.Assembler]: {
    name: BuildingNames.Assembler,
    image: imageByName["IconDesc_AssemblerMk1_256.png"],
    power: 15,
    ingredients: {
      [StandardPartItemNames.ReinforcedIronPlate]: 8,
      [IndustrialPartItemNames.Rotor]: 4,
      [ElectronicItemNames.Cabel]: 10,
    },
  },
  [BuildingNames.Manufacturer]: {
    name: BuildingNames.Manufacturer,
    image: imageByName["IconDesc_Manufacturer_256.png"],
    power: 55,
    ingredients: {
      [IndustrialPartItemNames.Motor]: 10,
      [StandardPartItemNames.ModularFrame]: 20,
      [StandardPartItemNames.Plastic]: 50,
      [ElectronicItemNames.Cabel]: 50,
    },
  },
  [BuildingNames.Refinery]: {
    name: BuildingNames.Refinery,
    image: imageByName["IconDesc_OilRefinery_256.png"],
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
    image: imageByName["IconDesc_Packager_256.png"],
    power: 10,
    ingredients: {
      [StandardPartItemNames.StealBeam]: 20,
      [StandardPartItemNames.Rubber]: 10,
      [StandardPartItemNames.Plastic]: 10,
    },
  },
  [BuildingNames.Blender]: {
    name: BuildingNames.Blender,
    image: imageByName["IconDesc_Blender_256.png"],
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
    image: imageByName["IconDesc_HadronCollider_256.png"],
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
    image: imageByName["IconDesc_QuantumEncoder_256.png"],
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
    image: imageByName["IconDesc_Converter_256.png"],
    power: 400,
    ingredients: {
      [StandardPartItemNames.FusedModularFrame]: 10,
      [IndustrialPartItemNames.CoolingSystem]: 25,
      [CommunicationItemNames.RadioControlUnit]: 50,
      [ElectronicItemNames.SAMFluctuator]: 100,
    },
  },

  [BuildingNames.NuclearPowerPlant]: {
    name: BuildingNames.NuclearPowerPlant,
    image: imageByName["NuclearPowerplant_256.png"],
    power: -2500,
    ingredients: {
      [CommunicationItemNames.Supercomputer]: 10,
      [StandardPartItemNames.HeavyModularFrame]: 25,
      [StandardPartItemNames.AlcladAluminumSheet]: 100,
      [ElectronicItemNames.Cabel]: 200,
      [MineralItemNames.Concrete]: 250,
    },
  },
};
