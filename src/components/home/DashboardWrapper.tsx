/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname !== "/") {
      router.push("/");
    }
  }, []);

  return children;
};

export default DashboardWrapper;
