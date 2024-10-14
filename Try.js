import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { signUp } from './yourApiSlice'; 
import { useNavigate } from 'react-router-dom';

// Define your questions array
const QUESTIONS = [
    { id: 1, question: "What is your name?", placeholder: "Enter your name", key: "name" },
    { id: 2, question: "Select Gender", key: "gender", type: "select", options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]},
    { id: 3, question: "How old are you?", placeholder: "Enter your age", key: "age" },
    { id: 4, question: "Select Profession", key: "profession", type: "select", options: [
        { label: "Student", value: "Student" },
        { label: "Video Editor", value: "Video Editor" },
        { label: "Cinematographer", value: "Cinematographer" },
        { label: "Other", value: "Other" },
    ]}
];

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            id: '',
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            gender: '',
            age: '',
            profession: '' 
        },
        onSubmit: (values) => {
            handleCompletion(values);
        },
    });

    const handleCompletion = async (values) => {
        const completeSignUpData = {
            id: values.id || "5bed", 
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            Additional: {
                name: values.name, 
                gender: values.gender, 
                age: values.age, 
                profession: values.profession 
            }
        };

        try {
            // Dispatch the sign-up action
            const response = await dispatch(signUp(completeSignUpData)).unwrap();
            if (response) {
                alert("Sign up successful!");
                navigate('/'); // Navigate to home or another page on success
            }
        } catch (error) {
            console.log("Signup failed: ", error.message);
            alert("Sign up failed. Please try again.");
        }

        // Handle any post-completion logic if needed
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* {/ Map through QUESTIONS to create form fields dynamically /} */}
            {QUESTIONS.map((question) => (
                <div key={question.id}>
                    <label>{question.question}</label>
                    {question.type === 'select' ? (
                        <select
                            name={question.key}
                            onChange={formik.handleChange}
                            value={formik.values[question.key]}
                        >
                            <option value="">Select...</option>
                            {question.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            name={question.key}
                            placeholder={question.placeholder}
                            onChange={formik.handleChange}
                            value={formik.values[question.key]}
                        />
                    )}
                </div>
            ))}
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
