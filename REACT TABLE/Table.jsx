import React from "react";
import { useSortBy, useTable, usePagination } from "react-table";
const columns = [
  { Header: "NAME", accessor: "name" },
  { Header: "ID", accessor: "id" },
  { Header: "GENDER", accessor: "gender" },
  { Header: "SALARY", accessor: "salary" },
];
const data = [
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "idk",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 8312321,
    name: "xyz",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "pratik",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2322321,
    name: "lala",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "idk",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "idk",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 8312321,
    name: "xyz",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "pratik",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 8312321,
    name: "xyz",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "pratik",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "dsdsdsds",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "idk",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 8312321,
    name: "xyz",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "pratik",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "pratik",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2322321,
    name: "lala",
  },
  {
    id: "ssad",
    gender: "male",
    salary: 2312321,
    name: "idk",
  },
];
const Table = () => {
  const {
    getTableBodyProps,
    getTableProps,
    page,
    headerGroups,
    previousPage,
    nextPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? "⬇️" : "⬆️"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>

        <button onClick={() => gotoPage(0)}>first Page</button>

        <button disabled={!canPreviousPage} onClick={previousPage}>
          prev
        </button>
        <button disabled={!canNextPage} onClick={nextPage}>
          next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)}>last Page</button>
      </div>
    </div>
  );
};

export default Table;
