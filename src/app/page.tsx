"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const { data: session } = useSession();
  // const email = session?.user?.email;
  // const { user } = useUser(email!);

  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return;
  // <div className="min-h-screen overflow-scroll">
  //   <Header />
  //   <div className=" relative">
  //     <MobileNavbar />

  //     <ul>
  //       <li>
  //         <Link href="/login">Login</Link>
  //       </li>
  //       <li>
  //         <Link href="/login" onClick={() => signOut()}>
  //           Logout
  //         </Link>
  //       </li>
  //     </ul>

  //     <SortByDiv />
  //   </div>
  //   <main className="py-[3.2rem] px-[2.4rem] main-body w-full flex flex-col gap-[1.6rem] overflow-scroll">
  //     <FeedbackCard />
  //     <FeedbackCard />

  //     <FeedbackCard />

  //     <NoFeedbackCard />
  //   </main>
  // </div>
}
