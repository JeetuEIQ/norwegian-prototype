import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReactSearchBox from "react-search-box";
import axios from "axios";
import { formContext } from "../../context/FormContext";
import LibraryModal from "../Modal/LibraryModal";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
export const Library = () => {
  const { open, setOpen, setSelect, option, setOption } = useContext(formContext)
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const apiCallWord = async (type) => {
    try {
      setOption(type)
      const wordResponse = await axios.get("http://localhost:9000/api/v1/get-words", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      // console.log(wordResponse.data.data)
      setData(wordResponse.data.data)
    } catch (error) {
      console.log("Error in Sentence: ", error.message)
    }
  }
  const apiCallPhrase = async (type) => {
    try {
      setData([])
      // console.log(type)  
      setOption(type)
      // setOption(type)
      // return
      const phraseResponse = await axios.get("http://localhost:9000/api/v1/get-phrases", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      console.log(phraseResponse, "phrase")
      setData(phraseResponse.data.data)
    } catch (error) {
      console.log("Errors in Phrase: ", error.message)
    }
  }
  const apiCallSentence = async (type) => {
    try {
      // return 
      setData([]);
      setOption(type)
      const sentenceResponse = await axios.get("http://localhost:9000/api/v1/get-sentence", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      console.log(sentenceResponse, "Sentence <==============")

      setData(sentenceResponse.data.data)
    } catch (error) {
      console.log("Errors: ", error.message)
    }
  }
  const handleOption = async (type) => {
    try {
      // console.log(type)
      switch (type) {
        case "Words": apiCallWord(type);
          break;
        case "Phrases": apiCallPhrase(type);
          break;
        case "Sentence": apiCallSentence(type);
          break;
        case "Revision": navigate("/revision");
          break;
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return (
    <>
      <Box display={"flex"} height={"100vh"} flexDirection={"column"} gap={6}>
        {/* Headers */}
        <Box
          height={"10%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4" sx={{ color: "orange" }}>
            Library of words and sentences
          </Typography>
        </Box>
        {/* Content */}
        <Box display={"flex"} flexDirection={"column"} height={"90%"}>
          {/* Button */}
          <Box display={"flex"} gap={6} paddingLeft={"20px"}>
            <Button variant="contained" onClick={() => handleOption("Words")} color="primary">Words</Button>
            <Button variant="contained" onClick={() => handleOption("Phrases")} color="secondary">Phrases</Button>
            <Button variant="contained" onClick={() => handleOption("Sentence")} color="error">Sentence</Button>
            <Box display="flex" justifyContent="flex-end" flexGrow="1" paddingRight="20px">
              <Button variant="contained" onClick={() => handleOption("Revision")} color="success">Revision</Button>
            </Box>
          </Box>
          {/* Words and content */}
          {option && <Box
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              minHeight={"90%"}
              height={"1px"}
              width={"30%"}
              border={"2px solid black"}
              borderRadius={"3%"}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              boxShadow={"2px 2px 2px 2px black"}
            >
              {/* Search */}
              <Box width={"50%"} boxShadow={"2px 2px 2px 2px black"} display={"flex"} justifyContent={"center"} maxHeight={"15%"} paddingTop={"10px"} >
                <Typography variant="h5" >{option}</Typography>
              </Box>
              {/* Words sentences and phrases */}
              <Box height={"90%"} gap={2} overflow={"auto"} marginTop={"10px"} width={"100%"}>

                {data.map((item, id) => {
                  return (
                    <Box
                      key={id}
                      minHeight={"10%"}
                      marginBottom={"10px"}
                      border={"1px solid black"}
                      display={"flex"}
                      justifyContent={"flex-start"}
                      paddingLeft={"10px"}
                      alignItems={"center"}
                      sx={{ cursor: "pointer" }}
                      boxShadow={"2px 2px 2px 2px black"}

                      onClick={() => {
                        setOpen(true)
                        setSelect(item)
                      }}

                    >
                      {/* <Typography   variant="subtitle" sx={{fontSize:"1.2rem"}}>{(option == "Words") ? item?.english?.word : ((option == "Phrases") ? item?.english : item?.english)} </Typography> */}
                      <Typography variant="subtitle" sx={{ fontSize: "1.2rem" }}>{(option == "Words") ? item?.english?.word : ((option == "Phrases") ? item?.english : item?.english)} </Typography>

                    </Box>
                  )
                })}

                <LibraryModal />

              </Box>
            </Box>
          </Box>}
        </Box>
      </Box>
    </>
  );
};
