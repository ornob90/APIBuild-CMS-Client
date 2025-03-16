"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import Label from "../shared/Label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTopRowValueOfProjects } from "@/store/features/projectsSlice";
import { useAxios } from "@/hooks/useAxios";
import { ApiStatus } from "@/types/globals.types";
import { useAppSelector } from "@/store/store-hooks";
import { customRevalidateTag } from "@/utils/globals.utils";
import { RiCodeSSlashFill } from "react-icons/ri";

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectName, setProjectName] = useState("");
  const [addingState, setAddingState] = useState(ApiStatus.IDLE);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  // Initialize axios instance with private authentication
  const axiosInstance = useAxios({ isPrivate: true });
  const storeProjects = useAppSelector((state) => state.project.projects);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingState(ApiStatus.PENDING);

    if (!projectName) {
      return setAddingState(ApiStatus.ERROR);
    }

    try {
      const response = await axiosInstance.post("/projects", { projectName });

      if (response.data?.acknowledgement) {
        setAddingState(ApiStatus.FINISH);
        toast.success("Project Added Successfully!");
        dispatch(
          setTopRowValueOfProjects({
            fetchStatus: ApiStatus.IDLE,
            projects: [
              ...storeProjects,
              {
                projectName,
                _id: response.data?.data?.projectId,
              },
            ],
          })
        );

        customRevalidateTag(`projects-by-user_page_${page}`);

        setProjectName(""); // Reset form
        onOpenChange(); // Close modal
      } else {
        throw new Error("Failed to create project");
      }
    } catch {
      setAddingState(ApiStatus.ERROR);
      toast.error("Failed to create project");
    }
  };

  useEffect(() => {
    // Reset state when modal closes
    if (!isOpen) {
      setProjectName("");
      setAddingState(ApiStatus.IDLE);
    }
  }, [isOpen]);

  return (
    <>
      <Button
        endContent={<RiCodeSSlashFill />}
        variant="shadow"
        className=" bg-white text-black px-4"
        onPress={onOpen}
      >
        Add Project
      </Button>
      <Modal
        size="sm"
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <ModalBody className="py-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Name"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => {
                    setAddingState(ApiStatus.IDLE);
                    setProjectName(e.target.value);
                  }}
                  label={
                    <Label
                      label="Project Name"
                      tooltipProps={{
                        content: "Write a unique project name.",
                      }}
                    />
                  }
                  labelPlacement="outside"
                  isInvalid={addingState === ApiStatus.ERROR}
                  errorMessage={
                    !projectName
                      ? "Project name is required"
                      : "Invalid Project name"
                  }
                />
                <input type="hidden" name="page" value={page} />
                <Button
                  type="submit"
                  className="text-sm w-full !px-2 bg-white text-black"
                  size="sm"
                  isLoading={addingState === ApiStatus.PENDING}
                >
                  Submit
                </Button>
              </form>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
