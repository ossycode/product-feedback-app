const AddCommentForm = () => {
  return (
    <div className="p-[2.4rem] bg-clr-white">
      <form>
        <label
          htmlFor="comment"
          className="text-heading3 text-dark-grayish-400"
        >
          Add Comment
          <textarea
            id="comment"
            className="signupform-input	mt-6 min-w-full min-h-[12rem] text-[1.3rem]"
            placeholder="Type your comment here"
          />
        </label>

        <div className="flex items-center justify-between mt-6">
          <span className="text-[1.3rem] text-light-gray-200">
            250 Character left
          </span>
          <button className="bg-light-purple-500 new-form-btn ">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
