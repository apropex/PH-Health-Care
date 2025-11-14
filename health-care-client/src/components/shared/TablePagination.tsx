"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import CustomButton from "../buttons/CustomButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function TablePagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <CustomButton
        icon={ChevronLeft}
        iconClass="size-4"
        variant="outline"
        size="sm"
        disabled={currentPage <= 1 || isPending}
        onClick={() => navigateToPage(currentPage - 1)}
      >
        Previous
      </CustomButton>

      <div className="flex items-center flex-wrap gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber: number;

          if (totalPages <= 5) pageNumber = i + 1;
          else if (currentPage <= 3) pageNumber = i + 1;
          else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i;
          else pageNumber = currentPage - 2 + i;

          return (
            <CustomButton
              key={"page-btn-" + (i + 1)}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size={"icon-sm"}
            >
              {pageNumber}
            </CustomButton>
          );
        })}
      </div>

      <CustomButton
        variant="outline"
        size="sm"
        icon={ChevronRight}
        iconClass="size-4"
        disabled={currentPage === totalPages || isPending}
        onClick={() => navigateToPage(currentPage + 1)}
      >
        Next
      </CustomButton>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
