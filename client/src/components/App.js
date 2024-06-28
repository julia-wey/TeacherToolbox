import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    {fetch("/check_session")
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        }
      }).then((user) => {
        console.log(user)
        setUser(user)
      });
    }
  }, []);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;
