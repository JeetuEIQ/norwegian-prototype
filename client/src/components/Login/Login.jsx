import React, { useContext, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { formContext } from "../../context/FormContext";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
export const Login = () => {
  const {verifyToken} = useContext(formContext)

  useEffect(()=>{
    verifyToken()
  },[])

  const useForm = useContext(formContext);
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      useForm.setProgress(50)
      const response = await axios.post(
        "http://localhost:9000/api/v1/login",
        data
      );
 
        if(response.data.status==404){
            useForm.notify("No User Found")
            return
        }
        if(response.data.status==401){
            useForm.notify("Incorrect Credentials")
            return
        }
        // console.log(response.data.message.token)
        localStorage.setItem("token",response.data.message.token)
        navigate("/home");
    } catch (error) {
      useForm.notify("Error connecting to DB", error.message);
    }finally{
        useForm.setProgress(100);
    }
  };
  return (
    <>
      <div>
        <LoadingBar
          progress={useForm.progress}
          color={"orange"}
          onLoaderFinished={() => useForm.setProgress(0)}
        />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (values.email == "") {
            errors.email = "Cannot be empty";
          }
          if (values.password == "") {
            errors.password = "Password field cannot be empty";
          }
          return errors;
        }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              height={"1px"}
              minHeight={"100vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"30%"}
                height={"70%"}
                border={"2px solid black"}
                borderRadius={"3%"}
                boxShadow={"2px 2px 2px 2px black"}
              >
                <Box
                  height={"20%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant="h4">Welcome to our App</Typography>
                </Box>
                <Box
                  height={"60%"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  on
                  justifyContent={"center"}
                  gap={7}
                >
                  <TextField
                    label={"Email"}
                    name="email"
                    sx={{ width: "60%" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                  ></TextField>
                  <TextField
                    label={"Password"}
                    name="password"
                    sx={{ width: "60%" }}
                    onBlur={handleBlur}
                    type="password"
                    helperText={touched.password ? errors.password : ""}
                    onChange={handleChange}
                  ></TextField>
                </Box>
                <Box
                  height={"20%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    variant="outlined"
                    sx={{ width: "30%" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};
