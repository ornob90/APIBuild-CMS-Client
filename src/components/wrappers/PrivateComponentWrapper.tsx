"use client";

import { publicRoutes } from "@/data/auth.data";
import { WrapperProps } from "@/types/wrapper.types";
import { usePathname } from "next/navigation";


// interface PrivateComponentWrapperProps extends WrapperProps {}

const PrivateComponentWrapper = ({
  children,
  className,
}: WrapperProps) => {
  const pathname = usePathname();

  const isPublicRoutes = publicRoutes.includes(pathname);

  return (
    <section className={` ${isPublicRoutes ? "hidden" : ""} ${className}`}>
      {children}
    </section>
  );
};

export default PrivateComponentWrapper;
