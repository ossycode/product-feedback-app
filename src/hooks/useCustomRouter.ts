"use client";

import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: any = {};

  interface Props {
    sort?: string;
    page?: number;
  }
  let sort = searchParams.get("sort");
  let page = searchParams.get("page");

  if (sort) query.sort = sort;

  if (page) query.page = parseInt(page);

  const pushQuery = ({ sort, page }: Props) => {
    if (sort !== undefined) {
      sort === "Most Upvotes" ? delete query.sort : (query.sort = sort);
    }

    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }

    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`, { scroll: false });
  };

  return { pushQuery, query };
};

export default useCustomRouter;
