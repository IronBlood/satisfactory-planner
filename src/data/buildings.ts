import { imageByName } from "./images";

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
}

export const Buildings: Record<BuildingName, Building> = {
  [BuildingNames.MinerMk1]: {
    name: BuildingNames.MinerMk1,
    image: imageByName["IconDesc_MinerMk1_256.png"],
    power: 5,
  },
  [BuildingNames.MinerMk2]: {
    name: BuildingNames.MinerMk2,
    image: imageByName["IconDesc_MinerMk2_256.png"],
    power: 15,
  },
  [BuildingNames.MinerMk3]: {
    name: BuildingNames.MinerMk3,
    image: imageByName["IconDesc_MinerMk3_256.png"],
    power: 45,
  },
  [BuildingNames.OilExtractor]: {
    name: BuildingNames.OilExtractor,
    image: imageByName["OilPump_256.png"],
    power: 40,
  },
  [BuildingNames.WaterExtractor]: {
    name: BuildingNames.WaterExtractor,
    image: imageByName["Waterpump_256.png"],
    power: 20,
  },
  [BuildingNames.ResourceWellPressurizer]: {
    name: BuildingNames.ResourceWellPressurizer,
    image: imageByName["IconDesc_Smasher_256.png"],
    power: 150,
  },
  [BuildingNames.ResourceWellExtractor]: {
    name: BuildingNames.ResourceWellExtractor,
    image: imageByName["IconDesc_Extractor_256.png"],
    power: 0,
  },

  [BuildingNames.Smelter]: {
    name: BuildingNames.Smelter,
    image: imageByName["IconDesc_SmelterMk1_256.png"],
    power: 4,
  },
  [BuildingNames.Foundry]: {
    name: BuildingNames.Foundry,
    image: imageByName["IconDesc_Foundry_256.png"],
    power: 16,
  },
  [BuildingNames.Constructor]: {
    name: BuildingNames.Constructor,
    image: imageByName["IconDesc_ConstructorMk1_256.png"],
    power: 4,
  },
  [BuildingNames.Assembler]: {
    name: BuildingNames.Assembler,
    image: imageByName["IconDesc_AssemblerMk1_256.png"],
    power: 15,
  },
  [BuildingNames.Manufacturer]: {
    name: BuildingNames.Manufacturer,
    image: imageByName["IconDesc_Manufacturer_256.png"],
    power: 55,
  },
  [BuildingNames.Refinery]: {
    name: BuildingNames.Refinery,
    image: imageByName["IconDesc_OilRefinery_256.png"],
    power: 30,
  },
  [BuildingNames.Packager]: {
    name: BuildingNames.Packager,
    image: imageByName["IconDesc_Packager_256.png"],
    power: 10,
  },
  [BuildingNames.Blender]: {
    name: BuildingNames.Blender,
    image: imageByName["IconDesc_Blender_256.png"],
    power: 75,
  },
  [BuildingNames.ParticleAccelerator]: {
    name: BuildingNames.ParticleAccelerator,
    image: imageByName["IconDesc_HadronCollider_256.png"],
    power: 1500,
  },
  [BuildingNames.QuantumEncoder]: {
    name: BuildingNames.QuantumEncoder,
    image: imageByName["IconDesc_QuantumEncoder_256.png"],
    power: 2000,
  },
  [BuildingNames.Converter]: {
    name: BuildingNames.Converter,
    image: imageByName["IconDesc_Converter_256.png"],
    power: 400,
  },

  [BuildingNames.NuclearPowerPlant]: {
    name: BuildingNames.NuclearPowerPlant,
    image: imageByName["NuclearPowerplant_256.png"],
    power: -2500,
  },
};
