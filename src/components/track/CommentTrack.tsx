'use client'
import { fetchDefaultImages } from '@/utils/api';
import { Box, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { useHasMounted } from '@/utils/customhook';

interface IProps{
    comment: any
    track: any
}
export default function CommentTrack(props: IProps) {
    const { comment, track } = props
    const hasMounted = useHasMounted();
    const { data: session } = useSession();
    const [yourComment, setYourComment] = useState("");
   

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleSubmit = () => {
        console.log("tao ghi comment")
    }

    // const handleJumpTrack = (moment: number) => {
    //     if (wavesurfer) {
    //         const duration = wavesurfer.getDuration();
    //         wavesurfer.seekTo(moment / duration);
    //         wavesurfer.play();
    //     }
    // }


  return (
      <div>
          <div style={{ marginTop: "50px", marginBottom: "25px" }}>
              {session?.user &&
                  <TextField
                      value={yourComment}
                      onChange={(e) => setYourComment(e.target.value)}

                      fullWidth label="Comments" variant="standard"
                      onKeyDown={(e) => {
                          if (e.key === "Enter") {
                              handleSubmit()
                          }
                      }}

                  />
              }
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
              <div className='left' style={{ width: "190px" }}>
                  <Image
                      alt="avatar comment"
                      src={fetchDefaultImages(track?.uploader?.type!)}
                      height={150}
                      width={150}
                  />
                  <div>{track?.uploader?.email}</div>
              </div>
              <div className='right' style={{ width: "calc(100% - 200px)" }}>
                  {comment?.map((comment:any) => {
                      return (
                          <Box key={comment._id} sx={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                              <Box sx={{ display: "flex", gap: "10px", marginBottom: "25px", alignItems: "center" }}>
                                  <Image
                                      alt='comments'
                                      width={40}
                                      height={40}
                                      src={fetchDefaultImages(comment.user.type)}

                                  />
                                  
                                  <div>
                                      <div style={{ fontSize: "13px" }}>{comment?.user?.name ?? comment?.user?.email} at
                                          <span style={{ cursor: "pointer" }}
                                              //   onClick={() => handleJumpTrack(comment.moment)}
                                              onClick={()=>{}}
                                          >
                                              &nbsp; {formatTime(comment.moment)}
                                          </span>
                                      </div>
                                      <div>
                                          {comment.content}
                                      </div>
                                  </div>
                              </Box>
                              <div style={{ fontSize: "12px", color: "#999" }}>
                                  {/* {hasMounted && dayjs(comment.createdAt).fromNow()} */}
                              </div>
                          </Box>
                      )
                  })}

                 
              </div>
          </div>

    </div>
  )
}
