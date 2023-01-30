import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Pages/LoginPage';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route exacth path='/' element={<LoginPage/>} />
          <Route exacth path='/home' element={<HomePage/>}/>
        </Routes>
      </Router>
      
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
