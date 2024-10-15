// src/Editing/MediaComponent.js
import React, { useState, useEffect, useRef } from 'react';
import '../CSS/MediaComponent.css';
import d_m1 from "../Assets/denisha_img/cloud.svg";
import mp1 from "../Assets/denisha_img/mp1.svg";
import mp3 from "../Assets/denisha_img/mp3.svg";
import h8 from "../Assets/denisha_img/mp8.svg";
import { FaPlay, FaPause } from "react-icons/fa6"; // Import play and pause icons

export default function MediaComponent(props) {
  const { uploadedFiles, onFileChange } = props; // Get uploadedFiles and onFileChange from props
  const [files, setFiles] = useState([]); // State to hold multiple uploaded files
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected file
  const videoRef = useRef(null); // Reference for the video element

  useEffect(() => {
    // Update files state to include all uploaded files
    setFiles(uploadedFiles);
  }, [uploadedFiles]);

  const playMedia = () => {
    if (videoRef.current) {
      // Set selectedFile to the latest uploaded video
      const latestFile = files[files.length - 1];
      if (latestFile && latestFile.type.startsWith('video/')) {
        setSelectedFile(latestFile); // Update selectedFile to the latest video
      }
      
      videoRef.current.play().then(() => {
        setIsPlaying(true); // Set playing state to true
      }).catch(error => {
        console.error("Error playing video:", error);
      });
    }
  };

  const pauseMedia = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        url: URL.createObjectURL(file), // Create Blob URL for the new file
        type: file.type,
      }));
      console.log("New Files:", newFiles); // Log new files for debugging
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      setSelectedFile(newFiles[0]); // Select the first of the newly uploaded files
      onFileChange(e);
    }
  };

  // Handle file click to select it
  const handleFileClick = (file) => {
    setSelectedFile(file);
    if (file.type.startsWith('video/')) {
      setIsPlaying(false); // Reset play state for videos
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const updateCurrentTime = () => {
        setCurrentTime(videoElement.currentTime);
        setDuration(videoElement.duration);
      };
      videoElement.addEventListener('timeupdate', updateCurrentTime);
      return () => {
        videoElement.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, []);

  // Cleanup effect to revoke Blob URLs when no longer needed
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.url.startsWith('blob:')) {
          console.log("Revoking Blob URL:", file.url); // Log when revoking
          URL.revokeObjectURL(file.url); // Revoke Blob URL when no longer needed
        }
      });
    };
  }, [files]);

  return (
    <>
      <div className="row">
        <div className="col-xl-3 border col-12 d-flex justify-content-center p-0 d_select_col">
          <div className='d_upld_bgimg' style={{ display: files.length === 0 ? 'block' : 'none' }}>
            <div className='d_overlayer d-flex justify-content-center align-items-center'>
              <div className='text-center'>
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  id="file-upload"
                  multiple // Allow multiple file uploads
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  <img src={d_m1} alt="" className='mb-2' />
                  <p className='mb-0'>Click to upload</p>
                  <p className='d_gray_imgtxt'>or drag & drop file here</p>
                </label>
              </div>
            </div>
          </div>

          {/* Display uploaded files */}
          <div>
            <div
              className='d-flex flex-wrap gap-3'
              style={{ height: "500px", overflow: "auto" }}
            >
              {files.map((file, index) => (
                <div key={index} className="uploaded-image" onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                  {file.type.startsWith('video/') ? (
                    <video
                      src={file.url}
                      style={{ width: '132px', height: '150px', objectFit: 'cover' }}
                      controls // Added controls for better user experience
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={`Uploaded ${index + 1}`}
                      style={{ width: '132px', height: '150px', objectFit: 'cover' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-12 mt-xl-0 mt-4 d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
          <div className="preview-area mt-4">
            <div className='d_uplded_img mx-auto'>
              {selectedFile ? ( // Updated to use selectedFile
                selectedFile.type.startsWith('video/') ? (
                  <video
                    ref={videoRef} // Use ref for controlling the video
                    id="uploaded-video" // Add id for controlling the video
                    src={selectedFile.url}
                    style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                    autoPlay
                    onError={() => console.error("Error loading video")}
                  />
                ) : (
                  <img
                    src={selectedFile.url} // Ensure the src is set to the selected file's URL
                    alt="Selected Uploaded"
                    style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                  />
                )
              ) : (
                files.length > 0 && (
                  files[files.length - 1].type.startsWith('video/') ? (
                    <video
                      ref={videoRef} // Use ref for controlling the video
                      id="uploaded-video" // Add id for controlling the video
                      src={files[files.length - 1].url}
                      style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                      autoPlay
                      onError={() => console.error("Error loading video")}
                    />
                  ) : (
                    <img
                      src={files[files.length - 1].url}
                      alt="Last Uploaded"
                      style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                    />
                  )
                )
              )}
            </div>
          </div>

          <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
            <img src={mp1} alt="" />
            {isPlaying ? (
              <FaPause onClick={pauseMedia} style={{ cursor: 'pointer' }} />
            ) : (
              <FaPlay onClick={playMedia} style={{ cursor: 'pointer' }} />
            )}
            <img src={mp3} alt="" />
          </div>
        </div>
      </div>
      <div className="dm_last_bg mt-3">
        <div className='d_border'>
          <div className="mx-4 py-2 d-flex justify-content-between">
            <div className='d_text-opacity'>
              <img src={h8} alt="" className='me-3' />
            </div>
            <div className='d_text-opacity'>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
