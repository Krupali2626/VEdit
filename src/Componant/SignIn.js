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
    Typography,
    styled,
    LinearProgress,
    Box,
    Grid
} from '@mui/material';


// Styled components with updated spacing and styling
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: '#121212',
        border: '1px solid white',
        borderRadius: '12px', // Increased border radius
        color: 'white',
        maxWidth: '500px', // Set max width
        width: '100%',
        padding: '20px', // Add padding around entire dialog
    },
}));

// Add styled progress bar
const StyledLinearProgress = styled(LinearProgress)({
    backgroundColor: '#333333', // Dark background for unfilled portion
    '& .MuiLinearProgress-bar': {
        backgroundColor: 'white', // White color for filled portion
    },
    height: 8, // Increased height for better visibility
    borderRadius: 4,
    marginBottom: '40px', // Space below progress bar
});

const StyledDialogTitle = styled(DialogTitle)({
    color: 'white',
    textAlign: 'center',
    // borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const StyledDialogContent = styled(DialogContent)({
    padding: '0 20px 40px', // Increased padding, especially bottom
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '8px', // Slightly rounded corners
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
});

const StyledDialogActions = styled(DialogActions)({
    padding: '0 20px 20px', // Consistent padding
    justifyContent: 'space-between', // Space buttons evenly
});

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.23)',
    borderRadius: '20px', // More rounded corners for the buttons
    padding: '10px 0',
    width: '100%',
    fontSize: '16px',
    textTransform: 'none',
    marginBottom: '10px',

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
}));

const NavigationButton = styled(Button)(({ theme }) => ({
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.23)',
    borderRadius: '4px',
    padding: '6px 16px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '&.next': {
        backgroundColor: 'white',
        color: 'black',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
    },
}));

// Add this line: Define questions for the multi-step form
const QUESTIONS = [
    {
        id: 1,
        question: "What is your name?",
        placeholder: "Enter your name",
        key: "name"
    },
    {
        id: 2,
        question: "Select Gender",
        key: "gender",
        type: "select", // This is important to trigger the gender selection component
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
        ]
    },
    {
        id: 3,
        question: "How old are you??",
        placeholder: "Enter your age",
        key: "age"
    },
    {
        id: 4,
        question: "Select Profession",
        key: "Profession",
        type: "select",
        options: [
            { label: "Student", value: "Student" },
            { label: "Video Editor", value: "Video Editor" },
            { label: "Cinematographer", value: "Cinematographer" },
            { label: "Other", value: "Other" },
        ]
    }
];

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
    // Add this line: Update state management for multiple questions
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(GetUser(value));
    }, [dispatch]);

    const GenderSelection = ({ onSelect, selectedValue }) => {
        return (
            <Box sx={{ width: '100%', py: 2 }}>
                {['Male', 'Female'].map((gender) => (
                    <StyledButton
                        key={gender}
                        onClick={() => onSelect(gender.toLowerCase())}
                        sx={{
                            backgroundColor: selectedValue === gender.toLowerCase() ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            width: '100%',
                            mb: 2, // Add margin bottom for spacing between buttons
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        {gender}
                    </StyledButton>
                ))}
            </Box>
        );
    };

    const SelectionComponent = ({ options, onSelect, selectedValue, title }) => {
        return (
            <Box sx={{ width: '100%', py: 2 }}>
                <Grid container spacing={2}>
                    {options.map((option) => (
                        <Grid item xs={6} key={option.value}>
                            <StyledButton
                                onClick={() => onSelect(option.value)}
                                sx={{
                                    backgroundColor: selectedValue === option.value ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: '10px',
                                    whiteSpace: 'normal',
                                    lineHeight: 1.2,
                                }}
                            >
                                {option.label}
                            </StyledButton>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    const userStatus = useSelector((state) => state.signIn.user);
    console.log(userStatus);

    // Add progress calculation
    const getProgress = () => {
        return modalStep === 1 ? 50 : 100;
    };

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
        setCurrentStep(0);
        setAnswers({});
        setInputValue('');
    };

    const handleNextStep = () => {
        setModalStep(2);
    };

    const handlePreviousStep = () => {
        setModalStep(1);
    };

    // Add this line: Calculate progress based on current step
    const calculateProgress = () => {
        return ((currentStep + 1) / QUESTIONS.length) * 100;
    };

    // Add this line: Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Add this line: Handle next step
    const handleNext = () => {
        if (inputValue.trim()) {
            setAnswers({
                ...answers,
                [QUESTIONS[currentStep].key]: inputValue
            });

            if (currentStep < QUESTIONS.length - 1) {
                setCurrentStep(currentStep + 1);
                setInputValue('');
            } else {
                handleCompletion();
            }
        }
    };

    // Add this line: Handle previous step
    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setInputValue(answers[QUESTIONS[currentStep - 1].key] || '');
        }
    };

    // Add this line: Handle form completion
    const handleCompletion = () => {
        console.log('Form completed!', answers);
        // Here you can handle the final submission of all answers
        handleModalClose();
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
                            <StyledDialog
                                open={openModal}
                                onClose={handleModalClose}
                                fullWidth
                            >
                                {/* Add this line: Updated progress bar */}
                                <StyledLinearProgress variant="determinate" value={calculateProgress()} />

                                <StyledDialogTitle>
                                    {currentStep < QUESTIONS.length ?
                                        QUESTIONS[currentStep].question :
                                        "Thank you for your responses!"}
                                </StyledDialogTitle>

                                <StyledDialogContent>
                                    {currentStep < QUESTIONS.length ? (
                                        QUESTIONS[currentStep].key === "gender" ? (
                                            <GenderSelection
                                                onSelect={(value) => setInputValue(value)}
                                                selectedValue={inputValue}
                                            />
                                        ) : QUESTIONS[currentStep].type === "select" ? (
                                            <SelectionComponent
                                                options={QUESTIONS[currentStep].options}
                                                onSelect={(value) => setInputValue(value)}
                                                selectedValue={inputValue}
                                                title={QUESTIONS[currentStep].question}
                                            />
                                        ) : (
                                            <StyledTextField
                                                autoFocus
                                                margin="dense"
                                                id={QUESTIONS[currentStep].key}
                                                placeholder={QUESTIONS[currentStep].placeholder}
                                                type="text"
                                                fullWidth
                                                variant="outlined"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                        )
                                    ) : (
                                        <Typography color="white" align="center" style={{ fontSize: '18px' }}>
                                            All questions completed!
                                        </Typography>
                                    )}
                                </StyledDialogContent>


                                <StyledDialogActions>
                                    <StyledButton
                                        onClick={handlePrevious}
                                        variant="outlined"
                                        disabled={currentStep === 0}
                                        style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
                                    >
                                        Previous
                                    </StyledButton>
                                    <StyledButton
                                        onClick={handleNext}
                                        variant="outlined"
                                        style={{
                                            backgroundColor: inputValue.trim() ? 'white' : 'transparent',
                                            color: inputValue.trim() ? 'black' : 'white'
                                        }}
                                        disabled={!inputValue.trim()}
                                    >
                                        {currentStep < QUESTIONS.length - 1 ? "Next" : "Let’s Start"}
                                    </StyledButton>
                                </StyledDialogActions>
                            </StyledDialog>
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

