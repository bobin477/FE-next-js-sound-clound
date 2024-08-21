"use client"

import { useParams, useSearchParams } from "next/navigation"

function DetailTrack(props:any) {
    const searchParam = useSearchParams()
    const search = searchParam.get("audio")
    console.log(search)
    return (
    <div>DetailTrack</div>
  )
}

export default DetailTrack