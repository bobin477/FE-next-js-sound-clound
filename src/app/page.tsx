import MainSlider from "@/components/main/MainSlider";
import { Container } from "@mui/system";
import { sendRequest } from "@/utils/api";

export default async function HomePage() {
   
    const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "CHILL",
            limit: 10
        }
    })

    const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "WORKOUT",
            limit: 10
        }
    })

    const party = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "PARTY",
            limit: 10
        }
    })

    return (
        <div>
            <Container>
                <MainSlider title="Top Chill" data={chill?.data ? chill.data : []} />
                <MainSlider title="Top WordOut" data={workout?.data ? workout.data : []} />
                <MainSlider title="Top Party" data={party?.data ? party.data : []}/>
            </Container>
        </div>
    )
}