"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AiOutlinePlus, AiOutlineEdit, AiOutlinePrinter, AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";

const UserPage = () => {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => setUserData(data));
      }, []);

  return (
    <div>
        <h2 className='text-2xl text-blue-500'>User List</h2>
        <div className="bg-blue-500">
        <ButtonGroup
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
        className="gap-10 h-8"
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
          <Link href="/branchrights">
            <Button>
              <AiOutlinePlus/>
              Branch Rights
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/print">
            <Button>
            <AiOutlinePrinter />
            Print
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/pdfexport">
            <Button>
              <AiOutlineFilePdf />
              PDF Export
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/excelexport">
            <Button>
              <AiOutlineFileExcel />
              Excel Export
            </Button>
          </Link>
        </div>
      </ButtonGroup>
      </div>
        <div className="w-full mx-auto p-0">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-purple-900 dark:bg-purple-900 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                FullName
              </th>
              <th scope="col" className="px-6 py-3">
                CurrentRole
              </th>
              <th scope="col" className="px-6 py-3">
                Phone No
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.name} className="border-b dark:bg-white dark:border-purple-600">
                <td className="px-6 py-4 text-black">{user.username}</td>
                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-black">{user.id}</td>
                <td className="px-6 py-4 text-black">{user.phone}</td>
                <td className="px-6 py-4 text-black">{user.email}</td>
                <td className="px-6 py-4 text-black">{user.website}</td>
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
  )
}

export default UserPage