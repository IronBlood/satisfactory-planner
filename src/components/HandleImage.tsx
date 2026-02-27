import { getItemImageByName } from "../data/items";

type TooltipDirection = "UP" | "DOWN";

export default function HandleImage({
  name,
  direction,
}: {
  name: string;
  direction: TooltipDirection;
}) {
  return (
    <span className="group relative flex">
      <img
        alt={name}
        loading="lazy"
        width="256"
        height="256"
        className="pointer-events-none aspect-square w-full"
        src={getItemImageByName(name)}
      />
      <span className={[
        "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100",
        direction === "UP"
          ? "bottom-full mb-2"
          : "top-full mt-2",
      ].join(" ")}>{name}</span>
    </span>
  );
}
