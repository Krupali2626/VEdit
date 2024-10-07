import React, { useState } from 'react';
import '../CSS/MediaComponent.css';
import d_m1 from "../Assets/denisha_img/cloud.svg";
import mp1 from "../Assets/denisha_img/mp1.svg";
import mp2 from "../Assets/denisha_img/mp2.svg";
import mp3 from "../Assets/denisha_img/mp3.svg";
import h1 from "../Assets/denisha_img/mp3_ (1).svg";
import h2 from "../Assets/denisha_img/mp3_ (2).svg";
import h3 from "../Assets/denisha_img/mp3_ (3).svg";
import h4 from "../Assets/denisha_img/mp4.svg";
import h5 from "../Assets/denisha_img/mp5.svg";
import h6 from "../Assets/denisha_img/mp6.svg";
import h7 from "../Assets/denisha_img/mp7.svg";
import h8 from "../Assets/denisha_img/mp8.svg";

export default function MediaComponent() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [scaleEffect, setScaleEffect] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file)); // Create a URL for the uploaded file
      setIsVideo(file.type.startsWith('video/')); // Check if the uploaded file is a video
      setScaleEffect(true); // Trigger scaling effect
      setTimeout(() => setScaleEffect(false), 20000);
    }
  };

  const playVideo = () => {
    const videoElement = document.getElementById('uploaded-video');
    if (videoElement) {
      videoElement.play();
    }
  };

  return (
    <>
      <div className="row">
        <div className=" col-xl-3 col-12  d-flex justify-content-center p-0">
          <div className='d_upld_bgimg'>
            <div className='d_overlayer d-flex justify-content-center align-items-center'>
              <div className='text-center'>
                <input 
                  type="file" 
                  accept="image/*,video/*" // Updated to accept both images and videos
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                  id="file-upload" 
                />
                <label htmlFor="file-upload">
                  <img src={d_m1} alt="" className='mb-2' />
                  <p className='mb-0'>Click to upload</p>
                  <p className='d_gray_imgtxt'>or drag & drop file here</p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-xl-9 col-12 mt-xl-0 mt-4  d-flex justify-content-center px-0 d-flex justify-content-center mx-auto flex-column">
        {uploadedFile ? (
           <div className="d_uplded_img mx-auto">
           {isVideo ? (
             <video 
               src={uploadedFile} 
               className="w-100" 
               id="uploaded-video" // Added an ID for reference
             />
           ) : (
             <img 
               src={uploadedFile} 
               alt="Uploaded" 
               className="w-100" 
             />
           )}
           {/* {isVideo && (
            //  <button onClick={playVideo} style={{ marginTop: '10px' }}>
            //    Play Video
            //  </button>
           )} */}
         </div>
          ) : (
            <div className='d_uplded_img mx-auto'></div>
          )}
         
          <div className='mx-auto d-flex align-items-center gap-3 mt-3'>
            <img src={mp1} alt="" />
            <img 
              src={mp2} 
              alt="" 
              onClick={playVideo} // Play video on click
              style={{ cursor: 'pointer' }} // Change cursor to pointer
            />
            <img src={mp3} alt="" />
          </div>
        </div>
      </div>
      <div className="dm_last_bg mt-3">
      <div className={`d_text-opacity d-flex justify-content-center align-items-center ${scaleEffect ? 'scale-up' : ''}`}>
          {uploadedFile ? (
            <div className="timeline">
              <div className="timeline-bar">
                {/* Example images along the timeline */}
                <div className="timeline-images">
                  {/* Repeat the placeholder for each image */}
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="image-placeholder" />
                  ))}
                </div>
                {/* Time markers */}
                <div className="time-markers">
                  {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((time) => (
                    <div key={time} className="marker">
                      {time < 10 ? `0${time}` : time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Add media to this project</p> // Default message
          )}
        </div>
      </div>
    </>
  );
}