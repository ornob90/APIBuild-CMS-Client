import ProjectsTable from "@/components/projects/ProjectsTable";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionContainer from "../shared/SectionContainer";
import AddProjectModal from "./AddProjectModal";
import AddApiModal from "../apis/ApiAddModal";

const Projects = () => {
  return (
    <SectionContainer>
      <SectionTitle title="Projects" rightTemplate={<AddApiModal />}/>
      <ProjectsTable />
    </SectionContainer>
  );
};

export default Projects;
