"use client";
import React, { useState } from "react";
import ConfirmDeleteModel from "../shared/ConfirmDeleteModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { Project } from "@/types/projects.types";
import { ApiStatus, ConfirmModalBtnEnum } from "@/types/globals.types";
import { useAxios } from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { customRevalidateTag } from "@/utils/globals.utils";

const DeleteProjectBtn = ({ project }: { project: Project }) => {
  // package and custom hooks
  const axiosPrivate = useAxios();
  const searchParams = useSearchParams();

  // states
  const [deleteStatus, setDeleteStatus] = useState<ApiStatus>(ApiStatus.IDLE);

  // constants
  const page = searchParams.get("page") ?? "1";

  const handleDelete = async () => {
    try {
      setDeleteStatus(ApiStatus.PENDING);
      const response = await axiosPrivate.delete(`/projects/${project?._id}`);

      if (response.data?.acknowledgement) {
        toast.success("Project Deleted Successfully!");
      }

      await customRevalidateTag(`projects-by-user_page_${page}`);

      setDeleteStatus(ApiStatus.FINISH);
    } catch {
      setDeleteStatus(ApiStatus.ERROR);
    }
  };

  return (
    <ConfirmDeleteModel
      btnTemplate={<RiDeleteBinLine className=" text-red-500" />}
      isConfirmLoad={deleteStatus === ApiStatus.PENDING}
      warningMessage="Deleting this project will disabled all the apis related to it. "
      onConfirmation={(action) => {
        if (action === ConfirmModalBtnEnum.CONFIRM) handleDelete();
      }}
    />
  );
};

export default DeleteProjectBtn;
