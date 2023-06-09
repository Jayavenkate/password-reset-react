import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { Button, Card, CardContent } from "@mui/material";
import { API } from "../global";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
});
export function ForgetPassword() {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const data = await fetch(`${API}/login/forgetpassword`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(data);
        if (data.status === 200) {
          navigate("/verifyotp");
        } else {
          alert("user not found");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={3}>
        <h3>Trouble with logging in?</h3>
        <p>Enter your email address and we will send OTP</p>
        <div className="signup-con">
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

          <Button type="submit" variant="contained" color="secondary">
            Send OTP
          </Button>
        </div>
      </Card>
    </form>
  );
}
