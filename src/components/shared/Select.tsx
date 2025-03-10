import { SelectProps } from "@/types/htmls.types";

const Select = ({ options, className, optionProps, onChange }: SelectProps) => {
  return (
    <div className="bg-lightGray px-3 rounded-xl py-[10px] h-fit flex justify-center items-center">
      <select
        onChange={onChange}
        className={` w-full   bg-lightGray   text-sm   focus:outline-none   ${className}`}
      >
        {options.map((option) => (
          <option key={option.label} className={` ${optionProps?.className}`}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
