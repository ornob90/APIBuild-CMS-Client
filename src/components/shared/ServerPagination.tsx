"use client";
import React from "react";
import { Pagination } from "@heroui/pagination";
import { usePathname, useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServerPagination = (props?: any) => {

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
