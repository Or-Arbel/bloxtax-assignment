import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { downloadTransactionsCsv } from "@/lib/exportTransactionsCsv";
import type { Transaction } from "@/types/transaction";

type ApiResponse = {
  data: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const PAGE_SIZE = 20;

export function Home() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTransactions() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/data?page=${page}&limit=${PAGE_SIZE}`);
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const payload = (await res.json()) as ApiResponse;
        if (!isMounted) return;
        setRows(payload.data);
        setTotal(payload.pagination.total);
        setTotalPages(payload.pagination.totalPages);
      } catch {
        if (!isMounted) return;
        setRows([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadTransactions();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Crypto Transactions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Server-side paginated data from <code>/api/data</code>
        </p>
      </header>

      <div className="mb-3 flex justify-end">
        <Button
          variant="secondary"
          onClick={() => downloadTransactionsCsv(rows)}
          disabled={isLoading || rows.length === 0}
        >
          Export Current Page
        </Button>
      </div>

      <DataTable rows={rows} isLoading={isLoading} />

      <div className="mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          isLoading={isLoading}
          onPrevious={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </main>
  );
}
