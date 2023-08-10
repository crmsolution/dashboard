"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CiImport } from "react-icons/ci";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-black">Vendor List</h2>
      <div className="bg-blue-500">
      <ButtonGroup
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
        className="gap-auto h-auto"
        >
        <div className="flex justify-center items-center">
          <Link href="/import">
            <Button>
              <CiImport />
              Import
            </Button>
          </Link>
        </div>
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
          <Link href="/commission">
            <Button>
              <AiOutlineEye />
              Commission
            </Button>
          </Link>
        </div>
      </ButtonGroup>
      </div>
      <div className="w-full mx-auto p-0">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-900 dark:bg-purple-900 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Supplier
                </th>
                <th scope="col" className="px-6 py-3">
                  Supplier in Nepali
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  PAN
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
                  <td className="px-6 py-4 text-black">{}</td>
                  <td className="px-6 py-4 text-black">{}</td>
                  <td className="px-6 py-4 text-black">{}</td>
                  <td className="px-6 py-4 text-black">{}</td>
                  <td className="px-6 py-4 text-black">{user.phone}</td>
                  <td className="px-6 py-4 text-black">{user.email}</td>
                  <td className="px-6 py-4 text-black">{}</td>
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
