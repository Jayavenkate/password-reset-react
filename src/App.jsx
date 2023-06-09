import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PhoneList } from "./PhoneList";
import { Home } from "./Home";
import { LoginForm } from "./loginform";
import { ForgetPassword } from "./ForgetPassword";
import { VerifyOtp } from "./VerifyOtp";
import { Signup } from "./Signup";
import { SetPassword } from "./SetPassword";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/setpassword" element={<SetPassword />} />

        <Route path="/login/forgetpassword" element={<ForgetPassword />} />

        <Route
          path="/mobiles"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? (
    <section>
  
      {children}
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
