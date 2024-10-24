import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp, signIn, mobileSignIn, verifySecurityQuestions } from '../Redux/Slice/SignIn.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { MdCall } from "react-icons/md";
import PopUpImg from '../Assets/PopUp.png';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, LinearProgress, Box } from '@mui/material';

function SignIn(props, value) {
    // ... (keep existing state variables)
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [mobileForOtp, setMobileForOtp] = useState('');

    // Function to handle OTP input
    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            // Auto-focus next input
            if (value !== '' && index < 3) {
                const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    // Function to handle OTP verification
    const handleOtpVerify = async () => {
        const otp = otpValues.join('');
        try {
            // Add your OTP verification logic here
            // For example:
            // await dispatch(verifyOtp({ mobile: mobileForOtp, otp }));
            setShowOtpDialog(false);
            if (formType === 'signup') {
                setOpenModal(true); // Open registration questions after OTP verification
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert("OTP verification failed. Please try again.");
        }
    };

    // Modify the formik onSubmit handler
    const formik = useFormik({
        // ... (keep existing initialValues and validationSchema)
        onSubmit: async (values) => {
            if (formType === 'signup' && signInMethod === 'mobile') {
                // Store mobile number and show OTP dialog
                setMobileForOtp(values.mobile);
                setShowOtpDialog(true);
                // Add your send OTP logic here
                // For example:
                // await dispatch(sendOtp(values.mobile));
            } else if (formType === 'signup' && signInMethod === 'email') {
                setOpenModal(true);
                setSignupEmail(values.email);
            } else if (formType === 'signin') {
                // ... (keep existing signin logic)
            } else if (formType === 'forgot') {
                setOtpSent(true);
            }
        },
        // ... (keep other formik options)
    });

    // Add OTP Dialog component
    const renderOtpDialog = () => (
        <Dialog
            open={showOtpDialog}
            onClose={() => setShowOtpDialog(false)}
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '2px solid white',
                }
            }}
        >
            <DialogTitle sx={{ color: 'white', textAlign: 'center' }}>
                OTP Verification
            </DialogTitle>
            <DialogContent>
                <Typography color="white" align="center" sx={{ mb: 3 }}>
                    We've sent an OTP to {mobileForOtp}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                    {[0, 1, 2, 3].map((index) => (
                        <TextField
                            key={index}
                            name={`otp-${index}`}
                            value={otpValues[index]}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            variant="outlined"
                            inputProps={{
                                maxLength: 1,
                                style: { 
                                    textAlign: 'center',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px'
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="light"
                        onClick={handleOtpVerify}
                        disabled={otpValues.some(v => v === '')}
                    >
                        Verify OTP
                    </Button>
                </Box>
                <Typography 
                    color="white" 
                    align="center" 
                    sx={{ mt: 2, cursor: 'pointer' }}
                    onClick={handleResendOtp}
                >
                    Didn't receive OTP? Resend
                </Typography>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            {/* Keep existing JSX */}
            {/* Add OTP Dialog */}
            {renderOtpDialog()}
            
            {/* Keep existing modals */}
        </>
    );
}

export default SignIn;