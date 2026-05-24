import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function Pagination({
  page,
  totalPages,
  total,
  isLoading,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} - {total} records
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onPrevious} disabled={isLoading || page <= 1}>
          Previous
        </Button>
        <Button variant="outline" onClick={onNext} disabled={isLoading || page >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
