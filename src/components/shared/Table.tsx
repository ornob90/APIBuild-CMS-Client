/* eslint-disable @typescript-eslint/no-explicit-any */
// No "use client" directive - this is a server component

import { PaginationProps } from "@heroui/pagination";
import ServerPagination from "./ServerPagination";

// Define TypeScript interfaces for props
interface Header {
  key: string;
  label: string;
  type?: "string" | "number"; // Optional type for potential future use
  valueKey?: string; // Optional for number sorting (unused here)
  className?: string; // Optional className for individual cells
}

interface TableProps {
  data: Record<string, any>[]; // Array of objects with dynamic keys
  headers: Header[];
  className?: string;
  classNameForContainer?: string;
  classNameForHeader?: string;
  classNameForTableRow?: string;
  paginationProps?: PaginationProps;
}

const Table = ({
  data,
  headers,
  className = "",
  classNameForContainer = "",
  classNameForHeader = "",
  classNameForTableRow = "",
  paginationProps,
}: TableProps) => {
  return (
    <section className=" space-y-4">
      <div
        className={`overflow-x-auto bg-darkGray border  border-gray-700  rounded-r-lg !rounded-l-[17px] ${classNameForContainer}`}
      >
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500 gradient-border rounded-l-primary ${className}`}
        >
          <thead
            className={`text-xs text-white uppercase bg-transparent ${classNameForHeader}`}
          >
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className="px-4 py-3 text-left sm:px-6 cursor-default" // No sorting, so cursor-default
                >
                  <p className="flex flex-row items-center gap-x-2">
                    {header.label}
                    {/* Keep sort icon for visual consistency, but no functionality */}
                    {/* <div className="size-4">
                    <BiSortAlt2 className="w-4 h-4" />
                  </div> */}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`bg-transparent  text-white  border-gray-700 ${
                  data?.length - 1 === index ? "  border-t" : "border-y"
                }  ${classNameForTableRow}`}
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className={`px-4 sm:px-6 py-3 ${header?.className || ""}`}
                  >
                    {row[header.key] ?? ""}{" "}
                    {/* Fallback to empty string if undefined */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ServerPagination {...paginationProps} />
    </section>
  );
};

export default Table;
