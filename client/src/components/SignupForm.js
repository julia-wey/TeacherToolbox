import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function SignupForm({ setUser }) {
    const navigate = useNavigate();
    const [signup, setSignup] = useState(false);

    const signupSchema = yup.object().shape({
        first_name: yup.string().required("First name is required."),
        last_name: yup.string().required("Last name is required."),
        username: yup.string().min(4, "Your username must be at least 4 characters.").max(15, "Username is too long.").required("Username is required."),
        team: yup.string().required("Team is required."),
        password: yup.string().min(8, "Your password must contain at least 8 characters with one number.").max(18, "Password is too long.").required("Password is required."),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], "Passwords must match.").required("Password confirmation is required.") 
    });

    const validate = values => {
        const errors = {};
        const schema = signupSchema
        try {
            schema.validateSync(values, { abortEarly: false });
        } catch (yupError) {
            yupError.inner.forEach(error => {
                errors[error.path] = error.message;
            });
        }
        return errors;
    };  

    const handleSubmit = (values) => {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
                }).then((resp) => {
                    if (resp.ok) {
                        resp.json().then((user) => {
                            setUser(user);
                            navigate('/');
                        });
                    } else {
                        console.log("errors")
                    }
                });
    };

    return (
        <Container maxWidth="sm" className="signup-container">
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="first_name">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error ? meta.error : ""}
                                        />
                                </div>
                            )}
                        </Field>   
                        <Field name="last_name">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error ? meta.error : ""}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="team">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="Team"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error ? meta.error : ""}
                                    />
                                </div>
                            )}
                        </Field>
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
                        <Field name="passwordConfirmation">
                            {({ input, meta }) => (
                                <div>
                                    <TextField 
                                        {...input}
                                        label="Confirm Password"
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
                            Sign Up
                        </Button>
                    </form>
                )}
            />
        </Container>
    );
}

export default SignupForm;