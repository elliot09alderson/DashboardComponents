import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import { AiOutlineDownload } from "react-icons/ai";
const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <div
      className={`cursor-pointer flex justify-center rounded-sm items-center px-3 py-2 first-bg gap-2  hover:bg-gray-500 text-white`}
      onClick={() => {
        const datas = data?.length ? data : [];
        const sheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <AiOutlineDownload className="text-white w-6" />
      <h2 className="text-base">Export</h2>
    </div>
  );
};

export default DownloadBtn;
