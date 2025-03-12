"use client";
import { publicRoutes } from "@/data/auth.data";
import { WrapperProps } from "@/types/wrapper.types";
import { usePathname } from "next/navigation";
import React from "react";

const BodyWrapper = ({ children, className }: WrapperProps) => {
  const pathname = usePathname();

  const isPublicRoutes = publicRoutes.includes(pathname);

  return (
    <section className={` ${isPublicRoutes ? " w-full" : "w-[80%]"} ${className}`}>
      {children}
    </section>
  );
};

export default BodyWrapper;
