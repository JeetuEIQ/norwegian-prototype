import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { formContext } from "../../context/FormContext";
import { WordEnglish} from "./WordEnglish";
import { PhraseEnglish } from "./PhraseEnglish";
import { SentenceEnglish } from "./SentenceEnglish";

export const FrontCard = () => {
  const { select,option } = useContext(formContext);

  console.log("Front card",option)
  return (
    <>
    {option=="Words"&&<WordEnglish/>}
    {option=="Phrases"&&<PhraseEnglish/>}
    {option=="Sentence"&&<SentenceEnglish/>}

    </>
  );
};
