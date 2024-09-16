import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router-dom";
import NavBar from "./component/NavBar";
import HomePage from "./component/HomePage";
import Form from "./component/Form";
import About from "./component/About";
import Report from "./component/Report";
import Contact from "./component/Contact";
import AgencyForm from "./component/AgencyForm";
import AgencyDashboard from "./component/AgencyDashboard";
import AgencyLogin from "./component/AgencyLogin";

function Root() {
  const location = useLocation();
  const isFormPage = location.pathname === "/form";
  const isReportPage = useMatch("/report/:id"); // Use useMatch to handle dynamic route matching

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/agencyForm" element={<AgencyForm />} />
          <Route path="/agencyLogin" element={<AgencyLogin />} />
          <Route path="/agencyDashboard" element={<AgencyDashboard />} />
          <Route path="/report/:id" element={<Report />} />{" "}
          {/* Dynamic route */}
        </Routes>
      </div>
      {/* Show About and Contact only if it's not the form or report page */}
      {!isFormPage && !isReportPage && <About />}
      {!isFormPage && !isReportPage && <Contact />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

export default App;
