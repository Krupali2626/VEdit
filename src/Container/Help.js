import React from 'react';
import Form from 'react-bootstrap/Form';


function Help(props) {
    return (
        <>
            <section className='k_Feature_bg_image'>
                <div className="k_ft_top text-white text-center">
                    <h3>Help</h3>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    <Form.Group controlId="formBasicSearch" className='mt-5'>
                        <Form.Control
                            type="text"
                            placeholder="Search here..."
                            className="custom-placeholder"
                            style={{
                                borderColor: 'gray',
                                color: 'white',
                                background: 'transparent'
                            }}
                        />
                    </Form.Group>
                </div>

                <section>

                    <div className='db_container'>
                        <div className="row text-white">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>1</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>2</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>3</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>4</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .</p>
                                </div>
                            </div>

                        </div>
                        <div className="row gy-5 text-white">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>5</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>6</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>7</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div class="circle">
                                    <span className='k_numb'>8</span>
                                </div>
                                <div>
                                    <h4 className='pb-2'>How do i edit a new video?</h4>
                                    <p className='lh-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore .</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </section>


        </>
    );
}

export default Help;