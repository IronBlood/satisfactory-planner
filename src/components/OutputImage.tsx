import {
  getItemImageByName,
} from "../data/items";
import { type IngredientAmount } from "../data/recipes";

/**
 * In current situation, each recipe has either one output or two outputs
 */
export default function OutputImage({
  outputs,
  showSecond = true,
}: {
  outputs: IngredientAmount[];
  showSecond?: boolean;
}) {
  return (
    <>
      {outputs[0] && <img
        src={getItemImageByName(outputs[0].name)}
        alt={outputs[0].name}
        loading="lazy"
        width="256"
        height="256"
        className="inline-block aspect-square w-12"
      />}
      {showSecond && outputs[1] && <img
        src={getItemImageByName(outputs[1].name)}
        alt={outputs[1].name}
        loading="lazy"
        width="256"
        height="256"
        className="absolute -bottom-2 -right-1 inline-block aspect-square w-7 overflow-hidden rounded-full bg-slate-800 ring-1 ring-gray-600"
      />}
    </>
  );
}
