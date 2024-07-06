import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import LoginForm from "../components/LoginForm.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.js";

function Login({ user, setUser }) {

    const navigate = useNavigate();

    return (
        <main>
            <NavBar />
            <h1 className="login-header">Welcome Back to your Teacher Toolbox!</h1>
            <h4 className="signup-loginpage">
                Don't have an account? &nbsp;
                <Button className="signup-button-loginpage" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </h4>
            <LoginForm user={user} setUser={setUser}/>
        </main>
    )
}

export default Login;