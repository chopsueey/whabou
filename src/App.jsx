import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyQuestions from "./pages/MyQuestions";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/profile" element={<Profile />} />
          <Route path="dashboard/myquestions" element={<MyQuestions />} />
          {/* Using path="*"" means "match anything", so this route
               acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
