import React from "react";
import Tooltip, { TooltipProps } from "./Tooltip";

interface LabelProps {
  label: string;
  tooltipProps: TooltipProps;
}

const Label = ({ label, tooltipProps }: LabelProps) => {
  return (
    <p className="flex items-center gap-x-2 relative">
      {label} <Tooltip content={tooltipProps.content} />
    </p>
  );
};

export default Label;
