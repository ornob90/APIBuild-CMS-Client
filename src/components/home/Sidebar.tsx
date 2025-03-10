import { sidebarTabs } from "@/data/home.data";
import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <section className=" border-r py-4 flex  flex-col justify-between items-center border-r-gray-600  h-screen fixed left-0 top-0 w-[20%]  gap-y-4 ">
      <ul className=" h-fit  flex flex-col         w-full">
        {sidebarTabs.map((tab, index) => (
          <Link
            href={tab.href}
            key={tab.tab}
            className={`border-b hover:cursor-pointer flex items-center gap-x-2 py-4 px-4 hover:bg-[#101010] duration-200  ${
              index === 0
                ? ""
                : index === sidebarTabs.length - 1
                ? "  border-b-gray-400"
                : ""
            }`}
          >
            {tab.icon} {tab.tab}
          </Link>
        ))}
      </ul>
      <section className=" px-4 w-full">
        <Button className=" w-full bg-white text-black">Logout</Button>
      </section>
    </section>
  );
};

export default Sidebar;
