"use client"
import { useDiskSpaceDb } from "@/app/services/queries"
import { useState } from "react"

const Component = () => {
  return (
    <div>
      <h1>Data from Supabase</h1>
    </div>
  )
}

export default function Statistics() {
  const diskSpaceQuery = useDiskSpaceDb
  const { data, error, isLoading } = diskSpaceQuery
    console.log(data)
  return <Component/>
}
