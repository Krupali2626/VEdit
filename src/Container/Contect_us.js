import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Contect_us(props) {
    return (
        <>

            <section className='k_Feature_bg_image'>
                <div className="k_ft_top text-white text-center">
                    <h3>Contact us</h3>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    <Form.Group controlId="formBasicSearch" className='mt-5'>
                        <Form.Select
                            className="custom-placeholder bg-transparent"
                            style={{
                                borderColor: 'gray',
                                color: 'white',
                                background: 'transparent',
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '16px 12px',
                                paddingRight: '2.5rem'
                            }}
                        >
                            <option className='k_option' value="" disabled selected hidden>How we can help?</option>
                            <option className='text-dark' value="1">Payment / Subscription</option>
                            <option className='text-dark' value="2">Editing Questions</option>
                            <option className='text-dark' value="3">Features issues</option>
                            <option className='text-dark' value="4">Other</option>
                        </Form.Select>
                        {/* Adding Text Area below the Select component */}
                        <Form.Group controlId="formBasicTextArea" className="mt-4">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                className="k_custom-textarea"
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    borderColor: 'gray'
                                }}
                            />
                        </Form.Group>
                    </Form.Group>
                    <div className='k_contact_btn'>
                        <Button variant="light" className='fw-semibold'>Submit</Button>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Contect_us;