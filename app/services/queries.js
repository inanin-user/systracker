'use client'
import useSWR from "swr";

export function useDiskSpace() {
    return useSWR('http://18.162.206.99/systracker-backend/disk-space')
}

export function useFolderDetails(server) {
    return useSWR(`http://18.162.206.99/systracker-backend/folder-details?server=${server}`)
}

export function useFolderSize(path) {
    return useSWR(`http://18.162.206.99/systracker-backend/folder-size?path=${path}`)
}

export function useNpdpFolderPathsDb() {
    return useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?table=folder-paths-npdp`)
}
export function useNpsFolderPathsDb() {
    return useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?table=folder-paths-nps`)
}

export function useDiskSpaceDb() {
    return useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData?table=disk-space`)
}