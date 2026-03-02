import {
  useEffect,
  useState,
  useCallback,
} from "react";

export default function NumericInput({
  value,
  readonly = false,
  onCommit,
}: {
  value: number;
  readonly?: boolean;
  onCommit: (next: number) => void;
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

    onCommit(n);
  }, [draft, onCommit]);

  return (
    <input
      className="nodrag inline-block w-auto min-w-0 _reset-input-number"
      type="text"
      inputMode="decimal"
      readOnly={readonly}
      value={draft}
      size={Math.max(1, draft.length)}
      onChange={(e) => {
        const s = e.target.value;

        if (s === "" || /^-?(\d+(\.\d*)?|\.\d*)$/.test(s)) {
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
