"use client"
import { useDiskSpace } from "@/app/services/queries"
import { BsHddFill } from "react-icons/bs"
import React from "react"

const Diskspace = () => {
  const diskQuery = useDiskSpace()
  const { data: disks, error, isLoading } = diskQuery

  // Display a loading message or spinner when data is being fetched
  if (isLoading) {
    return (
      <div className="bg-navy p-5 rounded-3xl mb-5">
        <h1 className="text-lg">Loading Disk Space Information...</h1>
      </div>
    )
  }

  // Optionally handle the error state
  if (error) {
    return (
      <div className="bg-navy p-5 rounded-3xl mb-5">
        <h1 className="text-lg">Failed to load disk space information</h1>
      </div>
    )
  }

  return (
    <div className="bg-navy p-5 rounded-3xl mb-5">
      <h1 className="text-lg">Disk Space Information (CUST)</h1>
      <ul className="mt-2">
        {disks?.map((disk, index) => {
          const usedSpace =
            parseFloat(disk.TotalSizeGB) - parseFloat(disk.FreeSpaceGB)
          const usedPercentage =
            (usedSpace / parseFloat(disk.TotalSizeGB)) * 100

          return (
            <React.Fragment key={index}>
              <div className="flex gap-2 mt-3">
                <BsHddFill className="text-xl" />
                <p>Drive {disk.Drive}</p>
              </div>
              <li>
                {disk.FreeSpaceGB} free of {disk.TotalSizeGB}
              </li>
              <div className="bg-white w-full h-3 rounded-lg mt-2">
                <div
                  style={{ width: `${usedPercentage}%` }}
                  className={`${
                    usedPercentage >= 90 ? "bg-red-600" : "bg-primary-orange"
                  } h-3 rounded-lg tooltip`}
                />
              </div>
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Diskspace
