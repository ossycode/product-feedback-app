import { notFound } from "next/navigation";

export async function getServerUser(username: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/users/${username}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}
