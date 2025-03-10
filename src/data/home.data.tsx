import { FaDatabase } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";

import { MdOutlineDashboard, MdToken } from "react-icons/md";
import { SiPolymerproject } from "react-icons/si";

export const sidebarTabs = [
  { tab: "Dashboard", icon: <MdOutlineDashboard />, href: "/" },
  { tab: "Projects", icon: <SiPolymerproject />, href: "/projects" },
  { tab: "APIs", icon: <FaCodeMerge />, href: "/apis" },
  { tab: "Tokens", icon: <MdToken />, href: "/tokens" },
  { tab: "Data", icon: <FaDatabase />, href: "/data" },
];
