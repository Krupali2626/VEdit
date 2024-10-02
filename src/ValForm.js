import React from "react";
import { Button } from "bootstrap";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { array, mixed, number, object, string, ref } from "yup";
import { useFormik } from "formik";

function ValForm(props) {


    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        country: "",
        gender: "",
        hobbies: [],
        address: "",
        age: "",
        file: null,
    };

    // Validation
    const FILE_SIZE = 2000000; // 2MB
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    const validationSchema = object({
        name: string()
            .matches(/^[a-zA-Z\s]+$/, "Allowed only Alphabets")
            .required("Name is required"),
        email: string().email("Invalid email format").required("Email is required"),
        password: string()
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one letter, one number, and one special character'
            )
            .required("Password is required"),
        confirmPass: string().oneOf([ref("password"), null], "Passwords don't match"),
        country: string().required("Country is required"),
        gender: string().required("Gender is required"),
        hobbies: array()
            .of(string())
            .min(2, "Select at least 2 hobbies")
            .required("At least one hobby is required"),
        address: string().test("address", "Max 18 words allowed", function (val) {
            let arr = val?.trim()?.split(" ");
            return arr?.length <= 18;
        }),
        age: number()
            .min(18, "You must be at least 18 years old")
            .max(150, "Age must be less than or equal to 150")
            .required("Age is required"),
        file: mixed()
            .required("A file is required")
            .test(
                "file",
                "File size is too large",
                (value) => {
                    return value && value.size <= FILE_SIZE;
                }
            )

            
            .test(
                "file",
                "Unsupported file format",
                (value) => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                }
            )
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
            
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
        formik;
    return (
        <>
            <Container fluid className="mt-5">
                <Card className=" bg-dark text-white" style={{ borderRadius: "25px" }}>
                    <Card.Body>
                        <Row className="align-items-center ">
                            <Col md={8} className="d-flex flex-column align-items-center text-center mx-auto"
                            >
                                <h2 className="text-center text-secondary fw-bold mb-5">
                                    Form
                                </h2>
                                <Form onSubmit={handleSubmit} className="w-50">

                                    {/* Name */}
                                    <div className="mb-4">
                                        <label>Name</label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {touched.name && errors.name ? (
                                            <span className="text-danger">{errors.name}</span>
                                        ) : null}
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label>Email</label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {touched.email && errors.email ? (
                                            <span className="text-danger">{errors.email}</span>
                                        ) : null}
                                    </div>

                                    {/* Password */}
                                    <div className="mb-4">
                                        <label>Password</label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        {touched.password && errors.password ? (
                                            <span className="text-danger">{errors.password}</span>
                                        ) : null}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label>Confirm Password</label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPass"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPass}
                                        />
                                        {touched.confirmPass && errors.confirmPass ? (
                                            <span className="text-danger">{errors.confirmPass}</span>
                                        ) : null}
                                    </div>

                                    {/* Country */}
                                    <div className="mb-4">
                                        <label>Country</label>
                                        <Form.Control
                                            as="select"
                                            name="country"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.country}
                                        >
                                            <option value="">Select...</option>
                                            <option value="Canada">Canada</option>
                                            <option value="India">India</option>
                                            <option value="Germany">Germany</option>
                                        </Form.Control>
                                        {touched.country && errors.country ? (
                                            <span className="text-danger">{errors.country}</span>
                                        ) : null}
                                    </div>

                                    {/* Gender */}
                                    <div className="mb-4">
                                        <label>Gender</label>
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="male"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.gender && errors.gender ? (
                                            <span className="text-danger">{errors.gender}</span>
                                        ) : null}
                                    </div>

                                    {/* Hobbies */}
                                    <div className="mb-4">
                                        <label>Hobbies</label>
                                        <Form.Check
                                            type="checkbox"
                                            label="Drawing"
                                            name="hobbies"
                                            value="Drawing"
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Traveling"
                                            name="hobbies"
                                            value="Traveling"
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Reading"
                                            name="hobbies"
                                            value="Reading"
                                            onChange={handleChange}
                                        />
                                        {touched.hobbies && errors.hobbies ? (
                                            <span className="text-danger">{errors.hobbies}</span>
                                        ) : null}
                                    </div>

                                    {/* Address */}
                                    <div className="mb-4">
                                        <label>Address</label>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            name="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                        />
                                        {touched.address && errors.address ? (
                                            <span className="text-danger">{errors.address}</span>
                                        ) : null}
                                    </div>

                                    {/* Age */}
                                    <div className="mb-4">
                                        <label>Age</label>
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.age}
                                        />
                                        {touched.age && errors.age ? (
                                            <span className="text-danger">{errors.age}</span>
                                        ) : null}
                                    </div>

                                    {/* File Input Field */}
                                    <div className="mb-4">
                                        <label>Upload File</label>
                                        <Form.Control
                                            type="file"
                                            name="file"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0]; 
                                                formik.setFieldValue("file", file); 
                                            }}
                                        />
                                        {touched.file && errors.file ? (
                                            <span className="text-danger">{errors.file}</span>
                                        ) : null}
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100">
                                        Submit
                                    </button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default ValForm;