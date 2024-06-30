import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function LoginForm({ user, setUser }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const LoginSchema = yup.object().shape({
        username: yup.string().required("username required").min(4, "Your username must contain at least 4 characters."),
        password: yup.string().required("password required").min(8, "Your password must contain at least 8 characters.")
    });

    const handleSubmit = async (values, form) => {
        setSubmitting(true); // Start submitting
    
        try {
            // Validate form data
            await LoginSchema.validate(values, { abortEarly: false });
    
            // Send login request
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Login successful:", data);
    
            // Update user state or navigate on success
            setUser(data.user); // Assuming 'data.user' contains user info
            navigate("/dashboard"); // Redirect to dashboard or another page
    
        } catch (error) {
            console.error("Login error:", error);
            // Handle error state or display error message
        } finally {
            setSubmitting(false); // Ensure to reset submitting state after fetch completes
        }
    };
    // const handleSubmit = async (values) => {
    //     setSubmitting(true);
    //     console.log("form submitted");
    //     const fetchPromise = fetch("/login", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(values)
    //             });

    //     fetchPromise.then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //     }).then(data => {
    //         console.log(data);
    //     }).catch(error => {
    //         console.error('Fetch error:', error);
    //     });
    // }
    

    const validate = values => {
        const errors = {};
        try {
            LoginSchema.validateSync(values, { abortEarly: false });
        } catch (yupError) {
            yupError.inner.forEach(error => {
                errors[error.path] = error.message;
            });
        }
        return errors;
    };   

    return (
        <Container maxWidth="sm" className="login-container">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="username">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="text"
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error ? meta.error : ""}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error ? meta.error : ""}
                                    />
                                </div>
                            )}
                        </Field>
                        <Button
                            style={{backgroundColor:"#748B6F"}}
                            type="submit"
                            variant="contained"
                            //color=""
                            disabled={submitting || pristine}
                            fullWidth
                        >
                            Log In 
                        </Button>
                    </form>
                )}
            />
        </Container>
    );
}

export default LoginForm;