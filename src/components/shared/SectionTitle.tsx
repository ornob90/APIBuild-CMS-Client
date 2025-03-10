import { Button, PressEvent } from "@heroui/button";
import React, { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  className?: string;
  classNameForHeader?: string;
  btnText?: string;
  rightTemplate?: ReactNode;
  onBtnClick?: ((e: PressEvent) => void) | undefined
}

const SectionTitle = ({
  title,
  btnText,
  className,
  classNameForHeader,
  onBtnClick,
  rightTemplate
}: SectionTitleProps) => {
  return (
    <section className={`px-4 flex  justify-between items-center ${className}`}>
      <h1 className={` ${classNameForHeader}`}>{title}</h1>
      {rightTemplate ? (
        rightTemplate
      ) : (
        <Button onPress={onBtnClick}>{btnText}</Button>
      )}
    </section>
  );
};

export default SectionTitle;
