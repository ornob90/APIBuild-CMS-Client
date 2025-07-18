"use client";

import React, { useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { ApiStatus, ConfirmModalBtnEnum } from "@/types/globals.types";
import ConfirmDeleteModel from "../shared/ConfirmDeleteModal";


interface ActiveDeactiveBtnProps {
  tokenId: string;
  initialIsActive: boolean;
}

const ActiveDeactiveBtn = ({
  tokenId,
  initialIsActive,
}: ActiveDeactiveBtnProps) => {
  // package and custom hooks
  const axiosInstance = useAxios({ isPrivate: true });

  // states
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.IDLE);
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(initialIsActive); // Active status from props

  const handleToggleActivation = async () => {
    setApiStatus(ApiStatus.PENDING);
    setCloseModal(false);
    try {
      const response = await axiosInstance.patch(
        `/tokens/${tokenId}/activation`,
        {
          isActive: !isActive,
        }
      );
      setApiStatus(ApiStatus.FINISH);
      setIsActive(response.data?.data?.isActive);
      
    //   customRevalidateTag("tokens_by_user_page");
    } catch (error) {
      console.error("Failed to toggle token activation:", error);
      setApiStatus(ApiStatus.ERROR);
    } finally {
      setCloseModal(true);
    }
  };

  const handleConfirmation = (action: ConfirmModalBtnEnum) => {
    if (action === ConfirmModalBtnEnum.CONFIRM) {
      handleToggleActivation();
    }
    // No action needed for CANCEL, as modal will close automatically
  };

  console.log("isActive", isActive)

  return (
    <ConfirmDeleteModel
      warningMessage={`Are you sure you want to ${
        isActive ? "deactivate" : "activate"
      } this token?`}
      isConfirmLoad={apiStatus === ApiStatus.PENDING}
      btnTemplate={
        <button
          type="submit"
          className={`text-white w-[120px]  ${
            isActive ? "bg-red-500" : "bg-green-500"
          } px-5 text-sm py-3 rounded-xl`}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      }
      onConfirmation={handleConfirmation}
      closeModal={closeModal}
    />
  );
};

export default ActiveDeactiveBtn;
