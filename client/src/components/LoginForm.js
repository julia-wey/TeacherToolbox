import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

function LoginForm({ user, setUser}) {
    const navigate = useNavigate();
    let { id } = useParams();
    
    console.log({user, setUser});

    const loginSchema = yup.object().shape({
        username: yup.string().required("username required").min(4, "Your username must contain at least 4 characters."),
        password: yup.string().required("password required").min(8, "Your password must contain at least 8 characters.")
    });

    const validate = values => {
        const errors = {};
        try {
            loginSchema.validateSync(values, { abortEarly: false });
        } catch (yupError) {
            yupError.inner.forEach(error => {
                errors[error.path] = error.message;
            });
        }
        return errors;
    };  

    const handleSubmit = (values) => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
                }).then((resp) => {
                    console.log('Login responser:', resp);
                    if (resp.ok) {
                        resp.json().then((user) => {
                            console.log('Logged in user:', user);
                            setUser(user);
                            navigate(`/teachers/${user.id}`);
                        });
                    } else {
                        console.log("errors")
                    }
                });
    };

    return (
        <Container maxWidth="sm" className="login-container">
            <Typography variant="h4" align="center" gutterBottom>
                Log In
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
                            style={{backgroundColor:"#748B6F", color:"#2A403D"}}
                            type="submit"
                            variant="contained"
                            disabled={pristine}
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