import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { formContext } from '../../context/FormContext';
import { useContext } from 'react';
import { CardFlip } from '../Card/CardFlip';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height:"80vh",
  p: 4,
};

export default function LibraryModal() {
  const {open,setOpen,option}= useContext(formContext)
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={"flex"}>
          <Box height={"100%"} width={"100%"}>
            <Box height={"10%"} ><Typography variant='h4' textAlign={"center"}>{option}</Typography></Box>
            <Box  height={"90%"}  display={"flex"}  gap={7}  flexWrap={"wrap"} justifyContent={"center"} overflow={"auto"}>
              <CardFlip/>
            </Box>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}