"use client"
import { useState } from "react"
import BackupFolder from "../BackupFolder"

const BackupFolderSnapshot = ({ data, server, fileCount }) => {
  console.log(fileCount)
  // Find the latest date
  const latestDate =
    data.length > 0
      ? new Date(data[data.length - 1].created_at).toLocaleDateString()
      : ""
  const latestObject = data.length > 0 ? data[data.length - 1] : null

  const [selectedDate, setSelectedDate] = useState(latestDate)
  const [selectedObject, setSelectedObject] = useState(latestObject)

  const handleDateChange = (event) => {
    const selectedDate = event.target.value
    setSelectedDate(selectedDate)
    const selectedObj = data.find(
      (item) => new Date(item.created_at).toLocaleDateString() === selectedDate
    )
    setSelectedObject(selectedObj)
  }

  const dateOptions = data.map((item) => (
    <option
      key={item.id}
      value={new Date(item.created_at).toLocaleDateString()}
    >
      {new Date(item.created_at).toLocaleDateString()}
    </option>
  ))

  return (
    <div className="mt-5">
      <div className="flex gap-3">
        <h1 className="capitalize text-xl">{server}</h1>
        <select
          className="text-black mb-5 mt-[4px]"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="" disabled="true">
            Select a date
          </option>
          {dateOptions}
        </select>
      </div>
      {selectedObject && (
        <BackupFolder
          folderData={selectedObject.data}
          current={false}
          server={server}
        />
      )}
    </div>
  )
}

export default BackupFolderSnapshot
