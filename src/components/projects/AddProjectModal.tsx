"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <form action="" className=" space-y-4">
                  <Input placeholder="Name" />
                  <Button
                    size="sm"
                    className=" text-sm w-full !px-2 bg-white text-black"
                  >
                    Add
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
