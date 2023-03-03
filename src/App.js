import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import { InvoiceEditor } from "./Components/InoviceEditor/InoviceEditor";
import { Dashboard } from "./Pages/InnerPages/Dashboard";
import { ErrorPage } from "./Pages/ErrorPage";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([""]);
  
  // Fetch the base path of this app to be used by <Router> below.
  // IMPORTANT: It must NOT end with a slash, or React's router will be thrown off!
  let basePath = ".";
  const baseUrl = document.querySelector("base")?.getAttribute("href");
  if (baseUrl) {
    const url = new URL(baseUrl);
    basePath = url.pathname;
    if (
      basePath &&
      basePath.length > 0 &&
      basePath[basePath.length - 1] === "/"
    ) {
      basePath = basePath.substring(0, basePath.length - 1);
    }
  }

  // console.log("BASE URL: " + baseUrl);
  // console.log("BASE PATH: " + basePath);
  // basename={basePath}
  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router >
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<HomePage />}>
              <Route index element={<Dashboard/>} />
            </Route>
            <Route path="*" element={<ErrorPage/> } />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
