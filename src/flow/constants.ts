export const AppNodeTypes = {
  Building: "building",
  Recipe: "recipe",
  Resource: "resource",
} as const;

export const AppEdgeTypes = {
  Conveyor: "conveyor",
  Pressure: "pressure",
} as const;

export const AppHandleTypes = {
  AwesomeCollector: "AwesomeCollectorHandle",
  Pressure: "PressureHandleId",
  AwesomeSink: "AwesomeSinkHandle",
} as const;
