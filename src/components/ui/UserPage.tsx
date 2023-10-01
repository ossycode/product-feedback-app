"use client";

import React, { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";

const UserPage = ({ currentUser }: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="mt-8 flex flex-col">
      <div className="md:hidden w-[70%] self-center ">
        <ul className="flex items-center justify-between  text-roadmap-list border-b-2 border-comment-divide text-heading5 min-h-[5.9rem] ">
          <li
            className={`border-b-4 min-h-[5.9rem] flex items-center gap-1  ${
              activeTab === 0
                ? "text-dark-grayish-400  border-light-purple-500"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Profile Picture
          </li>
          <li
            className={` border-b-4 min-h-[5.9rem] flex items-center gap-1 
        ${
          activeTab === 1
            ? "text-dark-grayish-400 border-light-purple-500"
            : "border-transparent"
        }`}
            onClick={() => setActiveTab(1)}
          >
            Profile Details
          </li>
        </ul>
      </div>

      <div className=" bg-light-purple-100 flex md:items-center py-10 justify-center md:justify-between">
        <ProfileAvatar
          currentUser={currentUser}
          classList={`${
            activeTab === 0 ? "flex items-center justify-center" : "hidden"
          }`}
        />
        <ProfileDetails
          currentUser={currentUser}
          classList={`${
            activeTab === 1 ? "flex items-center justify-center " : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default UserPage;
