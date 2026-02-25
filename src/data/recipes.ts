import {
  ItemNames,
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
];

export const Recipes: Recipe[] = [
  ...([
    ItemNames.Limestone,
  ].map(ore => {
    return purities.map(({ purity, mul_p }) => {
      return miners.map(({ mk, mul_m }) => {
        return {
          name: `${ore} (${purity})`,
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
];

export function getRecipesByOutput(o: ItemName) {
  return Recipes.filter(r => r.outputs.some(x => x.name === o));
}
