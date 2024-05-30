"use client"
import { useFolderDetails } from "@/app/services/queries"
import React, { useState } from "react"
import { BsFolder } from "react-icons/bs"
import DetailModal from "./DetailModal"

const FolderTree = ({ folders, open, setCurrentPath }) => {
  return (
    <ul className="ml-3">
      {folders?.map((folder, index) => (
        <li key={index}>
          <div className="flex gap-1">
            <BsFolder className="text-lg" style={{ marginTop: "2px" }} />
            <p className="cursor-pointer" onClick={() => {
              open()
              setCurrentPath(folder.path)
              }}>
              {folder.name}
            </p>
          </div>
          {folder.subfolders.folders.length > 0 && (
            <FolderTree setCurrentPath={setCurrentPath} folders={folder.subfolders.folders} open={open} />
          )}
        </li>
      ))}
    </ul>
  )
}

const BackupFolder = ({ server }) => {
  const folderDetailsQuery = useFolderDetails(server)
  const { data: folderData, error, isLoading } = folderDetailsQuery

  const [detailModal, setDetailModal] = useState(false)
  const [currentPath, setCurrentPath] = useState("")

  console.log(folderData)

  if (isLoading)
    return (
      <div className="bg-navy p-5 rounded-3xl mb-5">
        <h1 className="text-lg">Loading backup folder info ({server})...</h1>
      </div>
    )

  return (
    <div className="bg-navy p-5 rounded-3xl mb-5">
      <h1 className="text-lg mb-3">
        Folder Structure (D:\backup_202405\daily_{server})
      </h1>
      <FolderTree
        folders={folderData?.folders}
        open={() => setDetailModal(true)}
        setCurrentPath={setCurrentPath}
      />
      <DetailModal server={server} currentPath={currentPath} open={detailModal} onClose={() => setDetailModal(false)} />
    </div>
  )
}
export default BackupFolder
