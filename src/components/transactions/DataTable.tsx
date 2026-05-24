import type { Transaction } from "@/types/transaction";

type DataTableProps = {
  rows: Transaction[];
  isLoading: boolean;
};

const amountFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 8,
});

function formatAmount(value: number | null, currency: string | null) {
  if (value === null || Number.isNaN(value)) return "-";
  return `${amountFormatter.format(value)} ${currency ?? ""}`.trim();
}

function formatDate(value: string | number | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function DataTable({ rows, isLoading }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
        Loading transactions...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Buy</th>
              <th className="px-4 py-3 font-medium">Sell</th>
              <th className="px-4 py-3 font-medium">Fee</th>
              <th className="px-4 py-3 font-medium">Network</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="whitespace-nowrap px-4 py-3">{formatDate(row.date)}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.method}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatAmount(row.buyAmount, row.buyCurrency)}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatAmount(row.sellAmount, row.sellCurrency)}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatAmount(row.feeAmount, row.feeCurrency)}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.network ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
