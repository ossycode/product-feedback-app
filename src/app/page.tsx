"use client";

import Button from "@/components/ui/button";
import SortButton from "@/components/ui/sortButton";
import SortPopup from "@/components/ui/sortPopup";
import Image from "next/image";
import { categories } from "@/constants/index";
import Header from "@/components/shared/Header";
import MobileNavbar from "@/components/shared/MobileNavbar";
import { useToggleNav } from "@/context/ToggleNavContext";
import SortByDiv from "@/components/ui/SortByDiv";
import FeedbackCard from "@/components/ui/FeedbackCard";
import NoFeedbackCard from "@/components/ui/NoFeedbackCard";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { user } = useUser(email!);

  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen overflow-scroll">
      <Header />
      <div className=" relative">
        <MobileNavbar />

        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/login" onClick={() => signOut()}>
              Logout
            </Link>
          </li>
        </ul>

        <SortByDiv />
      </div>
      <main className="py-[3.2rem] px-[2.4rem] main-body w-full flex flex-col gap-[1.6rem] overflow-scroll">
        <FeedbackCard />
        <FeedbackCard />

        <FeedbackCard />

        <NoFeedbackCard />
      </main>
    </div>
  );
}
