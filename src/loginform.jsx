import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { Button, Card, CardContent } from "@mui/material";
import { API } from "../global";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),

  password: yup.string().required("password required").min(6),
});
export function LoginForm() {
  const navigate = useNavigate();
  const [formstate, setFormState] = useState("success");
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const data = await fetch(`${API}/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        if (data.status == 401) {
          console.log("❌ Error");
          setFormState("error");
        } else {
          setFormState("success");
          const result = await data.json();
          console.log("✔success", result);
          localStorage.setItem("token", result.token);
          navigate("/mobiles");
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
          <Button color={formstate} type="submit" variant="contained">
            {formstate === "success" ? "Submit" : "Retry"}
          </Button>
          <small
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => navigate("/login/forgetpassword")}
          >
            forget password?
            <hr style={{ opacity: 0.5, width: "70%" }} />
          </small>
          <Button
            onClick={() => navigate("/signup")}
            variant="contained"
            sx={{ width: "200px", margin: "0 auto" }}
          >
            Create Account
          </Button>
        </div>
      </Card>
    </form>
  );
}
