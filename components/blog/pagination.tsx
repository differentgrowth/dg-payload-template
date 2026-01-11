import Link from "next/link";

import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  className?: string;
}

export const BlogPagination = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPrevPage,
  className,
}: Props) => {
  if (totalPages < 2) {
    return null;
  }

  return (
    <Card className={className}>
      <Pagination>
        <PaginationContent className="p-1">
          <PaginationItem>
            <Button
              disabled={currentPage === 1}
              render={<Link href="/blog" />}
              variant="ghost"
            >
              <HugeiconsIcon className="size-4" icon={ArrowLeftDoubleIcon} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={!hasPrevPage}
              render={<Link href={`/blog/${currentPage - 1}`} />}
              variant="ghost"
            >
              <HugeiconsIcon className="size-4" icon={ArrowLeft01Icon} />
            </Button>
          </PaginationItem>

          {hasPrevPage ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <Button
              disabled={hasPrevPage}
              render={<Link href={`/blog/${currentPage - 1}`} />}
              variant="ghost"
            >
              {hasPrevPage ? currentPage - 1 : "1"}
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button render={<span />} variant="ghost">
              {currentPage}
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={hasNextPage}
              render={<Link href={`/blog/${currentPage + 1}`} />}
              variant="ghost"
            >
              {hasNextPage ? currentPage + 1 : totalPages}
            </Button>
          </PaginationItem>

          {hasNextPage ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <Button
              disabled={!hasPrevPage}
              render={<Link href={`/blog/${currentPage - 1}`} />}
              variant="ghost"
            >
              <HugeiconsIcon className="size-4" icon={ArrowRight01Icon} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              render={<Link href={`/blog/${totalPages}`} />}
              variant="ghost"
            >
              <HugeiconsIcon className="size-4" icon={ArrowRightDoubleIcon} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
};
