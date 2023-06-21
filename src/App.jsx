import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyQuestions from "./pages/MyQuestions";
import Logout from "./pages/Logout";
import Navigation from "./components/Navigation";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a cookie
    const hasCookie = document.cookie.includes("jwt");

    if (!hasCookie) {
      // Redirect the user to the home or login page
      navigate("/"); // Replace '/' with the appropriate URL of your home or login page
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/profile" element={<Profile />} />
        <Route path="dashboard/myquestions" element={<MyQuestions />} />
        {/* Using path="*"" means "match anything", so this route
               acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
