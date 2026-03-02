import {
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function RateLocker({
  isLocked,
}: {
  isLocked: boolean;
}) {
  return (
    <button
      className={[
        "h-4 w-4 p-0.5 bg-slate-800 rounded-full transition",
        isLocked
          ? "text-yellow-700 hover:text-yellow-500"
          : "text-slate-700 hover:text-slate-500"
      ].join(" ")}
    >
      {isLocked ? <LockClosedIcon /> : <LockOpenIcon />}
    </button>
  );
}
