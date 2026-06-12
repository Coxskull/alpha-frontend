export type OrderStatus =
  | "Pending"
  | "supplier_assigned"
  | "driver_assigned"
  | "picked_up"
  | "en_route"
  | "delivered"
  | "Cancelled";

type Props = {
  status: OrderStatus;
};

export default function StatusChip({ status }: Props) {
  const variants: Record<
    OrderStatus,
    string
  > = {
    Pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    "supplier_assigned":
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    "driver_assigned":
      "bg-purple-500/10 text-purple-400 border-purple-500/20",

    "picked_up":
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

    "en_route":
      "bg-orange-500/10 text-orange-400 border-orange-500/20",

    delivered:
      "bg-green-500/10 text-green-400 border-green-500/20",

    Cancelled:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${variants[status]}`}
    >
      <div className="h-2 w-2 rounded-full bg-current animate-pulse" />

      {status}
    </div>
  );
}