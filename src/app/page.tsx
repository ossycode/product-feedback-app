"use client";

import Button from "@/components/ui/button";
import SortButton from "@/components/ui/sortButton";
import SortPopup from "@/components/ui/sortPopup";
import Image from "next/image";
import { categories } from "@/constants/index";
import Header from "@/components/shared/Header";
import MobileNavbar from "@/components/shared/MobileNavbar";
import { useToggleNav } from "@/context/ToggleNavContext";
import SortByDiv from "@/components/shared/SortByDiv";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-body relative">
        {/* <SortPopup ArrayData={categories} popupProps="" hoverProps="" />

        <SortPopup ArrayData={categories} popupProps="" hoverProps="" /> */}

        <SortByDiv />
        {/* <SortPopup ArrayData={categories} /> */}
        <MobileNavbar />

        {/* <SortPopup>


        <SortButton
          borderR="rounded-tr-2xl"
          border="border-b border-[rgba(58, 67, 116, 0.15)] "
        >
          Feature
        </SortButton>
        <SortButton border="border-b border-[rgba(58, 67, 116, 0.15)] ">
          UI
        </SortButton>
        <SortButton border="border-b border-[rgba(58, 67, 116, 0.15)] ">
          UX
        </SortButton>
        <SortButton border="border-b border-[rgba(58, 67, 116, 0.15)] ">
          Enhancement
        </SortButton>
        <SortButton borderR="rounded-br-2xl">Bug</SortButton>
      </SortPopup> */}
      </main>
    </>
  );
}
