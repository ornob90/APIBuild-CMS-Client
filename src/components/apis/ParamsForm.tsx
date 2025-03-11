import React from "react";
import { SelectHookForm } from "../shared/Select";
import { findOptions } from "@/data/apis.data";
import { ApiFormData, Param } from "@/types/apis.types";

export interface ParamsFormProps {
  params: Param[];
  setFormData: React.Dispatch<React.SetStateAction<ApiFormData>>;
  formData: ApiFormData;
}

const ParamsForm = ({ params, formData, setFormData }: ParamsFormProps) => {
  return (
    <section className="border border-gray-800   divide-y divide-gray-800  rounded-xl">
      {params.map((param) => (
        <section
          key={param.name}
          className=" flex justify-between items-center gap-x-4 py-2     px-4"
        >
          <p className="flex-1">{param.name}</p>
          <p className=" flex-1">For</p>
          <SelectHookForm
            options={findOptions}
            name="findOption"
            value={param.action}
            classNameForWrapper="flex-1"
            onChange={(e) => {
              const newParams = params.map((p) => {
                if (p.name !== param.name) return p as Param;

                return { ...p, action: e.target.value } as Param;
              });

              setFormData({
                ...formData,
                params: newParams,
              });
            }}
          />
        </section>
      ))}
    </section>
  );
};

export default ParamsForm;
