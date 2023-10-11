"use client";

import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: any = {};

  interface Props {
    sort?: string;
    page?: number;
    cat?: string;
  }
  let sort = searchParams.get("sort");
  let page = searchParams.get("page");
  let cat = searchParams.get("cat");

  if (sort) query.sort = sort;
  if (page) query.page = parseInt(page);
  if (cat) query.cat = cat;

  const pushQuery = ({ sort, page, cat }: Props) => {
    if (sort !== undefined) {
      sort.toLowerCase() === "most upvotes"
        ? delete query.sort
        : (query.sort = sort);
    }

    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }

    if (cat !== undefined) {
      cat === "all" ? delete query.cat : (query.cat = cat);
    }

    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`, { scroll: false });
  };

  return { pushQuery, query };
};

export default useCustomRouter;
