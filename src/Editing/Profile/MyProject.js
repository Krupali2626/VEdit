import React, { useState, useRef, useEffect } from 'react';
import '../../CSS/dprofile.css';
import { CiEdit, CiExport } from 'react-icons/ci';
import { LuCopy } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiExport } from 'react-icons/pi';
import p1 from '../../Assets/denisha_img/p1.svg';
import p2 from '../../Assets/denisha_img/p2.svg';
import p3 from '../../Assets/denisha_img/p3.svg';
import prjct from '../../Assets/denisha_img/dwnld1.jfif';
import p4 from '../../Assets/denisha_img/p4.svg';
import { Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

export default function MyProject() {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
    const [projectNames, setProjectNames] = useState([
        'Project 1',
        'Project 2',
        'Project 3',
        'Project 4',
        'Project 5',
        'Project 6',
        'Project 7',
        'Project 8',
        'Project 9',
        'Project 10'
    ]);
    const [newProjectName, setNewProjectName] = useState('');
    const dropdownRefs = useRef([]);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const handleDownloadClick = () => {
        setShowDownloadModal(true);
        setOpenDropdownIndex(null);
    };

    const closeModal = () => setShowDownloadModal(false);

    const handleRenameClick = (index) => {
        setCurrentProjectIndex(index);
        setNewProjectName(projectNames[index]);
        setShowRenameModal(true);
        setOpenDropdownIndex(null);
    };

    const closeRenameModal = () => {
        setShowRenameModal(false);
        setNewProjectName('');
        setCurrentProjectIndex(null);
    };

    const handleRenameSubmit = () => {
        if (currentProjectIndex !== null) {
            const updatedProjectNames = [...projectNames];
            updatedProjectNames[currentProjectIndex] = newProjectName;
            setProjectNames(updatedProjectNames);
            closeRenameModal();
        }
    };

    const handleDeleteClick = (index) => {
        setCurrentProjectIndex(index);
        setShowDeleteModal(true);
        setOpenDropdownIndex(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCurrentProjectIndex(null);
    };

    const handleDeleteConfirm = () => {
        if (currentProjectIndex !== null) {
            const updatedProjectNames = [...projectNames];
            updatedProjectNames.splice(currentProjectIndex, 1);
            setProjectNames(updatedProjectNames);
            closeDeleteModal();
        }
    };

    const handleDuplicateClick = (index) => {
        const updatedProjectNames = [...projectNames];
        const duplicatedProject = `${projectNames[index]} (Copy)`;  // Adding "(Copy)" to indicate it's a duplicate
        updatedProjectNames.splice(index + 1, 0, duplicatedProject); // Insert the duplicated project next to the original
        setProjectNames(updatedProjectNames);
        setOpenDropdownIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                return;
            }
            setOpenDropdownIndex(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='px-2 d_changepass'>
                <div className="row">
                    <div className="col-12 mb-2">
                        <h3>My Project</h3>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {projectNames.map((projectName, index) => (
                        <div className="mt-3 d_pcol" key={index}>
                            <div className='d_pmyprjct_bg'>
                                <div className="d_overlayer d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-end p-2 fs-4 position-relative" ref={el => dropdownRefs.current[index] = el}>
                                        <button
                                            onClick={() => toggleDropdown(index)}
                                            className="btn fs-3 text-white p-0"
                                        >
                                            &#8942;
                                        </button>
                                        {openDropdownIndex === index && (
                                            <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ minWidth: 'max-content', marginTop: '34px' }}>
                                                <button className="dropdown-item py-1 d-flex align-items-center" onClick={handleDownloadClick}>
                                                    <img src={p1} className='me-2' alt="" /> Download
                                                </button>
                                                <button className="dropdown-item py-1 d-flex align-items-center" onClick={() => handleDuplicateClick(index)}>
                                                    <img src={p2} className='me-2' alt="" /> Duplicate
                                                </button>
                                                <button className="dropdown-item py-1 d-flex align-items-center" onClick={() => handleRenameClick(index)}>
                                                    <img src={p3} className='me-2' alt="" /> Rename
                                                </button>
                                                <button className="dropdown-item py-1 d-flex align-items-center" onClick={() => handleDeleteClick(index)}>
                                                    <img src={p4} className='me-2' alt="" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end p-3">
                                        <div>
                                            <h5 className="text-white mb-1">{projectName}</h5>
                                            <p className="text-white mb-0 d_pgray_txt">29 Jun</p>
                                        </div>
                                        <div className="text-white">
                                            <span>05:19</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Modal for Download */}
                <Modal show={showDownloadModal} className='d_dwnld_model' onHide={closeModal} centered>
                     <Modal.Header className='align-itmes-center'>
                         <Modal.Title>Download</Modal.Title>
                         <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={closeModal}><MdClose className='mb-4 text-white' /></button>
                     </Modal.Header>
                     <Modal.Body>
                         <div className='d-flex p-3 '>
                             <div>
                                 <img src={prjct} className='me-2 d_dwnld1_img' alt="" />
                             </div>
                             <div className='ms-2'>
                                 <p className='d_dwnld_fs my-2'>Project 01</p>
                                 <span className=''>05:19</span> <span className='d_dwnld_pipe'>&nbsp;|&nbsp;</span><span className=''> 29 Jun</span>
                                 <p className='mb-0 my-2'>28 MB</p>
                             </div>
                         </div>
                         <div className="row p-3 my-4 justify-content-between">
                             <div className="col-6 p-0">
                                 <button className='border-0 w-100 p-2 fw-bold rounded'>Remove Watermark</button>
                             </div>
                             <div className="col-6">
                                 <button className='border w-100 p-2 fw-bold rounded'>Download</button>
                             </div>
                         </div>
                     </Modal.Body>
                 </Modal>
                 {/* Modal for Rename */}
                 <Modal show={showRenameModal} className='d_dwnld_model' onHide={closeRenameModal} centered>
                     <Modal.Header>
                         <Modal.Title>Rename Project</Modal.Title>

                         <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={closeRenameModal}><MdClose className='mb-4 text-white' /></button>
                     </Modal.Header>
                     <Modal.Body>
                         <div className='p-sm-3 p-1'>
                             <input
                                type="text"
                                className="form-control bg-transparent text-white"
                                id="renameInput"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                            />
                            <div className='mt-5'>
                                <div className="row my-4 justify-content-between">
                                    <div className="col-6 p-0">
                                        <button className='border w-100 p-2 = rounded bg-transparent text-white' onClick={handleRenameSubmit}>
                                            Rename
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className='border w-100 p-2 fw-bold rounded' onClick={closeRenameModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Modal for Delete Confirmation */}
                <Modal show={showDeleteModal} className='d_dwnld_model' onHide={closeDeleteModal} centered>
                    <Modal.Header>
                        <Modal.Title>Delete</Modal.Title>
                        <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={closeDeleteModal}><MdClose className='mb-4 text-white' /></button>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center px-md-5 px-2 mt-2'>Are you sure you want to delete project permanently?</p>
                        <div className='mt-5'>
                                <div className="row my-4 justify-content-between">
                                    <div className="col-6 p-0">
                                        <button className='border w-100 p-2 = rounded bg-transparent text-white'  onClick={closeDeleteModal} >
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className='border w-100 p-2 fw-bold rounded' onClick={handleDeleteConfirm}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}
