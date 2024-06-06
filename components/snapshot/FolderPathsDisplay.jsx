import { useState } from "react"
import { BsFolder } from "react-icons/bs"

const DayFolder = ({ dayFolderObj, fileCountData }) => {
  const getFileCount = (folderPath) => {
    const folderDate = folderPath.split("\\").slice(-3).join("-");
    const matchingItem = fileCountData.find(
      (item) => new Date(item.created_at).toLocaleDateString() === new Date(folderDate).toLocaleDateString()
    );
    return matchingItem ? matchingItem.data.fileCount : null;
  };

  const Folder = () =>
    dayFolderObj?.map((folder) => {
      const fileCount = getFileCount(folder.path);
      return (
        <div key={folder.path} className="folder-item">
          <BsFolder className="text-5xl" />
          <p className="absolute mt-3">{folder.name}</p>
          {fileCount !== null ? <p className="text-sm">{fileCount} Files</p> : <p className="file-count text-sm">-- Files</p>}
        </div>
      );
    });

  return (
    <div className="folder-grid">
      <Folder />
    </div>
  );
};

const MonthFolder = ({ monthFolderObj, fileCount }) =>
  monthFolderObj?.map((folder) => (
    <div className="mt-2" key={folder.path}>
      <div className="ml-5 flex gap-1">
        <BsFolder className="text-3xl" />
        <p className="ml-[2px] text-lg">{folder.name}</p>
      </div>
      <DayFolder dayFolderObj={folder.subfolders.folders} fileCountData={fileCount}/>
    </div>
  ))

const YearFolder = ({ selectedObject, fileCount }) =>
  selectedObject?.data?.folders?.map((folder) => (
    <div className="mt-3" key={folder.path}>
      <div className="flex gap-1">
        <BsFolder className="text-3xl" />
        <p className="ml-[2px] text-lg">{folder.name}</p>
      </div>
      <MonthFolder monthFolderObj={folder.subfolders.folders} fileCount={fileCount}/>
    </div>
  ))

const FolderPathsDisplay = ({ data, fileCount, server }) => {
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
  console.log(selectedObject)
  console.log(fileCount)

  return (
    <div className="mt-3">
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
      <div className="p-5  rounded-xl bg-navy">
        <p className="">Folder Structure (D:\backup_202405\daily_{server})</p>
        <YearFolder selectedObject={selectedObject} fileCount={fileCount}/>
      </div>
    </div>
  )
}

export default FolderPathsDisplay
