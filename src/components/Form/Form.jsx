"use client"
import React,{useState,useEffect} from 'react'

const Form = ({user,handleEditChange}) => {
  return (
    <div>
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
    </div>
  )
}

export default Form