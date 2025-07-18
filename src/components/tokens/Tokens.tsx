import React from "react";
import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import CopyLink from "../shared/CopyLink";
import GenerateTokenBtn from "../shared/GenerateTokenBtn";
import { getUserToken } from "@/utils/tokens.utils";
import ActiveDeactiveBtn from "./ActiveDeactiveBtn";

const Tokens = async () => {
  const tokens = await getUserToken();

  return (
    <SectionContainer>
      <SectionTitle title="Tokens" hideRightSide />
      <section className=" border border-gray-800 p-4 rounded-xl  space-y-8">
        <section className=" flex  justify-between items-center">
          <h3 className=" text-lg">Active Tokens</h3>

          <GenerateTokenBtn />
        </section>
        <section className=" flex flex-col gap-y-4">
          {tokens.map((token) => (
            <section
              key={token._id}
              className="flex justify-between items-center gap-x-4"
            >
              <div className="flex text-xl relative justify-normal flex-1 items-center py-3 px-3 border border-lightGray rounded-xl w-full">
                <p className=" text-lg">api_</p>
                <p className=" text-lg tracking-widest">
                  .......................
                </p>

                <div className=" place-self-end w-fit absolute right-4 top-[30%]">
                  <CopyLink>{token.token}</CopyLink>
                </div>
              </div>

              <ActiveDeactiveBtn
                tokenId={token?._id}
                initialIsActive={token?.active}
              />
            </section>
          ))}
        </section>
      </section>
    </SectionContainer>
  );
};

export default Tokens;
