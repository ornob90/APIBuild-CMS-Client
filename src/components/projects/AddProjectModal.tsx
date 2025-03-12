"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import Label from "../shared/Label";
import { useFormState } from "react-dom";
import { createProject } from "@/utils/projects.utils";
import { ApiStatus } from "@/types/globals.types";
import SubmitBtn from "../shared/SubmitBtn";
import { initialFormActionState } from "@/data/actions.data";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(
    createProject,
    initialFormActionState
  );

  useEffect(() => {
    if (state && state?.message && !state.status) {
      toast.error(state.message);
    }

    if (state.status === ApiStatus.FINISH) {
      toast.success("Project Added Successfully!");
      onOpenChange();
    }
  }, [state]);

  return (
    <>
      <Button onPress={onOpen}>Add Project</Button>
      <Modal
        size="sm"
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className=" py-8">
                <form action={formAction} className=" space-y-4">
                  <Input
                    placeholder="Name"
                    name="projectName"
                    label={
                      <Label
                        label="Project Name"
                        tooltipProps={{
                          content: "Write a unique project name. ",
                        }}
                      />
                    }
                    labelPlacement="outside"
                  />
                  <SubmitBtn
                    className=" text-sm w-full !px-2 bg-white text-black"
                    size="sm"
                    loadingText="Adding"
                    text="Add"
                  />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
