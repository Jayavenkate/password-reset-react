import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { PhoneList } from "./PhoneList";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="phonelist"
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
  const token =localStorage.getItem("token");
  return token?(
      <section>
      <h1>This is Protected Route</h1>
    {children}
    </section>
    ) : ( 
   <h1>Unauthorized Entry</h1>
   );
}
function Home() {
  return (
    <div>
      <h1>Welcome to my Mobile shop</h1>
    </div>
  );
}
