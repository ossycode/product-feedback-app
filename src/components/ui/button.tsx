// const btnColour: {
//     color:
// }
"use client";

const Button = ({ children, btnProps }: any) => {
  return (
    <button className={` rounded-2xl ${btnProps} `} type="submit">
      {children}
    </button>
  );
};

export default Button;
