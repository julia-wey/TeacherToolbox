import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

function Signup({ user, setUser }) {

    return (
        <div className="signup">
            <NavBar />
            <SignupForm user={user} setUser={setUser} />
            <Footer />
        </div>
    )
}
export default Signup;