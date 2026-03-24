import {
  useMemo,
} from "react";
import {
  useEdges,
  useNodes,
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
  getItemImageByName,
  getItemSPByName,
  type ItemName,
} from "@/data/items";
import {
  BuildingNames,
  Buildings,
  type BuildingName,
} from "@/data/buildings";
import {
  AppEdgeTypes,
  AppNodeTypes,
} from "@/flow/constants";
import type {
  ConveyorEdgeType,
} from "@/flow/edges";
import type {
  ResourceNodeType,
  RecipeNodeType,
} from "@/flow/nodes";
import { getRecipeByName } from "@/data/recipes";
import { useActiveFlowDataContext } from "@/ActiveFlowContextProvider";

type ItemMap = Record<ItemName, number>;

interface Summary {
  need: ItemMap;
  inputs: ItemMap;
  outputs: ItemMap;
  sink_points: number;
  power_consumed: number;
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
          <span className="font-bold">{map[key]}</span>{unit} <img
            alt={key}
            loading="lazy"
            src={getItemImageByName(key)}
            className="aspect-square w-6 inline-block mx-2"
          /> {key}
        </li>
      ))}
    </ul>
  );
}

const InputBuildings: BuildingName[] = [
  BuildingNames.MinerMk1,
  BuildingNames.MinerMk1,
  BuildingNames.MinerMk3,
  BuildingNames.WaterExtractor,
  BuildingNames.OilExtractor,
  BuildingNames.ResourceWellExtractor,
];

function isInputNode(node: AppNode): node is ResourceNodeType | RecipeNodeType {
  if (node.type === AppNodeTypes.Resource) {
    return true;
  }

  if (node.type === AppNodeTypes.Building || node.type === AppNodeTypes.Passthrough) {
    return false;
  }

  const recipe = getRecipeByName(node.data.recipe);
  return InputBuildings.includes(recipe.building);
}

export default function Summary() {
  const { powerConsumptionMultiplier } = useActiveFlowDataContext();
  const nodes = useNodes() as AppNode[];
  // `edges` isn't used directly but once the data is changed
  // `summary` can also be updated
  const edges = useEdges();

  const {
    getNodeConnections,
    getEdge,
  } = useReactFlow();

  const summary: Summary = useMemo(() => {
    const s: Summary = {
      need: {},
      inputs: {},
      outputs: {},
      sink_points: 0,
      power_consumed: 0,
      power_generated: 0,
    };

    for (const node of nodes) {
      if (node.type === AppNodeTypes.Passthrough) {
        continue;
      }

      if (isInputNode(node)) {
        if (node.type === AppNodeTypes.Resource) {
          s.inputs[node.data.name] = (s.inputs[node.data.name] || 0) + node.data.count;
        } else {
          const recipe = getRecipeByName(node.data.recipe);
          // NOTE: this should be a valid pair
          const { name, amount } = recipe.outputs[0];
          s.inputs[name] = (s.inputs[name] || 0) + amount * (60 / recipe.duration) * node.data.count;
        }
      }

      if (node.type === AppNodeTypes.Resource) {
        continue;
      }

      if (node.type === AppNodeTypes.Building && node.data.name === BuildingNames.AwesomeCollector) {
        const connections = getNodeConnections({
          type: "target",
          nodeId: node.id,
        });

        connections.forEach(c => {
          const edge = getEdge(c.edgeId);
          if (edge?.type !== AppEdgeTypes.Conveyor) {
            // TODO
            return;
          }

          if (c.sourceHandle) {
            s.outputs[c.sourceHandle] = (s.outputs[c.sourceHandle] || 0) + ((edge as ConveyorEdgeType).data?.value || 0);
          }
        });

        continue;
      }

      if (node.type === AppNodeTypes.Building && node.data.name === BuildingNames.AwesomeSink) {
        const connections = getNodeConnections({
          type: "target",
          nodeId: node.id,
        });

        connections.forEach(c => {
          const edge = getEdge(c.edgeId);
          if (!c.sourceHandle || edge?.type !== AppEdgeTypes.Conveyor) {
            // TODO
            console.log("expect sourceHandle from:", c);
            return;
          }

          s.sink_points += getItemSPByName(c.sourceHandle) * ((edge as ConveyorEdgeType).data?.value || 0);
        });
      }

      const ceiled = Math.ceil(node.data.count);
      const building = node.type === AppNodeTypes.Building
        ? Buildings[node.data.name]
        : Buildings[getRecipeByName(node.data.recipe).building];

      const power_total = node.data.count * building.power;
      if (power_total < 0) {
        s.power_generated -= power_total;
      } else {
        s.power_consumed += power_total;
      }

      for (const [item, need] of entries(building.ingredients)) {
        s.need[item] = (s.need[item] || 0) + need * ceiled;
      }
    }

    return s;
  }, [nodes, edges, getEdge, getNodeConnections]);

  return (
    <div className="divide-y divide-slate-800">
      {summary.power_consumed > 0 && <SummaryDisclosure title="Power Consumed"><span className="italic">approx.</span> {summary.power_consumed * powerConsumptionMultiplier} MW</SummaryDisclosure>}
      {summary.power_generated > 0 && <SummaryDisclosure title="Power Generated"><span className="italic">approx.</span> {summary.power_generated} MW</SummaryDisclosure>}
      {summary.sink_points > 0 && <SummaryDisclosure title="Sink Points"><span className="italic">approx.</span> {summary.sink_points} /min</SummaryDisclosure>}
      {Object.keys(summary.need).length > 0 && (
        <SummaryDisclosure title="Items for Buildings">
          <ListItems map={summary.need} unit="x" />
        </SummaryDisclosure>
      )}
      {Object.keys(summary.inputs).length > 0 && (
        <SummaryDisclosure title="Inputs">
          <ListItems map={summary.inputs} unit="/min" />
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
