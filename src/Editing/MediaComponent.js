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
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [allMedia, setAllMedia] = useState([]);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
  const [zoomOut, setZoomOut] = useState(false); // State for zoom effect
  const [displayTime, setDisplayTime] = useState(0); // State to manage displayed time

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

  const handleZoomOut = () => {
    setZoomOut(true);
    setDisplayTime(prev => prev + 0.5); // Increase displayed time by 0.5 seconds
    setTimeout(() => {
      setZoomOut(false);
    }, 300); // Reset zoom after 300ms
  };

  // New function to handle the t4 click event
  const handleReduceTime = () => {
    setDisplayTime(prev => Math.max(0, prev / 2)); // Halve the displayed time, ensuring it doesn't go below 0
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
              <img src={t3} alt="Icon 4" onClick={handleZoomOut} className={`zoom-icon mx-2 ${zoomOut ? 'zoom-out' : ''}`} />
              <img className="mx-2" src={t4} alt="Icon 5" onClick={handleReduceTime} />
              <img className="ms-2" src={t5} alt="Icon 6" />
              <img className="me-2" src={t6} alt="Icon 6" />
              <img className="mx-2" src={t7} alt="Icon 6" />
            </div>
          </div>
          <div className='d_timeline_clip'>
            <div className="d_timeline_scale">
              {/* Calculate the number of markers based on the displayTime */}
              {Array.from({ length: Math.ceil(displayTime / 2) }).map((_, index) => {
                // Calculate the time for each marker based on the displayTime
                const time = `${Math.floor((index * 2) / 60)}:${(index * 2) % 60 < 10 ? '0' : ''}${(index * 2) % 60}`; // 2 seconds difference
                return (
                  <div className="d_timeline_marker" key={index} style={{ left: `${(index * 100) / Math.ceil(displayTime / 2)}%` }}>
                    <span className="d_timeline_time" style={{ fontSize: '12px', color: '#FFFFFF80', marginLeft: '4px' }}>{time}</span>
                  </div>
                );
              })}
              {/* New small markers between existing markers */}
              {Array.from({ length: Math.ceil(displayTime / 2) - 1 }).map((_, index) => (
                <div className="d_timeline_small_marker" key={index} style={{ left: `${((index + 0.5) * 100) / Math.ceil(displayTime / 2)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
