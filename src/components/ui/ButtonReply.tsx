"use client";

interface Props {
  toggleForm: (commentUser: string) => void;
  commentUser: string;
}

const ButtonReply = ({ toggleForm, commentUser }: Props) => {
  function handleClick() {
    toggleForm(commentUser);
  }

  return (
    <button
      className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1 justify-self-end "
      data-id={commentUser}
      onClick={() => handleClick()}
    >
      Reply
    </button>
  );
};

export default ButtonReply;
