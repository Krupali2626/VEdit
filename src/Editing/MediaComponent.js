import React, { useState, useEffect, useRef } from 'react';
import '../CSS/newmedia.css';
import d_m1 from "../Assets/denisha_img/cloud.svg";
import t11 from "../Assets/denisha_img/t11.svg";
import t1 from "../Assets/denisha_img/t1.svg";
import t2 from "../Assets/denisha_img/t2.svg";
import t3 from "../Assets/denisha_img/t3.svg";
import t4 from "../Assets/denisha_img/t4.svg"; // Kept for design
import t5 from "../Assets/denisha_img/t5.svg";
import t6 from "../Assets/denisha_img/t6.svg";
import t7 from "../Assets/denisha_img/t7.svg";
import mp1 from "../Assets/denisha_img/mp1.svg";
import mp3 from "../Assets/denisha_img/mp3.svg";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from 'react-icons/fa';

export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [allMedia, setAllMedia] = useState([]);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
  const [videoDurations, setVideoDurations] = useState({}); // State to store video durations
  const [displayTime, setDisplayTime] = useState(30); // State to manage displayed time

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const fileURL = URL.createObjectURL(file);
      setMedia(file);
      setMediaType(fileType);
      setMediaBlobUrl(fileURL);
      setCurrentMediaIndex(allMedia.length);
      setAllMedia((prev) => [...prev, file]);
      onMediaUpload(file);
      console.log("Uploaded file:", file); // Debugging line
      const clipDuration = file.type.startsWith('video/') ? videoDurations[allMedia.length] || 0 : 0; // Get duration for video clips
      setVideoDurations((prev) => ({ ...prev, [allMedia.length]: clipDuration })); // Store clip duration
    }
  };

  useEffect(() => {
    if (uploadedMedia.length > 0) {
      setAllMedia(uploadedMedia);
      setCurrentMediaIndex(0);
      const file = uploadedMedia[0];
      setMedia(file);
      setMediaType(file.type.split('/')[0]);
      const fileURL = URL.createObjectURL(file);
      setMediaBlobUrl(fileURL);
    }
  }, [uploadedMedia]);

  useEffect(() => {
    const durations = {};
    allMedia.forEach((file, index) => {
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.onloadedmetadata = () => {
          durations[index] = videoElement.duration;
          setVideoDurations((prev) => ({ ...prev, ...durations }));
        };
      }
    });
  }, [allMedia]);

  const handleMediaSelect = (index) => {
    if (index < 0 || index >= allMedia.length) return;
    const file = allMedia[index];
    setMedia(file);
    setMediaType(file.type.split('/')[0]);
    setIsPlaying(false);
    const fileURL = URL.createObjectURL(file);
    setMediaBlobUrl(fileURL);
    setCurrentMediaIndex(index);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleLeftClick = () => {
    if (currentMediaIndex > 0) {
      handleMediaSelect(currentMediaIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentMediaIndex < allMedia.length - 1) {
      handleMediaSelect(currentMediaIndex + 1);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const timelineStyles = {
    width: '100%',
    height: '30px',
    position: 'relative',
  };

  const scaleStyles = {
    width: '100%',
    height: '100%',
    position: 'relative'
  };

  const markerStyles = {
    position: 'absolute',
    width: '1px',
    height: '12px',
    backgroundColor: '#FFFFFF40',
    top: '0'
  };

  const smallMarkerStyles = {
    position: 'absolute',
    width: '1px',
    height: '8px',
    backgroundColor: '#FFFFFF20',
    top: '0'
  };

  const timeStyles = {
    position: 'absolute',
    fontSize: '12px',
    color: '#FFFFFF80',
    marginLeft: '4px',
    top: '14px'
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-3 d-xl-block d-none px-0">
          {!media ? (
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
                    style={{ display: 'none' }}
                    accept="image/*,video/*"
                    onChange={handleUpload}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="d_uploaded_media border p-2 overflow-auto" style={{ height: '487px' }}>
              <div className="row">

                {allMedia.slice().reverse().map((file, index) => {
                  const reversedIndex = allMedia.length - 1 - index; // To get the actual index of the media item
                  return (
                    <div
                      className="col-4 d-flex justify-content-center"
                      key={reversedIndex} // Use the reversed index for unique keys
                      style={{ marginBottom: '15px' }}
                      onClick={() => handleMediaSelect(reversedIndex)} // Handle media selection with reversed index
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="col-xl-9 col-12 text-center">
          <div className="d-flex justify-content-center">
            <div className="d_bg_preview">
              {media && (
                mediaType === 'image' ? (
                  <img src={mediaBlobUrl} alt="Selected Media" style={{ width: '100%', height: '100%' }} />
                ) : mediaType === 'video' ? (
                  <video
                    id="videoPreview"
                    ref={videoRef}
                    key={mediaBlobUrl}
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
            <img
              className="d_control_img mx-2"
              src={mp1}
              alt="Previous"
              onClick={handleLeftClick}
              style={{ cursor: currentMediaIndex > 0 ? 'pointer' : 'not-allowed', filter: currentMediaIndex > 0 ? 'none' : 'grayscale(100%)' }}
            />
            <span onClick={handlePlayPause} style={{ cursor: 'pointer' }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </span>
            <img
              className="d_control_img mx-2"
              src={mp3}
              alt="Next"
              onClick={handleRightClick}
              style={{ cursor: currentMediaIndex < allMedia.length - 1 ? 'pointer' : 'not-allowed', filter: currentMediaIndex < allMedia.length - 1 ? 'none' : 'grayscale(100%)' }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="d_timeline_bg_icon px-0">
          <div className="d_timeline_icon_row p-2 d-flex justify-content-between align-items-center">
            <div className="d_timeline_left_icons d-flex align-items-center">
              <img className="mx-2" src={t11} alt="Icon 1" />
              <img className="mx-2" src={t1} alt="Icon 2" />
              <img className="mx-2" src={t2} alt="Icon 3" />
            </div>
            <div className="d_timeline_time_display">
              <span>{`${Math.floor(displayTime / 3600)}:${Math.floor((displayTime % 3600) / 60).toString().padStart(2, '0')}:${(displayTime % 60).toString().padStart(2, '0')} / 0:08:20`}</span>
            </div>
            <div className="d_timeline_right_icons d-flex align-items-center">
              <img src={t3} alt="Icon 4" className={`zoom-icon mx-2`} />
              <img className="mx-2" src={t4} alt="Icon 5" />
              <img className="ms-2" src={t5} alt="Icon 6" />
              <img className="me-2" src={t6} alt="Icon 6" />
              <img className="mx-2" src={t7} alt="Icon 6" />
            </div>
          </div>
          <div style={timelineStyles}>
            <div style={scaleStyles}>
              {Array.from({ length: Math.ceil(displayTime / 2) }).map((_, index) => {
                const totalSeconds = index * 2;
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const time = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                return (
                  <div key={`marker-${index}`}>
                    <div
                      style={{
                        ...markerStyles,
                        left: `${(index * 100) / Math.ceil(displayTime / 2)}%`
                      }}
                    />
                    <span
                      style={{
                        ...timeStyles,
                        left: `${(index * 100) / Math.ceil(displayTime / 2)}%`
                      }}
                    >
                      {time}
                    </span>
                  </div>
                );
              })}

              {Array.from({ length: Math.ceil(displayTime / 2) - 1 }).map((_, index) => (
                <div
                  key={`small-marker-${index}`}
                  style={{
                    ...smallMarkerStyles,
                    left: `${((index + 0.5) * 100) / Math.ceil(displayTime / 2)}%`
                  }}
                />
              ))}
            </div>
          </div>
          <div className='d_clip_main d-flex flex-column'>           
            {allMedia.length > 0 ? (
              allMedia.slice().reverse().map((file, index) => {
                // Reverse the order of media and calculate the reversed index for correct display
                const reversedIndex = allMedia.length - 1 - index;

                // Check if the file is a video or image and handle accordingly
                if (file.type.startsWith('video/')) {
                  return (
                    <div
                      key={reversedIndex}  // Use the reversed index as the key for rendering optimization
                      style={{
                        width: '50px',
                        height: '50px',
                        margin: '2px',
                        position: 'relative'
                      }}
                    >
                      <video
                        src={URL.createObjectURL(file)}  // Create object URL for video file
                        alt={`Video Clip ${reversedIndex}`}  // Use reversed index for alt text
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'  // Ensure proper scaling of the video
                        }}
                        muted
                        loop
                        playsInline  // Prevents default fullscreen on mobile devices
                        onLoadedMetadata={(e) => {
                          const duration = e.target.duration;
                          const minutes = Math.floor(duration / 60);
                          const seconds = Math.floor(duration % 60);
                          const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                          e.target.setAttribute('data-duration', durationText);  // Store the duration as an attribute
                        }}
                      />
                      {/* Display video duration in a styled span at the bottom of the video */}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {/* Show video duration from the state or 'Loading...' if it's still being calculated */}
                        {videoDurations[reversedIndex]
                          ? `${Math.floor(videoDurations[reversedIndex] / 60)}:${(videoDurations[reversedIndex] % 60).toString().padStart(2, '0')}`
                          : 'Loading...'}
                      </span>
                    </div>
                  );
                } else if (file.type.startsWith('image/')) {
                  return (
                    <img
                      key={reversedIndex}  // Use the reversed index for the image key
                      src={URL.createObjectURL(file)}  // Create object URL for image file
                      alt={`Image Clip ${reversedIndex}`}  // Use reversed index for alt text
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',  // Ensure proper scaling of the image
                        margin: '2px'
                      }}
                    />
                  );
                }
                return null;  // Return null if the file is not an image or video
              })
            ) : (
              <p>No clips available</p>  // Display message if no media files are uploaded
            )}
          </div>
        </div>
      </div>
    </div>
  );
}