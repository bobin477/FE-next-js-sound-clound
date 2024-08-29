'use client'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import "./theme.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { sendRequest } from '@/utils/api';


interface IProps {
  trackUpLoad: any
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props: IProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={props.trackUpLoad.percent} />
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function InputFileUpload(props: any) {
  const { data } = useSession()
  const { info, setInfo } = props
  const handleUpload = async (image: any) => {
    const formData = new FormData()
    formData.append('fileUpload', image)
    try {

      const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
          "target_type": 'images',
        },
      })

      setInfo({
        ...info,
        imgUrl: res.data.data.fileName
      })

    } catch (error) {
      //@ts-ignore
      alert(error?.response?.data)
    }
  }

  return (
    <Button
      onChange={(e) => {
        const event = e.target as HTMLInputElement
        if (event.files) {
          handleUpload(event.files[0])
          console.log(event.files)
        }
      }}
      component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
interface INewTrack {
  title: string
  description: string
  trackUrl: string
  imgUrl: string
  category: string
}

export default function Step2(props: IProps) {
  const { data } = useSession()
  const { trackUpLoad } = props
  const [info, setInfo] = React.useState<INewTrack>(
    {
      title: '',
      description: '',
      trackUrl: '',
      imgUrl: '',
      category: ''
    }
  )


  const category = [
    {
      value: 'CHILL',
      label: 'CHILL',
    },
    {
      value: 'WORKOUT',
      label: 'WORKOUT',
    },
    {
      value: 'PARTY',
      label: 'PARTY',
    }
  ];

  const handleSubmitForm = async () => {
    console.log(info)
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
      url: "http://localhost:8000/api/v1/tracks",
      method: "POST",
      body: {
        title: info.title,
        description: info.description,
        trackUrl: info.trackUrl,
        imgUrl: info.imgUrl,
        category: info.category
      },
      headers: {
        Authorization: `Bearer ${data?.access_token}`,
      },
     
    })
    if (res.data) {
        alert(res.message)
    } else {
     alert("loi roi check lai di")
    }
   
  }

  React.useEffect(() => {
    if (trackUpLoad && trackUpLoad.uploadTrackName) {
      setInfo({
        ...info,
        trackUrl: trackUpLoad.uploadTrackName
      })
    }
  }, [trackUpLoad])

  console.log("info", info)
  return (
    <div> <div>
      <div>
        {trackUpLoad.fileName}
      </div>
      <LinearWithValueLabel trackUpLoad={trackUpLoad} />
    </div>

      <Grid container spacing={2} mt={5}>
        <Grid item xs={6} md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <div style={{ height: 250, width: 250, background: "#ccc" }}>
            <div>
              {
                info.imgUrl && <img height={250} width={250} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`} />
              }
            </div>

          </div>
          <div >
            <InputFileUpload info={info} setInfo={setInfo} />
          </div>

        </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            value={info?.title}
            onChange={(e) => setInfo(
              {
                ...info, title: e.target.value
              }
            )}
            label="Title"
            variant="standard"
            fullWidth
            margin="dense" />
          <TextField
            onChange={(e) => setInfo(
              {
                ...info, description: e.target.value
              }
            )}
            label="Description"
            variant="standard"
            fullWidth
            margin="dense" />
          <TextField
            sx={{
              mt: 3
            }}
            onChange={(e) => setInfo(
              {
                ...info, category: e.target.value
              }
            )}
            select
            label="Category"
            fullWidth
            variant="standard"
          //   defaultValue="EUR"
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={() => handleSubmitForm()}
            variant="outlined"
            sx={{
              mt: 5
            }}>Save</Button>
        </Grid>
      </Grid></div>
  )
}
