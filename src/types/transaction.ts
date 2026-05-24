export type Transaction = {
  id: number;
  method: string;
  buyAmount: number | null;
  buyCurrency: string | null;
  sellAmount: number | null;
  sellCurrency: string | null;
  feeAmount: number | null;
  feeCurrency: string | null;
  date: string | number | Date;
  network: string | null;
};
