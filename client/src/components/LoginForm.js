import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {Form as BootstrapForm } from "react-bootstrap";

function LoginForm({ user, setUser }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const LoginSchema = yup.object().shape({
        username: yup.string().required("username required").min(4, "Your username must be at least 4 characters."),
        password: yup.string().required("password required").min(8, "Your password must be at least 8 characters.")
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
        <Container className="login-container">
            <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, pristine }) => (
                <BootstrapForm className="login-form" onSubmit={handleSubmit}>
                    <Field name="username">
                        {({ input, meta }) => (
                            <BootstrapForm.Group className="mb-3">
                                <BootstrapForm.Label>Username:</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    {...input}
                                    type="text"
                                    placeholder="Enter username"
                                    isInvalid={meta.touched && meta.error}
                                    />
                                    {meta.touched && meta.error && (
                                        <BootstrapForm.Control.Feedback type="invalid">
                                            {meta.error}
                                        </BootstrapForm.Control.Feedback>
                                    )}
                            </BootstrapForm.Group>
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) =>
                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>Password:</BootstrapForm.Label>
                            <BootstrapForm.Control
                                {...input}
                                type="password"
                                placeholder="Password"
                                inInvalid={meta.touched && meta.error}
                            />
                            {meta.touched && meta.error && (
                                <BootstrapForm.Control.Feedback type="invalid">
                                    {meta.error}
                                </BootstrapForm.Control.Feedback>
                            )}
                        </BootstrapForm.Group>
                        }
                    </Field>
                    <Button
                        className="login-button"
                        type="submit"
                        disabled={submitting || pristine}
                        >
                            Log In 
                        </Button>
                </BootstrapForm>
            )}
            />
        </Container>
    );
}

export default LoginForm;