// const btnColour: {
//     color:
// }

const Button = ({ children, btnProps }: any) => {
  return <button className={` rounded-2xl ${btnProps} `}>{children}</button>;
};

export default Button;
