export function formatNumber(x: number) {
  const rounded = Math.round(x);
  if (Math.abs(x - rounded) < 0.0001) {
    return String(rounded);
  }

  return String(Number(x.toFixed(2)));
}
