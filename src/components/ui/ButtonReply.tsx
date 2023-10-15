"use client";

interface Props {
  toggleForm: () => void;
}

const ButtonReply = ({ toggleForm }: Props) => {
  const handleReplyForm = () => {};

  return (
    <button
      className="text-dark-blue border-none font-semibold text-[1.3rem] hover:underline hover:underline-offset-2 hover:decoration-1 justify-self-end "
      onClick={toggleForm}
    >
      Reply
    </button>
  );
};

export default ButtonReply;
