import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup.js";
import TeacherPage from "./pages/TeacherPage.js";
import { AppContext } from "./context/Context"

function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    {
      fetch('/check-session')
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
      })
      .then((user) => {
        console.log('User data:', user);
      setUser(user)
      });
    }
  }, []);

  return (
    <div>
      <AppContext.Provider value={{user, setUser}}>
        <div>
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
            <Route path="/teachers" element={<TeacherPage user={user} setUser={setUser} />} />
            <Route path="/teachers/:id" element={<TeacherPage user={user} setUser={setUser} />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;



