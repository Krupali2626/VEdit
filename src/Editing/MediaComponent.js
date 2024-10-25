// src/Editing/MediaComponent.js
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
  const [displayTime, setDisplayTime] = useState(30); // State to manage displayed time
  const [thumbnails, setThumbnails] = useState({}); // State to manage thumbnails for each video

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

      // Generate thumbnails for the uploaded video
      if (fileType === 'video') {
        generateThumbnails(file);
      }
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

      // Generate thumbnails for all uploaded videos
      uploadedMedia.forEach((uploadedFile) => {
        if (uploadedFile.type.startsWith('video/')) {
          generateThumbnails(uploadedFile);
        }
      });
    }
  }, [uploadedMedia]);

  const generateThumbnails = (videoFile) => {
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.addEventListener('loadedmetadata', () => {
      const duration = Math.floor(videoElement.duration);
      const newThumbnails = [];

      const captureFrame = (time) => {
        return new Promise((resolve) => {
          videoElement.currentTime = time; // Set the current time to capture the frame
          videoElement.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 132; // Thumbnail width
            canvas.height = 150; // Thumbnail height
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            newThumbnails.push(canvas.toDataURL());
            resolve();
          }, { once: true });
        });
      };

      const captureAllFrames = async () => {
        for (let i = 0; i < duration; i += 2) {
          await captureFrame(i);
        }
        // Store thumbnails in the state with the video file name as the key
        setThumbnails((prev) => ({
          ...prev,
          [videoFile.name]: newThumbnails,
        }));
      };

      captureAllFrames();
    });
  };

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

  // Calculate the width of each thumbnail based on the number of markers
  const calculateThumbnailWidth = () => {
    const numberOfMarkers = Math.ceil(displayTime / 2);
    const containerWidth = 800; // Adjust this value based on your layout
    return containerWidth / numberOfMarkers; // Width of each thumbnail
  };

  const thumbnailWidth = calculateThumbnailWidth();

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
              onClick={handleRightClick}
              style={{ cursor: currentMediaIndex < allMedia.length - 1 ? 'pointer' : 'not-allowed', filter: currentMediaIndex < allMedia.length - 1 ? 'none' : 'grayscale(100%)' }}
            />
            <span onClick={handlePlayPause} style={{ cursor: 'pointer' }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </span>
            <img
              className="d_control_img mx-2"
              src={mp3}
              alt="Next"
              onClick={handleLeftClick}
              style={{ cursor: currentMediaIndex > 0 ? 'pointer' : 'not-allowed', filter: currentMediaIndex > 0 ? 'none' : 'grayscale(100%)' }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="d_timeline_bg_icon px-0" style={{ overflow: 'auto' }}>
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
          <div style={{ width: '100%', height: '30px', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {Array.from({ length: Math.ceil(displayTime / 2) }).map((_, index) => {
                const totalSeconds = index * 2;
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const time = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                return (
                  <div key={`marker-${index}`}>
                    <div
                      style={{
                        position: 'absolute',
                        width: '1px',
                        height: '12px',
                        backgroundColor: '#FFFFFF40',
                        top: '0',
                        left: `${(index * 100) / Math.ceil(displayTime / 2)}%`
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        fontSize: '12px',
                        color: '#FFFFFF80',
                        marginLeft: '4px',
                        top: '14px',
                        left: `${(index * 100) / Math.ceil(displayTime / 2)}%`
                      }}
                    >
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* {/ Thumbnails Section /} */}
          <div className="row ">
            {Object.keys(thumbnails).length > 0 ? (
              Object.entries(thumbnails).map(([fileName, thumbnailArray]) => (
                <div key={fileName} className="col-12 w-100 d-flex flex-column align-items-center">
                  {/* {/ <h5>{fileName}</h5> /} */}
                  <div className="d-flex flex-row flex-nowrap justify-content-center">
                    {thumbnailArray.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Thumbnail ${index}`}
                        style={{ width: `${thumbnailWidth * 4}px`, height: '70px', objectFit: 'cover', margin: '5px 0px' }}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No thumbnails available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}