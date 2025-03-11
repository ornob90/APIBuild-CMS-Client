import React from "react";
import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import { Button } from "@heroui/button";
import CopyLink from "../shared/CopyLink";

const Tokens = () => {
  return (
    <SectionContainer>
      <SectionTitle title="Tokens" hideRightSide />
      <section className=" border border-gray-800 p-4 rounded-xl  space-y-8">
        <section className=" flex  justify-between items-center">
          <h3 className=" text-lg">Active Tokens</h3>

          <Button className=" bg-white text-black">Generate Token</Button>
        </section>
        <section className="flex justify-between items-center gap-x-4">
          <div className="flex text-xl relative justify-normal flex-1 items-center py-3 px-3 border border-lightGray rounded-xl w-full">
            <p className=" text-lg">api_</p>
            <p className=" text-lg tracking-widest">.......................</p>

            <div className=" place-self-end w-fit absolute right-4 top-[30%]">
              <CopyLink>Links to be copies</CopyLink>
            </div>
          </div>

          <Button className="     bg-red-500 text-white" variant="faded">
            Deactive
          </Button>
        </section>
      </section>
    </SectionContainer>
  );
};

export default Tokens;
