interface Props {
  label: string | undefined;
  error: string | undefined;
  children: any;
}

const FormRow = ({ label, error, children }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {label && (
        <label htmlFor={children.props.id} className="text-[1.6rem]">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[#D73737] text-[1.4rem]">{error}</span>}
    </div>
  );
};

export default FormRow;
