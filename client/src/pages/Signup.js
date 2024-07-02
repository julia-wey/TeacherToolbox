import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function Signup({ user, setUser }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Sign Up</h1>
            <SignupForm user={user} setUser={setUser} />
        </div>
    )
}
export default Signup;