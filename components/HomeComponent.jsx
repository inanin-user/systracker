"use client"
import Diskspace from "@/components/DiskSpace"
import CurrentBackupFolder from "@/components/CurrentBackupFolder"
import Statistics from "@/components/Statistics"
import Snapshots from "@/components/snapshot/Snapshots"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { useState, Fragment } from "react"
import { BsInfoCircle } from "react-icons/bs"

export default function HomeComponent() {
  const [infoIsOpen, setInfoIsOpen] = useState(false)

  const ScheduleComponent = ({ description, time }) => (
    <div className="flex justify-between gap-10">
      <p>{description}</p>
      <p>{time}</p>
    </div>
  )

  return (
    <div className="home">
      <div className="flex">
        <h1 className="text-3xl">Live Info</h1>
        <BsInfoCircle
          className="cursor-pointer text-3xl mt-1 ml-2"
          onClick={() => setInfoIsOpen(true)}
        />
      </div>
      <div className="live-info-grid mt-5">
        <Diskspace />
        <CurrentBackupFolder server="npdp" />
        <CurrentBackupFolder server="nps" />
      </div>
      <h1 className="text-3xl">Statistics</h1>
      <div className="mt-5 mb-5">
        <Statistics />
      </div>
      <h1 className="text-3xl">Snapshots (14:00~ Everyday)</h1>
      <div className="mb-5">
        <Snapshots />
      </div>

      <Transition appear show={infoIsOpen} as={Fragment}>
        <Dialog
          open={infoIsOpen}
          onClose={() => setInfoIsOpen(false)}
          className="relative z-50"
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 flex items-center justify-center p-4 w-screen">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="max-w-xl space-y-4 bg-navy rounded-2xl border-none p-12">
                <DialogTitle className="text-lg font-bold">
                  CUST Link Schedule
                </DialogTitle>
                <div>
                  <h2 className="font-bold">NPDP Backup</h2>
                  <ScheduleComponent
                    description="Database"
                    time="12:30 everyday"
                  />
                  <ScheduleComponent
                    description="Production"
                    time="13:15 everyday"
                  />
                </div>
                <div>
                  <h2 className="font-bold">NPS Backup</h2>
                  <ScheduleComponent
                    description="Database"
                    time="12:45 everyday"
                  />
                  <ScheduleComponent
                    description="Production"
                    time="13:00 everyday"
                  />
                </div>
                <div>
                  <h2 className="font-bold">Backup Deletion</h2>
                  <ScheduleComponent
                    description="7 days ago"
                    time="13:30 everyday"
                  />
                  <ScheduleComponent
                    description="Last month"
                    time="13:45 8th/month"
                  />
                  <ScheduleComponent
                    description="Last year"
                    time="14:00 8 Jan/year"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
