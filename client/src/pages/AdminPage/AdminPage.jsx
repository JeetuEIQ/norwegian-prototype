import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export const AdminPage = () => {
    const { socket } = useAuth();
    const [adminId, setAdminId] = useState(null);
    const [notification, setNotification] = useState(0)
    const clickHandler = (id) => {
        setAdminId(id);
    }
    const apiCallGetNotification = async () => {
        try {
            const postData = {
                user_id: adminId
            }
            let response = await axios.post("http://localhost:9000/api/notification/get-notification", postData, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if (response.data.status == 200) {
                setNotification(parseInt(response.data.data[0].notification))
            }
        } catch (err) {
            console.log("Failed at getting the notification : " + err.message)
        }
    }
    // const apiCallUpdateNotification = async () => {
    //     try {
    //         const postData = {
    //             notification_count: notification, user_id: adminId
    //         }
    //         let response = await axios.post("http://localhost:9000/api/notification/set-notification", postData, {
    //             headers: {
    //                 'Content-Type': "application/json"
    //             }
    //         })
    //         console.log("This is the result : ", response.data.message);
    //     } catch (err) {
    //         console.log("Failed at updating the notification : ", err.message);
    //     }
    // }
    useEffect(() => {

        socket.on("recieveNotification", ({ senderId, course_id, course_name, user_id }) => {
            console.log("This is working in the admin recieve : ", user_id, senderId);
            
            if (user_id == adminId) {

                console.log(`User with id : ${senderId} , has enrolled to course : ${course_name}`)
                setNotification(prevState => prevState + 1);
            }
        })
        return () => {
            socket.off("receiveNotification")
            // update the notification on the db
            // apiCallUpdateNotification();
        }
    }, [adminId])
    useEffect(() => {
        if (adminId) {
            // call to fetch the initial notification if there is any from the db
            apiCallGetNotification()
            socket.emit("adminLogin" , adminId)
        }
    }, [adminId])
    return (
        <Box height="100vh">
            {!adminId &&
                <Box height="50%" display="flex" flexDirection="column" justifyContent={"center"} alignItems="center">
                    <Box>
                        <Typography>Please Select your user Id</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => clickHandler(1)} color="warning" width="80px" variant="contained">1</Button>
                        <Button onClick={() => clickHandler(2)} color="warning" width="80px" variant="contained">2</Button>
                    </Box>
                </Box>
            }
            {adminId &&
                <Box height="50%" display="flex" flexDirection="column" justifyContent={"center"} alignItems="center">
                    <Box>
                        <Typography>This is admin : {adminId}</Typography>
                    </Box>
                    <Box>
                        <Typography>Your have currently the following notifications : {notification}</Typography>
                    </Box>
                    <Box>

                    </Box>
                </Box>
            }
        </Box>
    )
}
