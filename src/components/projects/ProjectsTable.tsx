// app/projects/page.tsx

import { getProjectsByUser } from "@/utils/projects.utils";
import Table from "../shared/Table";
import { Project } from "@/types/projects.types";
import DeleteProjectBtn from "./DeleteProjectBtn";

const headers = [
  { key: "rowNumber", label: "No." },
  { key: "projectName", label: "Project Name" },
  { key: "action", label: "Action", className: "text-center" }, // Center the action column
];

export interface ProjectsTableProps {
  page: number;
}

export default async function ProjectsTable({ page }: ProjectsTableProps) {
  const limit = 10;
  const {
    projects: userProjects,
    totalPages,
    total,
  } = await getProjectsByUser(page, limit);

  const projects = userProjects.map((project: Project, idx) => ({
    rowNumber: `${idx + 1}`,
    action: <DeleteProjectBtn project={project} />,
    ...project,
  }));

  return (
    <div className="px-4">
      <Table
        data={projects}
        headers={headers}
        paginationProps={{
          initialPage: page ?? 1,
          total: totalPages ?? 0,
        }}
        showPagination={!!(total && total > limit)}
        // classNameForContainer="bg-slate-800"
        // className="text-white border border-slate-600"
        // classNameForHeader="bg-slate-700 text-white border border-slate-600"
        // classNameForTableRow="[&:nth-child(even)]:bg-slate-900 [&:nth-child(odd)]:bg-slate-800 border border-slate-600"
      />
    </div>
  );
}

// "use client";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableColumn,
// } from "@heroui/table";
// import { AiOutlineDelete } from "react-icons/ai";

// const projects = [
//   { projectName: "Project A" },
//   { projectName: "Project B" },
//   { projectName: "Project C" },
// ];

// export default function ProjectsTable() {
//   return (
//     <div className="  rounded-md">
//       <Table
//         aria-label="Projects Table"
//         classNames={{
//           base: "w-full p-0",
//           table: " text-white p-0",
//           thead: "",
//           th: "px-4 py-2 text-left font-semibold border  border-gray-400",
//           td: "px-4 py-2 border border-gray-400",
//           tr: "[&:nth-child(even)]:bg-darkGray [&:nth-child(odd)]:",
//         }}
//         className=" !p-0"
//       >
//         <TableHeader>
//           <TableColumn key="number">No.</TableColumn>
//           <TableColumn key="name">Project Name</TableColumn>
//           <TableColumn key="action" className="text-center">
//             Action
//           </TableColumn>
//         </TableHeader>
//         <TableBody>
//           {projects.map((project, index) => (
//             <TableRow key={index}>
//               <TableCell>{index + 1}</TableCell>
//               <TableCell>{project.projectName}</TableCell>
//               <TableCell className="">
//                 <AiOutlineDelete className=" place-self-center text-red-500 text-lg" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
