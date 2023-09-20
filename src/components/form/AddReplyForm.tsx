import FormRow from "../ui/FormRow";

const AddReplyForm = () => {
  return (
    // <div className="p-[2.4rem] bg-clr-white">

    // </div>
    <form className="flex items-start justify-between">
      <label
        htmlFor="reply"
        className="text-heading3 text-dark-grayish-400  min-h-[8rem] sm:min-w-[70%] md:min-w-[80%]"
      >
        <textarea
          id="reply"
          className="signupform-input min-w-full  text-[1.3rem]"
          //   placeholder="Type your comment here"
        />
      </label>

      <button className="bg-light-purple-500 new-form-btn py-3 sm:px-3 text-heading5 leading-normal md:px-9 md:py-5  ">
        Post Reply
      </button>
    </form>
  );
};

export default AddReplyForm;
