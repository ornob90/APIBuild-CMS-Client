/* eslint-disable @typescript-eslint/no-explicit-any */
import { FocusEventHandler, ReactNode } from "react";
import {  RegisterOptions, UseFormRegister } from "react-hook-form";

export interface ButtonProps {
  children: ReactNode;
}

export interface EventTypes {
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
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
  isInvalid?: boolean,
  errorMessage?: string
}
