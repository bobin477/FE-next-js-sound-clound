import WaveTrack from "@/components/track/waveTrack"
import { sendRequest } from "@/utils/api"
import { Container } from "@mui/material"

async function DetailTrack(props: any) {
  const { params } = props
  const res = await sendRequest<IBackendRes<ITrackTop>>(
    {
      url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
      method: "GET"
    }
  )

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 100,
      trackId: params.slug,
      sort: "-createdAt"
    }
  })

  return (
    <div>
      <Container>
        <div>
          <WaveTrack track={res?.data ?? null} comment={res1?.data?.result ?? []} />
        </div>
      </Container>
    </div>
  )
}

export default DetailTrack