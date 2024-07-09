import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import LoginForm from "../components/LoginForm.js";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

function Login({ user, setUser }) {

    const navigate = useNavigate();

    return (
        <div className="login-page">
            <NavBar />
            <h1 className="login-heading">Welcome Back to your Teacher Toolbox!</h1>
            <h4 className="signup-loginpage">
                Don't have an account? &nbsp;
                <Button className="secondary-button" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </h4>
            <LoginForm user={user} setUser={setUser}/>
            <Footer />
        </div>
    )
}

export default Login;