import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Form } from '../Form/Form';
import { useNavigate } from 'react-router-dom';
import { formContext } from '../../context/FormContext';
export const FormModal = () => {
    const navigate  = useNavigate();
    const useForm = useContext(formContext)
    const handleLogout=()=>{
        localStorage.clear();
        useForm.setCategory("")
        navigate("/")
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <Box display={"flex"} paddingTop={"20px"}  gap={"20px"} justifyContent={"space-around"}>
        <Box display={"flex"} gap={8}>
        <Button variant='contained' color='secondary' onClick={handleOpen}>Add Word</Button>
        <Button variant='contained' color='primary' onClick={()=>{
          useForm.setOption("")
          navigate("/library")}}>Library</Button>
        </Box>
        <Box>
            <Button variant='contained' color='error' onClick={()=>handleLogout()}>Logout</Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form/>
          </Box>
        </Modal>
      </Box>
    );
}
