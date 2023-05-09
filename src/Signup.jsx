import TextField from "@mui/material/TextField";
import { Button, Card, CardContent } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  username: yup.string().required("required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required").min(6),
});
export function Signup() {
  const navigate= useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch("http://localhost:5000/signup", {
          method: "POSt",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });
        const result = await data.json();
        console.log(data);
        navigate("/login");
      },
    });
    const redirect =()=>{
      navigate("/login");
    }
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={3}>
        <h1>SignUp </h1>
        <div className="signup-con">
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            value={values.username}
            label="UserName"
            variant="outlined"
            error={touched.username && errors.username}
            helperText={
              touched.username && errors.username ? errors.username : ""
            }
          />
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
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
            value={values.password}
            label="Password"
            variant="outlined"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : ""
            }
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
          <small>already registered?</small>
        </div>
        <h4 className="signin" onClick={()=>redirect()} style={{cursor:"pointer"}}>SignIn</h4>
      </Card>
    </form>
  );
}
