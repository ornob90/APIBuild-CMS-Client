import { SelectHookFormProps, SelectProps } from "@/types/htmls.types";

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

export const SelectHookForm = ({
  options,
  className,
  optionProps,
  register,
  name,
  registerOptions,
  classNameForWrapper,
  label,
}: SelectHookFormProps) => {
  return (
    <div
      className={` flex ${
        label
          ? "  flex-col gap-y-1"
          : "justify-center items-center bg-lightGray rounded-xl py-[10px] px-3  h-fit"
      } ${classNameForWrapper}`}
    >
      {label && <p>{label}</p>}
      <div
        className={` h-fit ${
          label
            ? "justify-center items-center bg-lightGray rounded-xl py-2 px-3  h-fit"
            : ""
        }`}
      >
        <select
          {...register(name, registerOptions)}
          className={` w-full   bg-lightGray   text-sm   focus:outline-none ${
            label ? "" : ""
          }   ${className}`}
        >
          {options.map((option) => (
            <option key={option.label} className={` ${optionProps?.className}`}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
