import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import NavBar from "../components/NavBar.js";

function Signup({ user, setUser }) {
    const navigate = useNavigate();

    return (
        <main>
            <NavBar />
            <h1>Sign Up</h1>
            <SignupForm user={user} setUser={setUser} />
        </main>
    )
}
export default Signup;