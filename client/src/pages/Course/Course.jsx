import React, { useRef, useState } from 'react'
import styles from './course.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Input, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChapterCard } from '../../components/Card/ChapterCard';
import { QuestionCard } from '../../components/Card/QuestionCard';
import axios from 'axios';

export const Course = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [errorCourseName, setErrorCourseName] = useState(false);
    const [videos, setVideos] = useState({})
    const [informations, setInformations] = useState({});
    const [isSubmitting , setIsSubmitting] = useState(false);

    // error handling
    const [errorInfo, setErrorInfo] = useState({});
    const [errorVideo, setErrorVideo] = useState({});
    const [errorQuestion, setErrorQuestion] = useState({});
    const [anyError, setAnyError] = useState(false);

    const [chapters, setChapters] = useState([1]);
    const [question, setQuestion] = useState([1]);
    const [askedQuestion, setAskedQuestion] = useState({});
    const [full, setFull] = useState(false);
    const [fullQuestion, setFullQuestion] = useState(false);
    const inputRef = useRef();
    // const changeHandler = (e) => {
    //     setFile(e.target?.files[0])
    // }
    const clickHandler = () => {
        if (chapters.length == 10) {
            setFull(true);
            setTimeout(() => {
                setFull(false);
            }, 3000)
            return
        }
        let temp = [...chapters]
        temp.push(temp[temp.length - 1] + 1);
        setChapters(temp);
    }
    const clickHandlerQuestion = () => {
        if (question.length == 10) {
            return;
        }
        let temp = [...question];
        temp.push(temp[temp.length - 1] + 1);
        setQuestion(temp);
    }
    const checkErrors = () => {
        let errorInfo = {}
        let errorVid = {}
        let errorQuestions = {}
        let isError = false
        let nameError = false
        for (let item of chapters) {
            errorInfo[item] = false
            errorVid[item] = false
            if (informations[item].name.length < 1 || informations[item].description.length < 1) {
                errorInfo[item] = true;
                isError = true
            }
            if (!videos[item]) {
                errorVid[item] = true;
                isError = true
            }
        }
        for (let q_num of question) {
            errorQuestions[q_num] = false;
            if (askedQuestion[q_num].length < 1) {
                errorQuestions[q_num] = true;
                isError = true;
            }
        }
        if (courseName.length < 1) {
            nameError = true;
            isError = true
        }
        setErrorInfo(errorInfo)
        setErrorVideo(errorVid)
        setErrorQuestion(errorQuestions);
        setAnyError(isError);
        setErrorCourseName(nameError)
        return isError
    }
    const createCourseHandler = async () => {
        const anyError = checkErrors()
        setIsSubmitting(true);
        if (anyError) {
            setTimeout(() => {
                setAnyError(false);
                setIsSubmitting(false);
            }, 2000)
            return;
        }
        let chapter = {}
        let questions = { ...askedQuestion }
        let vids = []
        for (let item of chapters) {
            chapter[item] = { name: "", description: "", video: "" }
            chapter[item].name = informations[item].name
            chapter[item].description = informations[item].description
            // chapter[item].video = videos[item]
            vids.push(videos[item])
        }
        console.log("questions :", questions);
        console.log("chapter :", chapter);

        try {
            const formData = new FormData()
            // formData.append("chapters", chapter);
            formData.append("questions", JSON.stringify(questions));
            formData.append("chapter", JSON.stringify(chapter));
            formData.append("courseName", courseName);
            // formData.append("videos", vids)
            for (let i = 0; i < vids.length; i++) {
                formData.append("videos", vids[i]);
            }
            console.log("formData : ", formData);
            let response = await axios.post("http://localhost:9000/api/course/create", formData, {
                // headers: {
                //     'Content-Type': "multipart/form-data"
                // }
            })
            console.log("response.d : ", response);
            // console.log("chapter : ", response.data.data.chapters[1])
            if (response.data.status == 200) {
                console.log("In here")
                navigate(-1)
            }
        } catch (err) {
            console.log("Failed at uploading the course : ", err.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Box width="100%" height="100%" flexDirection={"column"} padding="15px" display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "500px" }} display="flex" flexDirection="column" gap={3}>
                <Box>
                    <Typography variant="h4" textAlign={"center"}>Create Your Course</Typography>
                </Box>
                <Box display="flex" justifyContent={"center"} flexDirection={"column"}>
                    {errorCourseName && <Box>
                        <Typography color="red">*Please Select a Video</Typography>
                    </Box>}
                    <TextField size='small' value={courseName} onInput={(e) => setCourseName(e.target.value)} variant='outlined' label="Course Name" fullWidth={true} />
                </Box>
                <Box>
                    <Typography variant="h6">Include Chapters:</Typography>
                    <Box height="80vh" className={styles.remove__scroll} overflow="scroll" padding="10px" border="1px solid black" >
                        {/* Chapters */}
                        {chapters.map((item) => {
                            return (
                                <Box margin={"20px 0"} key={item}>
                                    <ChapterCard chapter={item} errorInfo={errorInfo} errorVideo={errorVideo} informations={informations} setInformations={setInformations} videos={videos} setVideos={setVideos} />
                                </Box>
                            )
                        })}
                        <Box margin="20px 0" display="flex" justifyContent={"center"} alignItems={"center"}>
                            <AddCircleOutlineIcon onClick={!full ? clickHandler : () => { }} />
                        </Box>
                        {/* <Box border="1px solid black" borderRadius="10px" padding="20px" gap={2} display="flex" flexDirection={"column"} alignItems="flex-start">
                            <Box width={"60%"} display="flex">

                                <TextField fullWidth={true} label="Name" variant="outlined" size="small"></TextField>
                            </Box>
                            <Box width={"60%"} display="flex">

                                <TextField fullWidth={true} label="Description" multiline={true} rows={4} variant="outlined" size="small"></TextField>
                            </Box>
                            <Box width={"100%"} display="flex" flexDirection="column" fontWeight={700} justifyContent="center" alignItems="center">
                                <input hidden={true} type="file" name="video" accept="video/*" onChange={changeHandler} ref={inputRef} />
                                <Button variant="contained" color="primary" onClick={() => inputRef.current.click()}>Select Video</Button>
                                {file && <Typography variant="caption" fontWeight={700}>SELECTED :{file.name}</Typography>}
                            </Box>
                        </Box> */}
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6">Assignments: </Typography>
                    <Box padding="20px" gap={2} display="flex" flexDirection={"column"} alignItems="center">
                        {question.map((item) => {
                            return (
                                <QuestionCard errorQuestion={errorQuestion} questionNumber={item} askedQuestion={askedQuestion} setAskedQuestion={setAskedQuestion} />
                            )
                        })}
                        <Box margin="20px 0" display="flex" justifyContent={"center"} alignItems={"center"}>
                            <AddCircleOutlineIcon onClick={!fullQuestion ? clickHandlerQuestion : () => { }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            {full && <Alert severity="error" color="info">
                Cannot add anymore chapters
            </Alert>}
            {anyError && <Alert severity="error" color="info">
                Please complete all the fields
            </Alert>}
            <Box>
                <Button disabled={isSubmitting} onClick={createCourseHandler} variant="contained" color="success">Create Course</Button>
            </Box>
        </Box>
    )
}
