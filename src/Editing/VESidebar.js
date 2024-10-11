// src/Editing/VESidebar.js
import React, { useEffect, useState, useRef } from 'react';
import { HiOutlinePlus, HiOutlineMenu } from 'react-icons/hi';
import '../CSS/d_navbar.css';
import '../CSS/vesidebar.css';
import m1 from "../Assets/denisha_img/m1.svg";
import m2 from "../Assets/denisha_img/m2.svg";
import m3 from "../Assets/denisha_img/m3.svg";
import m4 from "../Assets/denisha_img/m4.svg";
import m5 from "../Assets/denisha_img/m5.svg";
import m6 from "../Assets/denisha_img/m6.svg";
import m7 from "../Assets/denisha_img/m7.svg";
import m8 from "../Assets/denisha_img/m8.svg";
import m9 from "../Assets/denisha_img/m9.svg";
import m10 from "../Assets/denisha_img/m10.svg";
import m11 from "../Assets/denisha_img/m11.svg";
import m12 from "../Assets/denisha_img/m12.svg";
import d from "../Assets/denisha_img/dwnld.svg";
import crown from "../Assets/denisha_img/crown.svg";
import ur1 from "../Assets/denisha_img/ur1.svg";
import ur2 from "../Assets/denisha_img/ur2.svg";
import { CiExport } from 'react-icons/ci';
import MediaComponent from './MediaComponent';
import MergeComponent from './MergeComponent';
import RatioComponent from './RatioComponent';
import TextComponent from './TextComponent';
import MusicComponent from './MusicComponent';
import VideosComponent from './VideosComponent';
import ImagesComponent from './ImagesComponent';
import BackgroundComponent from './BackgroundComponent';
import ZoomComponent from './ZoomComponent';
import FilterComponent from './FilterComponent';
import ElementComponent from './ElementComponent';
import AnimationComponent from './AnimationComponent';

export default function VESidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeMenu, setActiveMenu] = useState('Media');
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold the uploaded files
    const fileInputRef = useRef(null); // Reference for file input

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handlePlusClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = selectedFiles.map(file => {
            return {
                url: URL.createObjectURL(file), // Create a URL for the file
                type: file.type // Store the file type
            };
        });
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files to the existing array
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Update active menu
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="fixed-navbar">
                <div className="row text-white">
                    <div className=''>
                        <div className="row">
                            <div className="col-12 text-end my-3 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    {isMobile && (
                                        <div className="hamburger mb-1 me-2" onClick={toggleSidebar}>
                                            <HiOutlineMenu className='border' />
                                        </div>
                                    )}
                                    <h4 className="mb-0">LOGO</h4>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        <img src={ur2} className='me-md-3 me-2' />
                                        <img src={ur1} className='me-md-3 me-2' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-auto p-0">
                    <div className={`fixed-sidebar dE_sidebar d-flex flex-column align-items-center ${isOpen ? 'open' : 'closed'}`}>
                        {(isOpen || !isMobile) && (
                            <>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className='bg_round' onClick={handlePlusClick}>
                                        <div className='dE_plus'>
                                            <HiOutlinePlus />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Menu Items */}
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Media')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Media' ? 'd_active' : ''}`}>
                                        <img src={m1} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Media</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Merge')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Merge' ? 'd_active' : ''}`}>
                                        <img src={m2} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Merge</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Ratio')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Ratio' ? 'd_active' : ''}`}>
                                        <img src={m3} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Ratio</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Text')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Text' ? 'd_active' : ''}`}>
                                        <img src={m4} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Text</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Music')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Music' ? 'd_active' : ''}`}>
                                        <img src={m5} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Music</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Videos')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Videos' ? 'd_active' : ''}`}>
                                        <img src={m6} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Videos</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Images')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Images' ? 'd_active' : ''}`}>
                                        <img src={m7} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Images</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Background')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Background' ? 'd_active' : ''}`}>
                                        <img src={m8} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Background</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Zoom')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Zoom' ? 'd_active' : ''}`}>
                                        <img src={m9} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Zoom</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Filter')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Filter' ? 'd_active' : ''}`}>
                                        <img src={m10} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Filter</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Element')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Element' ? 'd_active' : ''}`}>
                                        <img src={m11} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Element</span>}
                                    </div>
                                </div>
                                <div className="bg_square mt-3 mb-2" onClick={() => handleMenuClick('Animation')}>
                                    <div className={`d-flex flex-column justify-content-center align-items-center ${activeMenu === 'Animation' ? 'd_active' : ''}`}>
                                        <img src={m12} alt="" className='dE_menu' />
                                        {isMobile ? null : <span>Animation</span>}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef} // Reference to the file input
                    onChange={handleFileChange} // Handle file change
                    multiple // Allow multiple file uploads
                />
                <div className="col a_main px-0">
                    {/* Render content based on active menu */}
                    {activeMenu === 'Media' && <MediaComponent uploadedFiles={uploadedFiles} onFileChange={handleFileChange} />} {/* Pass uploaded files and file change handler */}
                    {activeMenu === 'Merge' && <MergeComponent />}
                    {activeMenu === 'Ratio' && <RatioComponent />}
                    {activeMenu === 'Text' && <TextComponent />}
                    {activeMenu === 'Music' && <MusicComponent />}
                    {activeMenu === 'Videos' && <VideosComponent />}
                    {activeMenu === 'Images' && <ImagesComponent />}
                    {activeMenu === 'Background' && <BackgroundComponent />}
                    {activeMenu === 'Zoom' && <ZoomComponent />}
                    {activeMenu === 'Filter' && <FilterComponent />}
                    {activeMenu === 'Element' && <ElementComponent />}
                    {activeMenu === 'Animation' && <AnimationComponent />}
                </div>
            </div>
        </>
    );
}