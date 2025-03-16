import React from "react";
import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import AddApiModal from "./ApiAddModal";

const Apis = async () => {
  return (
    <SectionContainer>
      <SectionTitle title="APIs" rightTemplate={<AddApiModal />} />
    </SectionContainer>
  );
};

export default Apis;
