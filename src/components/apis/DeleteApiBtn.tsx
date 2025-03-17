"use client";
import React, { useState } from "react";
import ConfirmDeleteModel from "../shared/ConfirmDeleteModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { ApiStatus, ConfirmModalBtnEnum } from "@/types/globals.types";
import { useAxios } from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { customRevalidateTag } from "@/utils/globals.utils";
import { useDispatch } from "react-redux";
import { Api } from "@/types/apis.types";
import { setTopRowValueOfApis } from "@/store/features/apiSlice";

const DeleteApiBtn = ({ api }: { api: Api }) => {
  // package and custom hooks
  const axiosPrivate = useAxios();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // states
  const [deleteStatus, setDeleteStatus] = useState<ApiStatus>(ApiStatus.IDLE);

  // constants
  const page = searchParams.get("page") ?? "1";

  const handleDelete = async () => {
    try {
      setDeleteStatus(ApiStatus.PENDING);
      const response = await axiosPrivate.delete(`/apis/${api?._id}`);

      if (response.data?.acknowledgement) {
        toast.success("Api Deleted Successfully!");
      }

      await customRevalidateTag(`apis_by_user_page_${page}`);
      dispatch(
        setTopRowValueOfApis({
          fetchStatus: ApiStatus.IDLE,
        })
      );

      setDeleteStatus(ApiStatus.FINISH);
    } catch {
      setDeleteStatus(ApiStatus.ERROR);
    }
  };

  return (
    <ConfirmDeleteModel
      btnTemplate={<RiDeleteBinLine className=" text-red-500" />}
      isConfirmLoad={deleteStatus === ApiStatus.PENDING}
      warningMessage="Are you sure you want to delete this api? You can't revert the changes."
      onConfirmation={(action) => {
        if (action === ConfirmModalBtnEnum.CONFIRM) handleDelete();
      }}
    />
  );
};

export default DeleteApiBtn;
