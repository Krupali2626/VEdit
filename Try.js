// ////////////////////////////////// OTP verification ///////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { FaEnvelope, FaLock, FaApple, FaEye } from 'react-icons/fa';
// import { FaEyeSlash } from "react-icons/fa6";
// import { MdCall } from "react-icons/md";
// import { FcGoogle } from "react-icons/fc";
// import PopUpImg from '../Assets/PopUp.png'
// import { object, string, number, ref } from 'yup';
// import { useFormik } from 'formik';

// function SignIn(props) {

//     const [formType, setformType] = useState('signin');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [otpSent, setOtpSent] = useState(false);

//     // Validation

//     let authSchema = {},
//         initialValues = {};

//     if (formType === 'signin') {
//         authSchema = object({
//             email: string().email('Invalid email address').required('Email is required'),
//             password: string().required('Password is required'),
//         });

//         initialValues = {
//             email: "",
//             password: "",
//         };
//     } else if (formType === 'signup') {
//         authSchema = object({
//             email: string().email('Invalid email address').required('Email is required'),
//             password: string()
//                 .min(8, 'Password must be at least 8 characters')
//                 .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
//                 .matches(/[0-9]/, 'Password must contain at least one number')
//                 .required('Password is required'),
//             confirmPassword: string()
//                 .oneOf([ref('password'), null], 'Passwords must match')
//                 .required('Confirm password is required'),

//         });
//         initialValues = {
//             email: "",
//             password: "",
//         };
//     } else if (formType === 'forgot') {
//         authSchema = object({
//             email: string().email('Invalid email address').required('Email is required'),
//             otp: otpSent ? string().required('OTP is required').length(6, 'OTP must be 6 digits') : string(),
//         });
//         initialValues = { email: "", otp: "" };
//     }

//     const formik = useFormik({
//         initialValues: initialValues,
//         validationSchema: authSchema,
//         onSubmit: values => {
//             if (formType === 'forgot' && !otpSent) {
//                 // Send OTP logic here
//                 console.log("Sending OTP to", values.email);
//                 setOtpSent(true);
//             } else {
//                 // Handle form submission
//                 alert(JSON.stringify(values, null, 2));
//             }
//             // alert(JSON.stringify(values, null, 2));
//         },
//     });

//     const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik


//     return (
//         <>
//             <div className='k_popBg_image'>
//                 <div>
//                     <div className="row p-5 k_popup_row">
//                         <div className="col-md-6">
//                             <div className="k_glass_effect text-light rounded k_form-width">
//                                 <h3 className={`text-center mb-4 ${formType === 'forgot' ? 'mb-5' : ''}`}>
//                                     {formType === 'signin' ? 'Welcome Back User!' : formType === 'signup' ? 'Welcome User' : 'Forgot Password'}
//                                 </h3>

//                                 <Form onSubmit={handleSubmit}>
//                                     <Form.Group className={`mb-3 ${formType === 'forgot' ? 'mb-5' : ''}`} controlId="formBasicEmail">
//                                         <div className="input-group">
//                                             <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
//                                                 <FaEnvelope />
//                                             </span>
//                                             <Form.Control
//                                                 type="email"
//                                                 name="email"
//                                                 placeholder="Enter your email"
//                                                 className="border-start-0 border-secondary inputStyle"
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 value={values.email}
//                                             />
//                                         </div>
//                                         {touched.email && errors.email ? (
//                                             <span className='text-danger'>{errors.email}</span>
//                                         ) : null}
//                                     </Form.Group>

//                                     {formType !== 'forgot' && (
//                                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                                             <div className="input-group">
//                                                 <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
//                                                     <FaLock />
//                                                 </span>
//                                                 <Form.Control
//                                                     type={showPassword ? "text" : "password"}
//                                                     name="password"
//                                                     placeholder="Enter your password"
//                                                     className="border-start-0 border-end-0 border-secondary inputStyle"
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     value={values.password}
//                                                 />
//                                                 <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
//                                                     onClick={() => setShowPassword(!showPassword)}>
//                                                     {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
//                                                 </span>
//                                             </div>
//                                             {touched.password && errors.password ? (
//                                                 <span className='text-danger'>{errors.password}</span>
//                                             ) : null}
//                                         </Form.Group>
//                                     )}

//                                     {formType === 'signup' && (
//                                         <Form.Group className="mb-3" controlId="formConfirmPassword">
//                                             <div className="input-group">
//                                                 <span className="input-group-text bg-transparent text-secondary border-end-0 border-secondary">
//                                                     <FaLock />
//                                                 </span>
//                                                 <Form.Control
//                                                     type={showConfirmPassword ? "text" : "password"}
//                                                     name="confirmPassword"
//                                                     placeholder="Confirm your password"
//                                                     className="border-start-0 border-end-0 border-secondary inputStyle"
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     value={values.confirmPassword}

//                                                 />
//                                                 <span className="input-group-text bg-transparent text-secondary border-start-0 border-secondary"
//                                                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                                     {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
//                                                 </span>
//                                             </div>
//                                             {touched.confirmPassword && errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
//                                         </Form.Group>
//                                     )}

//                                     {formType === 'forgot' && otpSent && (
//                                         <Form.Group className="mb-3" controlId="formBasicOTP">
//                                             <Form.Control
//                                                 type="text"
//                                                 name="otp"
//                                                 placeholder="Enter OTP"
//                                                 className="border-secondary inputStyle"
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 value={values.otp}
//                                             />
//                                             {touched.otp && errors.otp && <span className='text-danger'>{errors.otp}</span>}
//                                         </Form.Group>
//                                     )}

//                                     {formType === 'signin' && (
//                                         <div className="text-end mb-3">
//                                             <a href="#" onClick={() => setformType('forgot')} className="text-danger text-decoration-none">Forgot Password?</a>
//                                         </div>
//                                     )}

//                                     <Button variant="light" type="submit" className="w-100 mb-3">
//                                         {formType === 'signin' ? 'Sign In' :
//                                             formType === 'signup' ? 'Sign Up' :
//                                                 formType === 'forgot' && !otpSent ? 'Send OTP' : 'Verify OTP'}
//                                     </Button>
                                    
//                                     {formType !== 'forgot' && (
//                                         <>
//                                             <div className="text-center mb-3">Or continue with</div>
//                                             <div>
//                                                 <Button variant="outline-light" className="w-100 mb-3 text-start border-secondary p-2 px-3">
//                                                     <FcGoogle className="me-2" size={20} /> Continue with Google
//                                                 </Button>
//                                                 <Button variant="outline-light" className="w-100 mb-3 text-start border-secondary p-2 px-3">
//                                                     <FaApple className="me-2" size={20} /> Continue with Apple
//                                                 </Button>
//                                                 <Button variant="outline-light" className="w-100 mb-5 text-start border-secondary p-2 px-3">
//                                                     <MdCall className="me-2" size={20} /> Continue with Mobile
//                                                 </Button>
//                                             </div>

//                                             <div className="text-center">
//                                                 {formType === 'signin' ? (
//                                                     <>
//                                                         Don't have an account?
//                                                         <a href="#" onClick={() => setformType('signup')} className="text-light text-decoration-none border-bottom"> Sign up</a>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         Already have an account?
//                                                         <a href="#" onClick={() => setformType('signin')} className="text-light text-decoration-none border-bottom"> Sign in</a>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </>

//                                     )}


//                                 </Form>
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className='k_popImg'>
//                                 <img src={PopUpImg} alt="" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//         </>
//     );
// }

// export default SignIn;