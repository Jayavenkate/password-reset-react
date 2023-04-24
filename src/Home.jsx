import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function Home() {
  return (
    <div>
      <h1>Welcome to my Mobile shop</h1>
      <LoginForm />
    </div>
  );
}
function LoginForm() {
  const navigate = useNavigate();
  const [formstate, setFormState] = useState("success");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "jaya", password: "jaya@123" },
    // validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:5000/login", {
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
      <h2>Login</h2>
      <div className="login-form-container">
        <TextField
          value={values.username}
          onChange={handleChange}
          name="username"
          label="UserName"
          variant="outlined"
        />
        <TextField
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          variant="outlined"
        />
        <Button color={formstate}type="submit" variant="contained">
         {formstate==="success"?"Submit" :"Retry"}
        </Button>
      </div>
    </form>
  );
}
