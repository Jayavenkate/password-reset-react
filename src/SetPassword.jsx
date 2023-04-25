import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required"),
});
export function SetPassword() {
  const navigate = useNavigate();
  
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const data = await fetch("http://localhost:5000/setpassword", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        if (data.status == 401) {
          console.log("❌ Error");
         
        } else {
        
          navigate("/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Reset your Password</h2>
      <div className="login-form-container">
        <TextField
          value={values.email}
          onChange={handleChange}
          name="email"
          label="email"
          variant="outlined"
          onBlur={handleBlur}
          error={touched.email && errors.email}
          helperText={touched.email && errors.email ? errors.email : null}
        />
        <TextField
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          variant="outlined"
          onBlur={handleBlur}
          error={touched.password && errors.password}
          helperText={
            touched.password && errors.password ? errors.password : null
          }
        />
        <Button color="secondary" type="submit" variant="contained">
        Confirm
        </Button>
      
      </div>
    </form>
  );
}