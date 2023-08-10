"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineClose, AiOutlinePrinter, AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handlePDFExport = () => {
    const pdf = new jsPDF();

    // Set title for the PDF
    pdf.text("User List", 10, 10);

    // Extract data from the table and format for PDF
    const tableData = userData.map((user) => [
      user.username,
      user.name,
      user.id,
      user.phone,
      user.email,
      user.website,
    ]);

    // Auto-generate table using jsPDF's autoTable plugin
    pdf.autoTable({
      head: [["Group", "Status"]],
      body: tableData,
      startY: 20,
    });

    // Save the PDF file
    pdf.save("user-list.pdf");
  };

  const handleExcelExport = () => {
    const data = userData.map((user) => [
      user.username,
      user.name,
      user.id,
      user.phone,
      user.email,
      user.website,
    ]);

    const headers = [
      "Group",
      "Status",
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserList");

    XLSX.writeFile(wb, "user-list.xlsx");
  };

  return (
    <div>
      <h2 className="text-2xl text-black">Role List</h2>
      <div className="bg-blue-500">
      <ButtonGroup
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
        className="gap-auto h-auto"
        >
        <div className="flex justify-center items-center">
          <Link href="/add">
            <Button>
              <AiOutlinePlus />
              Add
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/edit">
            <Button>
              <AiOutlineEdit />
              Edit
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/update">
            <Button>
              <MdOutlineUpdate/>
              Update
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/cancel">
            <Button>
              <AiOutlineClose />
              Cancel
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
            <Button onClick={handlePrint}>
            <AiOutlinePrinter />
            Print
            </Button>
        </div>
        <div className="flex justify-center items-center">
            <Button onClick={handlePDFExport}>
              <AiOutlineFilePdf />
              PDF Export
            </Button>
        </div>
        <div className="flex justify-center items-center">
            <Button onClick={handleExcelExport}>
              <AiOutlineFileExcel />
              Excel Export
            </Button>
        </div>
      </ButtonGroup>
      </div>
      <div className="w-full mx-auto p-0">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-900 dark:bg-purple-900 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Group
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr
                  key={user.name}
                  className="border-b dark:bg-white dark:border-purple-600"
                >
                  <td className="px-6 py-4 text-black">{user.username}</td>
                  <td className="px-6 py-4 text-black">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
