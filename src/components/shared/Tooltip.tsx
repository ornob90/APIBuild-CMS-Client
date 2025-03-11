import { Button } from "@heroui/button";
import { Tooltip as HeroTooltip } from "@heroui/tooltip";
import { FaInfoCircle } from "react-icons/fa";

export interface TooltipProps {
  content: string;
  showArrow?: boolean;
}

export default function Tooltip({ content, showArrow = true }: TooltipProps) {
  return (
    <HeroTooltip
      content={content}
      showArrow={showArrow}
      classNames={{
        content: "bg-white text-black !rounded-xl max-w-xs  p-3",
        arrow: "bg-white  text-white fill-white accent-white caret-white  border-white outline-white stroke-white",
 
      }}
      delay={0}
    >
      {/* <FaInfoCircle /> */}
      <button className=" !p-0   white  !w-fit !bg-transparent   maxw">
        <FaInfoCircle />
      </button>
    </HeroTooltip>
  );
}
