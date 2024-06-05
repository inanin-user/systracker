import { useCountFiles, useFolderSize } from "@/app/services/queries"
import { BsFolder } from "react-icons/bs"

const DetailModal = ({ open, onClose, currentPath, server }) => {
  const folderSizeQuery = useFolderSize(currentPath)
  const {
    data: folderSizeData,
    error: folderSizeError,
    isLoading: folderSizeIsLoading,
  } = folderSizeQuery

  const countFilesQuery = useCountFiles(currentPath)
  const {
    data: countFilesData,
    error: countFilesError,
    isLoading: countFilesIsLoading,
  } = countFilesQuery

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: "999" }}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute bg-navy p-4 rounded-2xl shadow-lg w-80">
        <div className="flex gap-3">
          <BsFolder className="text-3xl mb-5" />
          <h1>{server}</h1>
        </div>
        <p>Full Path:</p>
        <p>{currentPath}</p>
        <div className="mt-2">
          <p>Size:</p>
          {folderSizeIsLoading ? (
            <p>Loading data size...</p>
          ) : (
            <p>
              {folderSizeData?.folderSize} {folderSizeData?.unit}
            </p>
          )}
        </div>
        <div className="mt-2">
          <p>Contains:</p>
          {countFilesIsLoading ? (
            <p>Loading data count...</p>
          ) : (
            <p>{countFilesData?.fileCount} files</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailModal
