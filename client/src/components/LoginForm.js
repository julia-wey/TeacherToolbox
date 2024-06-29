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

    const handleSubmit = async (values) => {
        setSubmitting(true);
        console.log("form submitted");
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
            },
                body: JSON.stringify(values)
        });

        if (response.of) {
            const user = await response.json();
            setUser(user);
            console.log(user);
            setTimeout(() => navigate("/"), 500);
        } else {
            alert("Invalid credentials");
        }
        } catch (error) {
            console.error("Login failed", error);
        }
        setSubmitting(false);
    };

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
};

export default LoginForm;