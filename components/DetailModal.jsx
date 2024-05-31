import { useFolderSize } from "@/app/services/queries"
import React, { useState } from "react"
import { BsFolder } from "react-icons/bs"

const DetailModal = ({ open, onClose, currentPath, server }) => {
  const folderSizeQuery = useFolderSize(currentPath)
  const { data, error, isLoading } = folderSizeQuery

  console.log(data?.folderSize)
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute bg-navy p-4 rounded-2xl shadow-lg w-80">
        <div className="flex gap-3">
          <BsFolder className="text-3xl mb-5" />
          <h1>
            {server} 
          </h1>
        </div>
        <p>Full Path:</p>
        <p>{currentPath}</p>
        <p>Size:</p>
        {isLoading ? (
          <p>Loading data size...</p>
        ) : (
          <p>
            {data?.folderSize} {data?.unit}
          </p>
        )}
      </div>
    </div>
  )
}

export default DetailModal
