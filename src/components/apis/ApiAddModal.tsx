/* eslint-disable react-hooks/exhaustive-deps */
/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */

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
} from "@/data/apis.data";
import Label from "../shared/Label";
import { extractParams, isValidEndpoint } from "@/utils/regex.utils";
import { ApiFormData, APIFormError } from "@/types/apis.types";
import ParamsForm from "./ParamsForm";
import TablesSelect from "../shared/TablesSelect";
import { useAppSelector } from "@/store/store-hooks";
import { Option } from "@/types/htmls.types";
import { ApiStatus } from "@/types/globals.types";
import { useAxios } from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { FaCodeMerge } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { customRevalidateTag } from "@/utils/globals.utils";

// const dummyTables = [
//   { value: "1", label: "Users" },
//   { value: "2", label: "Orders" },
//   { value: "3", label: "Products" },
// ];

const AddApiModal = ({}) => {
  // custom or package hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { tables } = useAppSelector((state) => state.tables);
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();

  // states
  const [columnsOfSelectedTable, setColumnsOfSelectedTable] = useState<
    Option[]
  >([]);
  const [formStatus, setFormStatus] = useState<ApiStatus>(ApiStatus.IDLE);
  const [formData, setFormData] = useState<ApiFormData>({
    path: "",
    method: "GET",
    action: "find",
    tableId: "",
    queryField: "",
    sortField: "",
    sortOrder: "asc",
    limit: 0,
    groupBy: "",
    aggregateType: "",
    aggregateField: "",
    params: [],
  });
  const [errors, setErrors] = useState<APIFormError>({ path: "" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // console.log("NAMESFD: ", { name, value });

    setErrors({ path: "" });
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      setFormStatus(ApiStatus.PENDING);

      const requestBody = { ...formData };

      requestBody.limit = requestBody?.limit
        ? +requestBody.limit
        : requestBody.limit;

      requestBody.method = requestBody.method || "GET";
      requestBody.action = requestBody.action || "find";
      requestBody.sortOrder = requestBody.sortOrder || "asc";
      requestBody.aggregateType = requestBody.aggregateType || "count";

      const response = await axiosInstance.post("/apis", requestBody);

      if (response.data?.acknowledgement) {
        toast.success("Apis Created Successfully!");
        setFormStatus(ApiStatus.FINISH);

        customRevalidateTag(
          `apis_by_user_page_${searchParams.get("page") ?? "1"}`
        );
      }

      setFormStatus(ApiStatus.ERROR);
      onOpenChange();
    } catch (error: any) {
      setFormStatus(ApiStatus.ERROR);
      toast.error(
        typeof error?.message === "string"
          ? error?.response?.data?.message
          : Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : "Failed to create API"
      );
    }
  };

  const handlePathBlur = () => {
    if (formData.path && isValidEndpoint(formData.path)) {
      const params = extractParams(formData.path);

      let isNotExistInColumnsOfSelectedTable = false;
      const invalidParams: string[] = [];
      const allColumns = columnsOfSelectedTable.map((c) => c.label);

      params.forEach((param: string) => {
        if (!allColumns.includes(param)) {
          invalidParams.push(param);
          isNotExistInColumnsOfSelectedTable = true;
        }
      });

      if (isNotExistInColumnsOfSelectedTable) {
        setErrors((prev) => ({
          ...prev,
          path: `${invalidParams.join(
            ", "
          )} are not valid columns Selected Table`,
        }));
      }

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
      setFormData({
        path: "",
        method: "GET",
        action: "find",
        tableId: "",
        queryField: "",
        sortField: "",
        sortOrder: "asc",
        limit: 0,
        groupBy: "",
        aggregateType: "",
        aggregateField: "",
        params: [],
      });
      setErrors({ path: "" });
    }
  }, [isOpen]);

  useEffect(() => {
    // console.log("tables:", tables, formData.tableId);

    if (formData?.tableId) {
      const columns = tables.find(
        (table) => table._id === formData.tableId
      )?.columnNames;

      if (columns && columns?.length > 0) {
        setColumnsOfSelectedTable(
          columns?.map((column) => {
            return { value: column, label: column } as Option;
          })
        );
      } else {
        setColumnsOfSelectedTable([]);
      }
    } else if (tables && tables.length > 0) {
      // setFormData({
      //   ...formData,
      //   tableId: (tables && Array.isArray(tables) && tables.length > 0
      //     ? tables[0]?._id
      //     : "") as string,
      // });

      setFormData((prevState) => ({
        ...prevState,
        tableId: tables[0]?._id as string,
      }));
    }
  }, [formData.tableId, tables, isOpen]);

  useEffect(() => {
    if (columnsOfSelectedTable.length === 0) return;

    setFormData({
      ...formData,
      groupBy: columnsOfSelectedTable[0].value,
      aggregateField: columnsOfSelectedTable[0].value,
      sortField: columnsOfSelectedTable[0].value,
    });
  }, [columnsOfSelectedTable]);

  return (
    <>
      <Button
        onPress={onOpen}
        className=" bg-white text-darkGray px-6 "
        endContent={<FaCodeMerge />}
      >
        Add API
      </Button>
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
              <TablesSelect
                name="tableId"
                value={formData.tableId}
                onChange={(e) => handleChange(e)}
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
              {/* <Input
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
              /> */}
              <SelectHookForm
                name="sortField"
                value={String(formData.sortField)}
                onChange={(e) => handleChange(e)}
                options={columnsOfSelectedTable}
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

              <SelectHookForm
                name="groupBy"
                value={String(formData.groupBy)}
                onChange={(e) => handleChange(e)}
                options={columnsOfSelectedTable}
                label={
                  <Label
                    label="Group By"
                    tooltipProps={{
                      content: "Specify the field to group results by.",
                    }}
                  />
                }
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

              <SelectHookForm
                name="aggregateField"
                value={String(formData.aggregateField)}
                onChange={(e) => handleChange(e)}
                options={columnsOfSelectedTable}
                label={
                  <Label
                    label="Aggregate Field"
                    tooltipProps={{
                      content:
                        "Specify the field to apply the aggregation function on.",
                    }}
                  />
                }
              />
              <Button
                isLoading={formStatus === ApiStatus.PENDING}
                type="submit"
                className="col-span-2 bg-white text-black"
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
