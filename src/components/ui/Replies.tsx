import AddReplyForm from "../form/AddReplyForm";
import Comment from "./Comment";

const Replies = ({ comment, toggleForm }: any) => {
  return (
    <>
      {comment?.replies.length > 0 && (
        <div className="flex items-start gap-9  w-full md:gap-[2.4rem] row-start-3 col-start-1 col-span-full	pl-[2.4rem] mt-[1.6rem] md:pl-[4.4rem] ">
          <div className="flex items-start flex-col gap-[2.6rem] grow">
            {comment?.replies.map((element: any) => (
              <Comment
                key={element._id}
                content={element.content}
                username={element.author.username}
                name={element.author.name}
                userImage={element.author.avatar}
                replyingTo={element.replyingTo}
                toggleForm={toggleForm}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Replies;
