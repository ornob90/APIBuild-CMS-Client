"use client";
import React from "react";
import { Pagination, PaginationProps } from "@heroui/pagination";
import { usePathname, useRouter } from "next/navigation";

const ServerPagination = (props?: PaginationProps) => {

  const router = useRouter();
  const pathname = usePathname();

  // const route = 

  return (
    <section className=" w-full flex justify-center items-center">
      <Pagination
        onChange={(page) => router.push(`${pathname}?page=${page}`)}
        showControls
        {...props}
      />
    </section>
  );
};

export default ServerPagination;
