import { Box, Typography } from '@mui/material'
import axios from 'axios';
import RecommendIcon from '@mui/icons-material/Recommend';
import styles from './course.module.css'
// import io from 'socket.io-client';

import React, { useEffect, useState } from 'react'
import { CloudinaryVideo } from "../../components/CloudinaryVideo/CloudinaryVideo";
import { useLocation } from 'react-router-dom';

// const socket = io('http://localhost:9000');

export const CoursePage = () => {
    const [data, setData] = useState([]);
    const [liked, setLiked] = useState({})
    const [chapter, setChapter] = useState({})
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const apiCallGetData = async () => {
        try {
            const postData = {
                course_id: course.course_id
            }
            console.log("POST DATA : ", postData);
            let response = await axios.post("http://localhost:9000/api/course/get-course-data", postData);
            console.log("this is responsE : ", response.data.data);
            if (response.data.status == 200) {
                setData(response.data.data);
                setChapter(response.data.data.chapters[0])
                let temp_liked = {}
                for (let chap of response.data.data.chapters) {
                    temp_liked[chap.chapter_id] = false
                }
                setLiked(temp_liked);
                setLoading(false);
            }
        } catch (err) {
            console.log("Error at making api call to get course Data : ", err.message);
        }
    }
    useEffect(() => {
        if (location.state) {
            setCourse(location.state);
            console.log("Location state : ", location.state);
        }
    }, [])
    useEffect(() => {
        if (course) {
            apiCallGetData();
        }
    }, [course])
    const likeHandler = () => {
        let temp = { ...liked }
        temp[chapter.chapter_id] = !temp[chapter.chapter_id];
        setLiked(temp);
        // if (temp[chapter.chapter_id]) {

        //     // socket.emit("liked" , () => {
        //     //  console.log("LIKED")
        //     // })
        // }
    }
    const clickHandler = (item) => {
        setChapter(item);
    }
    return (
        <Box height="100%">
            {!loading && <Box display="flex" width="100%" height="100vh">
                <Box width="70%" height="inherit" display="flex" flexDirection={"column"} justifyContent={"flex-start"} alignItems="flex-start">
                    <CloudinaryVideo videoUrl={data.videos[chapter.chapter_id]} />
                    <Box padding="5px 10px">
                        <RecommendIcon onClick={() => likeHandler()} color={liked[chapter.chapter_id] ? "primary" : ""} />
                    </Box>
                    <Box padding="5px 10px" paddingRight="0" width="100%">
                        <Box display="flex" width="90%" justifyContent={"space-between"}>
                            <Box width="35%">
                                <Typography variant="body2" fontWeight={700}>Chapter: </Typography>
                            </Box>
                            <Box width="65%">
                                <Typography variant="caption" textTransform={"capitalize"}>{chapter.chapter_name}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" width="90%" justifyContent={"space-between"} alignItems="center">
                            <Box width="35%">
                                <Typography variant="subtitle1" fontWeight={700}>Description: </Typography>
                            </Box>
                            <Box width="65%">
                                <Typography variant="caption" textTransform={"capitalize"}>{chapter.chapter_description}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box width="30%" height="100%" padding="10px" border="1px solid black" display="flex" flexDirection={"column"} gap={2}>
                    {data.chapters.map((item, key) => {
                        const thumbnail = `${data.videos[item.chapter_id].replace('mp4', 'jpg')}`
                        return (
                            <Box onClick={() => clickHandler(item)} key={key} display="flex" border={"2px solid transparent"} overflow="hidden" borderRadius="5px" className={chapter == item && styles.active}>
                                <Box width="40%">
                                    <img src={thumbnail} style={{ width: "100%", height: "100%", objectFit: 'cover', objectPosition: "center" }} />
                                </Box>
                                <Box width="60%" display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle1">Chapter {key + 1}</Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>}
            {/* {<Box display="flex" width="100%" height="100vh">
                
                <Box width="70%" height="inherit" display="flex" flexDirection={"column"} justifyContent={"flex-start"} alignItems="flex-start">
                    <CloudinaryVideo videoUrl={data.videos[chapter.chapter_id]} />
                    <Box padding="5px 10px">
                        <RecommendIcon onClick={() => likeHandler()} color={liked[chapter.chapter_id] ? "primary" : ""} />
                    </Box>
                    <Box padding="5px 10px">
                        <Typography variant='body2'>Chapter - {}</Typography>
                        <Typography variant="subtitle1">These are the contents of Chapter {chapter}</Typography>
                    </Box>
                </Box>

                
                <Box width="30%" height="100%" padding="10px" border="1px solid black" display="flex" flexDirection={"column"} gap={2}>
                    {data.map((item, key) => {
                        const thumbnail = `${item.url.replace('mp4', 'jpg')}`
                        return (
                            <Box onClick={() => clickHandler(item.video_id, key + 1)} key={key} display="flex" border={"2px solid transparent"} overflow="hidden" borderRadius="5px" className={activated == item.video_id && styles.active}>
                                <Box width="40%">
                                    <img src={thumbnail} style={{ width: "100%", height: "100%", objectFit: 'cover', objectPosition: "center" }} />
                                </Box>
                                <Box width="60%" display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle1">Chapter {key + 1}</Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>} */}
        </Box>
    )
}
