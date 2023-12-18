import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, Input, TextField, Typography } from '@mui/material';

export const ChapterCard = ({errorInfo, errorVideo, chapter, informations, setInformations, videos, setVideos}) => {
    const [file, setFile] = useState(null)
    const [name , setName] = useState("")
    const [description, setDescription] = useState("");
    const inputRef = useRef();
    const changeHandler = (e) => {
        setFile(e.target?.files[0])
    }
    useEffect(() => {
        let temp = {...videos}
        temp[chapter] = file
        setVideos(temp)
    }, [file])
    useEffect(() => {
        
        let temp = {...informations}
        if (!temp[chapter]?.name) {
            temp[chapter] = {name : "", description : ""}
        }
        temp[chapter].name = name
        temp[chapter].description = description
        setInformations(temp);
    }, [name, description])
    return (
        <Box border="1px solid black" borderRadius="10px" padding="20px" gap={2} display="flex" flexDirection={"column"} alignItems="flex-start">
            {errorInfo[chapter] && <Box>
                <Typography color="red">*Please fill the information</Typography>
            </Box>}
            <Box width={"100%"} display="flex">
                {/* <Typography variant="subtitle1">Name:</Typography> */}
                <TextField fullWidth={true} value={name} onInput={(e) => setName(e.target?.value)} label="Name" variant="outlined" size="small"></TextField>
            </Box>
            <Box width={"100%"} display="flex">
                {/* <Typography variant="subtitle1">Description:</Typography> */}
                <TextField fullWidth={true} value={description} onInput={(e) => setDescription(e.target?.value)} label="Description" multiline={true} rows={4} variant="outlined" size="small"></TextField>
            </Box>
            {errorVideo[chapter] && <Box>
                <Typography color="red">*Please Select a Video</Typography>
            </Box>}
            <Box width={"100%"} display="flex" flexDirection="column" fontWeight={700} justifyContent="center" alignItems="center">
                <input hidden={true} type="file" name="video" accept="video/*" onChange={changeHandler} ref={inputRef} />
                <Button variant="contained" color="primary" onClick={() => inputRef.current.click()}>Select Video</Button>
                {file && <Typography variant="caption" fontWeight={700}>SELECTED :{file.name}</Typography>}
            </Box>
        </Box>
    )
}
