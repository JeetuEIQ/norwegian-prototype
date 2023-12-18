import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// import io from 'socket.io-client';
// const socket = io('http://localhost:9000');

export const HomeCourse = () => {
    const { socket } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState(0)
    const clickHandler = () => {
        // navigate("/course-builder",{ state : {data : "Heeloo"}})
        navigate("/course-builder")
    }
    const viewHandler = () => {
        navigate("/view-course")
    }
    const adminHandler = () => {
        navigate("/admin-page")
    }
    useEffect(() => {
        // Listen for 'receiveNotification' event from the server
        socket.on('receiveNotification', ({ userId, course_id, course_name }) => {
            // Update the receivedNotifications state with the new notification
            console.log("This is the sender : " + userId + " , he enrolled for : " + course_name);
            setValue(prevValue => prevValue + 1);
        });

        // Cleanup the event listener when the component unmounts
        return () => {
            socket.off('receiveNotification');
        };
    }, []);
    return (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Box>
                <Button variant="outlined" color="primary" onClick={clickHandler}>Build Course</Button>
            </Box>
            <Box>
                <Button variant="outlined" color="primary" onClick={viewHandler}>View Course</Button>
            </Box>
            <Box>
                <Button variant="outlined" color="primary" onClick={adminHandler}>Admin Page</Button>
                
            </Box>
            <Box>NOTIFICATIONS : {value && <Typography color="red" borderRadius="10px">{value}</Typography>}</Box>
        </Box>
    )
}
