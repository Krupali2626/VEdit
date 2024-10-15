import React, { useState, useEffect } from 'react';
import '../CSS/MediaComponent.css';
import d_m1 from "../Assets/denisha_img/cloud.svg";
import mp1 from "../Assets/denisha_img/mp1.svg";
import mp3 from "../Assets/denisha_img/mp3.svg";
import h1 from "../Assets/denisha_img/mp3_ (1).svg";
import h2 from "../Assets/denisha_img/mp3_ (2).svg";
import h3 from "../Assets/denisha_img/mp3_ (3).svg";
import h4 from "../Assets/denisha_img/mp4.svg";
import h5 from "../Assets/denisha_img/mp5.svg";
import h6 from "../Assets/denisha_img/mp6.svg";
import h7 from "../Assets/denisha_img/mp7.svg";
import h8 from "../Assets/denisha_img/mp8.svg";
import { FaPlay, FaPause } from "react-icons/fa6"; // Import play and pause icons

export default function MediaComponent(props) {
  const { uploadedFiles, onFileChange } = props; // Get uploadedFiles and onFileChange from props
  const [files, setFiles] = useState([]); // State to hold multiple uploaded files
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(null); // State to hold the currently playing media

  useEffect(() => {
    if (uploadedFiles) {
      // Add uploaded file to the files array
      setFiles((prevFiles) => [...prevFiles, uploadedFiles]);
    }
  }, [uploadedFiles]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map(file => {
      const fileType = file.type; // Get the MIME type of the file
      console.log(`Uploaded file: ${file.name}, Type: ${fileType}`); // Log file name and type

      // Check if the file is a video or image
      if (fileType.startsWith('video/') || fileType.startsWith('image/')) {
        return {
          url: URL.createObjectURL(file), // Create a URL for the file
          type: fileType
        }; 
      } else {
        console.warn(`Unsupported file type: ${fileType}`); // Warn for unsupported file types
        return null; // Return null for unsupported types
      }
    }).filter(url => url !== null); // Filter out null values

    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files to the existing array
    
    // Set first uploaded file as current media if none selected
    if (!currentMedia && newFiles.length > 0) {
      setCurrentMedia(newFiles[0]);
    }
  };

  const playMedia = (file) => {
    setCurrentMedia(file);
    const videoElement = document.getElementById('uploaded-video');
    if (videoElement) {
      videoElement.src = file.url; // Ensure the file is a valid video URL
      videoElement.play();
      setIsPlaying(true);
    } else {
      console.error("Video element not found"); // Debugging statement
    }
  };

  const pauseMedia = () => {
    const videoElement = document.getElementById('uploaded-video');
    if (videoElement) {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = document.getElementById('uploaded-video');
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
  }, [currentMedia]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.url));
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
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files).map(file => ({
                      url: URL.createObjectURL(file),
                      type: file.type,
                    }));
                    setFiles(prevFiles => [...prevFiles, ...newFiles]); // Update state with new files
                    onFileChange(newFiles); // Call the function passed from parent
                  }} 
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                  <img src={d_m1} alt="" className='mb-2' />
                  <p className='mb-0'>Click to upload</p>
                  <p className='d_gray_imgtxt'>or drag & drop file here</p>
                </label>
              </div>
            </div>
          </div>
          <div>
            {/* {/ File input that accepts both images and videos /} */}
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />

            {/* {/ Display uploaded files /} */}
            <div
              className='d-flex flex-wrap gap-3'
              style={{ height: "500px", overflow: "auto" }}
            >
              {files.map((file, index) => (
                <div key={index} className="uploaded-image">
                  {file.type.startsWith('video/') ? (
                    <video
                      src={file.url}
                      style={{ width: '132px', height: '150px' }}
                      onClick={() => playMedia(file)} // Change to use file object
                      controls
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={`Uploaded ${index + 1}`}
                      style={{ width: '132px', height: '150px' }}
                      onClick={() => playMedia(file)} // Change to use file object
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-12 mt-xl-0 mt-4 d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
          <div className="preview-area mt-4">
            {currentMedia ? (
              <div className="d_uplded_img mx-auto">
                {currentMedia.type.startsWith('video/') ? (
                  <video
                    id="uploaded-video" // Add id for controlling the video
                    src={currentMedia.url}
                    style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                    controls
                    autoPlay
                    onError={() => console.error("Error loading video")}
                  />
                ) : (
                  <img
                    src={currentMedia.url}
                    alt="Selected media"
                    style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                  />
                )}
              </div>
            ) : (
              <div className='d_uplded_img mx-auto'>
                {files.length > 0 && (
                  files[files.length - 1].type.startsWith('video/') ? (
                    <video
                      src={files[files.length - 1].url}
                      style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
                      controls
                    />
                  ) : (
                    <img
                      src={files[files.length - 1].url}
                      alt="Last Uploaded"
                      style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                    />
                  )
                )}
              </div>
            )}
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