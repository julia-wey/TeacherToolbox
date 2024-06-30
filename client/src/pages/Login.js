import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import LoginForm from "../components/LoginForm.js";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="login-header">Welcome Back to your Teacher Toolbox!</h1>
            <h4 className="signup-loginpage">
                Don't have an account? &nbsp;
                <Button className="signup-button-loginpage" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </h4>
            <LoginForm />
        </div>
    )
}

export default Login;