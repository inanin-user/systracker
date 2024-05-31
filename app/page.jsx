import Diskspace from "@/components/DiskSpace"
import CurrentBackupFolder from "@/components/CurrentBackupFolder"
import Statistics from "@/components/Statistics"

export default function Home() {
  return (
    <div className="home">
      <h1 className="text-3xl">Live Info</h1>
      <div className="live-info-grid mt-5">
        <Diskspace />
        <CurrentBackupFolder server="npdp" />
        <CurrentBackupFolder server="nps" />
      </div>
      <h1 className="text-3xl">Statistics</h1>
      <div className="live-info-grid mt-5">
        <Statistics />
      </div>
    </div>
  )
}
