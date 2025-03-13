import ProjectsTable from "@/components/projects/ProjectsTable";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionContainer from "../shared/SectionContainer";
import AddProjectModal from "./AddProjectModal";
// import AddApiModal from "../apis/ApiAddModal";
// import AddTableModal from "../tables/AddTableModal";

export interface ProjectsProps {
  page: number;
}

const Projects = ({ page }: ProjectsProps) => {
  return (
    <SectionContainer>
      {/* <SectionTitle title="Projects" rightTemplate={<AddApiModal />}/> */}
      <SectionTitle title="Projects" rightTemplate={<AddProjectModal />} />
      <ProjectsTable page={page}/>
    </SectionContainer>
  );
};

export default Projects;
