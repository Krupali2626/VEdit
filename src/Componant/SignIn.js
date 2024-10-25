import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp, signIn, mobileSignIn, verifySecurityQuestions } from '../Redux/Slice/SignIn.slice';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { MdCall } from "react-icons/md";
import PopUpImg from '../Assets/PopUp.png';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button as MuiButton, Typography, LinearProgress, Box, Select, MenuItem } from '@mui/material';


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
            // Handle form submission based on form type
            if (formType === 'signup') {
                setOpenModal(true);
            } else if (formType === 'signin') {
                try {
                    let response;
                    if (signInMethod === 'email') {
                        response = await dispatch(signIn(values)).unwrap();
                        if (response.requireSecurityQuestions) {
                            setSecurityQuestions(response.additional.securityQuestions);
                            setOpenSecurityModal(true);
                            setCurrentUser(response);
                        } else {
                            // Store all user data in local storage
                            localStorage.setItem('user', JSON.stringify(response));
                            alert("Sign in successful!");
                            navigate('/');
                        }
                    } else {
                        // Handle mobile sign in if implemented
                    }
                } catch (error) {
                    console.log("Signin failed: ", error);
                    alert("Sign in failed. Please try again.");

                }
            } else if (formType === 'forgot') {
                console.log("Forgot password for:", signInMethod === 'email' ? values.email : values.mobile);
                setOtpSent(true);
            }
        },
    });
    console.log(currentUser);

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

    const handleResendOtp = () => {
        console.log("Resending OTP to", formik.values.email);
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
                    // Store all user data in local storage after successful security verification
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

    return (
        <>
            <div className='k_popBg_image'>
                <div className="row p-md-5 p-3 k_popup_row">
                    <div className="col-md-6">
                        <div className="k_glass_effect text-light rounded k_form-width">

                            <h3 className="text-center mb-4">
                                {formType === 'signin' ? 'Welcome Back User!' :
                                    formType === 'signup' ? 'Welcome User' :
                                        formType === 'forgot' && !otpSent ? 'Forgot Password' :
                                            formType === 'forgot' && otpSent ? 'OTP Verification' : null}
                            </h3>

                            <Form onSubmit={formik.handleSubmit}>

                                {(formType !== 'forgot' || (formType === 'forgot' && !otpSent)) && (
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

                                {formType === 'forgot' && otpSent && (
                                    <div className="text-light rounded" style={{ maxWidth: '300px', margin: 'auto' }}>
                                        <p className="text-center mb-5">We've sent an OTP to {formik.values.email}</p>
                                        <Form>
                                            <div className="d-flex justify-content-evenly mb-4">
                                                {[...Array(4)].map((_, index) => (
                                                    <Form.Control
                                                        key={index}
                                                        type="text"
                                                        maxLength="1"
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
                                        <a href="#" onClick={() => setFormType('forgot')} className="text-danger text-decoration-none">Forgot Password?</a>
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
                        backgroundColor: 'black',  
                        borderRadius: '10px',  
                        padding: '20px', 
                        border: '2px solid white',  
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
