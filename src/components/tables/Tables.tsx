import SectionContainer from "../shared/SectionContainer";
import SectionTitle from "../shared/SectionTitle";
import AddTableModal from "./AddTableModal";

const Tables = () => {
  return (
    <SectionContainer>
      <SectionTitle title="Tables" rightTemplate={<AddTableModal />} />
    </SectionContainer>
  );
};

export default Tables;
