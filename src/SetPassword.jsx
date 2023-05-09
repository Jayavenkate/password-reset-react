import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { Button, Card, CardContent } from "@mui/material";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),

  password: yup.string().required("password required").min(6),
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
          const result = await data.json();
          console.log("✔success", result);

          navigate("/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Card className="signup" elevation={3}>
        <h2>Login</h2>
        <div className="signup-con">
          <TextField
            value={values.email}
            onChange={handleChange}
            name="email"
            label="Email"
            variant="outlined"
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            value={values.password}
            onChange={handleChange}
            name="password"
            label="Enter New Password"
            variant="outlined"
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />

          <Button variant="contained" color="secondary" type="submit">
            confirm
          </Button>
        </div>
      </Card>
    </form>
  );
}
