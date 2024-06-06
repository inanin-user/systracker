"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import BarChartComponent from "./BarChartComponent"
import BackupFolderSnapshot from "./snapshot/BackupFolderSnapshot"

export default function Statistics() {
  const [diskSpaceData, setDiskSpaceData] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      try {
        const [diskSpaceResponse] = await Promise.all([
          supabase.from("disk-space").select("*"),
        ])

        if (diskSpaceResponse.error) {
          throw diskSpaceResponse.error
        }

        // Sort the disk-space data by created_at in ascending order
        const sortedDiskSpaceData = diskSpaceResponse.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        setDiskSpaceData(sortedDiskSpaceData)
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

  const transformedData = diskSpaceData
    .filter(
      (item) => item.data && item.data.some((drive) => drive.Drive === "D:")
    )
    .map((item) => {
      const dDrive = item.data.find((drive) => drive.Drive === "D:")
      return {
        createdAt: new Date(item.created_at).toLocaleDateString(),
        freeSpaceGB: parseFloat(dDrive.FreeSpaceGB),
      }
    })

  return (
    <div>
      <BarChartComponent data={transformedData} />
    </div>
  )
}
