
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
import { FaPause } from 'react-icons/fa';
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
          {!media ? ( // Check if media is uploaded
            <div>
              <div
                className="d_bg_media"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className="d_bg_overlayer">
                  <img src={d_m1} alt="Upload Icon" />
                  <p className='mb-0'>Click to upload</p>
                  <p className='mb-0 text-secondary'>or drag & drop file here</p>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }} // Hide the default file input
                    accept="image/*,video/*" // Accept both images and videos
                    onChange={handleUpload}
                  />
                </div>
              </div>
            </div>
          ) : (
            // <div className="d_uploaded_media border p-2 overflow-auto" style={{height:'487px'}}>

            //   <div className="row">
            //     {allMedia.map((file, index) => (
            //       <div
            //         className="col-4 d-flex justify-content-center" // Ensures each media item takes 1/3rd of the row and is centered
            //         key={index}
            //         style={{ marginBottom: '15px' }} // Adds space between rows
            //         onClick={() => handleMediaSelect(index)} // Select media on click
            //       >
            //         {file.type.startsWith('image/') ? (
            //           <img
            //             src={URL.createObjectURL(file)}
            //             alt="Uploaded"
            //             style={{ width: '132px', height: '150px', objectFit: 'cover' }} // Ensures all images have the same width and height
            //           />
            //         ) : file.type.startsWith('video/') ? (
            //           <video
            //             controls={false}
            //             style={{ width: '132px', height: '150px', objectFit: 'cover' }} // Ensures all videos have the same width and height
            //           >
            //             <source src={URL.createObjectURL(file)} type={file.type} />
            //             Your browser does not support the video tag.
            //           </video>
            //         ) : (
            //           <p>Unsupported media type</p>
            //         )}
            //       </div>
            //     ))}
            //   </div>


            // </div>
            <div className="d_uploaded_media border p-2 overflow-auto" style={{ height: '487px' }}>
              <div className="row">
                {allMedia.map((file, index) => (
                  <div
                    className="col-4 d-flex justify-content-center"
                    key={index}
                    style={{ marginBottom: '15px' }}
                    onClick={() => handleMediaSelect(index)}
                  >
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        style={{ width: '132px', height: '150px', objectFit: 'cover' }}
                      />
                    ) : file.type.startsWith('video/') ? (
                      <video
                        controls={false}
                        style={{ width: '132px', height: '150px', objectFit: 'cover' }}
                      >
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

          )}
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
          <div className="d_timeline_icon_row p-2 d-flex justify-content-between align-items-center">

            {/* Left side icons */}
            <div className="d_timeline_left_icons d-flex align-items-center">
              <img className="mx-2" src={t11} alt="Icon 1" />
              <img className="mx-2" src={t1} alt="Icon 2" />
              <img className="mx-2" src={t2} alt="Icon 3" />
            </div>

            {/* Time display in the center */}
            <div className="d_timeline_time_display">
              <span>0:00:00 / 0:08:20</span> {/* Update the time dynamically */}
            </div>

            {/* Right side icons */}
            <div className="d_timeline_right_icons d-flex align-items-center">
              <img className="mx-2" src={t3} alt="Icon 4" />
              <img className="mx-2" src={t4} alt="Icon 5" />
              <img className="ms-2" src={t5} alt="Icon 6" />
              <img className="me-2" src={t6} alt="Icon 6" />
              <img className="mx-2" src={t7} alt="Icon 6" />
            </div>
          </div>
          <div className='d_timeline_clip'>

          </div>
        </div>
      </div>

    </div>
  );
}
