import React, { useState, useEffect, useRef } from 'react';
import '../CSS/dprofile.css';
import deleteIcon from '../Assets/denisha_img/delete.png';
import Modal from 'react-bootstrap/Modal';
import { MdClose } from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";


export default function MediaComponent({ allMedia, deletedMediaNames = [], handleMediaSelect, handleDeleteMedia }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mediaToDeleteIndex, setMediaToDeleteIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoDurations, setVideoDurations] = useState({});

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDeleteClick = (index) => {
    setMediaToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteMedia = () => {
    if (mediaToDeleteIndex !== null) {
      handleDeleteMedia(mediaToDeleteIndex);
      setShowDeleteModal(false);
      setMediaToDeleteIndex(null);
    }

    // Close modal
    setShowModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setMediaToDeleteIndex(null);
  };

  console.log("All Media:", allMedia);
  console.log("Deleted Media Names:", deletedMediaNames);

  return (
    <div className="d_uploaded_media border p-2 overflow-hidden" style={{ height: '487px' }}>
      <div className="row w-100">
      {allMedia
          .filter((file) => !deletedMediaNames.includes(file.name))
          .slice()
          .reverse()
          .map((file, index) => {
            const reversedIndex = allMedia.length - 1 - index;
            return (
              <div
                className="col-4 mx-1 d-flex   justify-content-center position-relative"
                key={file.name}
                style={{ marginBottom: '15px' ,width: '136px', height: '150px'}}
                onClick={() => handleMediaSelect(reversedIndex)}
              >
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    style={{ width: '136px', height: '150px', objectFit: 'cover' }}
                  />
                ) : file.type.startsWith('video/') ? (
                  <video controls={false} style={{ width: '136px', height: '150px', objectFit: 'cover' }} onLoadedMetadata={(e) => {
                    const duration = e.target.duration; // Get the duration of the video
                    console.log("Video Duration:", formatDuration(duration)); // Log the formatted duration
                    setVideoDurations(prev => ({ ...prev, [file.name]: duration }));
                  }}>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>Unsupported media type</p>
                )}
                <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="delete-icon">
                  <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                </button>
                <div className="hover-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '10px', opacity: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}>
                  <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'right', fontSize: '22px', paddingTop: '6px', display: 'flex', justifyContent: 'end', alignItems: 'baseline' }}>
                    <RiDeleteBin6Line  className='mb-4 text-white' />
                  </button>
                  <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'left', fontSize: '18px', display: 'flex', paddingLeft: '10px', alignItems: 'baseline' }}>
                    {file.type.startsWith('video/') ? (
                        videoDurations[file.name] && !isNaN(videoDurations[file.name]) ? formatDuration(videoDurations[file.name]) : '00:00' // Check if duration is valid
                    ) : (
                        '00:05' // Fixed duration for images
                    )}
                  </button>
                </div>
              </div>
            );
          })}
      </div>

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
                <button className='border w-100 p-2 = rounded bg-transparent text-white' onClick={closeDeleteModal} >
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button className='border w-100 p-2 fw-bold rounded' onClick={confirmDeleteMedia}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showModal} className='d_dwnld_model' onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Delete file</Modal.Title>
          <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={() => setShowModal(false)}>
            <MdClose className='mb-4 text-white' />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className='text-center px-md-5 px-2 mt-2'>Are you sure you want to delete file?</p>
          <div className='mt-5'>
            <div className="row my-4 justify-content-between">
              <div className="col-6 p-0">
                <button className='border w-100 p-2 rounded bg-transparent text-white' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button className='border w-100 p-2 fw-bold rounded' onClick={confirmDeleteMedia}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
