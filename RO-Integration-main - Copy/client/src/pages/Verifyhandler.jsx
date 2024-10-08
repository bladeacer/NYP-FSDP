import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


// TODO: Refactor to use and retrieve otp

export default function VerifyEmail() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: yup.object({
            otp: yup.string().trim()
                .max(6, 'Otp must be at most 36 characters')
                .required('otp is required')
        }),
        onSubmit: (data) => {
            http.put("/user/verifyhandler", data)
                .then((res) => {
                    if (res.data === "User was verified successfully") {
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                    }
                })
                .catch(function (err) {
                    window.location.reload();
                });
        }
    })

    return (
        <>
            <Box component="form" sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}>

                <Typography sx={{ my: 2, fontSize: '1.7em' }}>
                    Welcome back!
                </Typography>
                <Typography sx={{ fontSize: '1.15em' }}>
                    Enter your credientials to continue
                </Typography>

                <Typography variant='h6' sx={{ mt: 4 }}>Enter one-time password:</Typography>
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="OTP"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                />

                <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#8ab78f' }}
                    type="submit">
                    Verify
                </Button>

                <Typography variant='h6' sx={{ mt: 4 }}>After you verify, you will have to login again.</Typography>
            </Box>
            <ToastContainer />
        </>
    )
}