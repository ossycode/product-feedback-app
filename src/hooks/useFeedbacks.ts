import { cache } from "react";

export const getFeedbacks = cache(async () => {
  // ?sort=${sortby}
  const res = await fetch(`http://localhost:3000/api/feedbacks`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
});

export const getFeedback = cache(async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/feedbacks/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
});
