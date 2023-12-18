import React, { useContext } from 'react'
import { formContext } from '../../context/FormContext'
import { Box,Typography } from '@mui/material'
export const WordNorwegian = () => {
  const {select} = useContext(formContext)
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box height={"10%"}>
        <Typography variant="h5" textAlign={"center"}>
          Norwagein
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
            Word:
          </Typography>
          <Typography
            textAlign={"justify"}
            fontWeight={"500"}
            variant="subtitle"
          >
            {" "}
            {select?.norwegian?.word}
          </Typography>
        </Box>

        <Box
          minHeight={"5%"}
          display={"flex"}
          padding={"20px"}
          gap={1}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={"700"}>
            Parts of speech:
          </Typography>
          <Typography
            textAlign={"justify"}
            variant="subtitle"
            fontWeight={"500"}
          >
            {" "}
            {select?.norwegian?.parts_of_speech}
          </Typography>
        </Box>
        <Box
          minHeight={"5%"}
          display={"flex"}
          padding={"20px"}
          gap={1}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={"700"}>
            Definition:
          </Typography>
          <Typography
            textAlign={"justify"}
            variant="subtitle"
            fontWeight={"500"}
          >
            {" "}
            {select?.english?.definition}
          </Typography>
        </Box>
        <Box
          minHeight={"5%"}
          display={"flex"}
          padding={"20px"}
          gap={1}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={"700"}>
            Sentence:
          </Typography>
          <Typography
            textAlign={"justify"}
            variant="subtitle"
            fontWeight={"500"}
          >
            {" "}
            {select?.english?.sentence}
          </Typography>
        </Box>

        {/* If it is verb*/}
        {select?.english?.parts_of_speech == "verb" && (
          <>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              present_simple:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.present_simple}
              </Typography>
            </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              present_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.present_continuous}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              present_perfect:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.present_perfect}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              present_perfect_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.present_perfect_continuous}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              past_simple:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.past_simple}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              past_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.past_continuous}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              past_perfect:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.past_perfect}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              past_perfect_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.past_perfect_continuous}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              future_simple:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.future_simple}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              future_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.future_continuous}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              future_perfect:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.future_perfect}
              </Typography>
              </Box>
            <Box
              minHeight={"5%"}
              display={"flex"}
              padding={"20px"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={"700"}>
              future_perfect_continuous:
              </Typography>
              <Typography
                textAlign={"justify"}
                variant="subtitle"
                fontWeight={"500"}
              >
                {select.english.future_perfect_continuous}
              </Typography>
              </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
