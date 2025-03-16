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
import { Table } from "@/types/tables.types";
import { setTopRowValueOfTable } from "@/store/features/tablesSlice";

const DeleteTableBtn = ({ table }: { table: Table }) => {
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
      const response = await axiosPrivate.delete(`/tables/${table?._id}`);

      if (response.data?.acknowledgement) {
        toast.success("Table Deleted Successfully!");
      }

      await customRevalidateTag(`tables_by_user_page_${page}`);
      dispatch(
        setTopRowValueOfTable({
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
      warningMessage="Deleting this table will disabled all the apis related to it. "
      onConfirmation={(action) => {
        if (action === ConfirmModalBtnEnum.CONFIRM) handleDelete();
      }}
    />
  );
};

export default DeleteTableBtn;
