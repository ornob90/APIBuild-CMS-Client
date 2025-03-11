/* eslint-disable @typescript-eslint/no-explicit-any */
import { FocusEventHandler, ReactNode } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface ButtonProps {
  children: ReactNode;
}

export interface EventTypes {
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

export interface CommonInputProps extends EventTypes {
  type?: string;
  defaultValue?: string;
  label?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined" | undefined;
}

export interface PasswordProps extends CommonInputProps {
  className?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions<any, "password">;
  isInvalid?: boolean;
  errorMessage?: string;
}

export type Option = {
  label: string;
  value: string;
};

interface OptionProps {
  className: string;
}

export interface SelectProps extends EventTypes {
  options: Option[];
  className?: string;
  optionProps?: OptionProps;
}

export interface SelectHookFormProps extends EventTypes {
  options: Option[];
  className?: string;
  classNameForWrapper?: string;
  optionProps?: OptionProps;
  // register: any;
  // registerOptions?: RegisterOptions;
  name: string;
  label?: string | ReactNode;
  value: string
}
