import React, { useState } from 'react';
import '../../CSS/dprofile.css';

export default function PHome() {
    const [name, setName] = useState('John Dave');
    const [MobileNo  , setMobileNo] = useState('+91 65656 65656');
    const [Email, setEmail] = useState('example@gmail.com');
    const [Gender, setGender] = useState('Male');
    const [Profession, setProfession] = useState('Cinematographer');
    const [Age, setAge] = useState(25);

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <div className='px-2'>
                <div className="row">
                    <div className="col-12 mb-2">
                        <h3>My Profile</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-9 col-lg-10 col-12">
                        <div className='d_profile_bg p-4'>
                          
                            <div className="row py-2 d_p_row_border">
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <div style={{ flexGrow: 1 }}> {/* This section grows to take available space */}
                                        <div className="col-12">
                                            <span className='d_pgray_txt'>Name</span>
                                        </div>
                                        <div className="col-12 mt-2">
                                            {isEditing ? (
                                                // Input field with flex-grow so it takes only the available space
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control bg-transparent border-0 text-white"
                                                    style={{
                                                        width: '100%',   
                                                        whiteSpace: 'nowrap', 
                                                        overflow: 'hidden',   // Ensures no overflow
                                                        textOverflow: 'ellipsis', // Shows "..." if text is too long
                                                    }}
                                                />
                                            ) : (
                                                <span>{name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='text-end' style={{ marginLeft: '10px' }}> {/* Button section, taking only needed space */}
                                        <p
                                            className='bg-white text-dark py-2 px-5 rounded fw-bold'
                                            style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                                            onClick={toggleEdit}
                                        >
                                            {isEditing ? 'Save' : 'Edit'}
                                        </p>
                                    </div>
                                </div>
                            </div>                  

                            <div className="row py-3 d_p_row_border">
                                <div className="col-12">
                                    <span className='d_pgray_txt'>Mobile No.</span>
                                </div>
                                <div className="col-12 mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={MobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            className="form-control bg-transparent border-0 text-white"
                                        />
                                    ) : (
                                        <span>{MobileNo}</span>
                                    )}
                                </div>
                            </div>

                            <div className="row py-3 d_p_row_border">
                                <div className="col-12">
                                    <span className='d_pgray_txt'>Email</span>
                                </div>
                                <div className="col-12 mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control bg-transparent border-0 text-white"
                                        />
                                    ) : (
                                        <span>{Email}</span>
                                    )}
                                </div>
                            </div>

                            <div className="row py-3 d_p_row_border">
                                <div className="col-12">
                                    <span className='d_pgray_txt'>Gender</span>
                                </div>
                                <div className="col-12 mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={Gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="form-control bg-transparent border-0 text-white"
                                        />
                                    ) : (
                                        <span>{Gender}</span>
                                    )}
                                </div>
                            </div>

                            <div className="row py-3 d_p_row_border">
                                <div className="col-12">
                                    <span className='d_pgray_txt'>Profession</span>
                                </div>
                                <div className="col-12 mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={Profession}
                                            onChange={(e) => setProfession(e.target.value)}
                                            className="form-control bg-transparent border-0 text-white"
                                        />
                                    ) : (
                                        <span>{Profession}</span>
                                    )}
                                </div>
                            </div>

                            <div className="row py-3 d_p_row_border">
                                <div className="col-12">
                                    <span className='d_pgray_txt'>Age</span>
                                </div>
                                <div className="col-12 mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={Age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="form-control bg-transparent border-0 text-white"
                                        />
                                    ) : (
                                        <span>{Age}</span>
                                    )}
                                </div>
                            </div>



                            <div className="row pt-5 pb-4">
                                <div className="col-12">
                                    <div>
                                        <span className='bg-white text-dark py-2 px-5 rounded fw-bold' style={{ cursor: 'pointer' }}>Save</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
