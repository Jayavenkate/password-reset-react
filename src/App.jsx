import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { PhoneList } from "./PhoneList";
import { Home } from "./Home";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
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
      <h1>This is Protected Route</h1>
      {children}
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}

