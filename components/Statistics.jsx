"use client"
import { useDiskSpaceDb } from "@/app/services/queries"
import { useState } from "react"

export default function Statistics({ initialData }) {
  const [data, setData] = useState(initialData)
  console.log(data)

  return (
    <div>
      <h1>Data from Supabase</h1>
      
    </div>
  )
}

export async function getServerSideProps() {
    const diskSpaceQuery = useDiskSpaceDb
    const { data, error, isLoading } = diskSpaceQuery

  return {
    props: {
      data,
    },
  }
}
