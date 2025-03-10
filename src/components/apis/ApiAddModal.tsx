"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ApiFormData } from "@/types/apis.types";
import { SelectHookForm } from "../shared/Select";
import {
  methodOptions,
  actionOptions,
  aggregateTypeOptions,
  sortOrderOptions,
} from "@/data/apis.data";

const dummyTables = [
  { value: "1", label: "Users" },
  { value: "2", label: "Orders" },
  { value: "3", label: "Products" },
];

const AddApiModal = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ApiFormData>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFormSubmit: SubmitHandler<ApiFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button onPress={onOpen}>Add API</Button>
      <Modal
        isOpen={isOpen}
        size="2xl"
        hideCloseButton
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add API</h2>
          <ModalBody className="px-0">
            <form
              className="grid grid-cols-2 gap-6 w-full"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <Controller
                control={control}
                name="path"
                rules={{ required: "Path is required." }}
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isRequired
                    label="Path"
                    labelPlacement="outside"
                    errorMessage={error?.message}
                    placeholder="API Path"
                  />
                )}
              />
              <SelectHookForm
                register={register}
                name="method"
                registerOptions={{ required: "Method is required" }}
                options={methodOptions}
                label="Method"
              />
              <SelectHookForm
                register={register}
                name="action"
                registerOptions={{ required: "Action is required" }}
                options={actionOptions}
                label="Action"
              />
              <SelectHookForm
                register={register}
                name="tableId"
                registerOptions={{ required: "Table ID is required" }}
                options={dummyTables}
                label="Table"
              />
              <Controller
                control={control}
                name="queryField"
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Query Field"
                    labelPlacement="outside"
                    placeholder="Query Field"
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="paramName"
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelPlacement="outside"
                    label="Parameter Name"
                    placeholder="Parameter Name"
                    errorMessage={error?.message}
                  />
                )}
              />
              <SelectHookForm
                register={register}
                name="sortField"
                options={dummyTables}
                label="Sort Field"
              />
              <SelectHookForm
                register={register}
                name="sortOrder"
                options={sortOrderOptions}
                label="Sort Order"
              />
              <Controller
                control={control}
                name="limit"
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={String(value)}
                    onChange={onChange}
                    onBlur={onBlur}
                    type="number"
                    label="Limit"
                    labelPlacement="outside"
                    placeholder="Limit"
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="groupBy"
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Group By"
                    labelPlacement="outside"
                    placeholder="Group By"
                    errorMessage={error?.message}
                  />
                )}
              />
              <SelectHookForm
                register={register}
                name="aggregateType"
                options={aggregateTypeOptions}
                label="Aggregate Type"
              />
              <Controller
                control={control}
                name="aggregateField"
                render={({
                  field: { name, value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelPlacement="outside"
                    label="Aggregate Field"
                    placeholder="Aggregate Field"
                    errorMessage={error?.message}
                  />
                )}
              />
              <Button
                type="submit"
                className=" col-span-2  bg-white text-black"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddApiModal;
