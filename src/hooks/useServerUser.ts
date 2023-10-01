import { notFound } from "next/navigation";

export async function getServerUser(username: string) {
  const res = await fetch(`http://localhost:3000/api/users/${username}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

// export const getFeedbacks = cache(async () => {
//   // ?sort=${sortby}
//   const res = await fetch(`http://localhost:3000/api/feedbacks`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// });
