import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp, signIn, mobileSignIn, verifySecurityQuestions, resetPassword } from '../Redux/Slice/SignIn.slice';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { MdCall } from "react-icons/md";
import PopUpImg from '../Assets/PopUp.png';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button as MuiButton, Typography, LinearProgress, Box, Select, MenuItem } from '@mui/material';
import emailjs from '@emailjs/browser';


function SignIn(props, value) {
    const [formType, setFormType] = useState('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(['', '', '', '']);
    const [signInMethod, setSignInMethod] = useState('email');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [inputValue, setInputValue] = useState('');

    const [openSecurityModal, setOpenSecurityModal] = useState(false);
    const [securityQuestions, setSecurityQuestions] = useState([
        { question: "What is your mother's maiden name?", answer: "" },
        { question: "What was the name of your first pet?", answer: "" },
        { question: "In what city were you born?", answer: "" }
    ]);
    const [securityAnswers, setSecurityAnswers] = useState(['', '', '']);
    const [currentUser, setCurrentUser] = useState(null);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const emailForm = useRef();

    const [showResetPassword, setShowResetPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [mobileOtp, setMobileOtp] = useState(['', '', '', '']);
    const [generatedMobileOTP, setGeneratedMobileOTP] = useState('');


    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: formType === 'signup' ?
            Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required') :
            Yup.string(),
        mobile: signInMethod === 'mobile' ? Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile number is required') : Yup.string(),
    });

    // Initialize formik for form handling
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (formType === 'signup') {
                setOpenModal(true);
            } else if (formType === 'signin') {
                try {
                    if (signInMethod === 'email') {
                        // ... (keep existing email sign in logic)
                    } else {
                        // Handle mobile sign in
                        const otp = generateMobileOTP();
                        const response = await sendMobileOTP(values.mobile, otp);

                        if (response.success) {
                            setMobileOtpSent(true);
                            alert('OTP has been sent to your mobile number');
                        } else {
                            alert('Failed to send OTP. Please try again.');
                        }
                    }
                } catch (error) {
                    console.log("Signin failed: ", error);
                    alert("Sign in failed. Please try again.");
                }
            } else if (formType === 'forgot') {
                if (signInMethod === 'email') {
                    // ... (keep existing email forgot password logic)
                } else {
                    // Handle mobile forgot password
                    const otp = generateMobileOTP();
                    const response = await sendMobileOTP(values.mobile, otp);

                    if (response.success) {
                        setMobileOtpSent(true);
                        alert('OTP has been sent to your mobile number');
                    } else {
                        alert('Failed to send OTP. Please try again.');
                    }
                }
            }
        },
    });

    // Registration flow questions
    const QUESTIONS = [
        { id: 1, question: "What is your name?", placeholder: "Enter your name", key: "name" },
        { id: 2, question: "Select Gender", key: "gender", type: "select", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
        { id: 3, question: "How old are you?", placeholder: "Enter your age", key: "age" },
        {
            id: 4, question: "Select Profession", key: "profession", type: "select", options: [
                { label: "Student", value: "Student" },
                { label: "Video Editor", value: "Video Editor" },
                { label: "Cinematographer", value: "Cinematographer" },
                { label: "Other", value: "Other" },
            ]
        },
    ];

    const handleOTPVerification = (enteredOTP) => {
        const fullOTP = enteredOTP.join('');
        if (fullOTP === generatedOTP) {
            setShowResetPassword(true); // Show reset password form after successful OTP verification
            setOtpSent(false); // Hide OTP form
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const generateOTP = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(otp)
        setGeneratedOTP(otp);
        return otp;
    };

    const sendOTPEmail = async (email, otp) => {
        try {
            const templateParams = {
                to_email: email,
                message: `Your OTP for password reset is: ${otp}`,
                otp: otp,
            };
            console.log('Sending email with params:', templateParams);

            // Send email using EmailJS
            const response = await emailjs.send(
                'service_fwyu2ya',
                'template_33ytgmq',
                templateParams,
                'R-yXtVBr8WNcAl9gC'
            );

            if (response.status === 200) {
                console.log('OTP sent successfully');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to send OTP:', error);
            return false;
        }
    };

    // Modify the resend OTP handler
    const handleResendOtp = async () => {
        const otp = generateOTP();
        const emailSent = await sendOTPEmail(formik.values.email, otp);

        if (emailSent) {
            console.log(emailSent)
            alert('New OTP has been sent to your email');
        } else {
            alert('Failed to resend OTP. Please try again.');
        }
    };

    // Add OTP input handler
    const handleOTPInput = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTP = [...otpSent];
            newOTP[index] = value;
            setOtpSent(newOTP);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
                if (nextInput) nextInput.focus();
            }

            // Check if all digits are entered
            if (newOTP.every(digit => digit !== '') && newOTP.join('').length === 4) {
                handleOTPVerification(newOTP);
            }
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentStep(0);
        setAnswers({});
        setInputValue('');
    };

    const handleNext = async () => {
        if (inputValue.trim()) {
            setAnswers({ ...answers, [QUESTIONS[currentStep].key]: inputValue });
            if (currentStep < QUESTIONS.length - 1) {
                setCurrentStep(currentStep + 1);
                setInputValue('');
            } else {
                setOpenSecurityModal(true); // Open security question modal instead of submitting
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setInputValue(answers[QUESTIONS[currentStep - 1].key] || '');
        }
    };

    const calculateProgress = () => ((currentStep + 1) / QUESTIONS.length) * 100;

    const toggleSignInMethod = () => {
        setSignInMethod(prevMethod => prevMethod === 'email' ? 'mobile' : 'email');
        formik.setErrors({});
        formik.setTouched({});
    };

    const handleSecurityQuestionChange = (index, field, value) => {
        const updatedQuestions = [...securityQuestions];
        updatedQuestions[index][field] = value;
        setSecurityQuestions(updatedQuestions);
    };

    const handleSecuritySubmit = async () => {
        try {
            if (formType === 'signup') {
                const signUpData = {
                    email: formik.values.email,
                    password: formik.values.password,
                    additional: {
                        ...answers,
                        securityQuestions: securityQuestions.map((q) => ({
                            question: q.question,
                            answer: q.answer
                        }))
                    }
                };

                const response = await dispatch(signUp(signUpData)).unwrap();
                if (response) {
                    // Store all user data in local storage after successful sign up
                    localStorage.setItem('user', JSON.stringify(response));
                    alert("Sign up successful!");
                    navigate('/');
                }
            } else if (formType === 'signin') {
                if (!currentUser) {
                    throw new Error("User data not found");
                }

                const response = await dispatch(verifySecurityQuestions({
                    user: currentUser,
                    answers: securityAnswers
                })).unwrap();

                if (response) {
                    localStorage.setItem('user', JSON.stringify(response));
                    alert("Sign in successful!");
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Security verification failed: ", error);
            alert(error.message || "Security verification failed. Please try again.");
        }

        setOpenSecurityModal(false);
        handleModalClose();
    };

    const handleResetPassword = async () => {
        // Password validation
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            dispatch(resetPassword({
                email: formik.values.email,
                newPassword: newPassword
            }));

            alert('Password reset successful!');
            setFormType('signin');
            setShowResetPassword(false);
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert('Failed to reset password. Please try again.');
        }
    };

    const generateMobileOTP = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('Generated Mobile OTP:', otp); // For testing purposes
        setGeneratedMobileOTP(otp);
        return otp;
    };

    const sendMobileOTP = async (phoneNumber, otp) => {
        try {
            // Mock API call to send SMS
            // In production, replace this with actual SMS service integration
            console.log(`Sending OTP ${otp} to ${phoneNumber}`);

            // Simulating API response
            return {
                success: true,
                message: 'OTP sent successfully'
            };
        } catch (error) {
            console.error('Failed to send mobile OTP:', error);
            return {
                success: false,
                message: 'Failed to send OTP'
            };
        }
    };

    // Handle mobile OTP verification
    const handleMobileOTPVerification = (enteredOTP) => {
        const fullOTP = enteredOTP.join('');
        if (fullOTP === generatedMobileOTP) {
            if (formType === 'forgot') {
                setShowResetPassword(true);
            } else if (formType === 'signin') {
                // Handle sign in with mobile
                handleMobileSignIn(formik.values.mobile);
            }
            setMobileOtpSent(false);
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleMobileSignIn = async (mobileNumber) => {
        try {
            const response = await dispatch(mobileSignIn({ mobile: mobileNumber })).unwrap();
            if (response) {
                localStorage.setItem('user', JSON.stringify(response));
                alert("Sign in successful!");
                navigate('/');
            }
        } catch (error) {
            console.error("Mobile sign in failed:", error);
            alert("Sign in failed. Please try again.");
        }
    };

    // Handle mobile OTP input
    const handleMobileOTPInput = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTP = [...mobileOtp];
            newOTP[index] = value;
            setMobileOtp(newOTP);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.querySelector(`input[name=mobile-otp-${index + 1}]`);
                if (nextInput) nextInput.focus();
            }

            // Check if all digits are entered
            // if (newOTP.every(digit => digit !== '') && newOTP.join('').length === 4) {
            //     handleMobileOTPVerification(newOTP);
            // }
        }
    };

    // Add resend mobile OTP handler
    const handleResendMobileOtp = async () => {
        const otp = generateMobileOTP();
        const response = await sendMobileOTP(formik.values.mobile, otp);

        if (response.success) {
            alert('New OTP has been sent to your mobile number');
        } else {
            alert('Failed to resend OTP. Please try again.');
        }
    };


    return (
        <>
            <div className='k_popBg_image'>
                <div className="row p-md-5 p-3 k_popup_row">
                    <div className="col-md-6">
                        <div className="k_glass_effect text-light rounded k_form-width">

                            <h3 className="text-center mb-4">
                                {!showResetPassword && (
                                    formType === 'signin' ? 'Welcome Back User!' :
                                        formType === 'signup' ? 'Welcome User' :
                                            formType === 'forgot' && !otpSent ? 'Forgot Password' :
                                                formType === 'forgot' && otpSent ? 'OTP Verification' : null
                                )}
                            </h3>

                            <Form onSubmit={formik.handleSubmit}>

                                {(formType !== 'forgot' || (formType === 'forgot' && !otpSent)) && !showResetPassword && (
                                    <Form.Group className="mb-3" controlId={signInMethod === 'email' ? "formBasicEmail" : "formBasicMobile"}>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                {signInMethod === 'email' ? <FaEnvelope /> : <MdCall />}
                                            </span>
                                            <Form.Control
                                                type={signInMethod === 'email' ? "email" : "tel"}
                                                name={signInMethod === 'email' ? "email" : "mobile"}
                                                placeholder={signInMethod === 'email' ? "Enter your email" : "Enter your mobile number"}
                                                className="border-start-0 border-secondary inputStyle"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={signInMethod === 'email' ? formik.values.email : formik.values.mobile}
                                            />
                                        </div>
                                        {formik.touched[signInMethod] && formik.errors[signInMethod] ? (
                                            <div className="text-danger">{formik.errors[signInMethod]}</div>
                                        ) : null}
                                    </Form.Group>
                                )}

                                {signInMethod === 'email' && formType !== 'forgot' && (
                                    <>
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
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                />
                                                <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className="text-danger">{formik.errors.password}</div>
                                            ) : null}
                                        </Form.Group>

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
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.confirmPassword}
                                                    />
                                                    <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                    </span>
                                                </div>
                                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                    <div className="text-danger">{formik.errors.confirmPassword}</div>
                                                ) : null}
                                            </Form.Group>
                                        )}
                                    </>
                                )}

                                {formType === 'forgot' && otpSent && !showResetPassword && (
                                    <div className="text-light rounded" style={{ maxWidth: '300px', margin: 'auto' }}>
                                        <p className="text-center mb-5">We've sent an OTP to {formik.values.email}</p>
                                        <Form>
                                            <div className="d-flex justify-content-evenly mb-4">
                                                {[...Array(4)].map((_, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        type="text"
                                                        maxLength="1"
                                                        name={`otp-${index}`}
                                                        value={otpSent[index]}
                                                        onChange={(e) => handleOTPInput(index, e.target.value)}
                                                        className="mx-1 text-center bg-dark text-light border-secondary"
                                                        style={{ width: '40px', height: '40px' }}
                                                    />
                                                ))}
                                            </div>
                                            <Button
                                                variant="light"
                                                type="button"
                                                onClick={() => handleOTPVerification(otpSent)}
                                                className="w-100 mb-3 fw-bold"
                                            >
                                                Verify
                                            </Button>
                                            <p className="text-center mb-3">
                                                Didn't receive OTP?
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-light"
                                                    onClick={handleResendOtp}
                                                >
                                                    Resend
                                                </Button>
                                            </p>
                                        </Form>
                                    </div>
                                )}

                                {formType === 'forgot' && showResetPassword && (
                                    <div className="text-light rounded" >
                                        <h3 className="text-center mb-4">Reset Password</h3>
                                        <Form>
                                            {/* New Password Input */}
                                            <Form.Group className="mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                        <FaLock />
                                                    </span>
                                                    <Form.Control
                                                        type={showNewPassword ? "text" : "password"}
                                                        placeholder="Create new password"
                                                        className="border-start-0 border-end-0 border-secondary inputStyle"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                    <span
                                                        className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                    >
                                                        {showNewPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                    </span>
                                                </div>
                                            </Form.Group>

                                            {/* Confirm New Password Input */}
                                            <Form.Group className="mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
                                                        <FaLock />
                                                    </span>
                                                    <Form.Control
                                                        type={showConfirmNewPassword ? "text" : "password"}
                                                        placeholder="Confirm new password"
                                                        className="border-start-0 border-end-0 border-secondary inputStyle"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                    />
                                                    <span
                                                        className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
                                                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                                    >
                                                        {showConfirmNewPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                    </span>
                                                </div>
                                            </Form.Group>

                                            <Button
                                                variant="light"
                                                type="button"
                                                onClick={handleResetPassword}
                                                className="w-100 mb-3 fw-bold mt-4"
                                            >
                                                Reset Password
                                            </Button>
                                        </Form>
                                    </div>
                                )}

                                {/* Add mobile OTP verification form */}
                                {signInMethod === 'mobile' && mobileOtpSent && !showResetPassword && (
                                    <div className="text-light rounded" style={{ maxWidth: '300px', margin: 'auto' }}>
                                        <p className="text-center mb-5">We've sent an OTP to {formik.values.mobile}</p>
                                        <Form>
                                            <div className="d-flex justify-content-evenly mb-4">
                                                {[...Array(4)].map((_, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        type="text"
                                                        maxLength="1"
                                                        name={`mobile-otp-${index}`}
                                                        value={mobileOtp[index]}
                                                        onChange={(e) => handleMobileOTPInput(index, e.target.value)}
                                                        className="mx-1 text-center bg-dark text-light border-secondary"
                                                        style={{ width: '40px', height: '40px' }}
                                                    />
                                                ))}
                                            </div>
                                            <Button
                                                variant="light"
                                                type="button"
                                                // onClick={() => handleMobileOTPVerification(mobileOtp)}
                                                className="w-100 mb-3 fw-bold"
                                            >
                                                Verify
                                            </Button>
                                            <p className="text-center mb-3">
                                                Didn't receive OTP?
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-light"
                                                    onClick={handleResendMobileOtp}
                                                >
                                                    Resend
                                                </Button>
                                            </p>
                                        </Form>
                                    </div>
                                )}

                                {formType === 'signin' && (
                                    <div className="text-end mb-3">
                                        <a href="#" onClick={() => setFormType('forgot')} className="text-danger text-decoration-none">
                                            Forgot Password?
                                        </a>
                                    </div>
                                )}

                                {(formType !== 'forgot' || !otpSent) && !showResetPassword && (
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
                                            <Button
                                                variant="outline-light"
                                                className="w-100 mb-5 text-start border-secondary p-2 px-3"
                                                onClick={toggleSignInMethod}
                                            >
                                                {signInMethod === 'email' ? (
                                                    <>
                                                        <MdCall className="me-2" size={20} /> Continue with Mobile
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaEnvelope className="me-2" size={20} /> Continue with Email
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        <div className="text-center">
                                            {formType === 'signin' ? (
                                                <>
                                                    Don't have an account?
                                                    <a href="#" onClick={() => setFormType('signup')} className="text-light text-decoration-none border-bottom"> Sign up</a>
                                                </>
                                            ) : (
                                                <>
                                                    Already have an account?
                                                    <a href="#" onClick={() => setFormType('signin')} className="text-light text-decoration-none border-bottom"> Sign in</a>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}

                            </Form>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='k_popImg d-md-block d-none '>
                            <img src={PopUpImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={openModal}
                onClose={handleModalClose}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'black',  // Set the background of the dialog to black
                        borderRadius: '10px',  // Rounded corners
                        padding: '20px',  // Extra padding for spacing
                        border: '2px solid white',  // White border for the dialog box
                    },
                }}
            >
                {/* Progress Bar at the top */}
                <LinearProgress
                    variant="determinate"
                    value={calculateProgress()}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Light gray background for progress
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white',  // White progress bar
                        },
                        height: '8px',  // Thicker progress bar height
                        borderRadius: '5px',  // Rounded progress bar
                        mb: 3,  // Add margin-bottom to create space below the progress bar
                    }}
                />

                {/* Dialog Title */}
                <DialogTitle
                    sx={{ color: 'white', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                >
                    {currentStep < QUESTIONS.length ? QUESTIONS[currentStep].question : "Thank you for your responses!"}
                </DialogTitle>

                {/* Dialog Content */}
                <DialogContent sx={{ py: 3 }}>
                    {currentStep < QUESTIONS.length ? (
                        QUESTIONS[currentStep].type === "select" ? (
                            <Box
                                sx={{
                                    width: '100%',
                                    py: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',  // Enable wrapping for two rows
                                    gap: '10px',  // Adds space between the buttons
                                    justifyContent: 'center',  // Center align the buttons horizontally
                                }}
                            >
                                {/* First row (top row) */}
                                {QUESTIONS[currentStep].options.slice(0, 2).map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setInputValue(option.value)}
                                        className={`btn btn-outline-light ${inputValue === option.value ? 'active' : ''}`}
                                        style={{
                                            backgroundColor: inputValue === option.value ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                            color: 'white',
                                            borderRadius: '30px',
                                            padding: '10px 20px',
                                            border: '2px solid white',
                                            width: '45%',  // Buttons are 45% width for two in one row
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}

                                {/* Second row (bottom row) */}
                                {QUESTIONS[currentStep].options.slice(2, 4).map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setInputValue(option.value)}
                                        className={`btn btn-outline-light ${inputValue === option.value ? 'active' : ''}`}
                                        style={{
                                            backgroundColor: inputValue === option.value ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                            color: 'white',
                                            borderRadius: '30px',
                                            padding: '10px 20px',
                                            border: '2px solid white',
                                            width: '45%',  // Buttons are 45% width for two in one row
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </Box>
                        ) : (
                            <TextField
                                autoFocus
                                margin="dense"
                                id={QUESTIONS[currentStep].key}
                                placeholder={QUESTIONS[currentStep].placeholder}
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                sx={{
                                    input: { color: 'white' },
                                    mt: 3,  // Add margin-top to create space between the question and textfield
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '5px',
                                    },
                                }}
                            />
                        )
                    ) : (
                        <Typography color="white" align="center">
                            All questions completed!
                        </Typography>
                    )}
                </DialogContent>

                {/* Dialog Actions */}
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="btn btn-light"
                        style={{ borderRadius: '5px', padding: '10px 20px' }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!inputValue.trim()}
                        className="btn btn-light"
                        style={{ borderRadius: '5px', padding: '10px 20px', marginLeft: '10px' }}
                    >
                        {currentStep < QUESTIONS.length - 1 ? "Next" : "Let's Start"}
                    </button>
                </DialogActions>
            </Dialog>

            {/* Security Question Modal */}
            <Dialog
                open={openSecurityModal}
                onClose={() => setOpenSecurityModal(false)}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'black',
                        borderRadius: '10px',
                        padding: '20px',
                        border: '2px solid white',
                    },
                }}
            >
                <DialogTitle sx={{ color: 'white', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                    {formType === 'signup' ? 'Set Security Questions' : 'Answer Security Questions'}
                </DialogTitle>
                <DialogContent>
                    {securityQuestions.map((q, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <Typography color="white">{q.question}</Typography>
                            <TextField
                                value={formType === 'signup' ? q.answer : securityAnswers[index]}
                                onChange={(e) => formType === 'signup'
                                    ? handleSecurityQuestionChange(index, 'answer', e.target.value)
                                    : setSecurityAnswers(prev => {
                                        const newAnswers = [...prev];
                                        newAnswers[index] = e.target.value;
                                        return newAnswers;
                                    })
                                }
                                fullWidth
                                placeholder="Your Answer"
                                sx={{
                                    input: { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <button
                        onClick={handleSecuritySubmit}
                        className="btn btn-light"
                        style={{ borderRadius: '5px', padding: '10px 20px' }}
                    >
                        {formType === 'signup' ? 'Sign Up' : 'Verify'}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SignIn;
