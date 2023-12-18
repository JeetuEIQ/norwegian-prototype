import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios'
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { WordForm } from "./WordForm";
import { SentenceForm } from "./SentenceForm";
import { PhraseForm } from "./PhraseForm";
import { formContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
export const Form = () => {
  const useForm = useContext(formContext);
  const navigate= useNavigate()


  //verifyToken
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

  //Word Submit
  const handleWordSubmit=async()=>{
    try {
      useForm.setProgress(50)
      const response = await axios.post("http://localhost:9000/api/v1/add-word",{
        data:useForm.word
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      console.log(response)
      if(response.data.status==500){
        useForm.notify("The word already exist");
        return
      }
      if(response.data.status==400){
        useForm.notify("Token Expired")
        setTimeout(()=>{navigate("/")},1000)
        return
      }
      useForm.notify("Word Added Successfully");
      useForm.setCategory("")

    } catch (error) {
      useForm.notify("Connection Problem")
      console.log(error.message)
    }finally{
      useForm.setProgress(100)
    }
  }

  //Sentence Submit
  const handleSentenceSubmit=async()=>{
    try {
      const response = await axios.post("http://localhost:9000/api/v1/add-sentence",{
        data:useForm.sentence
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      console.log(response,"<==sentence")
      if(response.data.status==500){
        useForm.notify("Sentence already exist");
        return
      }
      if(response.data.status==400){
        useForm.notify("Token Expired")
        setTimeout(()=>{navigate("/")},1000)
        return
      }
      useForm.notify("Sentence Added Successfully");
      useForm.setCategory("")


    } catch (error) {
      console.log(error.message)
    }
  }

  //PhraseHandler
  const handlePhraseSubmit=async()=>{
    try {
      const response = await axios.post("http://localhost:9000/api/v1/add-phrase",{
        data:useForm.phrase
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      console.log(response,"<===========Phrase Response")
      if(response.data.status==500){
        useForm.notify("Phrase already exist");
        return
      }
      if(response.data.status==400){
        useForm.notify("Token Expired")
        setTimeout(()=>{navigate("/")},1000)
        return
      }
      useForm.notify("Phrase Added Successfully");
      useForm.setCategory("")
    } catch (error) {
      console.log(error.message)
    }
  }

  //Main Submit handler
  const handleSubmit = (type, e) => {
    try {
      e.preventDefault();
      switch (type) {
        case "word":handleWordSubmit();
        break;
        case "sentence":handleSentenceSubmit();
        break;
        case "phrase":handlePhraseSubmit();
        break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form action="">
      <div>
      <LoadingBar
        progress={useForm.progress}
        color={"orange"}
        onLoaderFinished={() => useForm.setProgress(0)}
      />
      </div>
      <ToastContainer/>
        <Box
          minHeight={"100vh"}
          height={"1px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Typography variant="h4" color={"secondary"}>
            Add your vocabulary
          </Typography>
          <Box
            height={"90%"}
            width={"80%"}
            border={"2px solid black"}
            borderRadius={"2%"}
            boxShadow={"10px 2px 2px 2px black"}
            gap={5}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <FormControl sx={{ width: "20%", marginTop: "30px" }}>
              <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={4}
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={useForm.category}
                  label="Category"
                  onChange={(e) => useForm.setCategory(e.target.value)}
                  fullWidth
                >
                  <MenuItem value={"word"}>Word</MenuItem>
                  <MenuItem value={"sentence"}>Sentence</MenuItem>
                  <MenuItem value={"phrase"}>Phrase</MenuItem>
                </Select>
              </Box>
            </FormControl>

            {/* Word */}
            {useForm.category == "word" && <WordForm />}

            {/* Sentence */}
            {useForm.category == "sentence" && <SentenceForm />}
            {useForm.category == "phrase" && <PhraseForm />}
            {useForm.category != "" && (
              <Button
                variant="contained"
                sx={{ marginBottom: "10px" }}
                type="submit"
                onClick={(e) => handleSubmit(useForm.category, e)}
                color="secondary"
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </>
  );
};
