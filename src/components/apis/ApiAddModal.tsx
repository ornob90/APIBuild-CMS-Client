"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { ApiFormData } from "@/types/apis.types";

const dummyTables = [
  { key: "1", label: "Users" },
  { key: "2", label: "Orders" },
  { key: "3", label: "Products" },
];

const AddApiModal = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiFormData>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFormSubmit: SubmitHandler<ApiFormData> = () => {};

  return (
    <>
      <Button onPress={onOpen}>Add API</Button>
      <Modal isOpen={isOpen} hideCloseButton onOpenChange={onOpenChange}>
        <ModalContent className="bg-darkGray border border-gray-800 p-6 rounded-lg">
          <ModalHeader>
            <h2 className="text-xl font-semibold mb-4">Add New API</h2>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div>
                {/* <Select
                  label="Method"
                  {...register("method", { required: "Method is required" })}
                  errorMessage={errors.method?.message}
                >
                  <option value="">Select Method</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </Select> */}
              </div>
              <div>
                <Input
                  label="Path"
                  {...register("path", { required: "Path is required" })}
                  errorMessage={errors.path?.message}
                />
              </div>
              <div>
                {/* <Select
                  label="Table"
                  {...register("tableId", { required: "Table is required" })}
                  items={dummyTables}
                  errorMessage={errors.tableId?.message}
                >
                  <SelectItem>Select Table</SelectItem>
                  {(table) => <SelectItem>{table.label}</SelectItem>}
                </Select> */}
              </div>
              <div>
                {/* <Select
                  label="Action"
                  {...register("action", { required: "Action is required" })}
                  errorMessage={errors.action?.message}
                >
                  <option value="">Select Action</option>
                  <option value="findOne">findOne</option>
                  <option value="findAll">findAll</option>
                  <option value="aggregate">aggregate</option>
                  <option value="insert">insert</option>
                  <option value="update">update</option>
                  <option value="delete">delete</option>
                </Select> */}
              </div>
              {/* Add additional fields as necessary */}
              <div className="flex justify-end space-x-2">
                <Button  >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddApiModal;
