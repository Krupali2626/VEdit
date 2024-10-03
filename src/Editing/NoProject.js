import React from 'react'
import '../CSS/vehome.css'
import { GoPlus } from 'react-icons/go'
import h1 from "../Assets/denisha_img/h1.svg";
import h2 from "../Assets/denisha_img/h2.svg";
import h3 from "../Assets/denisha_img/h3.svg";
import h4 from "../Assets/denisha_img/h4.svg";
import h5 from "../Assets/denisha_img/h5.svg";
import h6 from "../Assets/denisha_img/h6.svg";
import h7 from "../Assets/denisha_img/h7.svg";
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function NoProject() {
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <div>
                            <span className='d_font_quick'>Quick tools</span>
                        </div>
                        <div className=' d_add_new_prjct' >
                            <span className='d_plus_icon'><GoPlus /></span>
                            <spna className="fw-bold">New Project</spna>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-xl-11 px-0">
                        <div className="row text-wrap">
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h1} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Trim Video</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h2} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Effect and adjust</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h3} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Merge the video</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h4} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Add stickers and text</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h5} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Fast or slow video</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 d-xlsm-- col-12 block d-none  "></div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h6} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Background music</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12  mt-4  ">
                                <div className='d-flex align-items-center'>
                                    <div className='d_h_img'>
                                        <img src={h7} ></img>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='d_white_htxt'>Rotate a video</span>
                                        <span className='d_gray_htxt'>Lorem ipsum dolor sit amet, consectetur adipiscin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-1 d-xl-block d-none"></div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 mb-5">
                        <div>
                            <span className='d_font_quick'>My projects</span>
                        </div>

                    </div>
                    <div className="col-12 text-center d_gray_htxt  mt-md-5">
                            <p>
                            You have no projects yet
                            </p>
                    </div>
                </div>
            </div>
        </>
    )
}
