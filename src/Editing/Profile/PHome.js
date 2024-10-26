// import React, { useState } from 'react';
// import '../../CSS/dprofile.css';

// export default function PHome() {
//     const [name, setName] = useState('John Dave');
//     const [MobileNo, setMobileNo] = useState('+91 65656 65656');
//     const [Email, setEmail] = useState('example@gmail.com');
//     const [Gender, setGender] = useState('Male');
//     const [Profession, setProfession] = useState('Cinematographer');
//     const [Age, setAge] = useState(25);

//     const [isEditing, setIsEditing] = useState(false);
//     const toggleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     return (
//         <>
//             | {
//                 console.log("fgcahdfgyugyu")
//             }
//             <div className='px-2'>
//                 <div className="row">
//                     <div className="col-12 mb-2">
//                         <h3>My Profile</h3>
//                     </div>
//                 </div>
//                 <form action="">
//                     <div className="row">
//                         <div className="col-xxl-9 col-lg-10 col-12">
//                             <div className='d_profile_bg p-4'>

//                                 <div className="row py-2 d_p_row_border">
//                                     <div className="col-12 d-flex justify-content-between align-items-center">
//                                         <div style={{ flexGrow: 1 }}> {/* This section grows to take available space */}
//                                             <div className="col-12">
//                                                 <span className='d_pgray_txt'>Name</span>
//                                             </div>
//                                             <div className="col-12 mt-2">
//                                                 {isEditing ? (
//                                                     // Input field with flex-grow so it takes only the available space
//                                                     <input
//                                                         type="text"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                         className="form-control bg-transparent border-0 text-white"
//                                                         style={{
//                                                             width: '100%',
//                                                             whiteSpace: 'nowrap',
//                                                             overflow: 'hidden',   // Ensures no overflow
//                                                             textOverflow: 'ellipsis', // Shows "..." if text is too long
//                                                         }}
//                                                     />
//                                                 ) : (
//                                                     <span>{name}</span>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className='text-end' style={{ marginLeft: '10px' }}> {/* Button section, taking only needed space */}
//                                             <p
//                                                 className='bg-white text-dark py-2 px-5 rounded fw-bold'
//                                                 style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
//                                                 onClick={toggleEdit}
//                                             >
//                                                 {isEditing ? 'Save' : 'Edit'}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="row py-3 d_p_row_border">
//                                     <div className="col-12">
//                                         <span className='d_pgray_txt'>Mobile No.</span>
//                                     </div>
//                                     <div className="col-12 mt-2">
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={MobileNo}
//                                                 onChange={(e) => setMobileNo(e.target.value)}
//                                                 className="form-control bg-transparent border-0 text-white"
//                                             />
//                                         ) : (
//                                             <span>{MobileNo}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="row py-3 d_p_row_border">
//                                     <div className="col-12">
//                                         <span className='d_pgray_txt'>Email</span>
//                                     </div>
//                                     <div className="col-12 mt-2">
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={Email}
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 className="form-control bg-transparent border-0 text-white"
//                                             />
//                                         ) : (
//                                             <span>{Email}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="row py-3 d_p_row_border">
//                                     <div className="col-12">
//                                         <span className='d_pgray_txt'>Gender</span>
//                                     </div>
//                                     <div className="col-12 mt-2">
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={Gender}
//                                                 onChange={(e) => setGender(e.target.value)}
//                                                 className="form-control bg-transparent border-0 text-white"
//                                             />
//                                         ) : (
//                                             <span>{Gender}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="row py-3 d_p_row_border">
//                                     <div className="col-12">
//                                         <span className='d_pgray_txt'>Profession</span>
//                                     </div>
//                                     <div className="col-12 mt-2">
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={Profession}
//                                                 onChange={(e) => setProfession(e.target.value)}
//                                                 className="form-control bg-transparent border-0 text-white"
//                                             />
//                                         ) : (
//                                             <span>{Profession}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="row py-3 d_p_row_border">
//                                     <div className="col-12">
//                                         <span className='d_pgray_txt'>Age</span>
//                                     </div>
//                                     <div className="col-12 mt-2">
//                                         {isEditing ? (
//                                             <input
//                                                 type="text"
//                                                 value={Age}
//                                                 onChange={(e) => setAge(e.target.value)}
//                                                 className="form-control bg-transparent border-0 text-white"
//                                             />
//                                         ) : (
//                                             <span>{Age}</span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="row pt-5 pb-4">
//                                     <div className="col-12">
//                                         <div>
//                                             <span className='bg-white text-dark py-2 px-5 rounded fw-bold' style={{ cursor: 'pointer' }}>Save</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import '../../CSS/dprofile.css';

export default function PHome() {
    // State to store user data
    const [name, setName] = useState('');
    const [MobileNo, setMobileNo] = useState('');
    const [Email, setEmail] = useState('');
    const [Gender, setGender] = useState('');
    const [Profession, setProfession] = useState('');
    const [Age, setAge] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // UseEffect to retrieve and set user data from localStorage on component mount
    useEffect(() => {
        // Retrieve user data object from localStorage
        const user = JSON.parse(localStorage.getItem('user')) || {};
        
        // If user data exists, destructure and set the respective fields
        if (user && user.additional) {
            setName(user.additional.name || 'John Dave');
            setGender(user.additional.gender || 'Male');
            setAge(user.additional.age || 25);
            setProfession(user.additional.profession || 'Cinematographer');
            setEmail(user.email || 'example@gmail.com');
            setMobileNo(user.MobileNo || '+91 65656 65656');
        }
    }, []);

    // Function to toggle between edit and view mode and save data to localStorage
    const toggleEdit = () => {
        if (isEditing) {
            // Save updated data back to localStorage
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...JSON.parse(localStorage.getItem('user')),
                    email: Email,
                    MobileNo,
                    additional: { name, gender: Gender, age: Age, profession: Profession }
                })
            );
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className='px-2'>
            <div className="row">
                <div className="col-12 mb-2">
                    <h3>My Profile</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-9 col-lg-10 col-12">
                    <div className='d_profile_bg p-4'>
                        {/* Name Field */}
                        <div className="row py-2 d_p_row_border">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <div style={{ flexGrow: 1 }}>
                                    <span className='d_pgray_txt'>Name</span>
                                    <div className="col-12 mt-2">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control bg-transparent border-0 text-white"
                                            />
                                        ) : (
                                            <span>{name}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='text-end' style={{ marginLeft: '10px' }}>
                                    <p
                                        className='bg-white text-dark py-2 px-5 rounded fw-bold'
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleEdit}
                                    >
                                        {isEditing ? 'Save' : 'Edit'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional fields (Mobile, Email, etc.) follow similar structure */}
                        {/* MobileNo Field */}
                        <div className="row py-3 d_p_row_border">
                            <span className='d_pgray_txt'>Mobile No.</span>
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

                        {/* Email Field */}
                        <div className="row py-3 d_p_row_border">
                            <span className='d_pgray_txt'>Email</span>
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

                        {/* Gender Field */}
                        <div className="row py-3 d_p_row_border">
                            <span className='d_pgray_txt'>Gender</span>
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

                        {/* Profession Field */}
                        <div className="row py-3 d_p_row_border">
                            <span className='d_pgray_txt'>Profession</span>
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

                        {/* Age Field */}
                        <div className="row py-3 d_p_row_border">
                            <span className='d_pgray_txt'>Age</span>
                            <div className="col-12 mt-2">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={Age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="form-control bg-transparent border-0 text-white"
                                    />
                                ) : (
                                    <span>{Age}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
