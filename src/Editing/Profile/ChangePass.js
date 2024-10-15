// // src/YourPath/ChangePass.js
// import React, { useState } from 'react';
// import '../../CSS/dprofile.css'; 

// export default function ChangePass() {
//   const [currentPassword, setCurrentPassword] = useState(''); // State for current password
//   const [newPassword, setNewPassword] = useState(''); // State for new password
//   const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

//   const renderAsterisks = (password) => {
//     return '*'.repeat(password.length); // Return asterisks based on password length
//   };

//   return (
//     <>
//     <div className='px-2'>
//         <div className="row">
//             <div className="col-12 mb-2">
//                 <h3>Change Password</h3>
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-xxl-9 col-lg-10 col-12">
//                 <div className='d_profile_bg p-4'>
           
//                     <div className="row py-3 d_p_row_border">
//                         <div className="col-12 ">
//                             <span className='d_pgray_txt'>Current Password</span>
//                         </div>
//                         <div className="col-12">
//                             <input 
//                                 type="password" 
//                                 value={currentPassword}
//                                 onChange={(e) => setCurrentPassword(e.target.value)} // Update state on change
//                                 className="form-control bg-transparent border-0 text-white" 
//                                 placeholder={renderAsterisks(currentPassword) || "Current password"} // Show asterisks in placeholder
//                             />
//                         </div>
//                     </div>
//                     <div className="row py-3 d_p_row_border">
//                         <div className="col-12 ">
//                             <span className='d_pgray_txt'>New Password</span>
//                         </div>
//                         <div className="col-12">
//                             <input 
//                                 type="password" 
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)} // Update state on change
//                                 className="form-control bg-transparent border-0 text-white" 
//                                 placeholder={renderAsterisks(newPassword) || "Enter new password"} // Show asterisks in placeholder
//                             />
//                         </div>
//                     </div>
//                     <div className="row py-3 d_p_row_border">
//                         <div className="col-12 ">
//                             <span className='d_pgray_txt'>Confirm New Password</span>
//                         </div>
//                         <div className="col-12">
//                             <input 
//                                 type="password" 
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
//                                 className="form-control bg-transparent border-0 text-white" 
//                                 placeholder={renderAsterisks(confirmPassword) || "Confirm new password"} // Show asterisks in placeholder
//                             />
//                         </div>
//                     </div>
                 
//                     <div className="row pt-5 pb-4">
//                         <div className="col-12">
//                             <div>
//                                 <span className='bg-white text-dark py-2 px-5 rounded fw-bold'>Save</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </>
//   )
// }
// src/YourPath/ChangePass.js
import React, { useState } from 'react';
import '../../CSS/dprofile.css'; 

export default function ChangePass() {
  const [currentPassword, setCurrentPassword] = useState(''); // State for current password
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

  // Function to display asterisks in the input field
  const handleDisplay = (e, setPassword) => {
    const { value } = e.target;
    setPassword(value); // Store actual password
  };

  // Function to display asterisks instead of real input
  const renderAsterisks = (password) => {
    return '*'.repeat(password.length); // Display asterisks based on password length
  };

  return (
    <>
      <div className='px-2 d_changepass'>
        <div className="row">
          <div className="col-12 mb-2">
            <h3>Change Password</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-9 col-lg-10 col-12">
            <div className='d_profile_bg p-4'>
              
              {/* Current Password Input */}
              <div className="row py-3 d_p_row_border">
                <div className="col-12">
                  <span className='d_pgray_txt'>Current Password</span>
                </div>
                <div className="col-12">
                  <input 
                    type="text" // Use 'text' type to show asterisks
                    value={renderAsterisks(currentPassword)} // Show asterisks instead of real password
                    onChange={(e) => handleDisplay(e, setCurrentPassword)} // Update state with real input
                    className="form-control bg-transparent p-0 mt-3  border-0 text-white" 
                    placeholder="Enter Current password"
                  />
                </div>
              </div>
              
              {/* New Password Input */}
              <div className="row py-3 d_p_row_border">
                <div className="col-12">
                  <span className='d_pgray_txt'>New Password</span>
                </div>
                <div className="col-12">
                  <input 
                    type="text" // Use 'text' type to show asterisks
                    value={renderAsterisks(newPassword)} // Show asterisks instead of real password
                    onChange={(e) => handleDisplay(e, setNewPassword)} // Update state with real input
                    className="form-control bg-transparent p-0 mt-3 border-0 text-white" 
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              {/* Confirm New Password Input */}
              <div className="row py-3 d_p_row_border">
                <div className="col-12">
                  <span className='d_pgray_txt'>Confirm New Password</span>
                </div>
                <div className="col-12">
                  <input 
                    type="text" // Use 'text' type to show asterisks
                    value={renderAsterisks(confirmPassword)} // Show asterisks instead of real password
                    onChange={(e) => handleDisplay(e, setConfirmPassword)} // Update state with real input
                    className="form-control p-0 mt-3 bg-transparent border-0 text-white" 
                    placeholder="Enter Confirm new password"
                  />
                </div>
              </div>
              
              {/* Save Button */}
              <div className="row pt-5 pb-4">
                <div className="col-12">
                  <div>
                    <span className='bg-white text-dark py-2 px-5 rounded fw-bold' style={{cursor:'pointer'}}>
                      Save
                    </span>
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
