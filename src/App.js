import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { MainNavigation } from "./Components/AuthComponents/NavigationComponent/MainNavigation";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { InvoiceEditor } from "./Components/InoviceEditor/InoviceEditor";
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



  console.log("BASE URL: " + baseUrl);
  console.log("BASE PATH: " + basePath);
  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route exacth path="home" element={<HomePage />}>
              <Route index element={<InvoiceEditor />} />
            </Route>
            <Route path="*" element={<div>404 REACT</div>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
