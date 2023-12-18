import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { formContext } from "../../context/FormContext";
export const PhraseForm = () => {
    const {phrase,setPhrase} = useContext(formContext)
  return (
    <>
      <TextField
        placeholder="Write your English Phrase here"
        multiline
        rows={5}
        onChange={(e)=>setPhrase({...phrase,english:e.target.value})}
        sx={{width:"50%"}}
      />
      <TextField
        placeholder="Write your Norwegian Phrase here"
        multiline
        rows={5}
        onChange={(e)=>setPhrase({...phrase,norwegian:e.target.value})}

        sx={{width:"50%"}}
      />
    </>
  );
};
