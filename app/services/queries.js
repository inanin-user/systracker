'use client'
import useSWR from "swr";

export function useDiskSpace() {
    return useSWR('/disk-space')
}

export function useFolderDetails(server) {
    return useSWR(`/folder-details?server=${server}`)
}

export function useFolderSize(path) {
    return useSWR(`/folder-size?path=${path}`)
}