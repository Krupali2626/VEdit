import React, { useState } from 'react';
import About_1 from '../Assets/About-1.png'
import About__3 from '../Assets/About__3.png'
import playstore from '../Assets/image 503.svg';
import AppleIcon from '@mui/icons-material/Apple';
import Accordion from 'react-bootstrap/Accordion';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


function AboutUs(props) {

    const [activeKey, setActiveKey] = useState('0');


    const handleAccordionToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    const accordionItems = [
        {
            eventKey: '0',
            header: 'Lorem ipsum dolor sit amet consectetur?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            eventKey: '1',
            header: 'Lorem ipsum dolor sit amet consectetur?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            eventKey: '2',
            header: 'Lorem ipsum dolor sit amet consectetur?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            eventKey: '3',
            header: 'Lorem ipsum dolor sit amet consectetur?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];
    return (
        <>
            <section className='k_bg_image'>
                <div className="db_container">
                    <div className="row k_top_bot_padd d-flex flex-column-reverse flex-md-row">
                        <div className="col-md-6 d-flex align-items-center text-white">
                            <div className='k_about_txt'>
                                <h2>Company Overview</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className='k_about_top_img d-flex justify-content-center'>
                                <img src={About_1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg_about_second_img_k'>
                <div className='db_container'>
                    <div className="row ">
                        <div className="col-md-6">
                            <div className='k_abiut_to_txt text-white'>
                                <h1>Edit Video anytime, anywhere</h1>
                                <p>Dive into a seamless video editing experience. Download our app or edit your video online.</p>
                            </div>
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
            </section>

            <section className='k_bg_image'>
                <div className="db_container">
                    <div className="row k_top_bot_padd">
                        <div className="col-md-6 d-flex align-items-center">
                            <div className='k_about_third_img d-flex justify-content-center'>
                                <img src={About__3} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-white">
                            <div className='k_about__acc_txt'>
                                <h2>Frequently Asked Questions</h2>
                            </div>
                            <div className="k_custom-accordion-container mt-4">
                                <Accordion activeKey={activeKey} onSelect={handleAccordionToggle} flush>
                                    {accordionItems.map((item) => (
                                        <Accordion.Item key={item.eventKey} eventKey={item.eventKey} className="bg-transparent">
                                            <Accordion.Header className="d-flex align-items-center justify-content-between">
                                                {item.header}
                                                {activeKey === item.eventKey ? (
                                                    <RemoveIcon className="accordion-icon" size={20} />
                                                ) : (
                                                    <AddIcon className="accordion-icon" size={20} />
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body>{item.body}</Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;