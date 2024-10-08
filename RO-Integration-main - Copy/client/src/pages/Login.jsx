import React, { useContext } from 'react';
import { Box, Typography, TextField, Button, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StaffContext, UserContext } from '../contexts/Contexts';
import { LogBox, CustBox, LoginWrapper, CloseButton } from './reusables/components/login_components';


function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { setStaff } = useContext(StaffContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: "user"
        },
        validationSchema: yup.object({
            email: yup.string().trim()
                .email('Enter a valid email')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            password: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required')
        }),
        onSubmit: (data) => {
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            if (localStorage.getItem("accessToken")) {
                localStorage.removeItem("accessToken");
            }

            console.log("Role:", data.role);

            // Determine the endpoint based on a condition, e.g., isAdmin flag
            const endpoint = data.role === "admin" ? "/admin/login" : "/user/login";
            console.log("Endpoint:", endpoint); // Log the endpoint

            http.post(endpoint, data)
                .then((res) => {
                    console.log("Response:", res); // Log the entire response
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user || res.data.admin); // Adjust based on the response structure
                    console.log("Response data:", res.data.user || res.data.admin); // Log the entire response data

                    if (data.role === 'admin') {
                        navigate("/dashboard");
                    } else {
                        if (res.data.status !== 301) {
                            navigate("/home", { replace: true });
                            window.location.reload();
                        } else {
                            navigate("/verify", { replace: true });
                            window.location.reload();
                        }
                    }
                })
                .catch(function (err) {
                    console.error("Error:", err); // Log the error
                    if (err.response.data.message) {
                        toast.error(`${err.response.data.message}`);
                    } else {
                        toast.error(`${err}`);
                    }
                });
        }
    });

    return (
        <>
            <LoginWrapper style={{ marginTop: "50px"}}>
                <LogBox>
                    <Box component="form" sx={{ maxWidth: '500px' }}
                        onSubmit={formik.handleSubmit}>

                        <Typography sx={{ my: 2, fontSize: '1.7em' }}>
                            Welcome back!
                        </Typography>
                        <Typography sx={{ fontSize: '1.15em' }}>
                            Enter your credientials to login
                        </Typography>

                        <Typography variant='h6' sx={{ mt: 4 }}>Email address</Typography>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <Typography variant='h6' sx={{ mt: 2 }}>Password</Typography>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Password"
                            name="password" type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Role</FormLabel>
                            <RadioGroup
                                row
                                aria-label="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange} // Ensure handleChange updates formik state
                            >
                                <FormControlLabel value="user" control={<Radio />} label="User" />
                                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            </RadioGroup>
                        </FormControl>
                        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                            Login
                        </Button>

                        <Typography variant='h6' sx={{ mt: 2 }}>Don't have an account? <a href="/register">Register here</a></Typography>
                        <Typography variant='h6' sx={{ mt: 2 }}>Forgot your password? <a href="/reset">Click here</a></Typography>
                    </Box>
                    <ToastContainer />
                    <CustBox>
                        <Box sx={{ zIndex: '4', width: '100%', height: '100%', '&:hover': { backdropFilter: 'blur(9px)' } }}>
                            <Typography sx={{ position: 'relative', opacity: 0, zIndex: '5', width: '100%', height: '100%', color: '#fff', '&:hover': { opacity: 1 }, textTransform: 'unset', fontSize: '36px', fontWeight: 'bold', textAlign: 'center', transform: 'translate(0%, 35%)' }}>You will be logged out once the verification process is complete</Typography>
                        </Box>
                    </CustBox>

                    <CloseButton href="/home">X</CloseButton>
                </LogBox>
            </LoginWrapper>
        </>
    );
}

export default Login;