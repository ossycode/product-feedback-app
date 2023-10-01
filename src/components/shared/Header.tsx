"use client";

import { useToggleNav } from "@/context/ToggleNavContext";
import Image from "next/image";

const Header = () => {
  const { isNavOpen, toggleNavbar } = useToggleNav();

  return (
    <header
      className="flex items-center justify-between px-6 py-4 sm:px-9 sm:py-5
     mobileHeader md:hidden w-full"
    >
      <div>
        <h1 className="text-clr-white tracking-[-0.0187rem] text-[1.5rem]">
          Frontend Mentor
        </h1>
        <h2 className="text-clr-white text-[1.3rem] font-medium	opacity-75	">
          Feedback Board
        </h2>
      </div>

      <button onClick={toggleNavbar}>
        {!isNavOpen ? (
          <Image
            src={"/assets/shared/mobile/icon-hamburger.svg"}
            alt="open nav menu"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src={"/assets/shared/mobile/icon-close.svg"}
            alt="close nav menu"
            width={20}
            height={20}
          />
        )}
      </button>
    </header>
  );
};

export default Header;
