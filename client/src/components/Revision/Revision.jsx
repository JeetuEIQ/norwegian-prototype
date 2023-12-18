import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

export const Revision = () => {
    const apiCallWord = async (type) => {
        try {
            const wordResponse = await axios.get("http://localhost:9000/api/v1/get-words", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log("WORDS : ", wordResponse.data.data)
            // setData(wordResponse.data.data)
        } catch (error) {
            console.log("Error in Sentence: ", error.message)
        }
    }
    const apiCallPhrase = async (type) => {
        try {
            // setOption(type)
            // return
            const phraseResponse = await axios.get("http://localhost:9000/api/v1/get-phrases", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log("Phrase : ", phraseResponse.data.data)
            // setData(phraseResponse.data.data)
        } catch (error) {
            console.log("Errors in Phrase: ", error.message)
        }
    }
    const apiCallSentence = async (type) => {
        try {
            // return 
            const sentenceResponse = await axios.get("http://localhost:9000/api/v1/get-sentence", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log("Sentence : ",sentenceResponse.data.data)

            // setData(sentenceResponse.data.data)
        } catch (error) {
            console.log("Errors: ", error.message)
        }
    }
    useEffect(() => {
        apiCallPhrase()
        apiCallSentence();
        apiCallWord();
    }, [])
    return (
        <Box>

        </Box>
    )
}
