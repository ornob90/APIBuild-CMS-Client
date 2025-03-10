import React from "react";
import Select from "./Select";
import { projects } from "../projects/ProjectsTable";
import { Option, SelectProps } from "@/types/htmls.types";

interface ProjectsSelectProps extends Omit<SelectProps, "options"> {
  options?: Option[];
}

const ProjectsSelect = (props: ProjectsSelectProps) => {
  const projectsOptions = projects.map((project) => ({
    label: project.projectName,
    value: project.projectName,
  }));

  return (
    <Select
      {...props}
      options={projectsOptions}
      //   className="col-span-2"
    />
  );
};

export default ProjectsSelect;
