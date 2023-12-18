import React, { useEffect, useState } from 'react'
import styles from './view.module.css'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import course1 from '../../assets/course/course1.jpg'
import course2 from '../../assets/course/course2.jpg'
import course3 from '../../assets/course/course3.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../../components/Card/CourseCard'

export const ViewCourse = () => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([])
    const [courses, setCourses] = useState([course1, course2, course3])
    const apiCallGetCourse = async () => {
        try {
            let response = await axios.get("http://localhost:9000/api/course/get-course")
            if (response.data.status == 200) {
                console.log("response : ", response.data.data)
                setCourseData(response.data.data);
            }
        } catch (err) {
            console.log("Failed to fetch the course data : ", err.message);
        }
    }
    useEffect(() => {
        apiCallGetCourse();
    }, [])

    let k = -1;
    return (
        <Box height="100vh" display="flex" justifyContent="center" alignItems='center'>
            <Box width="80vw" height="80vh">
                <Box margin="30px 0" display="flex" width="100%" justifyContent="center">
                    <Typography variant="h3" fontWeight={700}>Courses</Typography>
                </Box>
                <Box height="80%" overflow="scroll" className={styles.remove__scroll} display="flex" flexWrap="wrap" justifyContent="flex-start" padding="10px" gap={2}>
                    {/* courses */}
                    {courseData.length > 0 && courseData.map((item) => {
                        k++;
                        return (
                            <Box flexBasis={"30%"} key={item.course_id}>
                                <CourseCard image={courses[k % courses.length]} course_name={item.course_name} course_id={item.course_id} user_id={item.user_id} />
                                {/* <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="course"
                                        height="140"
                                        image={courses[k % courses.length]}
                                    />
                                    <CardContent>
                                        <Typography textTransform={"capitalize"} gutterBottom variant="h5" component="div">
                                            {item.course_name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" size="small" onClick={() => viewHandler(item.course_id, item.course_name)}>View</Button>
                                    </CardActions>
                                </Card> */}
                            </Box>
                        )
                    })}
                    {courseData.length < 1 &&
                        <Box flexBasis="100%" display="flex" justifyContent="center">
                            <Typography variant="h4" color="lightblue">No Course Found!</Typography>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}
