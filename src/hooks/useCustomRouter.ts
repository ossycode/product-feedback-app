"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query: any = {};

  interface Props {
    sort: string;
  }
  let sort = searchParams.get("sort");

  if (sort) query.sort = sort;

  const pushQuery = ({ sort }: Props) => {
    if (sort !== undefined) {
      sort === "Most Upvotes" ? delete query.sort : (query.sort = sort);
    }

    const newQuery = new URLSearchParams(query).toString();

    router.push(`${pathname}?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useCustomRouter;
