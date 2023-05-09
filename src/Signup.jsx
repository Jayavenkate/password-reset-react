import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required("required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required").min(6),
});
export function Signup() {
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        
        username: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="signup">
        <h1>SignUp </h1>
        <div className="signup-con">
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            value={values.username}
            label="UserName"
            variant="outlined"
            error={touched.username && touched.error}
            helperText={
              touched.username && errors.username ? errors.username : ""
            }
          />
          <TextField
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            value={values.email}
            label="Email"
            variant="outlined"
            error={touched.email && touched.error}
            helperText={touched.email && errors.email ? errors.email : ""}
          />
          <TextField
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
            value={values.password}
            label="Password"
            variant="outlined"
            error={touched.password && touched.error}
            helperText={
              touched.password && errors.password ? errors.password : ""
            }
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
