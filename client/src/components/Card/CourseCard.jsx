import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
// import io from 'socket.io-client';
// const socket = io('http://localhost:9000');

export const CourseCard = ({ image, course_name, course_id, user_id }) => {
    const {socket} = useAuth();
    const navigate = useNavigate();
    const apiCallUpdateNotification = async () => {
        try {
            const postData = {
                user_id  :user_id
            }
            let response = await axios.post("http://localhost:9000/api/notification/update-notification" , postData, {
                headers : {
                    'Content-Type' : "application/json"
                }
            })
            console.log("THis is the result : ", response.data.message);
        } catch(err) {
            console.log("Failed at updating for the notification : ", err.message);
        }
    }
    const viewHandler = (course_id, course_name) => {
        apiCallUpdateNotification();
        socket.emit("view", {course_name : course_name, course_id : course_id, user_id : user_id})
        navigate("/course-page", { state: { course_name, course_id } })
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="course"
                height="140"
                image={image}
            />
            <CardContent>
                <Typography textTransform={"capitalize"} gutterBottom variant="h5" component="div">
                    {course_name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" onClick={() => viewHandler(course_id, course_name)}>View</Button>
            </CardActions>
        </Card>
    )
}
