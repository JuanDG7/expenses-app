const guaraniFormatter = Intl.NumberFormat("es-PY", {
  style: "currency",
  currency: "PYG",
});

export function formatGuarani(amount: number | null | undefined) {
  return guaraniFormatter.format(amount ?? 0);
}
