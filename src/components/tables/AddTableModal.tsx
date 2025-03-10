"use client";
import { Button } from "@heroui/button";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, useDisclosure, ModalContent } from "@heroui/modal";
import { Input } from "@heroui/input";
import Select from "../shared/Select";
import {
  ColumnData,
  ColumnFormProps,
  ColumnType,
  TableFormError,
} from "@/types/tables.types";
import {
  columnTypeOptions,
  initialColumnForm,
  initialTableError,
} from "@/data/tables.data";
import { Radio, RadioGroup } from "@heroui/radio";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCircleMinus } from "react-icons/fa6";
import ProjectsSelect from "../shared/ProjectsSelect";

const AddTableModal = () => {
  // custom or package hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // states
  const [columns, setColumns] = useState<ColumnData[]>([initialColumnForm]);
  const [tableName, setTableName] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [errors, setErrors] = useState<TableFormError>({
    ...initialTableError,
  });

  const handleSubmit = () => {
    // setErrors({ ...initialTableError });

    const formErrors = { ...initialTableError };

    if (!tableName) {
      formErrors.tableName = "Table name is required.";
    } else {
      formErrors.tableName = "";
    }

    const columnNameErrors = columns.map((column) =>
      column.name ? "" : "Column name is required."
    );

    formErrors.columnNames = columnNameErrors;

    if (formErrors.tableName || columnNameErrors.some((err) => err)) {
      //   if (!tableName) formErrors.tableName = "";

      setErrors(formErrors);
      return;
    }

    const newTable = {
      name: tableName,
      project: selectedProject,
      columns,
    };
    console.log("Table created:", newTable);
    return;
    onOpenChange();
    setTableName("");
    setSelectedProject("");
    setColumns([{ name: "", required: false, type: "String", unique: false }]);
  };

  //   console.log("ERRORS: ", { tableName, initialTableError, errors });

  useEffect(() => {
    if (!isOpen) {
      setErrors(initialTableError);
      setColumns([initialColumnForm]);
      setTableName("");
      setSelectedProject("");
    }
  }, [isOpen]);

  return (
    <>
      <Button onPress={onOpen}>Add Table</Button>
      <Modal
        size="2xl"
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent className="py-4">
          {() => (
            <ModalBody>
              <h2 className="text-xl font-semibold mb-4">Add New Table</h2>
              <form
                className="grid grid-cols-2 gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <ProjectsSelect
                  onChange={(e) => setSelectedProject(e.target.value)}
                  //   className="col-span-2"
                />
                <Input
                  //   className="col-span-2"
                  name="tableName"
                  placeholder="Table Name"
                  value={tableName}
                  onChange={(e) => {
                    setTableName(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      tableName: "",
                    }));
                  }}
                  errorMessage={errors.tableName}
                  isInvalid={!!errors.tableName}
                />
                {columns.map((_, index) => (
                  <ColumnForm
                    key={index}
                    index={index}
                    columns={columns}
                    errorMessage={errors.columnNames[index]}
                    setColumns={setColumns}
                    setErrors={setErrors}
                  />
                ))}
                <Button
                  className="col-span-2 bg-white text-black"
                  onPress={handleSubmit}
                >
                  Create Table
                </Button>
              </form>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

function ColumnForm({
  index,
  columns,
  errorMessage,
  setColumns,
  setErrors,
}: ColumnFormProps) {
  const handleChange = (field: keyof ColumnData, value: string | boolean) => {
    const newColumns = [...columns];

    // Create a copy of the specific column being updated
    const updatedColumn = { ...newColumns[index] };

    if (field === "type") {
      updatedColumn[field] = value as ColumnType;
    } else if (field === "name") {
      updatedColumn[field] = value as string;

      setErrors((prevErrors) => {
        const columnErrors = [...prevErrors.columnNames];
        columnErrors[index] = "";
        return { ...prevErrors, columnNames: columnErrors };
      });
    } else if (field === "required" || field === "unique") {
      updatedColumn[field] = value as boolean;
    }

    // Replace only the specific column in the array
    newColumns[index] = updatedColumn;

    setColumns(newColumns);
  };

  return (
    <section className="col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2 border border-gray-800 rounded-xl p-4 relative">
      <Input
        name="name"
        placeholder="Column Name"
        value={columns[index].name}
        onChange={(e) => handleChange("name", e.target.value)}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
      />
      <Select
        options={columnTypeOptions}
        onChange={(e) => handleChange("type", e.target.value)}
      />
      <RadioGroup
        label="Required"
        name="required"
        orientation="horizontal"
        onChange={(e) => handleChange("required", e.target.value === "true")}
      >
        <Radio value={"true"}>Yes</Radio>
        <Radio value={"false"}>No</Radio>
      </RadioGroup>
      <RadioGroup
        label="Unique"
        name="unique"
        orientation="horizontal"
        onChange={(e) => handleChange("unique", e.target.value === "true")}
      >
        <Radio value={"true"}>Yes</Radio>
        <Radio value={"false"}>No</Radio>
      </RadioGroup>
      <div className=" flex justify-center items-center gap-x-2 absolute right-2 bottom-2">
        <AiFillPlusCircle
          className=" cursor-pointer text-white text-2xl rounded-full flex justify-center items-center "
          onClick={() => setColumns([...columns, initialColumnForm])}
        />
        {index > 0 && (
          <FaCircleMinus
            className="text-[22px] cursor-pointer"
            onClick={() => {
              setColumns((prevColumns) =>
                prevColumns.filter((_, idx) => index !== idx)
              );
            }}
          />
        )}
      </div>
    </section>
  );
}

export default AddTableModal;
