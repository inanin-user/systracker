"use client"
import useSWR from "swr"

export function useDiskSpace() {
  return useSWR("http://18.162.206.99/systracker-backend/disk-space")
}

export function useFolderDetails(server) {
  return useSWR(
    `http://18.162.206.99/systracker-backend/folder-details?server=${server}`
  )
}

export function useFolderSize(path) {
  return useSWR(
    `http://18.162.206.99/systracker-backend/folder-size?path=${path}`
  )
}

export function useCountFiles(path) {
  return useSWR(
    `http://18.162.206.99/systracker-backend/count-files?path=${path}`
  )
}
