// // import React, { useState } from 'react';
// // import '../CSS/MediaComponent.css';
// // import d_m1 from "../Assets/denisha_img/cloud.svg";
// // import mp1 from "../Assets/denisha_img/mp1.svg";
// // import mp2 from "../Assets/denisha_img/mp2.svg";
// // import mp3 from "../Assets/denisha_img/mp3.svg";
// // import h1 from "../Assets/denisha_img/mp3_ (1).svg";
// // import h2 from "../Assets/denisha_img/mp3_ (2).svg";
// // import h3 from "../Assets/denisha_img/mp3_ (3).svg";
// // import h4 from "../Assets/denisha_img/mp4.svg";
// // import h5 from "../Assets/denisha_img/mp5.svg";
// // import h6 from "../Assets/denisha_img/mp6.svg";
// // import h7 from "../Assets/denisha_img/mp7.svg";
// // import h8 from "../Assets/denisha_img/mp8.svg";
// // import { FaPlay, FaPause } from "react-icons/fa6"; // Import play and pause icons

// // export default function MediaComponent() {
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isVideo, setIsVideo] = useState(false);
// //   const [scaleEffect, setScaleEffect] = useState(false); // New state for scaling effect
// //   const [isPlaying, setIsPlaying] = useState(false); // New state to track if video is playing

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       setUploadedFile(URL.createObjectURL(file));
// //       setIsVideo(file.type.startsWith('video/'));
// //       setScaleEffect(true); // Trigger scaling effect
// //       setTimeout(() => setScaleEffect(false), 1000); // Reset after 1 second
// //     }
// //   };

// //   const playVideo = () => {
// //     const videoElement = document.getElementById('uploaded-video');
// //     if (videoElement) {
// //       videoElement.play();
// //       setIsPlaying(true); // Set playing state to true
// //     }
// //   };

// //   const pauseVideo = () => {
// //     const videoElement = document.getElementById('uploaded-video');
// //     if (videoElement) {
// //       videoElement.pause();
// //       setIsPlaying(false); // Set playing state to false
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="row">
// //         <div className="col-xl-3 col-12  d-flex justify-content-center p-0">
// //           <div className='d_upld_bgimg'>
// //             <div className='d_overlayer d-flex justify-content-center align-items-center'>
// //               <div className='text-center'>
// //                 <input
// //                   type="file"
// //                   accept="image/*,video/*" // Updated to accept both images and videos
// //                   onChange={handleFileChange}
// //                   style={{ display: 'none' }}
// //                   id="file-upload"
// //                 />
// //                 <label htmlFor="file-upload">
// //                   <img src={d_m1} alt="" className='mb-2' />
// //                   <p className='mb-0'>Click to upload</p>
// //                   <p className='d_gray_imgtxt'>or drag & drop file here</p>
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-xl-9 col-12 mt-xl-0 mt-4  d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
// //           {uploadedFile ? (
// //             <div className="d_uplded_img mx-auto">
// //               {isVideo ? (
// //                 <video
// //                   src={uploadedFile}
// //                   className=""
// //                   id="uploaded-video" // Added an ID for reference
// //                 />
// //               ) : (
// //                 <img
// //                   src={uploadedFile}
// //                   alt="Uploaded"
// //                   className=""
// //                 />
// //               )}
// //             </div>
// //           ) : (
// //             <div className='d_uplded_img mx-auto'></div>
// //           )}

// //           <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
// //             <img src={mp1} alt="" />
// //             {isPlaying ? ( // Conditional rendering for play/pause icon
// //               <FaPause onClick={pauseVideo} style={{ cursor: 'pointer' }} />
// //             ) : (
// //               <FaPlay onClick={playVideo} style={{ cursor: 'pointer' }} />
// //             )}
// //             <img src={mp3} alt="" />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="dm_last_bg mt-3">
// //         <div className='d_border'>
// //           <div className="mx-4 py-2 d-flex justify-content-between">
// //             <div className='d_text-opacity'>
// //               <img src={h8} alt="" className='me-3' />
// //               <img src={h7} alt="" className='me-3' />
// //               <img src={h6} alt="" className='me-3' />
// //             </div>
// //             {/* Removed the time display */}
// //             <div>
// //               <img src={h5} alt="" className='me-3' />
// //               <img src={h4} alt="" className='me-3' />
// //               <img src={h1} alt="" />
// //               <img src={h3} alt="" className='me-3' />
// //               <img src={h2} alt="" />
// //             </div>
// //           </div>
// //         </div>
// //         <div className={`d_text-opacity d-flex justify-content-center align-items-center ${scaleEffect ? 'scale-up' : ''}`}>
// //           {uploadedFile ? (
// //             <div className="timeline">
// //               <div className="timeline-bar">
// //                 {/* Example images along the timeline */}
// //                 <div className="timeline-images">
// //                   {/* Repeat the placeholder for each image */}
// //                   {[...Array(5)].map((_, index) => (
// //                     <div key={index} className="image-placeholder" />
// //                   ))}
// //                 </div>
// //                 {/* Time markers */}
// //                 <div className="time-markers">
// //                   {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((time) => (
// //                     <div key={time} className="marker">
// //                       {time < 10 ? `0${time}` : time}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           ) : (
// //             <p>Add media to this project</p> // Default message
// //           )}
// //         </div>

// //       </div>
// //     </>
// //   );
// // }



// import React, { useState } from 'react';
// import '../CSS/MediaComponent.css';
// import d_m1 from "../Assets/denisha_img/cloud.svg";
// import mp1 from "../Assets/denisha_img/mp1.svg";
// import mp2 from "../Assets/denisha_img/mp2.svg";
// import mp3 from "../Assets/denisha_img/mp3.svg";
// import h1 from "../Assets/denisha_img/mp3_ (1).svg";
// import h2 from "../Assets/denisha_img/mp3_ (2).svg";
// import h3 from "../Assets/denisha_img/mp3_ (3).svg";
// import h4 from "../Assets/denisha_img/mp4.svg";
// import h5 from "../Assets/denisha_img/mp5.svg";
// import h6 from "../Assets/denisha_img/mp6.svg";
// import h7 from "../Assets/denisha_img/mp7.svg";
// import h8 from "../Assets/denisha_img/mp8.svg";
// import { FaPlay, FaPause } from "react-icons/fa6"; // Import play and pause icons

// export default function MediaComponent() {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isVideo, setIsVideo] = useState(false);
//   const [scaleEffect, setScaleEffect] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedFile(URL.createObjectURL(file));
//       setIsVideo(file.type.startsWith('video/'));
//       setScaleEffect(true);
//       setTimeout(() => setScaleEffect(false), 1000);
//     }
//   };

//   const playVideo = () => {
//     const videoElement = document.getElementById('uploaded-video');
//     if (videoElement) {
//       videoElement.play();
//       setIsPlaying(true);
//     }
//   };

//   const pauseVideo = () => {
//     const videoElement = document.getElementById('uploaded-video');
//     if (videoElement) {
//       videoElement.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-xl-4 col-12 d-flex justify-content-center p-0 d_select_col">
//           <div className='d_upld_bgimg'>
//             <div className='d_overlayer d-flex justify-content-center align-items-center'>
//               <div className='text-center'>
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={handleFileChange}
//                   style={{ display: 'none' }}
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload">
//                   <img src={d_m1} alt="" className='mb-2' />
//                   <p className='mb-0'>Click to upload</p>
//                   <p className='d_gray_imgtxt'>or drag & drop file here</p>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-8 col-12 mt-xl-0 mt-4 d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
//           {uploadedFile ? (
//             <div className="d_uplded_img mx-auto">
//               {isVideo ? (
//                 <video
//                   src={uploadedFile}
//                   id="uploaded-video"
//                   // controls // Removed default controls
//                   style={{ width: '100%', height: 'auto' }} // Ensure video fits within the container
//                 />
//               ) : (
//                 <img
//                   src={uploadedFile}
//                   alt="Uploaded"
//                   style={{ width: '100%', height: 'auto' }} // Ensure the image fits within the container
//                 />
//               )}
//             </div>
//           ) : (
//             <div className='d_uplded_img mx-auto'></div>
//           )}

//           <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
//             <img src={mp1} alt="" />
//             {isPlaying ? (
//               <FaPause onClick={pauseVideo} style={{ cursor: 'pointer' }} />
//             ) : (
//               <FaPlay onClick={playVideo} style={{ cursor: 'pointer' }} />
//             )}
//             <img src={mp3} alt="" />
//           </div>
//         </div>
//       </div>
//       <div className="dm_last_bg mt-3">
//         <div className='d_border'>
//           <div className="mx-4 py-2 d-flex justify-content-between">
//             <div className='d_text-opacity'>
//               <img src={h8} alt="" className='me-3' />
//               <img src={h7} alt="" className='me-3' />
//               <img src={h6} alt="" className='me-3' />
//             </div>
//             {/* Removed the time display */}
//             <div className='d_text-opacity'>0:00:00 / 0:00:00</div>
//             <div>
//               <img src={h5} alt="" className='me-3' />
//               <img src={h4} alt="" className='me-3' />
//               <img src={h1} alt="" />
//               <img src={h3} alt="" className='me-3' />
//               <img src={h2} alt="" />
//             </div>
//           </div>
//         </div>
//         <div className={`d_text-opacity d-flex justify-content-center align-items-center ${scaleEffect ? 'scale-up' : ''}`}>
//           {uploadedFile ? (
//             <div className="timeline">
//               <div className="timeline-bar">
//                 {/* Example images along the timeline */}
//                 <div className="timeline-images">
//                   {/* Repeat the placeholder for each image */}
//                   {[...Array(5)].map((_, index) => (
//                     <div key={index} className="image-placeholder" />
//                   ))}
//                 </div>
//                 {/* Time markers */}
//                 <div className="time-markers">
//                   {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((time) => (
//                     <div key={time} className="marker">
//                       {time < 10 ? `0${time}` : time}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>Add media to this project</p> // Default message
//           )}
//         </div>

//       </div>
//     </>
//   );
// }
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
  const { uploadedFile } = props; // Get uploadedFile from props
  const [files, setFiles] = useState([]); // State to hold multiple uploaded files
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(null); // State to hold the currently playing media

  useEffect(() => {
    if (uploadedFile) {
      setFiles((prevFiles) => [...prevFiles, uploadedFile]); // Add uploaded file to the files array
    }
  }, [uploadedFile]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const fileURLs = selectedFiles.map(file => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...fileURLs]); // Add new files to the existing array
  };

  const playMedia = (file) => {
    setCurrentMedia(file);
    const videoElement = document.getElementById('uploaded-video');
    if (videoElement) {
      videoElement.src = file;
      videoElement.play();
      setIsPlaying(true);
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
                  onChange={handleFileChange} // Handle file change
                />
                <label htmlFor="file-upload">
                  <img src={d_m1} alt="" className='mb-2' />
                  <p className='mb-0'>Click to upload</p>
                  <p className='d_gray_imgtxt'>or drag & drop file here</p>
                </label>
              </div>
            </div>
          </div>
          <div className='d-flex flex-wrap gap-3' style={{ height: "500px", overflow: "auto" }}>
            {/* Display the uploaded images/videos here */}
            {files.map((file, index) => (
              <div key={index} className="uploaded-image  ">
                {file.endsWith('.mp4') || file.endsWith('.webm') ? ( // Check if the file is a video
                  <video
                    src={file}
                    style={{ width: '132px', height: '150px' }}
                    onClick={() => playMedia(file)} // Play video on click
                  />
                ) : (
                  <img src={file} alt="Uploaded" style={{ width: '132px', height: '150px' }} onClick={() => playMedia(file)} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-xl-8 col-12 mt-xl-0 mt-4 d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
          {currentMedia ? (
            <div className="d_uplded_img mx-auto">
              {currentMedia.endsWith('.mp4') || currentMedia.endsWith('.webm') ? (
                <video
                  src={currentMedia}
                  id="uploaded-video"
                  style={{ width: '100%', height: 'auto' }}
                  controls // Add controls for video playback
                />
              ) : (
                <img
                  src={currentMedia}
                  alt="Uploaded"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </div>
          ) : (
            <div className='d_uplded_img mx-auto'>
              {files.length > 0 && <img src={files[files.length - 1]} alt="Last Uploaded" style={{ width: '100%', height: 'auto' }} />}
              {/* Display the last uploaded image */}
            </div>
          )}

          <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
            <img src={mp1} alt="" />
            {isPlaying ? (
              <FaPause onClick={pauseMedia} style={{ cursor: 'pointer' }} />
            ) : (
              <FaPlay onClick={() => playMedia(currentMedia)} style={{ cursor: 'pointer' }} />
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
              <img src={h7} alt="" className='me-3' />
              <img src={h6} alt="" className='me-3' />
            </div>
            <div className='d_text-opacity'>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}</div>
            <div>
              <img src={h5} alt="" className='me-3' />
              <img src={h4} alt="" className='me-3' />
              <img src={h1} alt="" />
              <img src={h3} alt="" className='me-3' />
              <img src={h2} alt="" />
            </div>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline-bar">
            <div className="timeline-images">
              {currentMedia && (
                <div className="image-placeholder">
                  <img src={currentMedia} alt="Thumbnail" style={{ width: '150px', height: '150px' }} />
                </div>
              )}
            </div>
            <div className="time-markers">
              {Array.from({ length: Math.ceil(duration / 2) }).map((_, index) => (
                <div key={index} className="marker">
                  {index * 2 < 10 ? `0${index * 2}` : index * 2}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}