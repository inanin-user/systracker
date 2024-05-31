"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import BarChartComponent from "./BarChartComponent"

export default function Statistics() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data, error } = await supabase.from("disk-space").select("*")

      if (error) {
        setError(error.message)
      } else {
        // Sort the data by created_at in ascending order
        const sortedData = data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        setData(sortedData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading data: {error}</p>
  }

  const transformedData = data
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
  console.log(transformedData)

  const freeSpaceArray = transformedData.map((item) => item.freeSpaceGB)
  const createdAtArray = transformedData.map((item) => item.createdAt)

  return <BarChartComponent data={transformedData} />
}
