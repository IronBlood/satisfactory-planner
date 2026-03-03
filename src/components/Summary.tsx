import {
  useMemo,
} from "react";
import {
  type AppNode,
} from "@/types";
import {
  type ItemName,
} from "@/data/items";
import {
  Buildings,
} from "@/data/buildings";

interface Summary {
  need: Record<ItemName, number>;
  power_comsumed: number;
  power_generated: number;
}

function entries<T extends string | number | symbol, S>(records: Record<T, S>) {
  return Object.entries(records) as [T, S][];
}

export default function Summary({
  nodes,
}: {
  nodes: AppNode[];
}) {
  const summary: Summary = useMemo(() => {
    const s: Summary = {
      need: {},
      power_comsumed: 0,
      power_generated: 0,
    };

    for (const node of nodes) {
      if (node.type === "resource") {
        continue;
      }

      const { recipe, count } = node.data;
      const ceiled = Math.ceil(count);
      const building = Buildings[recipe.building];

      const power_total = count * building.power;
      if (power_total < 0) {
        s.power_generated -= power_total;
      } else {
        s.power_comsumed += power_total;
      }

      for (const [item, need] of entries(building.ingredients)) {
        s.need[item] = (s.need[item] || 0) + need * ceiled;
      }
    }

    return s;
  }, [nodes]);
  return (
    <div>
      {summary.power_comsumed > 0 && <div><span className="font-bold">Power Cosumed:</span> ~{summary.power_comsumed} MW</div>}
      {summary.power_generated > 0 && <div><span className="font-bold">Power Generated:</span> ~{summary.power_generated} MW</div>}
      {Object.keys(summary.need).length > 0 && (
        <>
          <div className="font-bold">Items</div>
          <ul>
            {Object.keys(summary.need).sort().map(key => (
              <li
                key={key}
              >
                <span className="font-bold">{summary.need[key]}</span>x {key}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
