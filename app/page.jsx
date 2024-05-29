import BackupFolder from "@/components/BackupFolder";
import Diskspace from "@/components/DiskSpace";

export default function Home() {
  return (
    <div className="home">
      <Diskspace />
      <BackupFolder server="npdp"/>
      <BackupFolder server="nps"/>
    </div>
  )
}