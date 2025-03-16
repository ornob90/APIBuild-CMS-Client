import ProjectsTable from "@/components/projects/ProjectsTable";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionContainer from "../shared/SectionContainer";
import AddProjectModal from "./AddProjectModal";
import { getProjectsByUser } from "@/utils/projects.utils";
import { Project } from "@/types/projects.types";
import DeleteProjectBtn from "./DeleteProjectBtn";

export interface ProjectsProps {
  page: number;
}

const Projects = async ({ page }: ProjectsProps) => {
  const limit = 10;
  const {
    projects: userProjects,
    totalPages,
    total,
  } = await getProjectsByUser(page, limit);

  const projects =
    userProjects?.map((project: Project, idx) => ({
      rowNumber: `${idx + 1}`,
      action: <DeleteProjectBtn project={project} />,
      ...project,
    })) || [];

  const haveProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <SectionContainer>
      {/* <SectionTitle title="Projects" rightTemplate={<AddApiModal />}/> */}
      <SectionTitle
        title="Projects"
        rightTemplate={<AddProjectModal />}
        hideRightSide={!haveProjects}
      />
      <ProjectsTable
        page={page}
        projects={projects}
        haveProjects={haveProjects}
        total={total || 0}
        totalPages={totalPages || 0}
        limit={limit}
      />
    </SectionContainer>
  );
};

export default Projects;
