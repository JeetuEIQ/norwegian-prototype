import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import io from 'socket.io-client';

export const CloudinaryVideo = ({ videoUrl }) => {
    // useEffect(() => {
    //     const socket = io('http://localhost:9000');

    //     socket.on('connect', () => {
    //         console.log('Connected to Socket.IO server');
    //     });
    //     // Connect to the Socket.IO server

    //     // Example: Listen for messages from the server
    //     // socket.on('chat message', (message) => {
    //     //     console.log('Received message:', message);
    //     // });

    //     // Clean up the socket connection when the component unmounts
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);
    return (
        <Box width="100%">
            {videoUrl && videoUrl.length > 0 && <div style={{ width: "100%" }}>
                <video style={{ width: "100%" }} muted={false} controls key={videoUrl}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>}
            {videoUrl && videoUrl.length < 1 && <Typography>No Video Found</Typography>}
        </Box>
    );

}
