import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaApple, FaEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import PopUpImg from '../Assets/PopUp.png'
import { object, string, number, ref } from 'yup';
import { useFormik } from 'formik';
import { GetUser, signIn, signUp } from '../Redux/Slice/SignIn.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button as MuiButton,
    Typography
} from '@mui/material';


function SignIn(props, value) {

    const [formType, setformType] = useState('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // State to track successful signup
    const [userName, setUserName] = useState(''); // State to store the user's name
    const [step, setStep] = useState(1); // State for managing popup steps
    // Update modal state to use MUI Dialog terminology
    const [openModal, setOpenModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(GetUser(value));
    }, [dispatch]);


    const userStatus = useSelector((state) => state.signIn.user);
    console.log(userStatus);

    // Validation

    let authSchema = {},
        initialValues = {};

    if (formType === 'signin') {
        authSchema = object({
            email: string().email('Invalid email address').required('Email is required'),
            password: string().required('Password is required'),
        });

        initialValues = {
            email: "",
            password: "",
        };
    } else if (formType === 'signup') {
        authSchema = object({
            email: string().email('Invalid email address').required('Email is required'),
            password: string()
                .min(8, 'Password must be at least 8 characters,one letter,one number')
                .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one letter, one number, and one special character')
                // .matches(/[0-9]/, 'Password must contain at least one number')
                .required('Password is required'),
            confirmPassword: string()
                .oneOf([ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),

        });
        initialValues = {
            email: "",
            password: "",
        };
    } else if (formType === 'forgot') {
        authSchema = object({
            email: string().email('Invalid email address').required('Email is required'),
            otp: otpSent ? string().required('OTP is required').length(6, 'OTP must be 6 digits') : string(),
        });
        initialValues = { email: "", otp: "" };
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: authSchema,
        onSubmit: async (values, { resetForm }) => {
            if (formType === 'signup') {
                try {
                    // Dispatch signUp action and wait for it to complete
                    const response = await dispatch(signUp(values)).unwrap();
                    // Check for a successful signup, then show modal
                    if (response) {
                        alert("Sign  successful!");
                        setIsSignUpSuccessful(true); // Open modal
                        alert("Sign up successful!");
                    }
                } catch (error) {
                    console.log("Signup failed: ", error.message);
                }
            } else if (formType === 'signin') {
                console.log('Signin attempt:', values);
                // dispatch signIn(values) logic here
            }
        },
    });

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return; // Ensure only numbers are entered
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp === '6666') { // Static OTP for demonstration
            alert('OTP verified successfully!');
            // Add logic here to proceed after successful verification
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleResendOtp = () => {
        // console.log("Resending OTP to", values.email);

    };

    const { handleBlur, handleChange, errors, touched, values } = formik

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formType === 'signup') {
            try {
                // Dispatch signUp action and wait for it to complete
                const response = await dispatch(signUp(values)).unwrap();
                if (response) {
                    setOpenModal(true);
                    // setIsSignUpSuccessful(true); // Set the signup successful flag
                    alert("Sign up successful!"); // Alert for successful signup
                }
            } catch (error) {
                console.log("Signup failed: ", error.message);
            }
        } else if (formType === 'signin') {
            try {
                const response = await dispatch(signIn(values)).unwrap();
                if (response) {
                    alert("Login successful!"); // Alert for successful login
                    navigate('/'); // Redirect to the home page
                } else {
                    alert("Login failed!"); // Alert for failed login
                }
            } catch (error) {
                console.log("Login failed: ", error.message);
            }
        }
    };

    const handleNameSubmit = () => {
        // Handle submission of the user's name
        alert(`Welcome, ${userName}!`);
        // setIsSignUpSuccessful(false); // Close the popup after submission
        handleModalClose();
    };

    // Handle modal actions
    const handleModalClose = () => {
        setOpenModal(false);
        setModalStep(1);
        setUserName('');
    };

    const handleNextStep = () => {
        setModalStep(2);
    };

    const handlePreviousStep = () => {
        setModalStep(1);
    };

    return (
        <>
            <div className='k_popBg_image'>
                <div>
                    <div className="row p-5 k_popup_row ">
                        <div className=" col-md-6">
                            <div className="k_glass_effect text-light rounded k_form-width">
                                <h3 className={`text-center ${formType === 'forgot' && otpSent ? 'mb-0' : ''} ${formType === 'forgot' && !otpSent ? 'mb-5' : 'mb-4'}`}>
                                    {formType === 'signin' ? 'Welcome Back User!' :
                                        formType === 'signup' ? 'Welcome User' :
                                            formType === 'forgot' && !otpSent ? 'Forgot Password' :
                                                formType === 'forgot' && otpSent ? 'OTP Verification' : null
                                    }
                                </h3>
                                <Form onSubmit={handleSubmit}>
                                    {(formType !== 'forgot' || (formType === 'forgot' && !otpSent)) && (
                                        <Form.Group className={`mb-3 ${formType === 'forgot' ? 'mb-5' : ''}`} controlId="formBasicEmail">
                                            <div className="input-group">
                                                <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                    <FaEnvelope />
                                                </span>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    className="border-start-0 border-secondary inputStyle"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                            </div>
                                            {touched.email && errors.email ? (
                                                <span className='text-danger'>{errors.email}</span>
                                            ) : null}
                                        </Form.Group>
                                    )}

                                    {formType !== 'forgot' && (
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <div className="input-group">
                                                <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                    <FaLock />
                                                </span>
                                                <Form.Control
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    className="border-start-0 border-end-0 border-secondary inputStyle"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                            {touched.password && errors.password ? (
                                                <span className='text-danger'>{errors.password}</span>
                                            ) : null}
                                        </Form.Group>
                                    )}

                                    {formType === 'signup' && (
                                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                                            <div className="input-group">
                                                <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                    <FaLock />
                                                </span>
                                                <Form.Control
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    placeholder="Confirm your password"
                                                    className="border-start-0 border-end-0 border-secondary inputStyle"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.confirmPassword}

                                                />
                                                <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                            {touched.confirmPassword && errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                        </Form.Group>
                                    )}

                                    {formType === 'forgot' && otpSent && (
                                        <div className="text-light rounded" style={{ maxWidth: '300px', margin: 'auto' }}>
                                            <p className="text-center mb-5">We've sent an OTP to {values.email}</p>
                                            <Form onSubmit={handleOtpSubmit}>
                                                <div className="d-flex justify-content-evenly mb-4">
                                                    {otp.map((digit, index) => (
                                                        <Form.Control
                                                            key={index}
                                                            id={`otp-${index}`}
                                                            type="text"
                                                            maxLength="1"
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                                            className="mx-1 text-center bg-dark text-light border-secondary"
                                                            style={{ width: '40px', height: '40px' }}
                                                        />
                                                    ))}
                                                </div>
                                                <Button variant="light" type="submit" className="w-100 mb-3 fw-bold">
                                                    Verify
                                                </Button>
                                                <p className="text-center mb-3">
                                                    Didn't receive OTP? <Button variant="link" className="p-0 text-light" onClick={handleResendOtp}>Resend</Button>
                                                </p>
                                            </Form>
                                        </div>
                                    )}

                                    {formType === 'signin' && (
                                        <div className="text-end mb-3">
                                            <a href="#" onClick={() => setformType('forgot')} className="text-danger text-decoration-none">Forgot Password?</a>
                                        </div>
                                    )}

                                    {(formType !== 'forgot' || !otpSent) && (
                                        <Button variant="light" type="submit" className="w-100 mb-3 fw-bold">
                                            {formType === 'signin' ? 'Sign In' :
                                                formType === 'signup' ? 'Sign Up' :
                                                    formType === 'forgot' ? 'Send OTP' : null}
                                        </Button>
                                    )}

                                    {formType !== 'forgot' && (
                                        <>
                                            <div className="text-center mb-3">Or continue with</div>
                                            <div>
                                                <Button variant="outline-light" className="w-100 mb-3 text-start border-secondary p-2 px-3">
                                                    <FcGoogle className="me-2" size={20} /> Continue with Google
                                                </Button>
                                                <Button variant="outline-light" className="w-100 mb-3 text-start border-secondary p-2 px-3">
                                                    <FaApple className="me-2" size={20} /> Continue with Apple
                                                </Button>
                                                <Button variant="outline-light" className="w-100 mb-5 text-start border-secondary p-2 px-3">
                                                    <MdCall className="me-2" size={20} /> Continue with Mobile
                                                </Button>
                                            </div>

                                            <div className="text-center">
                                                {formType === 'signin' ? (
                                                    <>
                                                        Don't have an account?
                                                        <a href="#" onClick={() => setformType('signup')} className="text-light text-decoration-none border-bottom"> Sign up</a>
                                                    </>
                                                ) : (
                                                    <>
                                                        Already have an account?
                                                        <a href="#" onClick={() => setformType('signin')} className="text-light text-decoration-none border-bottom"> Sign in</a>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    
                                </Form>
                            </div>

                            {/* Replace Bootstrap Modal with MUI Dialog */}
                            <Dialog
                                open={openModal}
                                onClose={handleModalClose}
                                fullWidth
                                maxWidth="sm"
                            >
                                <DialogTitle>
                                    {modalStep === 1 ? "What is your name?" : "Confirmation"}
                                </DialogTitle>
                                <DialogContent>
                                    {modalStep === 1 ? (
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Enter your name"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    ) : (
                                        <Typography>
                                            Thank you for signing up, {userName}!
                                        </Typography>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    {modalStep > 1 && (
                                        <MuiButton onClick={handlePreviousStep}>
                                            Previous
                                        </MuiButton>
                                    )}
                                    {modalStep === 1 ? (
                                        <MuiButton onClick={handleNextStep}>
                                            Next
                                        </MuiButton>
                                    ) : (
                                        <MuiButton onClick={handleNameSubmit}>
                                            Finish
                                        </MuiButton>
                                    )}
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className=" col-md-6">
                            <div className='k_popImg'>
                                <img src={PopUpImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default SignIn;

