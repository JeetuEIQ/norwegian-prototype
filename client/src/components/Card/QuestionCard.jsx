import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export const QuestionCard = ({ errorQuestion, questionNumber, askedQuestion, setAskedQuestion }) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        let temp = { ...askedQuestion }
        temp[questionNumber] = value
        setAskedQuestion(temp)
    }, [value])
    return (
        <Box width={"80%"} display="flex" flexDirection="column">
            {/* <Typography variant="subtitle1">Description:</Typography> */}
            {errorQuestion[questionNumber] && <Box>
                <Typography color="red">*Please Write a question</Typography>
            </Box>}
            <TextField fullWidth={true} label={`Question ${questionNumber}`} value={value} onInput={(e) => setValue(e.target.value)} multiline={true} rows={4} variant="outlined" size="small"></TextField>
        </Box>
    )
}
