"use client"
import { useFolderDetails } from "@/app/services/queries"
import BackupFolder from "./BackupFolder"

const CurrentBackupFolder = ({ server }) => {
  const folderDetailsQuery = useFolderDetails(server)
  const { data: folderData, error, isLoading } = folderDetailsQuery
  if (isLoading) {
    return (
      <div className="bg-navy p-5 rounded-3xl mb-5">
        <h1 className="text-lg">Loading backup folder info ({server})...</h1>
      </div>
    )
  }

  return <BackupFolder folderData={folderData} server={server} />
}

export default CurrentBackupFolder
