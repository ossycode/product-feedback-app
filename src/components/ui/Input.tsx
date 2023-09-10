const Input = (...props: any) => {
  return (
    <>
      <label
        htmlFor={props.inputId}
        className="text-dark-grayish-400  text-[1.6rem] font-normal opacity-75"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.holder}
        id={props.inputId}
        className="min-w-[25.5rem] min-h-[4.8rem] rounded-lg bg-ghost-white-100 text-dark-grayish-400 text-[1.5rem] font-normal"
      />
    </>
  );
};

export default Input;
