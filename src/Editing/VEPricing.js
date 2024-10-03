import React from 'react'
import '../CSS/d_pricing.css'
import { FaDollarSign } from 'react-icons/fa'
import t1 from "../Assets/denisha_img/true.svg";

export default function VEPricing() {
    return (
        <>
            <div className="row">
                <p className='fs-4 ps-3'>
                    Pricing
                </p>
            </div>
            <div className="row">
                <div className="col-xxl-4 col-lg-6 col-12 p-3">
                    <div className="d_pricing_card d-flex flex-column justify-content-between p-lg-5 p-4">
                        <div>
                            <div className='mb-lg-5 mb-4'>
                                <p className='mb-2 d_price'>$19 WEEKLY</p>
                                <p className='mb-0 d_gray_price_txt'>Save up to 10% with this package.</p>
                            </div>

                            <div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>All basic features</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Free effect and filters</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Easy video editing</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='w-100 bg-white text-center d_get_start'>
                                <span>Get Started</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-lg-6 col-12 p-md-3 p-2">
                    <div className="d_pricing_card d-flex flex-column justify-content-between p-lg-5 p-4">
                        <div>
                            <div className='mb-lg-5 mb-4'>
                                <p className='mb-2 d_price'>$29 Monthly</p>
                                <p className='mb-0 d_gray_price_txt'>Save up to 30% with this package.</p>
                            </div>

                            <div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Access to all tools</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum do</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='w-100 bg-white text-center d_get_start'>
                                <span>Get Started</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-lg-6 col-12 mt-xl-0 mt-lg-3 p-md-3 p-2">
                     <div className="d_pricing_card  d_price_card1 d-flex flex-column justify-content-between p-lg-5 p-4 position-relative">
        {/* <div className="most-popular-label">Most Popular</div> */}
                        <div>
                            <div className='mb-lg-5 mb-4'>
                                <p className='mb-2 d_price'>$49 Yearly</p>
                                <p className='mb-0 d_gray_price_txt'>Get access to video editor pro features.</p>
                            </div>

                            <div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Full HD resolution</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum do</span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                                <div className='mb-2'>
                                    <img src={t1} alt="" className='me-3' />
                                    <span className='d_content_price'>Lorem ipsum dolor sit amet, consectetur </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='w-100 bg-white text-center d_get_start'>
                                <span>Get Started</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
