"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import MiniSpinner from "./MiniSpinner";
import toast from "react-hot-toast";

interface Props {
  currentUser: any;
  classList: string;
}

const ProfileAvatar = ({ currentUser, classList }: Props) => {
  const [files, setFiles] = useState<File>();
  const { startUpload } = useUploadThing("profileImage");
  const [avatar, setAvater] = useState<string | undefined>(currentUser.avatar);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const currentDateString = formatDateString(currentUser?.createdAt);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        setIsUploading(true);
        const file = e.target.files[0];
        const maxSizeInBytes = 4 * 1024 * 1024;

        if (file && file.size > maxSizeInBytes) {
          toast.error("File size exceeds the maximum allowed size (4MB).");
          setFiles(undefined);
          setIsUploading(false);
          throw new Error("File size exceeds the maximum allowed size (4MB).");
        } else {
          setFiles(file);
          const imgResponse = await startUpload([file!]);
          setAvater(imgResponse?.[0].url);
          const res = await fetch(`/api/users/${currentUser.username}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar: imgResponse?.[0].url,
            }),
          });
        }
      }
      setFiles(undefined);
      setIsUploading(false);
    } catch (err: Error | any) {
      console.log(`${err.code}: Error update creation`);
    } finally {
      setFiles(undefined);
      setIsUploading(false);
    }
  };

  return (
    //
    <section
      className={` bg-clr-white text-dark-grayish-400 flex-col w-[80%] md:w-[40%] lg:w-[30%]  py-16 gap-10 items-center rounded-lg md:flex ${classList}`}
    >
      <h1 className="text-heading3 md:text-heading1">{currentUser?.name}</h1>
      <p className="text-[1.3rem] md:text-[1.4rem] font-normal mt-[-2.50rem]">
        @{currentUser?.username}
      </p>
      <Image
        src={avatar || "/assets/default-user.jpg"}
        alt="profile photo"
        width={100}
        height={100}
        className="rounded-full aspect-[1] object-center	object-cover"
      />
      <div className="relative cursor-pointer ">
        <button
          className="bg-light-purple-500 w-[15rem] py-4 px-4  md:py-3.5 md:px-10 font-bold  text-ghost-white-100 text-[1.3rem] rounded-lg "
          disabled={isUploading}
        >
          {isUploading ? (
            <MiniSpinner />
          ) : (
            <span> {files?.name ? files.name : "Change Picture"}</span>
          )}
        </button>
        <input
          type="file"
          name="file"
          accept="images/*"
          className="absolute left-0 opacity-0"
          onChange={(e) => handleImageUpload(e)}
        />
      </div>

      <p className="bg-light-purple-100 rounded-lg p-4 shadow-inner text-center">
        Upload a new avatar
        <br />
        Maximum upload size is <b>4 MB</b>
      </p>

      <p>
        Member Since:{" "}
        <span className="font-semibold " suppressHydrationWarning>
          {currentDateString}
        </span>
      </p>
    </section>
  );
};

export default ProfileAvatar;
