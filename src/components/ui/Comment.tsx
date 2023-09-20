import Image from "next/image";
import React, { useState } from "react";
import AddReplyForm from "../form/AddReplyForm";

const Comment = () => {
  const [openReply, setOpenReply] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-[1.6rem] py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image
            src={"/assets/default-user.jpg"}
            alt="user prorfile"
            width={40}
            height={40}
          />
          <p className="text-heading5 text-dark-grayish-400 ">
            Elijah Moss
            <span className="block font-normal text-light-gray-200">
              @hexago.bestagon
            </span>
          </p>
        </div>
        <button
          className="text-dark-blue border-none font-semibold text-[1.3rem]"
          onClick={() => setOpenReply((openReply) => !openReply)}
        >
          Reply
        </button>
      </div>
      <p className="text-light-gray-200 text-[1.3rem]">
        Also, please allow styles to be applied based on system preferences. I
        would love to be able to browse Frontend Mentor in the evening after my
        device’s dark mode turns on without the bright background it currently
        has.
      </p>
      {openReply && <AddReplyForm />}
    </div>
  );
};

export default Comment;
