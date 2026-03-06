import {
  useMemo,
} from "react";
import {
  useReactFlow,
} from "@xyflow/react";
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
  BuildingNames,
  Buildings,
} from "@/data/buildings";
import { ConveyorEdgeTypeId, type ConveyorEdgeType } from "@/nodes/ConveyorEdge";

type ItemMap = Record<ItemName, number>;

interface Summary {
  need: ItemMap;
  outputs: ItemMap;
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

function ListItems({
  map,
  unit
}: {
  map: ItemMap;
  unit: string;
}) {
  return (
    <ul>
      {Object.keys(map).sort().map(key => (
        <li
          key={key}
        >
          <span className="font-bold">{map[key]}</span>{unit} {key}
        </li>
      ))}
    </ul>
  );
}

export default function Summary({
  nodes,
}: {
  nodes: AppNode[];
}) {
  const {
    getNodeConnections,
    getEdge,
  } = useReactFlow();

  const summary: Summary = useMemo(() => {
    const s: Summary = {
      need: {},
      outputs: {},
      power_comsumed: 0,
      power_generated: 0,
    };

    for (const node of nodes) {
      if (node.type === "resource") {
        continue;
      }

      if (node.type === "building" && node.data.name === BuildingNames.AwesomeCollector) {
        const connections = getNodeConnections({
          type: "target",
          nodeId: node.id,
        });

        connections.forEach(c => {
          const edge = getEdge(c.edgeId);
          if (edge?.type !== ConveyorEdgeTypeId) {
            // TODO
            return;
          }

          if (c.sourceHandle) {
            s.outputs[c.sourceHandle] = (s.outputs[c.sourceHandle] || 0) + ((edge as ConveyorEdgeType).data?.value || 0);
          }
        });

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
  }, [nodes, getEdge, getNodeConnections]);
  return (
    <div className="divide-y divide-slate-800">
      {summary.power_comsumed > 0 && <SummaryDisclosure title="Power Cosumed"><span className="italic">approx.</span> {summary.power_comsumed} MW</SummaryDisclosure>}
      {summary.power_generated > 0 && <SummaryDisclosure title="Power Generated"><span className="italic">approx.</span> {summary.power_generated} MW</SummaryDisclosure>}
      {Object.keys(summary.need).length > 0 && (
        <SummaryDisclosure title="Items">
          <ListItems map={summary.need} unit="x" />
        </SummaryDisclosure>
      )}
      {Object.keys(summary.outputs).length > 0 && (
        <SummaryDisclosure title="Outputs">
          <ListItems map={summary.outputs} unit="/min" />
        </SummaryDisclosure>
      )}
    </div>
  );
}
