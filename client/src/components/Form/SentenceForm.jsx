import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { formContext } from "../../context/FormContext";
export const SentenceForm = () => {
    const {setSentence,sentence} = useContext(formContext)
  return (
    <>
      <TextField
        placeholder="Write your English sentence here"
        multiline
        rows={5}
        // maxRows={4}
        sx={{width:"50%"}}
        onChange={(e)=>{setSentence({...sentence,english:e.target.value})}}
      />
      <TextField
        placeholder="Write your Norwegian sentence here"
        multiline
        rows={5}
        // maxRows={4}
        sx={{width:"50%"}}
        onChange={(e)=>{setSentence({...sentence,norwegian:e.target.value})}}

      />
    </>
  );
};
