/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { SelectHookForm } from "../shared/Select";
import {
  methodOptions,
  actionOptions,
  aggregateTypeOptions,
  sortOrderOptions,
  initialFormData,
} from "@/data/apis.data";
import Label from "../shared/Label";
import { extractParams, isValidEndpoint } from "@/utils/regex.utils";
import { ApiFormData, APIFormError } from "@/types/apis.types";
import ParamsForm from "./ParamsForm";

const dummyTables = [
  { value: "1", label: "Users" },
  { value: "2", label: "Orders" },
  { value: "3", label: "Products" },
];

const AddApiModal = ({}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // states
  const [formData, setFormData] = useState<ApiFormData>({ ...initialFormData });

  const [errors, setErrors] = useState<APIFormError>({ path: "" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // console.log("NAMESFD: ", { name, value });

    setErrors({ path: "" });
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.path) {
      return setErrors((prev) => ({ ...prev, path: "Path is required" }));
    }

    if (!isValidEndpoint(formData.path)) {
      return setErrors((prev) => ({
        ...prev,
        path: "Invalid Endpoint Format",
      }));
    }

    // console.log(formData);
  };

  const handlePathBlur = () => {
    if (formData.path && isValidEndpoint(formData.path)) {
      const params = extractParams(formData.path);

      setFormData({
        ...formData,
        params: params.map((param) => ({ name: param, action: "findOne" })),
      });
    }

    if (formData.params && !isValidEndpoint(formData.path)) {
      setErrors((prev) => ({
        ...prev,
        path: "Invalid Endpoint Format",
      }));
    }

    if (!formData.path) setFormData({ ...formData, params: [] });
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({ ...initialFormData });
      setErrors({ path: "" });
    }
  }, [isOpen]);

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
              onSubmit={handleFormSubmit}
            >
              <Input
                name="path"
                value={formData.path}
                onChange={(e) => handleChange(e)}
                label={
                  <Label
                    label="Path"
                    tooltipProps={{
                      content:
                        "Enter the API endpoint path. Use a leading '/' (e.g., '/projects/:id'). Parameters should be prefixed with ':' (e.g., ':id' becomes a parameter). Avoid trailing slashes unless necessary.",
                    }}
                  />
                }
                labelPlacement="outside"
                placeholder="e.g, /projects/:id"
                errorMessage={errors.path}
                isInvalid={!!errors.path}
                onBlur={handlePathBlur}
              />
              <SelectHookForm
                name="method"
                value={formData.method}
                onChange={(e) => handleChange(e)}
                options={methodOptions}
                label={
                  <Label
                    label="Method"
                    tooltipProps={{
                      content:
                        "Select the HTTP method for the API request (e.g., GET, POST, PUT, DELETE).",
                    }}
                  />
                }
              />
              {formData?.params && formData?.params?.length > 0 && (
                <section className="  col-span-2">
                  <ParamsForm
                    params={formData.params}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </section>
              )}
              <SelectHookForm
                name="action"
                value={formData.action}
                onChange={(e) => handleChange(e)}
                options={actionOptions}
                label={
                  <Label
                    label="Action"
                    tooltipProps={{
                      content:
                        "Choose the action that the API will perform (e.g., Fetch, Create, Update, Delete).",
                    }}
                  />
                }
              />
              <SelectHookForm
                name="tableId"
                value={formData.tableId}
                onChange={(e) => handleChange(e)}
                options={dummyTables}
                label={
                  <Label
                    label="Table"
                    tooltipProps={{
                      content:
                        "Select the table on which the API will operate.",
                    }}
                  />
                }
              />
              <Input
                name="queryField"
                value={formData.queryField}
                onChange={(e) => handleChange(e)}
                label={
                  <Label
                    label="Query Fields (Separated By Comma)"
                    tooltipProps={{
                      content:
                        "Specify the fields to query, separated by commas (e.g., 'id,name,role').",
                    }}
                  />
                }
                labelPlacement="outside"
                placeholder="e.g, tab,id,role"
              />
              <SelectHookForm
                name="sortField"
                value={String(formData.sortField)}
                onChange={(e) => handleChange(e)}
                options={dummyTables}
                label={
                  <Label
                    label="Sort Field"
                    tooltipProps={{
                      content:
                        "Choose the field by which results should be sorted.",
                    }}
                  />
                }
              />
              <SelectHookForm
                name="sortOrder"
                value={String(formData.sortOrder)}
                onChange={(e) => handleChange(e)}
                options={sortOrderOptions}
                label={
                  <Label
                    label="Sort Order"
                    tooltipProps={{
                      content:
                        "Specify the sort order: Ascending or Descending.",
                    }}
                  />
                }
              />
              <Input
                name="limit"
                value={String(formData.limit)}
                onChange={(e) => handleChange(e)}
                type="number"
                label={
                  <Label
                    label="Limit"
                    tooltipProps={{
                      content:
                        "Set a limit for the number of results to return.",
                    }}
                  />
                }
                labelPlacement="outside"
                placeholder="Limit"
              />
              <Input
                name="groupBy"
                value={formData.groupBy}
                onChange={(e) => handleChange(e)}
                label={
                  <Label
                    label="Group By"
                    tooltipProps={{
                      content: "Specify the field to group results by.",
                    }}
                  />
                }
                labelPlacement="outside"
                placeholder="Group By"
              />
              <SelectHookForm
                name="aggregateType"
                value={String(formData.aggregateType)}
                onChange={(e) => handleChange(e)}
                options={aggregateTypeOptions}
                label={
                  <Label
                    label="Aggregate Type"
                    tooltipProps={{
                      content:
                        "Select the aggregation type for grouped data (e.g., SUM, COUNT, AVG).",
                    }}
                  />
                }
              />
              <Input
                name="aggregateField"
                value={formData.aggregateField}
                onChange={(e) => handleChange(e)}
                label={
                  <Label
                    label="Aggregate Field"
                    tooltipProps={{
                      content:
                        "Specify the field to apply the aggregation function on.",
                    }}
                  />
                }
                labelPlacement="outside"
                placeholder="Aggregate Field"
              />
              <Button type="submit" className="col-span-2 bg-white text-black">
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
