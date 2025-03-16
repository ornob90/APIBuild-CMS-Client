"use client";
import { ApiStatus } from "@/types/globals.types";
import React from "react";
import FullScreenLoading from "./FullScreenLoading";
import useGetUsersFullInfo from "@/hooks/useGetUsersFullInfo";

interface SectionContainerProps {
  children: React.ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  const { fetchStatus } = useGetUsersFullInfo();

  if (fetchStatus === ApiStatus.IDLE) {
    return <FullScreenLoading />;
  }

  return <section className=" px-4 py-6 space-y-6">{children}</section>;
};

export default SectionContainer;
