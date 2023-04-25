import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
});
export function VerifyOtp() {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit} =
    useFormik({
      initialValues: { OTP: "" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const data = await fetch("http://localhost:5000/verifyotp", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(data);
        if (data.status === 401) {
          alert("Invalid Otp");
        } else {
          navigate("/setpassword");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-form-container">
        <TextField
          value={values.OTP}
          onChange={handleChange}
          name="OTP"
          label="OTP"
          variant="outlined"
        />

        <Button type="submit" variant="contained">
          Verify Otp
        </Button>
      </div>
    </form>
  );
}
