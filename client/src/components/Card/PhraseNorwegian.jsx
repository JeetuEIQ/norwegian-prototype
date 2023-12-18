import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { formContext } from "../../context/FormContext"

export const PhraseNorwegian = () => {
    const { select } = useContext(formContext);
  return (
    <>
          <Box
    height={"100%"}
    width={"100%"}
    display={"flex"}
    flexDirection={"column"}
  >
    <Box height={"10%"}>
      <Typography variant="h5" textAlign={"center"}>
        Norwegian
      </Typography>
    </Box>
    <Box height={"90%"} overflow={"auto"}>
      <Box
        minHeight={"5%"}
        display={"flex"}
        padding={"20px"}
        gap={1}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Typography variant="h6" fontWeight={"700"}>
          Norwegian:
        </Typography>
        <Typography
          textAlign={"justify"}
          fontWeight={"500"}
          variant="subtitle"
        >
          {" "}
          {select?.norwegian}
        </Typography>
      </Box>

    </Box>
  </Box>
    </>
  )
}
