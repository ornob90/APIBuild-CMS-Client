import { FaDatabase } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";

import { MdOutlineDashboard, MdToken } from "react-icons/md";
import { SiPolymerproject } from "react-icons/si";


export const sidebarTabs = [
  { tab: "Dashboard", icon: <MdOutlineDashboard /> },
  { tab: "Projects", icon: <SiPolymerproject  /> },
  { tab: "APIs", icon: <FaCodeMerge   /> },
  { tab: "Tokens", icon: <MdToken /> },
  { tab: "Data", icon: <FaDatabase /> },
];
