"use client"

import WaveTrack from "@/components/track/waveTrack"
import { useParams, useSearchParams } from "next/navigation"

function DetailTrack(props: any) {
  const searchParam = useSearchParams()
  const search = searchParam.get("audio")
  console.log(search)
  return (
    <div>
      <WaveTrack />
    </div>
  )
}

export default DetailTrack