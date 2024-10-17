// // src/Editing/MediaComponent.js
// import React, { useState, useEffect, useRef } from 'react';
// import '../CSS/MediaComponent.css';
// import d_m1 from "../Assets/denisha_img/cloud.svg";
// import mp1 from "../Assets/denisha_img/mp1.svg";
// import mp3 from "../Assets/denisha_img/mp3.svg";
// import h8 from "../Assets/denisha_img/mp8.svg";
// import { FaPlay, FaPause } from "react-icons/fa6"; // Import play and pause icons

// export default function MediaComponent(props) {
//   const { uploadedFiles, onFileChange } = props; // Get uploadedFiles and onFileChange from props
//   const [files, setFiles] = useState([]); // State to hold multiple uploaded files
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null); // New state for selected file
//   const videoRef = useRef(null); // Reference for the video element

//   useEffect(() => {
//     // Update files state to include all uploaded files
//     setFiles(uploadedFiles);
//   }, [uploadedFiles]);

//   const playMedia = () => {
//     if (videoRef.current) {
//       // Set selectedFile to the latest uploaded video
//       const latestFile = files[files.length - 1];
//       if (latestFile && latestFile.type.startsWith('video/')) {
//         setSelectedFile(latestFile); // Update selectedFile to the latest video
//       }

//       videoRef.current.play().then(() => {
//         setIsPlaying(true); // Set playing state to true
//       }).catch(error => {
//         console.error("Error playing video:", error);
//       });
//     }
//   };

//   const pauseMedia = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map(file => ({
//         url: URL.createObjectURL(file), // Create Blob URL for the new file
//         type: file.type,
//       }));
//       console.log("New Files:", newFiles); // Log new files for debugging
//       const updatedFiles = [...files, ...newFiles];
//       setFiles(updatedFiles);
//       setSelectedFile(newFiles[0]); // Select the first of the newly uploaded files
//       onFileChange(e);
//     }
//   };

//   // Handle file click to select it
//   const handleFileClick = (file) => {
//     setSelectedFile(file);
//     if (file.type.startsWith('video/')) {
//       setIsPlaying(false); // Reset play state for videos
//     }
//   };

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     if (videoElement) {
//       const updateCurrentTime = () => {
//         setCurrentTime(videoElement.currentTime);
//         setDuration(videoElement.duration);
//       };
//       videoElement.addEventListener('timeupdate', updateCurrentTime);
//       return () => {
//         videoElement.removeEventListener('timeupdate', updateCurrentTime);
//       };
//     }
//   }, []);

//   // Cleanup effect to revoke Blob URLs when no longer needed
//   useEffect(() => {
//     return () => {
//       files.forEach(file => {
//         if (file.url.startsWith('blob:')) {
//           console.log("Revoking Blob URL:", file.url); // Log when revoking
//           URL.revokeObjectURL(file.url); // Revoke Blob URL when no longer needed
//         }
//       });
//     };
//   }, [files]);

//   return (
//     <>
//       <div className="row">
//         <div className="col-xl-3 border col-12 d-flex justify-content-center p-0 d_select_col">
//           <div className='d_upld_bgimg' style={{ display: files.length === 0 ? 'block' : 'none' }}>
//             <div className='d_overlayer d-flex justify-content-center align-items-center'>
//               <div className='text-center'>
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   style={{ display: 'none' }}
//                   id="file-upload"
//                   multiple // Allow multiple file uploads
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
//                   <img src={d_m1} alt="" className='mb-2' />
//                   <p className='mb-0'>Click to upload</p>
//                   <p className='d_gray_imgtxt'>or drag & drop file here</p>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Display uploaded files */}
//           <div>
//             <div
//               className='d-flex flex-wrap gap-3'
//               style={{ height: "500px", overflow: "auto" }}
//             >
//               {files.map((file, index) => (
//                 <div key={index} className="uploaded-image" onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
//                   {file.type.startsWith('video/') ? (
//                     <video
//                       src={file.url}
//                       style={{ width: '132px', height: '150px', objectFit: 'cover' }}
//                       controls // Added controls for better user experience
//                     />
//                   ) : (
//                     <img
//                       src={file.url}
//                       alt={`Uploaded ${index + 1}`}
//                       style={{ width: '132px', height: '150px', objectFit: 'cover' }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-8 col-12 mt-xl-0 mt-4 d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
//           <div className="preview-area mt-4">
//             <div className='d_uplded_img mx-auto'>
//               {selectedFile ? ( // Updated to use selectedFile
//                 selectedFile.type.startsWith('video/') ? (
//                   <video
//                     ref={videoRef} // Use ref for controlling the video
//                     id="uploaded-video" // Add id for controlling the video
//                     src={selectedFile.url}
//                     style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
//                     autoPlay
//                     onError={() => console.error("Error loading video")}
//                   />
//                 ) : (
//                   <img
//                     src={selectedFile.url} // Ensure the src is set to the selected file's URL
//                     alt="Selected Uploaded"
//                     style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
//                   />
//                 )
//               ) : (
//                 files.length > 0 && (
//                   files[files.length - 1].type.startsWith('video/') ? (
//                     <video
//                       ref={videoRef} // Use ref for controlling the video
//                       id="uploaded-video" // Add id for controlling the video
//                       src={files[files.length - 1].url}
//                       style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
//                       autoPlay
//                       onError={() => console.error("Error loading video")}
//                     />
//                   ) : (
//                     <img
//                       src={files[files.length - 1].url}
//                       alt="Last Uploaded"
//                       style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
//                     />
//                   )
//                 )
//               )}
//             </div>
//           </div>

//           <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
//             <img src={mp1} alt="" />
//             {isPlaying ? (
//               <FaPause onClick={pauseMedia} style={{ cursor: 'pointer' }} />
//             ) : (
//               <FaPlay onClick={playMedia} style={{ cursor: 'pointer' }} />
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
//             </div>
//             <div className='d_text-opacity'>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import '../CSS/newmedia.css';
import d_m1 from "../Assets/denisha_img/cloud.svg";
import t11 from "../Assets/denisha_img/t11.svg";
import t1 from "../Assets/denisha_img/t1.svg";
import t2 from "../Assets/denisha_img/t2.svg";
import t3 from "../Assets/denisha_img/t3.svg";
import t4 from "../Assets/denisha_img/t4.svg";
import t5 from "../Assets/denisha_img/t5.svg";
import t6 from "../Assets/denisha_img/t6.svg";
import t7 from "../Assets/denisha_img/t7.svg";
import mp1 from "../Assets/denisha_img/mp1.svg";
import mp3 from "../Assets/denisha_img/mp3.svg";
import { FaPlay } from "react-icons/fa6";

// export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
//     const [media, setMedia] = useState(null); // State to store uploaded media
//     const [mediaType, setMediaType] = useState(''); // State to store the type of media (image or video)

//     // Handle file upload
//     const handleUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileType = file.type.split('/')[0]; // Get the type of the file (image or video)
//             const fileURL = URL.createObjectURL(file);
//             setMedia(fileURL); // Set the media URL
//             setMediaType(fileType); // Set the media type

//             // Call the onMediaUpload function to notify the parent component
//             onMediaUpload(file);
//         }
//     };

//     // Effect to set media from the sidebar
//     useEffect(() => {
//         if (uploadedMedia.length > 0) {
//             const lastMedia = uploadedMedia[uploadedMedia.length - 1];
//             setMedia(URL.createObjectURL(lastMedia)); // Set the media URL
//             setMediaType(lastMedia.type.split('/')[0]); // Set the media type
//         }
//     }, [uploadedMedia]);

//     return (
//         <div>
//             <div className="row">
//                 <div className="col-xl-3 d-xl-block d-none px-0">
//                     {!media ? ( // Check if media is uploaded
//                         <div>
//                             <div 
//                                 className="d_bg_media" 
//                                 onClick={() => document.getElementById('fileInput').click()}
//                             >
//                                 <div className="d_bg_overlayer">
//                                     <img src={d_m1} alt="Upload Icon" />
//                                     <p className='mb-0'>Click to upload</p>
//                                     <p className='mb-0 text-secondary'>or drag & drop file here</p>
//                                     <input
//                                         type="file"
//                                         id="fileInput"
//                                         style={{ display: 'none' }} // Hide the default file input
//                                         accept="image/*,video/*" // Accept both images and videos
//                                         onChange={handleUpload}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="d_uploaded_media col-4" style={{ width: '132px', height: '150px' }}>
//                             {mediaType === 'image' ? (
//                                 <img src={media} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
//                             ) : mediaType === 'video' ? (
//                                 <video controls style={{ width: '100%', height: '100%' }}>
//                                     <source src={media} type="video/mp4" />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             ) : (
//                                 <p>Unsupported media type</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <div className="col-xl-9 col-12 text-center">
//                     <div className="d-flex justify-content-center">
//                         <div className="d_bg_preview">
//                             {media && ( // Display the last uploaded media in d_bg_preview
//                                 mediaType === 'image' ? (
//                                     <img src={media} alt="Last Uploaded" style={{ width: '100%', height: '100%' }} />
//                                 ) : mediaType === 'video' ? (
//                                     <video controls style={{ width: '100%', height: '100%' }}>
//                                         <source src={media} type="video/mp4" />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 ) : (
//                                     <p>Unsupported media type</p>
//                                 )
//                             )}
//                         </div>
//                     </div>
//                     <div className="mt-2">
//                         <img className="d_control_img mx-2" src={mp1} alt="" />
//                         <FaPlay style={{ cursor: 'pointer' }} />
//                         <img className="d_control_img mx-2" src={mp3} alt="" />
//                     </div>
//                 </div>
//             </div>
//             <div className="row mt-3">
//                 <div className="d_timeline_bg_icon px-0">
//                     <div className="d_timeline_icon_row p-2 d-flex justify-content-between">
//                         <div>
//                             <img className="mx-2" src={t11} alt="" />
//                             <img className="mx-2" src={t1} alt="" />
//                             <img className="mx-2" src={t2} alt="" />
//                         </div>
//                         <div>
//                             <span>0:00:00 / 0:00:00</span>
//                         </div>
//                         <div>
//                             <img className="mx-2" src={t3} alt="" />
//                             <img className="mx-2" src={t4} alt="" />
//                             <img src={t5} alt="" />
//                             <img src={t6} alt="" />
//                             <img className="mx-2" src={t7} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// ... existing code ...
// image + video display 

// export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
//   const [media, setMedia] = useState(null); // State to store currently displayed media
//   const [mediaType, setMediaType] = useState(''); // State to store the type of media (image or video)
//   const [allMedia, setAllMedia] = useState([]); // State to store all uploaded media

//   // Handle file upload
//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type.split('/')[0]; // Get the type of the file (image or video)
//       const fileURL = URL.createObjectURL(file);
//       setMedia(fileURL); // Set the media URL
//       setMediaType(fileType); // Set the media type

//       // Update all media state
//       setAllMedia(prev => [...prev, file]); // Store all uploaded media
//       // Call the onMediaUpload function to notify the parent component
//       onMediaUpload(file);
//     }
//   };

//   // Effect to set media from the sidebar
//   useEffect(() => {
//     if (uploadedMedia.length > 0) {
//       const lastMedia = uploadedMedia[uploadedMedia.length - 1];
//       setMedia(URL.createObjectURL(lastMedia)); // Set the media URL
//       setMediaType(lastMedia.type.split('/')[0]); // Set the media type
//       setAllMedia(uploadedMedia); // Store all uploaded media
//     }
//   }, [uploadedMedia]);

//   // Function to handle media selection
//   const handleMediaSelect = (file) => {
//     const fileURL = URL.createObjectURL(file);
//     setMedia(fileURL); // Set the selected media URL
//     setMediaType(file.type.split('/')[0]); // Set the selected media type

//     // If the media is a video, force the video to reload by resetting its source
//     const videoElement = document.getElementById('videoPreview');
//     if (file.type.startsWith('video/') && videoElement) {
//       videoElement.src = fileURL;
//       videoElement.load(); // Reload the video element
//     }
//   };

//   return (
//     <div>
//       <div className="row">
//         <div className="col-xl-3 d-xl-block d-none px-0">
//           {!media ? ( // Check if media is uploaded
//             <div>
//               <div
//                 className="d_bg_media"
//                 onClick={() => document.getElementById('fileInput').click()}
//               >
//                 <div className="d_bg_overlayer">
//                   <img src={d_m1} alt="Upload Icon" />
//                   <p className='mb-0'>Click to upload</p>
//                   <p className='mb-0 text-secondary'>or drag & drop file here</p>
//                   <input
//                     type="file"
//                     id="fileInput"
//                     style={{ display: 'none' }} // Hide the default file input
//                     accept="image/*,video/*" // Accept both images and videos
//                     onChange={handleUpload}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="d_uploaded_media">
//               <div className="d-flex flex-wrap">
//                 {allMedia.map((file, index) => (
//                   <div key={index} style={{ width: '132px', height: '150px' }} onClick={() => handleMediaSelect(file)}>
//                     {file.type.startsWith('image/') ? (
//                       <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '132px', height: '150px' }} />
//                     ) : file.type.startsWith('video/') ? (
//                       <video controls style={{ width: '132px', height: '150px' }}>
//                         <source src={URL.createObjectURL(file)} type={file.type} />
//                         Your browser does not support the video tag.
//                       </video>
//                     ) : (
//                       <p>Unsupported media type</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="col-xl-9 col-12 text-center">
//           <div className="d-flex justify-content-center">
//             <div className="d_bg_preview">
//               {media && ( // Display the last uploaded media in d_bg_preview
//                 mediaType === 'image' ? (
//                   <img src={media} alt="Last Uploaded" style={{ width: '100%', height: '100%' }} />
//                 ) : mediaType === 'video' ? (
//                   <video id="videoPreview" controls style={{ width: '100%', height: '100%' }}>
//                     <source src={media} type={mediaType === 'video' ? 'video/mp4' : ''} />
//                     Your browser does not support the video tag.
//                   </video>
//                 ) : (
//                   <p>Unsupported media type</p>
//                 )
//               )}
//             </div>
//           </div>
//           <div className="mt-2">
//             <img className="d_control_img mx-2" src={mp1} alt="" />
//             <FaPlay style={{ cursor: 'pointer' }} />
//             <img className="d_control_img mx-2" src={mp3} alt="" />
//           </div>
//         </div>
//       </div>
//       <div className="row mt-3">
//         <div className="d_timeline_bg_icon px-0">
//           <div className="d_timeline_icon_row p-2 d-flex justify-content-between">
//             <div>
//               <img className="mx-2" src={t11} alt="" />
//               <img className="mx-2" src={t1} alt="" />
//               <img className="mx-2" src={t2} alt="" />
//             </div>
//             <div>
//               <span>0:00:00 / 0:00:00</span>
//             </div>
//             <div>
//               <img className="mx-2" src={t3} alt="" />
//               <img className="mx-2" src={t4} alt="" />
//               <img src={t5} alt="" />
//               <img src={t6} alt="" />
//               <img className="mx-2" src={t7} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import {  FaPause } from 'react-icons/fa';
export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
  const [media, setMedia] = useState(null); // State to store currently displayed media
  const [mediaType, setMediaType] = useState(''); // State to store the type of media (image or video)
  const [allMedia, setAllMedia] = useState([]); // State to store all uploaded media
  const videoRef = useRef(null); // Ref for video element
  const [isPlaying, setIsPlaying] = useState(false); // State to control play/pause
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null); // State to handle the blob URL
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null); // State to track the current media index

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0]; // Get the type of the file (image or video)
      const fileURL = URL.createObjectURL(file);
      setMedia(file); // Store the file instead of the URL
      setMediaType(fileType); // Set the media type
      setMediaBlobUrl(fileURL); // Set the blob URL for the media
      setCurrentMediaIndex(allMedia.length); // Set the index for the current media
      setAllMedia((prev) => [...prev, file]); // Store all uploaded media
      onMediaUpload(file); // Notify parent component about the upload
    }
  };

  // Effect to set media from the sidebar
  useEffect(() => {
    if (uploadedMedia.length > 0) {
      setAllMedia(uploadedMedia); // Store all uploaded media
      setCurrentMediaIndex(0); // Start with the first media
      const file = uploadedMedia[0];
      setMedia(file); // Set the first media
      setMediaType(file.type.split('/')[0]); // Set the media type
      const fileURL = URL.createObjectURL(file); // Create blob URL for the first media
      setMediaBlobUrl(fileURL);
    }
  }, [uploadedMedia]);

  // Function to handle media selection
  const handleMediaSelect = (index) => {
    if (index < 0 || index >= allMedia.length) return; // Prevent out-of-bounds access
    const file = allMedia[index]; // Get the media file at the given index
    setMedia(file); // Set the selected media
    setMediaType(file.type.split('/')[0]); // Set the media type
    setIsPlaying(false); // Reset the play state when selecting a new media
    const fileURL = URL.createObjectURL(file); // Generate new blob URL
    setMediaBlobUrl(fileURL); // Update blob URL
    setCurrentMediaIndex(index); // Update current media index

    // Reset video playback if switching from one video to another
    if (videoRef.current) {
      videoRef.current.load(); // Reset the video element
    }
  };

  // Function to handle left button click
  const handleLeftClick = () => {
    if (currentMediaIndex > 0) {
      handleMediaSelect(currentMediaIndex - 1); // Select the previous media
    }
  };

  // Function to handle right button click
  const handleRightClick = () => {
    if (currentMediaIndex < allMedia.length - 1) {
      handleMediaSelect(currentMediaIndex + 1); // Select the next media
    }
  };

  // Function to handle play/pause toggle
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause the video
      } else {
        videoRef.current.play(); // Play the video
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-3 d-xl-block d-none px-0">
          <div className="d_uploaded_media">
            <div className="d-flex flex-wrap">
              {allMedia.map((file, index) => (
                <div
                  key={index}
                  style={{ width: '132px', height: '150px', margin: '5px' }}
                  onClick={() => handleMediaSelect(index)} // Select media on click
                >
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '132px', height: '150px' }} />
                  ) : file.type.startsWith('video/') ? (
                    <video controls={false} style={{ width: '132px', height: '150px' }}>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>Unsupported media type</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-12 text-center">
        <div className="d-flex justify-content-center">
          <div className="d_bg_preview">
            {media && ( // Display the selected media in d_bg_preview
              mediaType === 'image' ? (
                <img src={mediaBlobUrl} alt="Selected Media" style={{ width: '100%', height: '100%' }} />
              ) : mediaType === 'video' ? (
                <video
                  id="videoPreview"
                  ref={videoRef}
                  key={mediaBlobUrl} // Force re-render by setting key to blob URL
                  controls={false}
                  style={{ width: '100%', height: '100%' }}
                >
                  <source src={mediaBlobUrl} type={media.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>Unsupported media type</p>
              )
            )}
          </div>
          </div>

          <div className="mt-2">
            {/* Left Button */}
            <img
              className="d_control_img mx-2"
              src={mp1}
              alt="Previous"
              onClick={handleLeftClick} // Navigate to the previous media
              style={{ cursor: currentMediaIndex > 0 ? 'pointer' : 'not-allowed', filter: currentMediaIndex > 0 ? 'none' : 'grayscale(100%)' }}
            />
            
            {/* Play/Pause Button */}
            <span onClick={handlePlayPause} style={{ cursor: 'pointer' }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </span>

            {/* Right Button */}
            <img
              className="d_control_img mx-2"
              src={mp3}
              alt="Next"
              onClick={handleRightClick} // Navigate to the next media
              style={{ cursor: currentMediaIndex < allMedia.length - 1 ? 'pointer' : 'not-allowed', filter: currentMediaIndex < allMedia.length - 1 ? 'none' : 'grayscale(100%)' }}
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="d_timeline_bg_icon px-0">
          <div className="d_timeline_icon_row p-2 d-flex justify-content-between">
            <div>
              <img className="mx-2" src={t11} alt="" />
              <img className="mx-2" src={t1} alt="" />
              <img className="mx-2" src={t2} alt="" />
            </div>
            <div>
              <span>0:00:00 / 0:00:00</span>
            </div>
            <div>
              <img className="mx-2" src={t3} alt="" />
              <img className="mx-2" src={t4} alt="" />
              <img className="mx-2" src={t5} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
