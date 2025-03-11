import ProjectsTable from "@/components/projects/ProjectsTable";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionContainer from "../shared/SectionContainer";
// import AddProjectModal from "./AddProjectModal";
import AddApiModal from "../apis/ApiAddModal";
// import AddTableModal from "../tables/AddTableModal";

const Projects = () => {
  return (
    <SectionContainer>
      {/* <SectionTitle title="Projects" rightTemplate={<AddApiModal />}/> */}
      <SectionTitle title="Projects" rightTemplate={<AddApiModal />} />
      <ProjectsTable />
    </SectionContainer>
  );
};

export default Projects;
