"use server";

import { getToken, validateSession } from "@/libs/auth.libs";
import { ApiStatus, ServerActionState } from "@/types/globals.types";
import { Project } from "@/types/projects.types";
import { revalidateTag } from "next/cache";

export const getProjectsByUser = async (): Promise<Project[]> => {
  const token = await getToken();

  if (!token) {
    throw new Error("User No Logged IN");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await fetch(process.env.SERVER_BASE_URL! + "/projects", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["projects-by-user"],
    },
  });

  const responseData = await response.json();

  //   console.log(responseData)

  if (responseData?.acknowledgement) {
    return responseData.data;
  }

  return [];
};

export const createProject = async (
  prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> => {
  const projectName = formData.get("projectName");

  const token = await validateSession();
  console.log("projectName", projectName);
  const response = await fetch(process.env.SERVER_BASE_URL! + "/projects", {
    method: "POST",
    body: JSON.stringify({ projectName }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  if (responseData?.acknowledgement) {
    revalidateTag("projects-by-user");
    return {
      message: "Project Created Successfully",
      status: ApiStatus.FINISH,
    };
  }

  return { message: "Failed to create a project", status: ApiStatus.ERROR };
};
