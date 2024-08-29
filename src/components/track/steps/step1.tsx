'use client'
import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import "./theme.css"
import { useSession } from 'next-auth/react';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={(e) => e.preventDefault()}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button>
    );
}

interface IPops {
    setValue: any
    setTrackUpLoad: any
    trackUpLoad: any
}

export default function Step1(props: IPops) {
    const { setValue, setTrackUpLoad, trackUpLoad } = props
    const { data } = useSession()
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1)
            const audio = acceptedFiles[0]
            const formData = new FormData()
            formData.append('fileUpload', audio)
            try {

                const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${data?.access_token}`,
                        "target_type": 'tracks',
                        delay: 5000
                    },
                    //@ts-ignore
                    onUploadProgress: progressEvent => {
                        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                        setTrackUpLoad({
                            ...trackUpLoad,
                            fileName: acceptedFiles[0].name,
                            percent: percentCompleted
                        })
                    }
                })

                setTrackUpLoad((prev:any)=>({
                    ...prev,
                    uploadTrackName:res.data.data.fileName
                }))

                
            } catch (error) {
                //@ts-ignore
                alert(error?.response?.data)
            }

            // const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
            //     url: "http://localhost:8000/api/v1/files/upload",
            //     method: "DELETE",
            //     headers: {
            //         "Authorization": `Bearer ${data}`,
            // }             
            // })
        }
    }, [data])



    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'audio': [".mp3"]
        }
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Click or draw file to upload file</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}
