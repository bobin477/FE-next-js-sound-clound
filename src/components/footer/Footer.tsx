"use client"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AppBar from '@mui/material/AppBar';
import { useHasMounted } from "@/utils/customhook";
import { Container } from "@mui/system";
import { useTrackContext } from '@/app/lib/trackWraper';
import { useRef } from 'react';

export default function Footer() {
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const hasMount = useHasMounted();
    const playRef = useRef(null)
    if (!hasMount) return (<></>);

   

    //@ts-ignore
    if (currentTrack.isPlaying) {
        //@ts-ignore
        playRef?.current?.audio.current.play()
        console.log("playRef?.current?.audio.current",)
    } else {
        //@ts-ignore
        playRef?.current?.audio.current.pause()
    }

    console.log("currentTrack", currentTrack)
    return <>
        {currentTrack._id && <div style={{ marginTop: "40px" }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }} >
                <Container sx={{
                    display: "flex", gap: 10, ".rhap_main": {
                        gap: "30px"
                    }
                }}
                >
                    <AudioPlayer
                        ref={playRef}
                        layout={"horizontal-reverse"}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                        volume={0.5}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2"
                        }}
                        onPlay={() => {
                            setCurrentTrack({ ...currentTrack, isPlaying: true })
                        }}
                        onPause={() => {
                            setCurrentTrack({ ...currentTrack, isPlaying: false })
                        }}
                    />

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        minWidth: 100,

                    }}>
                        <div style={{ color: "#ccc" }}>{currentTrack.title}</div>
                        <div style={{ color: "black" }}>{currentTrack.description}</div>
                    </div>
                </Container>
            </AppBar>
        </div>}
    </>
}