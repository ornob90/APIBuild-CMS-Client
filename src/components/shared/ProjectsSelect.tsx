import React from "react";
import Select from "./Select";
import { Option, SelectProps } from "@/types/htmls.types";
import { useAppSelector } from "@/store/store-hooks";

interface ProjectsSelectProps extends Omit<SelectProps, "options"> {
  options?: Option[];
}

const ProjectsSelect = (props: ProjectsSelectProps) => {
  const { projects } = useAppSelector((state) => state.project);

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
