import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signin from './components/Signin';
import MyAccount from './components/MyAccount';

// importing NoteState made using context api() 
import NoteState from './context/notes/NoteState';

// importing AlertState made using context api() 
import AlertState from './context/alert/AlertState';

// importing DarktState made using context api() 
import DarkState from './context/darkmode/DarkState';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

function App() {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";

    }
  }

  return (
    <>
      <AlertState><NoteState><DarkState>
        
          <Router>
            {/* 1) 1st component Navbar */}
            <Navbar title="Bubble Notes" home="Notes" about="About us" mode={mode} toggleMode={toggleMode} />

            {/* 6) 6th component Alert component */}
            <Alert />

            <div className="container">
              {/* 2) 2nd component About */}
              <Routes>
                <Route exact path="/about"
                  element={<About />}
                />

                {/* 3) 3rd component Home */}
                <Route exact path="/"
                  element={<Home />}
                />

                {/* 8) 8th component Login */}
                <Route exact path="/login"
                  element={<Login />}
                />

                {/* 9) 9th component Home */}
                <Route exact path="/signin"
                  element={<Signin />}
                />

                {/* 10) 10th component Home */}
                <Route exact path="/myAccount"
                  element={<MyAccount />}
                />

              </Routes>
            </div>
          </Router>
          </DarkState></NoteState></AlertState>
      
    </>
  );
}

export default App;
