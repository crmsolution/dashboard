"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlinePrinter,
  AiOutlineFilePdf,
  AiOutlineFileExcel,
} from "react-icons/ai";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [branchCode, setBranchCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [status, setStatus] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [addBranchCode, setAddBranchCode] = useState("");
  const [addBranchName, setAddBranchName] = useState("");
  const [addStatus, setAddStatus] = useState("");
  const [addForm, setAddForm] = useState(false);

  const allData = userData;

  const handleAdd = () => {
    console.log("hello add");
    setAddForm(true);
  };

  const handleAddSave = () => {
    if (addBranchCode && addBranchName && addStatus) {
      const newUser = {
        id: uuidv4(), // Generate a new unique ID using uuid
        branchCode: addBranchCode,
        branchName: addBranchName,
        status: addStatus,
      };

      setUserData([...allData, newUser]);
      setAddBranchCode("");
      setAddBranchName("");
      setAddStatus("");
      setAddForm(false);
    }
  };

  const handleEdit = (index) => {
    const userToEdit = userData[index];
    setEditIndex(index);
    setBranchCode(userToEdit.branchCode);
    setBranchName(userToEdit.branchName);
    setStatus(userToEdit.status);
    setEditForm(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Updating the state based on the input field being edited
    if (name === "branchCode") {
      setBranchCode(value);
    } else if (name === "branchName") {
      setBranchName(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      const updatedUserData = userData.map((user, index) => {
        if (index === editIndex) {
          return {
            ...user,
            branchCode,
            branchName,
            status,
          };
        }
        return user;
      });
      setUserData(updatedUserData);
      setEditForm(false);
      setEditIndex(null);
      setBranchCode("");
      setBranchName("");
      setStatus("");
    }
  };

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
      head: [["Branch Code", "Branch Name", "Status"]],
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

    const headers = ["Branch Code", "Branch Name", "Status"];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserList");

    XLSX.writeFile(wb, "user-list.xlsx");
  };

  return (
    <div>
      <div className="flex items-center justify-end">
        <Button
          variant="contained"
          className="bg-blue-500 rounded-none"
          onClick={handleAdd}
        >
          <AiOutlinePlus />
          Add
        </Button>
        <Button
          variant="contained"
          className="bg-blue-500 rounded-none"
          onClick={handlePrint}
        >
          <AiOutlinePrinter />
          Print
        </Button>
        <Button
          variant="contained"
          className="bg-blue-500 rounded-none"
          onClick={handlePDFExport}
        >
          <AiOutlineFilePdf />
          PDF Export
        </Button>
        <Button
          variant="contained"
          className="bg-blue-500 rounded-none"
          onClick={handleExcelExport}
        >
          <AiOutlineFileExcel />
          Excel Export
        </Button>
      </div>
      <div className="w-full">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-900 dark:bg-purple-900 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Branch Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Branch Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b dark:bg-white dark:border-purple-600 cursor-pointer"
                >
                  <td className="px-6 py-4 text-black">{user.id}</td>
                  <td className="px-6 py-4 text-black">{user.username}</td>
                  <td className="px-6 py-4 text-black">{user.email}</td>
                  <td className="px-6 py-4 text-black">
                    <Button
                      className="bg-blue-500 text-white"
                      onClick={() => handleEdit(index)}
                    >
                      <AiOutlineEdit />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
            <div className="flex flex-col gap-4">
              <h2 className="flex justify-center bg-purple-900 text-white rounded p-2">
                Edit
              </h2>
              <label htmlFor="branchCode">Branch Code</label>
              <input
                type="text"
                name="branchCode"
                value={branchCode}
                className="border rounded p-2"
                onChange={handleEditChange}
              />
              <label htmlFor="branchName">Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={branchName}
                className="border rounded p-2"
                onChange={handleEditChange}
              />
              <label htmlFor="status">Status</label>
              <input
                type="text"
                name="status"
                value={status}
                className="border rounded p-2"
                onChange={handleEditChange}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white mr-2"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setEditForm(false);
                    setEditIndex(null);
                  }}
                  className="bg-red-500 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {addForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
            <div className="flex flex-col gap-4">
              <h2 className="flex justify-center bg-purple-900 text-white rounded p-2">
                Add User
              </h2>
              <label htmlFor="addBranchCode">Branch Code</label>
              <input
                type="text"
                id="addBranchCode"
                value={addBranchCode}
                className="border rounded p-2"
                onChange={(e) => setAddBranchCode(e.target.value)}
              />
              <label htmlFor="addBranchName">Branch Name</label>
              <input
                type="text"
                id="addBranchName"
                value={addBranchName}
                className="border rounded p-2"
                onChange={(e) => setAddBranchName(e.target.value)}
              />
              <label htmlFor="addStatus">Status</label>
              <input
                type="text"
                id="addStatus"
                value={addStatus}
                className="border rounded p-2"
                onChange={(e) => setAddStatus(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddSave}
                  className="bg-blue-500 text-white mr-2"
                >
                  Add
                </Button>
                <Button
                  onClick={() => setAddForm(false)}
                  className="bg-red-500 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
