"use client";

import { publicRoutes } from "@/data/auth.data";
import { WrapperProps } from "@/types/wrapper.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// interface PrivateComponentWrapperProps extends WrapperProps {}

const PrivateComponentWrapper = ({ children, className }: WrapperProps) => {
  const pathname = usePathname();

  const [isPublicRoutes, setIsPublicRoutes] = useState(true);

  useEffect(() => {
    console.log('pathname', pathname)
    setIsPublicRoutes(publicRoutes.includes(pathname));
  }, [pathname]);

  return (
    <section className={` ${isPublicRoutes ? "hidden" : ""} ${className}`}>
      {children}
    </section>
  );
};

export default PrivateComponentWrapper;
