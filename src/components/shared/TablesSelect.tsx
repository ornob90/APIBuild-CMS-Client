"use client";
import { useAppSelector } from "@/store/store-hooks";
import React, { ReactNode } from "react";
import { SelectHookForm } from "./Select";
import { Option } from "@/types/htmls.types";

interface TablesSelectProps {
  name: string;
  value: string;
  label: ReactNode | string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const TablesSelect = ({ name, value, label, onChange }: TablesSelectProps) => {
  const { tables } = useAppSelector((state) => state.tables);

  const tablesOptions = tables.map((table) => {
    return {
      value: table._id,
      label: table.tableName,
    } as Option;
  });

  return (
    <SelectHookForm
      name={name}
      value={value}
      onChange={onChange}
      options={tablesOptions || []}
      label={label}
    />
  );
};

export default TablesSelect;
