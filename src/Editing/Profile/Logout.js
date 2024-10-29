import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import '../../CSS/dprofile.css';

export default function Logout() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        // Automatically open the modal when the component is mounted
        setShowLogoutModal(true);
    }, []);

    const closeModal = () => setShowLogoutModal(false);

    return (
        <div>
            {/* Modal for Logout Confirmation */}
            <Modal show={showLogoutModal} className='d_dwnld_model' onHide={closeModal} centered>
                <Modal.Header>
                    <Modal.Title>Logout</Modal.Title>
                    <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={closeModal}>
                        <MdClose className='mb-4 text-white' />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='p-3'>
                        <p className='text-center'>Are you sure you want to log out?</p>
                        <div className="row p-3 my-4 justify-content-between">
                        <div className="col-6">
                                <button className=' border w-100 p-2 = rounded bg-transparent text-white' onClick={closeModal}>Cancel</button>
                            </div>
                            <div className="col-6 p-0">
                                <button className='border w-100 p-2 fw-bold rounded' onClick={() => {
                                    // Add your logout logic here
                                    console.log('User logged out');
                                    closeModal(); // Close the modal after logout
                                }}>Yes</button>
                            </div>
                         
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

