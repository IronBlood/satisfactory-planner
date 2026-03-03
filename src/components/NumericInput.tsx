import {
  useEffect,
  useState,
  useCallback,
} from "react";

export default function NumericInput({
  value,
  readonly = false,
  onCommit,
  textRight = false,
}: {
  value: number;
  readonly?: boolean;
  onCommit: (next: number) => void;
  textRight?: boolean;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed === "") {
      return;
    }

    const n = Number(trimmed);
    if (!Number.isFinite(n)) {
      return;
    }

    onCommit(Math.max(0, n));
  }, [draft, onCommit]);

  return (
    <input
      className={[
        "nodrag inline-block w-auto min-w-0 _reset-input-number",
        textRight ? "text-right" : "",
      ].join(" ")}
      type="text"
      inputMode="decimal"
      readOnly={readonly}
      value={draft}
      size={Math.max(1, draft.length)}
      onChange={(e) => {
        const s = e.target.value;

        if (s === "" || /^(\d+(\.\d*)?|\.\d*)$/.test(s)) {
          setDraft(s);
        }
      }}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          (e.currentTarget as HTMLInputElement).blur();
        }
      }}
    />
  );
}
