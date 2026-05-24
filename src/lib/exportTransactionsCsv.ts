import type { Transaction } from "@/types/transaction";

const CSV_HEADERS = ["Date", "Method", "Buy", "Sell", "Fee", "Network"] as const;
const FILENAME = "transactions.csv";

const amountFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 8,
});

function formatAmount(value: number | null, currency: string | null): string {
  if (value === null || Number.isNaN(value)) return "";
  return `${amountFormatter.format(value)} ${currency ?? ""}`.trim();
}

function formatDate(value: string | number | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function escapeCsvField(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsvLine(fields: string[]): string {
  return fields.map(escapeCsvField).join(",");
}

function transactionToRow(row: Transaction): string[] {
  return [
    formatDate(row.date),
    row.method,
    formatAmount(row.buyAmount, row.buyCurrency),
    formatAmount(row.sellAmount, row.sellCurrency),
    formatAmount(row.feeAmount, row.feeCurrency),
    row.network ?? "",
  ];
}

export function buildTransactionsCsv(rows: Transaction[]): string {
  const lines = [toCsvLine([...CSV_HEADERS]), ...rows.map((row) => toCsvLine(transactionToRow(row)))];
  // UTF-8 BOM + CRLF helps Excel open UTF-8 CSV correctly on Windows.
  return `\uFEFF${lines.join("\r\n")}`;
}

export function downloadTransactionsCsv(rows: Transaction[]): void {
  const csv = buildTransactionsCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = FILENAME;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
