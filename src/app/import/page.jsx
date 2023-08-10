"use client"
import React, { useState } from 'react';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';

const ExcelImportPage = () => {
  const [data, setData] = useState([]);
  
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Excel Data Import</h1>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border border-dashed border-gray-400 p-4 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag and drop an Excel file here, or click to select one.</p>
            </div>
          )}
        </Dropzone>
        {data.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Imported Data:</h2>
            <pre className="bg-gray-200 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelImportPage;
