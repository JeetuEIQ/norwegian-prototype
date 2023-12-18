import React, { useEffect } from 'react'
import { FormModal } from '../Modal/FormModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Typography,Box } from '@mui/material'


export const Home = () => {
    const navigate = useNavigate()
    const verifyToken=async()=>{
        const response =await axios.post("http://localhost:9000/api/v1/verify-token",{},{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        if(response.data.status==400){
          navigate("/");
        }
      }
      useEffect(()=>{
        verifyToken()
      },[])
  return (
    <>
    {/* <Box display={"flex"} flexDirection={"column"}> */}
        <Typography variant='h4' textAlign={"center"} paddingTop={"10px"}>Welcome to our Learning App</Typography>
        <FormModal/>
        {/* </Box> */}
    </>
  )
}
