import { Button, PressEvent } from "@heroui/button";
import React, { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  className?: string;
  classNameForHeader?: string;
  btnText?: string;
  rightTemplate?: ReactNode;
  hideRightSide?: boolean;
  onBtnClick?: ((e: PressEvent) => void) | undefined;
}

const SectionTitle = ({
  title,
  btnText,
  className,
  classNameForHeader,
  onBtnClick,
  rightTemplate,
  hideRightSide,
}: SectionTitleProps) => {
  return (
    <section className={`px-4 flex  justify-between items-center ${className}`}>
      <h1 className={` ${classNameForHeader}`}>{title}</h1>
      {!hideRightSide && (
        <>
          {rightTemplate ? (
            rightTemplate
          ) : (
            <Button onPress={onBtnClick}>{btnText}</Button>
          )}
        </>
      )}
    </section>
  );
};

export default SectionTitle;
