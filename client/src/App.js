import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  
  function logoutUser() {
    setLoggedInUser(null)
  }
  useEffect(() => {
    fetch('/check_session')
      .then((resp) => {
        if (resp.ok) {
          resp.json().then(user => setLoggedInUser(user))
        }
      })
  }, [])



  return (
    <div>
      <Home logoutUser={logoutUser}/>
      {
        !!loggedInUser ?
        <Outlet />:
        <Login setUser={setLoggedInUser} />
      }
    </div>
  );
}

export default App;



