import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AiOutlineSearch } from "react-icons/ai";
import { USERS } from "./fakeData";
import { useState } from "react";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";

const TanStackTable = ({ headers, ...props }) => {
  const columns = [
    {
      header: "SNO",
      accessorKey: "",
      cell: (info) => <span>{info.row.index + 1}</span>,
    },
    ...headers,
  ];
  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // console.log(data);
  return (
    <div
      className={`sm:p-2 p-1 max-w-5xl ${props.className} mx-auto overflow-x-scroll text-white rounded-md fill-gray-400 mt-2`}
    >
      <div className=" flex flex-col sm:flex-row w-full justify-between mb-2">
        <div className="ml-2 w-full flex items-center  gap-1">
          <AiOutlineSearch size={20} />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 sm:m-0 mb-2 md:w-1/5 md:focus:w-1/3  duration-300 border-gray-400 "
            placeholder="Search all columns... "
          />
        </div>

        {/* Data must be an array of objects */}
        <DownloadBtn data={data} fileName={"peoples"} />
      </div>
      <table className="border border-gray-700 w-full text-left ">
        <thead className="first-bg rounded-t-sm">
          {table.getHeaderGroups().map((headergroup, idx) => (
            <tr key={idx}>
              {headergroup.headers.map((header, idx) => (
                <th
                  key={idx + 12}
                  className="capitalize sm:text-base text-sm text-center  sm:px-3.5 px-1 py-0 sm:py-2 md:py-3 md:px-4 md:text-lg"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length
            ? table.getRowModel().rows.map((row, i) => (
                <tr
                  key={i + row.id}
                  className={`${
                    i % 2 === 0 ? "text-white bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id + i}
                      className="sm:px-3.5 sm:py-2 py-1 px-1 text-xs sm:text-sm md:text-base md:py-3 md:px-3.5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {/* pagination */}

      <div className="flex sm:flex-row flex-col items-center  justify-end sm:mr-1 mt-2 gap-2">
        <div className="flex gap-2">
          <button
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 rounded-md"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
          >
            {"<"}
          </button>
          <button
            className="p-1 border  rounded-md border-gray-300 px-2 disabled:opacity-30"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
          >
            {">"}
          </button>
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>> */}

        {/* Display Page Number */}
        <div className="flex">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          {/* >>>>>>>>>>>>>>>>>>>>>>> */}
          {/* FOR Custom Page Input */}
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
        </div>

        {/* >>>>>>>>>>>>>>>>>>>>>>> */}

        <div className="flex  gap-4 items-center justify-center">
          {/* DROPDOWN for selecting custom entries  */}
          <select
            name=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 second-bg border rounded-md"
            id=""
          >
            {[10, 20, 30, 50].map((pageSize, idx) => (
              <option key={pageSize + idx} className="p-2" value={pageSize}>
                show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>> */}
      </div>
    </div>
  );
};

export default TanStackTable;
