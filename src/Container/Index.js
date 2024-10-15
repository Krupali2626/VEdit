import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons
import EastIcon from '@mui/icons-material/East';
// Images
import Index1 from '../Assets/Index-1.png'
import InDex_2 from '../Assets/Index2.png'
import Index3 from '../Assets/Index-3.png'
import Index4 from '../Assets/Index-4.png'
import scan_1 from '../Assets/scan 1.png'
import Index2 from '../Assets/1st.png'
import playstore from '../Assets/image 503.svg';
import CustomNavbar from '../Componant/CustomNavbar';
import AppleIcon from '@mui/icons-material/Apple';
import { FaStar } from "react-icons/fa";

import user from '../Assets/user.png'
import $ from 'jquery';
import '../CSS/owl.theme.default.css'
import '../CSS/Navbar.css'
import Footer from '../Componant/Footer'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

window.jQuery = window.$ = $;
require('owl.carousel');

function Index(props) {


  const reviews = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipr sit amet, coLorem ipr sit amet, coLorem ipr sit amet, co Lorem ipr sit amet, co",
      author: "Johan Patel"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipr sit amet, coLorem ipr sit amet, coLorem ipr sit amet, co Lorem ipr sit amet, co",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipr sit amet, coLorem ipr sit amet, coLorem ipr sit amet, co Lorem ipr sit amet, co",
      author: "Michael Chen"
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipr sit amet, coLorem ipr sit amet, coLorem ipr sit amet, co Lorem ipr sit amet, co",
      author: "Emily Rodriguez"
    }
  ];

  useEffect(() => {
    const owl = $('.owl-carousel').owlCarousel({
      loop: true,
      center: true,
      margin: 10,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          items: 1,
        },
        800: {
          items: 3,
        },
      },
      onInitialized: () => {
        $('.owl-item.active.center').addClass('focused');
      },
      onTranslated: () => {
        $('.owl-item').removeClass('focused');
        $('.owl-item.active.center').addClass('focused');
      }
    });
  }, []);

  return (
    <>
      <section className='k_bg_image'>
        <div className='db_container '>
          <div className="row text-white x_row k_resp_pad d-flex align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-6 col-md-12">
              <div className='d-flex k_all_txt_cont'>
                <div className="k_index1_txt">
                  <h1>Free Online Video editor with pro features</h1>
                  <p className='pb-2 pt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit saepe dolorum expedita vero debitis obcaecati eligendi accusantium ullam?</p>
                  <div className='k_resp_cBtn'>
                    <Button variant="light" className='k_starteed_btn d-flex align-items-center'>Get Started <EastIcon className='ps-1' /></Button>{' '}
                  </div>
                  {/* <br /><br /><br /> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className='k_Index-1_img d-flex justify-content-center'>
                <img src={Index1} alt="Index1" />
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* About US */}
      <section>
        <div className='k_About_sect_img'>
          <div className="k_about_content text-white">
            <div className='k_inner_about_txt'>
              <div className='text-center'>
                <h3>How to edit any video?</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className='k_list_opt'>
                <div class="row">
                  <div class="col-12 k_contant_arrow">
                    <ul class="step-list row ">
                      <li class="col-12 col-md-4  ">
                        <span>1. UPLOAD MEDIA</span>
                        <span class="  "><EastIcon className=' d-none d-md-block' /></span>
                      </li>
                      <li class="col-12 col-md-4  ">
                        <span>2. CONTINUE EDITING</span>
                        <span class="  "><EastIcon className=' d-none d-md-block' /></span>
                      </li>
                      <li class="col-12 col-md-4  ">
                        <span>3. DOWNLOAD & SHARE</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3rd Section */}
      <section>
        <div className="k_bg_img_3rd ">
          <div className='db_container'>
            {/* 1st */}
            <div className="row ">
              <div className="col-xl-10 col-md-12 col-sm-12 mx-auto">
                <div className="row gx-4 k_end_sec_padd">
                  <div className="col-md-6 col-sm-12 k_resp-img-pad">
                    <div className='k_Index2'>
                      <img src={Index2} alt="" />
                    </div>
                  </div>
                  <div className="col-md-6 text-white k_all_3rs">
                    <div className='k_3rd_text'>
                      <div className='k_3rd_text_content'>
                        <h2>Easy to use online video editor in your browser</h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd */}
            <div className="row ">
              <div className="col-xl-10 col-md-12 col-sm-12 mx-auto">
                <div className="row gx-4 k_end_sec_padd  d-flex flex-column-reverse flex-md-row">
                  <div className="col-md-6 text-white k_all_3rs">
                    <div className='k_13rd_text'>
                      <div className='k_3rd_text_content'>
                        <h2>Add text to your video</h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 k_resp-img-pad">
                    <div className='k_Index12'>
                      <img src={InDex_2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd */}
            <div className="row ">
              <div className="col-xl-10 col-md-12 col-sm-12 mx-auto">
                <div className="row gx-4 k_end_sec_padd">
                  <div className="col-md-6 col-sm-12 k_resp-img-pad">
                    <div className='k_Index2'>
                      <img src={Index3} alt="" />
                    </div>
                  </div>
                  <div className="col-md-6 text-white k_all_3rs">
                    <div className='k_3rd_text'>
                      <div className='k_3rd_text_content'>
                        <h2>Add effect and filters</h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4th */}
            <div className="row ">
              <div className="col-xl-10 col-md-12 col-sm-12 mx-auto">
                <div className="row gx-4 k_end_sec_padd  d-flex flex-column-reverse flex-md-row">
                  <div className="col-md-6 text-white k_all_3rs">
                    <div className='k_13rd_text'>
                      <div className='k_3rd_text_content'>
                        <h2>Add music and audio</h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 k_resp-img-pad">
                    <div className='k_Index12'>
                      <img src={Index4} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* scan-screen */}
          <section>
            <div className="row k_bg_rgba_scan">
              <div className="col-xl-10 col-md-12 col-sm-12 mx-auto k_inner_top">
                <div className="row gx-4 d-flex flex-column-reverse flex-md-row">
                  <div className="col-md-6 text-white k_all_3rs">
                    <div className='k_13rd_text'>
                      <div className='k_3rd_text_content'>
                        <h2>Easily edit videos with App</h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        <div className='d-flex align-items-center mt-3 gap-3 k_btn_resp'>
                          <a
                            href={'/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-decoration-none items-center px-2 py-1 border  text-white rounded-2 hover:bg-gray-800 transition-colors duration-300"
                          >
                            <div className='d-flex  gap-2 align-items-center k_svg'>
                              <img src={playstore} alt="" />
                              <div className='k_store_nme'>
                                <span className="font-semibold ">GET IT ON</span>
                                <p className="font-bold text-lg ml-1">Google Play</p>
                              </div>
                            </div>
                          </a>
                          <a
                            href={'/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-decoration-none items-center px-4 py-1 border  text-white rounded-2 hover:bg-gray-800 transition-colors duration-300"
                          >
                            <div className='d-flex  gap-2 align-items-center k_svg'>
                              <AppleIcon />
                              <div className='k_apple_store_nme'>
                                <span className="font-semibold ">DOWNLOAD ON THE</span>
                                <p className="font-bold text-lg ml-1">App Store</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 k_resp-img-pad">
                    <div className='k_Index12'>
                      <img src={scan_1} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          <section>
            <div className='db_container k_bg_img_3rd '>
              <div className="k_top_text text-white text-center">
                <h3>Hear what our customers say</h3>
              </div>
              {/* Slider */}
              <div className="reviews-section">
                <div className="container">
                  <div className="owl-carousel owl-theme A_carousel">
                    {reviews.map((review) => (
                      <div key={review.id} className="item">
                        <div className="card">
                          <div className="card-footer d-flex align-items-center">
                            <div className="card-footer-img">
                              <img src={`https://i.pravatar.cc/70?img=${review.id}`} alt="user" />
                            </div>
                            <div className="card-footer-data ms-3">
                              <p className="mb-0">{review.author}</p>
                              <ul className="list-unstyled mb-0 d-flex">
                                {[...Array(5)].map((_, index) => (
                                  <li key={index}>
                                    <FaStar />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="card-head">
                            <p>{review.text}</p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* text-content */}
              <div>
                <div className="k_top_text text-white text-center">
                  <h3>Ready to make your own video?</h3>
                  <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus non hic doloremque modi commodi illo explicabo.</p>
                </div>
                <div className='text-center '>
                  <Button className='fw-bold mt-3 px-4' variant="light">Get Started <EastIcon /></Button>
                </div>
              </div>
            </div>
          </section>
        </div >
      </section >
    </>
  );
}

export default Index;