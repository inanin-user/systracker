"use client"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import BackupFolderSnapshot from "./BackupFolderSnapshot"
import FolderPathsDisplay from "./FolderPathsDisplay"

const Snapshots = () => {
  const [folderPathsNpdpData, setFolderPathsNpdp] = useState([])
  const [folderPathsNpsData, setFolderPathsNps] = useState([])
  const [fileCountNpdpData, setFileCountNpdpData] = useState([])
  const [fileCountNpsData, setFileCountNpsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      try {
        const [
          folderPathsNpdpResponse,
          folderPathsNpsResponse,
          fileCountNpdpResponse,
          fileCountNpsResponse,
        ] = await Promise.all([
          supabase.from("folder-paths-npdp").select("*"),
          supabase.from("folder-paths-nps").select("*"),
          supabase.from("count-files-npdp").select("*"),
          supabase.from("count-files-nps").select("*"),
        ])

        if (folderPathsNpdpResponse.error) {
          throw folderPathsNpdpResponse.error
        }
        if (folderPathsNpsResponse.error) {
          throw folderPathsNpsResponse.error
        }
        if (fileCountNpdpResponse.error) {
          throw fileCountNpdpResponse.error
        }
        if (fileCountNpsResponse.error) {
          throw fileCountNpsResponse.error
        }
        setFolderPathsNpdp(folderPathsNpdpResponse.data)
        setFolderPathsNps(folderPathsNpsResponse.data)
        setFileCountNpdpData(fileCountNpdpResponse.data)
        setFileCountNpsData(fileCountNpsResponse.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading data: {error}</p>
  }
  return (
    <div className="snapshot-container">
      <FolderPathsDisplay
        data={folderPathsNpdpData}
        fileCount={fileCountNpdpData}
        server="npdp"
      />
      <FolderPathsDisplay
        data={folderPathsNpsData}
        fileCount={fileCountNpsData}
        server="nps"
      />
    </div>
  )
}

export default Snapshots
