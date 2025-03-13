"use client";
import React, { ReactNode } from "react";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { PiWarningCircle } from "react-icons/pi";
import { Button } from "@heroui/button";
import { ConfirmModalBtnEnum } from "@/types/globals.types";

export interface ConfirmDeleteModelProps {
  warningMessage: string;
  isConfirmLoad: boolean;
  btnTemplate: ReactNode;
  onConfirmation: (action: ConfirmModalBtnEnum) => void;
}

const ConfirmDeleteModel = ({
  warningMessage,
  isConfirmLoad,
  btnTemplate,
  onConfirmation,
}: ConfirmDeleteModelProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{btnTemplate}</div>
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
                  onPress={() => onConfirmation(ConfirmModalBtnEnum.CONFIRM)}
                  className=" rounded-lg bg-lightGray text-white"
                  isLoading={isConfirmLoad}
                >
                  Confirm
                </Button>
                <Button
                  disabled={isConfirmLoad}
                  onPress={() => {
                    onConfirmation(ConfirmModalBtnEnum.CANCEL);
                    onOpenChange()
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
