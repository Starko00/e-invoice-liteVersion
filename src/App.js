import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { MainNavigation } from "./Components/AuthComponents/NavigationComponent/MainNavigation";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([""]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        
        <Router>
          <Routes>
            <Route exacth path="/" element={<LoginPage />} />

            <Route exacth path="/home" element={<HomePage />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
