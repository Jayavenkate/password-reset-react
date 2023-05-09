import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export function VerifyOtp() {
  const navigate = useNavigate();
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      OTP: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("http://localhost:5000/verifyotp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await data.json();
      console.log(data);
      navigate("/setpassword");
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={3}>
        <h2>OTP verification</h2>
        <p>Enter the OTP that we sent to your registered Email</p>
        <div className="signup-con">
          <TextField
            onChange={handleChange}
            name="OTP"
            value={values.OTP}
            label="OTP"
            variant="outlined"
          />
          <Button type="submit" color="secondary" variant="contained">
            Verify OTP
          </Button>
        </div>
      </Card>
    </form>
  );
}
