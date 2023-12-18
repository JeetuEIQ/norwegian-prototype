import React from 'react'
import ReactFlipCard from 'reactjs-flip-card'
import { Box } from '@mui/material'
import { FrontCard } from './FrontCard'
import { BackCard } from './BackCard'
export const CardFlip = () => {
    const styles = {
        card: { color: 'black',  borderRadius: 0,height:"100%",width:"100%",cursor:"pointer",border:"1px solid black", boxShadow:"2px 2px 2px 2px black"},
        backcard: { color: 'black',  borderRadius: 0,height:"100%",width:"100%",cursor:"pointer",border:"1px solid black", boxShadow:"-2px -2px 2px 2px black"},
    }
  return (
    <>
    {/* <Box > */}
    <ReactFlipCard
    
    flipTrigger='onClick'
    frontStyle={styles.card}
    containerStyle={{height:"90%",width:"60%"}}
    backStyle={styles.backcard}
    frontComponent={<FrontCard/>}
    backComponent={<BackCard/>}
    />
    {/* </Box> */}
</>
  )
}
