import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <section className=" px-4 py-6 space-y-6">{children}</section>;
};

export default SectionContainer;
