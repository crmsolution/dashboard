"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CiImport } from "react-icons/ci";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiOutlineEye, AiFillCheckCircle } from "react-icons/ai";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-black">Card List</h2>
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
          <Link href="/addremarks">
            <Button>
              <BiSolidCommentAdd />
              Add Remarks
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/viewremarks">
            <Button>
              <AiOutlineEye />
              View Remarks
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/settlement">
            <Button>
              <AiFillCheckCircle />
              Settlement
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
                  Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Card Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Card Holder
                </th>
                <th scope="col" className="px-6 py-3">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3">
                  Bill Report Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Max Aging
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Remarks
                </th>
                <th scope="col" className="px-6 py-3">
                  Rep Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Available Limit
                </th>
                <th scope="col" className="px-6 py-3">
                  Credit Limit
                </th>
                <th scope="col" className="px-6 py-3">
                  Credit Payment
                </th>
                <th scope="col" className="px-6 py-3">
                  TAD
                </th>
                <th scope="col" className="px-6 py-3">
                  MAD
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr
                  key={user.name}
                  className="border-b dark:bg-white dark:border-purple-600"
                >
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">123456789</td>
                  <td className="px-6 py-4 text-black">{user.phone}</td>
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
