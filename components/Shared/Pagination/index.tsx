import { numberOnly } from "@/utils/helpers";
import { FC, useState } from "react";
import CaretLeft from "../Icons/CaretLeft";
import CaretRight from "../Icons/CaretRight";
import { useRouter } from "next/router";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: number;
  prevPage: number;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) => {
  const router = useRouter();
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="hidden lg:flex items-center gap-0.8 text-2.4">
        <button
          type="button"
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: 1 },
            })
          }
          className="rounded-0.8 hover:bg-black-05 focus:bg-black-05 disabled:cursor-not-allowed text-normal py-0.4 px-0.8 text-black disabled:text-black-20"
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          type="button"
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: totalPages },
            })
          }
          className="rounded-0.8 hover:bg-black-05 focus:bg-black-05 disabled:cursor-not-allowed text-normal py-0.4 px-0.8 text-black disabled:text-black-20"
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      <div className="w-full lg:w-fit flex items-center justify-between lg:justify-start gap-0.8 text-2.4">
        <button
          type="button"
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: prevPage },
            })
          }
          className="w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2 flex items-center justify-center rounded-0.8 hover:bg-black-05 focus:bg-black-05 disabled:cursor-not-allowed [&>svg>path]:disabled:fill-black-20"
          disabled={currentPage === 1}
        >
          <CaretLeft />
        </button>

        {(totalPages <= 4
          ? pages.slice(0, totalPages)
          : pages.slice(
              currentPage + 4 < totalPages ? currentPage - 1 : totalPages - 5,
              currentPage + 4 < totalPages ? currentPage + 4 : totalPages
            )
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page },
              })
            }
            className={`w-2.8 h-2.8 flex items-center justify-center rounded-0.8 hover:bg-black-05 focus:bg-black-05 disabled:cursor-not-allowed text-normal ${
              currentPage === page ? "bg-black-05" : "bg-transparent"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: nextPage },
            })
          }
          className="w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2 flex items-center justify-center rounded-0.8 hover:bg-black-05 focus:bg-black-05 disabled:cursor-not-allowed [&>svg>path]:disabled:fill-black-20"
          disabled={currentPage === totalPages}
        >
          <CaretRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
