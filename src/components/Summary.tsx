import {
  useMemo,
} from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
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

function SummaryDisclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Disclosure as="div" className="p-4">
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="font-medium text-sky-600 group-data-hover:text-sky-500">{title}</span>
        <ChevronDownIcon className="size-5 fill-sky-600 group-data-hover:fill-sky-500 group-data-open:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm text-slate-300">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
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

      const ceiled = Math.ceil(node.data.count);
      const building = node.type === "building"
        ? Buildings[node.data.name]
        : Buildings[node.data.recipe.building];

      const power_total = node.data.count * building.power;
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
    <div className="divide-y divide-slate-800">
      {summary.power_comsumed > 0 && <SummaryDisclosure title="Power Cosumed">about {summary.power_comsumed} MW</SummaryDisclosure>}
      {summary.power_generated > 0 && <SummaryDisclosure title="Power Generated">about {summary.power_generated} MW</SummaryDisclosure>}
      {Object.keys(summary.need).length > 0 && (
        <SummaryDisclosure title="Items">
          <ul>
            {Object.keys(summary.need).sort().map(key => (
              <li
                key={key}
              >
                <span className="font-bold">{summary.need[key]}</span>x {key}
              </li>
            ))}
          </ul>
        </SummaryDisclosure>
      )}
    </div>
  );
}
