import React, { ReactNode } from "react";

export interface NoDataUI {
  createBtnText?: string;
  createBtnIcon?: ReactNode;
  createTemplate: ReactNode;
}

const NoDataUI = ({ createTemplate }: NoDataUI) => {
  return (
    <section className=" h-[80vh] min-h-[300px] w-full flex justify-center items-center">
      {createTemplate}
    </section>
  );
};

export default NoDataUI;
