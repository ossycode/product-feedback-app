import { cache } from "react";

export const getFeedbacks = cache(async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // ?sort=${sortby}
  const res = await fetch(`${apiUrl}/api/feedbacks`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
});

export const getFeedback = cache(async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(apiUrl);

  const res = await fetch(`${apiUrl}/api/feedbacks/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
});
