import Comment from "./Comment";

const Replies = ({ data, commentId }: any) => {
  return (
    <>
      {data?.replies.length > 0 && (
        <div className="flex items-start gap-9  w-full mt-[1.6rem] md:pl-8 md:gap-[2.4rem]">
          <div className="rounded-2xl bg-comment-divide w-0.5 h-[21.6rem] md:h-[27rem] md:-translate-y-36"></div>

          <div className="flex items-start flex-col gap-[2.6rem] grow">
            {data?.replies.map((element: any) => (
              <Comment
                key={element._id}
                content={element.content}
                username={element.author.username}
                name={element.author.name}
                userImage={element.author.avatar}
                commentId={commentId}
                replyingTo={element.replyingTo}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Replies;
