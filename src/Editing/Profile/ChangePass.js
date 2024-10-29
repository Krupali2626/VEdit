import React, { useEffect, useState } from 'react';
import '../../CSS/dprofile.css';

export default function ChangePass() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  const handleDisplay = (e, setPassword) => {
    const { value } = e.target;
    setPassword(value);
  };

  const renderAsterisks = (password) => '*'.repeat(password.length);

  const handleSave = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData.password !== currentPassword) {
      setErrorMessage('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    const updatedData = {
      ...userData,
      password: newPassword,
    };

    console.log("updatedData", updatedData)

    try {
      const response = await fetch(`http://localhost:1726/signup/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Update successful, update local storage and clear the form
        localStorage.setItem('user', JSON.stringify(updatedData));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage(''); // Clear any error messages
        alert('Password updated successfully');
      } else {
        setErrorMessage('Failed to update password');
      }
    } catch (error) {
      setErrorMessage('Error updating password');
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.password) {
      setStoredPassword(userData.password); // Set the password directly from local storage
    }
  }, []);

  const handleChangePassword = async () => {
    // Check if current password matches the stored password
    if (currentPassword !== storedPassword) {
      alert('Current password is incorrect');
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Update the password through the API
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...userData, password: newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Password updated successfully');
      // Use fetch to update the user data
      const response = await fetch(`http://localhost:1726/signup/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
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

              {/* Error Message */}
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

              {/* Current Password Input */}
              <div className="row py-3 d_p_row_border">
                <div className="col-12">
                  <span className='d_pgray_txt'>Current Password</span>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    value={renderAsterisks(currentPassword)}
                    onChange={(e) => handleDisplay(e, setCurrentPassword)}
                    className="form-control bg-transparent p-0 mt-3 border-0 text-white"
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
                    type="text"
                    value={renderAsterisks(newPassword)}
                    onChange={(e) => handleDisplay(e, setNewPassword)}
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
                    type="text"
                    value={renderAsterisks(confirmPassword)}
                    onChange={(e) => handleDisplay(e, setConfirmPassword)}
                    className="form-control bg-transparent p-0 mt-3 border-0 text-white"
                    placeholder="Enter Confirm new password"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="row pt-5 pb-4">
                <div className="col-12">
                  <span
                    className='bg-white text-dark py-2 px-5 rounded fw-bold'
                    style={{ cursor: 'pointer' }}
                    onClick={handleSave}
                  >
                    Save
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
