import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaFacebookF } from "react-icons/fa";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';

function Footer(props) {
    return (
        <>
            <footer className="footer k_f_bg_image">
                <section className='k_footer_bg'>
                    <div className="db_container">
                        <div className="row k_f_space text-white">
                            <div className="col-lg-4 col-md-6 lh-base k_f_txt">
                                <h3>LOGO</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, maxime?</p>
                                <div className='d-flex mt-5  k_ft_Icons'>
                                    <div className="k_circle">
                                        <span><YouTubeIcon style={{ color: 'black' }} /></span>
                                    </div>
                                    <div className="k_circle">
                                        <span><InstagramIcon style={{ color: 'black' }} /></span>
                                    </div>
                                    <div className="k_circle">
                                        <span><TwitterIcon style={{ color: 'black' }} /></span>
                                    </div>
                                    <div className="k_circle">
                                        <span><FaFacebookF style={{ color: 'black' }} /></span>
                                    </div>
                                </div>
                            </div>
                            

                            <div className="col-lg-2 col-md-6 col-6 lh-lg">
                                <div className='k_ListOf_Learn'>
                                    <ul className='px-0 k_ft_learn'>Learn
                                        <li><NavLink className='text-decoration-none text-white' to="/about" activeClassName="active">About Us</NavLink></li>
                                        <li><NavLink className='text-decoration-none text-white' to="/help" activeClassName="active">Help</NavLink></li>
                                        <li><NavLink className='text-decoration-none text-white' to="/contact" activeClassName="active">Contact Us</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-6 lh-lg mt-lg-0 mt-md-4">
                                <div className='k_listOf_Company'>
                                    <ul className='px-0 k_ft_Companny'>Company
                                        <li><NavLink className='text-decoration-none text-white' to="/pricing" activeClassName="active">Pricing</NavLink></li>
                                        <li><NavLink className='text-decoration-none text-white' to="/privacy-policy" activeClassName="active">Privacy Policy</NavLink></li>
                                        <li><NavLink className='text-decoration-none text-white' to="/terms-of-service" activeClassName="active">Terms of Service</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 lh-lg mt-lg-0 mt-md-4 k_ft_email">
                                <h3>Subscribe to our newsletter</h3>
                                <p>Subscribe to our newsletter to get notify about our new features.</p>
                                <Box component="form"
                                    sx={{ '& > :not(style)': { m: 1, width: '80%' } }}
                                    noValidate
                                    autoComplete="off"
                                    className='mb-4'
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter your Email"
                                        variant="outlined"

                                        InputLabelProps={{
                                            style: { color: 'gray' }, // Label color
                                        }}
                                        InputProps={{
                                            style: { color: 'white', height: '50px' }, // Text color
                                            classes: {
                                                notchedOutline: 'gray',
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gray', // Default border color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'gray', // Hover border color
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'gray', // Focused border color
                                                },
                                            }
                                        }}
                                    />
                                </Box>
                                <div>
                                    <Button className='px-4 fw-semibold' variant="light">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border-top border-secondary  k_ft_copy p-3 mt-3 mt-md-5 text-center text-white'>
                        <span>copyright 2024 ASK Project</span>
                    </div>
                </section >

            </footer>
        </>
    );
}

export default Footer;