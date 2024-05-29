"use client"
import { useFolderDetails } from "@/app/services/queries"
import React from "react"
import { BsFolder } from "react-icons/bs"

const FolderTree = ({ folders }) => {
  return (
    <ul className="ml-3">
      {folders?.map((folder) => (
        <div className="flex gap-1">
          <BsFolder className="text-lg" style={{ marginTop: "2px" }} />
          <li>
            <div>{folder.name}</div>
            {folder.subfolders.folders.length > 0 && (
              <FolderTree folders={folder.subfolders.folders} />
            )}
          </li>
        </div>
      ))}
    </ul>
  )
}

const BackupFolder = ({ server }) => {
  const folderDetailsQuery = useFolderDetails(server)
  const { data: folderData, error, isLoading } = folderDetailsQuery

  if (isLoading)
    return (
      <div className="bg-navy p-5 rounded-3xl mb-5">
        <h1 className="text-lg">Loading backup folder info ({server})...</h1>
      </div>
    )

  return (
    <div className="bg-navy p-5 rounded-3xl mb-5">
      <h1 className="text-lg mb-3">Folder Structure (D:\backup_202405\daily_{server})</h1>
      <FolderTree folders={folderData?.folders} />
    </div>
  )
}
export default BackupFolder
