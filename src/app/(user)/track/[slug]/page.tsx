"use client"

import WaveTrack from "@/components/track/waveTrack"
import { Container } from "@mui/material"
import { useParams, useSearchParams } from "next/navigation"

function DetailTrack(props: any) {
  const searchParam = useSearchParams()
  const search = searchParam.get("audio")
  return (
    <div>
      <Container>
        <WaveTrack />
      </Container>
    </div>
  )
}

export default DetailTrack