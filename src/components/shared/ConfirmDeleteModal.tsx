/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { ReactNode, useEffect } from "react";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { PiWarningCircle } from "react-icons/pi";
import { Button } from "@heroui/button";
import { ConfirmModalBtnEnum } from "@/types/globals.types";

export interface ConfirmDeleteModelProps {
  warningMessage: string;
  isConfirmLoad: boolean;
  btnTemplate: ReactNode;
  onConfirmation: (action: ConfirmModalBtnEnum) => void;
  closeModal?: boolean;
}

const ConfirmDeleteModel = ({
  warningMessage,
  isConfirmLoad,
  btnTemplate,
  onConfirmation,
  closeModal,
}: ConfirmDeleteModelProps) => {
  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (closeModal && isOpen) onOpenChange();
  }, [closeModal]);

  return (
    <>
      <div
        onClick={() => {
          console.log("CLICKED");
          onOpenChange();
        }}
      >
        {btnTemplate}
      </div>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <section className="flex flex-col text-white justify-center gap-y-4 items-center h-[40vh] min-h-[200px] max-h-[350px] p-4">
              <PiWarningCircle className=" text-red-500   text-[7vw]" />
              <p className=" text-white font-medium text-center">
                {warningMessage}
              </p>
              <div className="flex w-full justify-center gap-x-2">
                <Button
                  disabled={isConfirmLoad}
                  onPress={async () => {
                    onConfirmation(ConfirmModalBtnEnum.CONFIRM);
                  }}
                  className=" rounded-lg bg-white text-darkGray  font-medium"
                  isLoading={isConfirmLoad}
                >
                  Confirm
                </Button>
                <Button
                  disabled={isConfirmLoad}
                  onPress={() => {
                    onConfirmation(ConfirmModalBtnEnum.CANCEL);
                    onOpenChange();
                  }}
                  className=" rounded-lg  bg-red-500 text-white"
                >
                  Cancel
                </Button>
              </div>
            </section>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModel;
