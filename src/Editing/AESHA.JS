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
  const [displayTime, setDisplayTime] = useState(30); // State to manage displayed time
  const [thumbnails, setThumbnails] = useState({}); // State to manage thumbnails for each video
  const [draggedThumbnails, setDraggedThumbnails] = useState([]); // State to manage dragged thumbnails
  const [cursorPosition, setCursorPosition] = useState(0); // State to manage cursor position
  const [draggedThumbnailIndex, setDraggedThumbnailIndex] = useState(null); // Index of the dragged thumbnail
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState({}); // State to manage selected thumbnail index for each video
  const [deletedMediaNames, setDeletedMediaNames] = useState([]);

  const thumbnailWidth = 132; // Fixed width for thumbnails

  // Function to handle media upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const fileURL = URL.createObjectURL(file);

      // Check if the file already exists in allMedia
      if (allMedia.some(media => media.name === file.name)) {
        console.warn("File already exists:", file.name);
        return; // Exit if the file already exists
      }

      // Proceed to add the new media
      setAllMedia((prev) => [...prev, file]); // Add the new media to the state
      onMediaUpload(file); // Call the upload callback

      // Generate thumbnails for the uploaded video immediately
      if (fileType === 'video') {
        generateThumbnails(file);
      } else if (fileType === 'image') {
        // For images, create a thumbnail immediately
        const img = new Image();
        img.src = fileURL;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 132; // Thumbnail width
          canvas.height = 150; // Thumbnail height
          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          const thumbnailDataUrl = canvas.toDataURL();
          setThumbnails((prev) => ({
            ...prev,
            [file.name]: { images: [thumbnailDataUrl], times: [] }, // Store the thumbnail immediately
          }));
        };
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
      const timeStamps = []; // Array to hold time stamps for each thumbnail

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
            timeStamps.push(time); // Store the time for this thumbnail
            resolve();
          }, { once: true });
        });
      };

      const captureAllFrames = async () => {
        for (let i = 0; i < duration; i += 2) {
          await captureFrame(i);
        }
        setThumbnails((prev) => ({
          ...prev,
          [videoFile.name]: { images: newThumbnails, times: timeStamps }, // Ensure the structure is correct
        }));
        updateDisplayTime(newThumbnails.length); // Update display time based on the number of thumbnails
      };

      captureAllFrames();
    });
  };

  const updateDisplayTime = (thumbnailCount) => {
    // Update display time based on the number of thumbnails
    const newDisplayTime = thumbnailCount * 2; // Assuming each thumbnail represents 2 seconds
    setDisplayTime(newDisplayTime);
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

  // Update cursor position based on video time
  useEffect(() => {
    const updateCursor = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const position = (currentTime / duration) * 100; // Calculate position as a percentage
        setCursorPosition(position);
      }
    };

    const interval = setInterval(updateCursor, 50); // Update every 50ms for smoother cursor movement
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Function to handle the start of the drag
  const handleDragStart = (event, fileName, index) => {
    setDraggedThumbnailIndex(index); // Set the index of the dragged thumbnail
    const allThumbnails = thumbnails[fileName].images; // Get all thumbnails for the dragged file
    event.dataTransfer.setData("text/plain", JSON.stringify({ allThumbnails, fileName })); // Store all thumbnails
  };

  // Function to handle the drop of a thumbnail
  const handleDrop = (event, targetIndex, fileName) => {
    event.preventDefault(); // Prevent default behavior
    const { allThumbnails } = JSON.parse(event.dataTransfer.getData("text/plain")); // Get all thumbnails

    // Update the thumbnails state with the new order
    setThumbnails((prevThumbnails) => {
      const newThumbnails = [...prevThumbnails[fileName].images];
      const draggedThumbnail = newThumbnails.splice(draggedThumbnailIndex, 1)[0]; // Remove the dragged thumbnail
      newThumbnails.splice(targetIndex, 0, draggedThumbnail); // Insert it at the target index

      updateDisplayTime(newThumbnails.length); // Update display time based on the new number of thumbnails

      return {
        ...prevThumbnails,
        [fileName]: { images: newThumbnails }, // Replace with the new order
      };
    });
  };

  // Function to handle dropping a thumbnail into the new row
  const handleThumbnailDrop = (event) => {
    event.preventDefault();
    const { allThumbnails, fileName } = JSON.parse(event.dataTransfer.getData("text/plain"));

    // Add all dragged thumbnails to the draggedThumbnails state
    setDraggedThumbnails(allThumbnails);
  };

  // Function to handle thumbnail selection
  const handleThumbnailSelect = (fileName, index) => {
    // Clear previously selected thumbnail for all videos
    setSelectedThumbnailIndex((prev) => {
      const newSelected = {};
      newSelected[fileName] = index; // Set the selected index for the specific video
      handleMediaSelect(allMedia.findIndex(media => media.name === fileName)); // Set the current media index based on the selected thumbnail
      return newSelected; // Only keep the currently selected thumbnail
    });
  };

  // const handleDeleteMedia = (index) => {
  //   // Check if the index is valid
  //   if (index < 0 || index >= allMedia.length) {
  //     console.error("Invalid index for deletion:", index);
  //     return; // Exit if the index is invalid
  //   }

  //   const fileName = allMedia[index].name; // Get the name of the file to delete

  //   // Add deleted file name to deletedMediaNames to keep track
  //   setDeletedMediaNames((prevDeletedNames) => [...prevDeletedNames, fileName]);

  //   // Remove the selected media from allMedia state
  //   setAllMedia((prev) => {
  //     const newMedia = prev.filter((_, i) => i !== index);
  //     return newMedia;
  //   });

  //   // Remove the thumbnails associated with the deleted media
  //   setThumbnails((prev) => {
  //     const newThumbnails = { ...prev };
  //     delete newThumbnails[fileName]; // Remove the deleted media's thumbnails
  //     return newThumbnails;
  //   });
  // };

  const handleDeleteMedia = (index) => {
    // Check if the index is valid
    if (index < 0 || index >= allMedia.length) {
        console.error("Invalid index for deletion:", index);
        return; // Exit if the index is invalid
    }

    const fileName = allMedia[index].name; // Get the name of the file to delete

    // Update the allMedia state to remove the selected media
    setAllMedia((prev) => {
        const newMedia = prev.filter((_, i) => i !== index); // Remove the media from the allMedia state
        return newMedia; // Return the updated media array
    });

    // Update the thumbnails state to remove the associated thumbnails
    setThumbnails((prev) => {
        const newThumbnails = { ...prev };
        delete newThumbnails[fileName]; // Remove the thumbnails associated with the deleted media
        return newThumbnails; // Return the updated thumbnails
    });

    // Update the deletedMediaNames state to include the deleted media
    setDeletedMediaNames((prev) => [...prev, fileName]); // Add the deleted media name to the state
};

  return (
    <div>
      <div className="row w-100">
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
            <div className="d_uploaded_media border p-2 overflow-hidden" style={{ height: '487px' }}>
              <div className="row w-100">
                {allMedia
                  .slice()
                  .reverse()
                  // Filter out any media that exists in deletedMediaNames
                  .filter((file) => !deletedMediaNames.includes(file.name))
                  .map((file, index) => {
                    const reversedIndex = allMedia.length - 1 - index;
                    return (
                      <div
                        className="col-4 d-flex justify-content-center position-relative"
                        key={file.name}
                        style={{ marginBottom: '15px' }}
                        onClick={() => handleMediaSelect(reversedIndex)}
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

                        {/* Delete Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering media selection
                            handleDeleteMedia(reversedIndex); // Call delete function
                          }}
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'none', // Initially hidden
                          }}
                          className="delete-icon" // Add a class for styling
                        >
                          <img src="path/to/delete-icon.svg" alt="Delete" style={{ width: '20px', height: '20px' }} />
                        </button>

                        {/* Show delete icon on hover */}
                        <div
                          className="hover-overlay"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = 1; // Show overlay on hover
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = 0; // Hide overlay when not hovering
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering media selection
                              handleDeleteMedia(reversedIndex); // Call delete function
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </div>
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

      <div className="row mt-3 w-100">
        <div className="d_timeline_bg_icon px-0" style={{ overflow: 'auto', width: '100%' }} >
          <div className="d_timeline_icon_row p-2 d-flex justify-content-between align-items-center" >
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
          <div style={{ width: '100%', height: '30px', position: 'relative' }} >
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

            {/* Cursor */}
            <div
              style={{
                position: 'absolute',
                width: '2px', // Width of the cursor
                height: '100%', // Full height of the timeline
                backgroundColor: 'white',
                left: `${cursorPosition}%`,
                top: '0',
                zIndex: 10,
              }}
            >
              <div style={{
                position: 'absolute',
                width: '0',
                height: '0',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '5px solid white',
                top: '-5px', // Position the arrow above the cursor
                left: '-5px', // Center the arrow
              }} />
            </div>
          </div>

          {/* Thumbnails Section */}
          <div id='d_dreg' className="row w-100 px-0 d_delete_media" style={{ overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
            {Object.keys(thumbnails).length > 0 ? (
                Object.entries(thumbnails).reverse().map(([fileName, { images }]) => {
                    // Check if the media has been deleted
                    if (deletedMediaNames.includes(fileName)) {
                        return null; // Skip rendering if the media has been deleted
                    }

                    return (
                        <div key={fileName} className="col-12 px-0 d-flex flex-column align-items-start">
                            <div
                                className="d-flex flex-row flex-nowrap"
                                style={{
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    position: 'relative',
                                    margin: '5px 0px',
                                    borderLeft: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '7px solid white' : 'none', // Apply white border if this video is active
                                    borderRight: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '7px solid white' : 'none', // Apply white border if this video is active
                                    borderTop: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '2px solid white' : 'none', // Apply white border if this video is active
                                    borderBottom: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '2px solid white' : 'none', // Apply white border if this video is active
                                    borderRadius: '4px',
                                    padding: '0 0px', // Add padding to create space for the white border
                                    backgroundColor: 'white', // Background color for the border effect
                                }}
                            >
                                {/* Left black border */}
                                <div style={{
                                    width: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '4px' : '0px', // Width of the black border
                                    backgroundColor: 'black', // Color of the border
                                    padding: '10px 0px !important', // Padding for the border
                                    borderRadius: '4px', // Rounded corners for the left side
                                    paddingLeft: "100px !important",
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}> </div>

                                {/* Spacer for the white border */}
                                <div style={{
                                    width: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '5px' : '0px', // Width of the white spacer
                                    backgroundColor: 'white', // Color of the spacer
                                    borderRadius: '4px 0 0 4px', // Rounded corners for the left side
                                }} />

                                {images.map((thumbnail, index) => (
                                    <img
                                        key={index}
                                        src={thumbnail}
                                        alt={`Thumbnail ${index}`}
                                        style={{
                                            width: `${thumbnailWidth}px`,
                                            height: '70px',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleThumbnailSelect(fileName, index)}
                                    />
                                ))}

                                <div style={{
                                    width: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '7px' : '0px',
                                    backgroundColor: 'white',
                                    borderRadius: '0 4px 4px 0',
                                }} />

                                {/* Right black border */}
                                <div style={{
                                    width: currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName ? '4px' : '0px', // Width of the black border
                                    backgroundColor: 'black', // Color of the border
                                    padding: '10px 0px !important', // Padding for the border
                                    borderRadius: '4px', // Rounded corners for the left side
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}> </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No thumbnails available</p>
            )}
        </div>


          <div
            className="row w-100 px-0"
            onDrop={handleThumbnailDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="col-12 px-0">
              {/* Flex container for dragged thumbnails with conditional border styling */}
              <div
                className="d-flex flex-row flex-nowrap"
                style={{
                  overflowX: 'auto',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  borderLeft: draggedThumbnails.length > 0 ? '7px solid white' : 'none',
                  borderRight: draggedThumbnails.length > 0 ? '7px solid white' : 'none',
                }}
              >
                {/* Left border decorative element */}
                <div style={{ paddingTop: "9px", paddingBottom: "8px" }}>
                  <span
                    style={{
                      borderLeft: draggedThumbnails.length > 0 ? '4px solid black' : 'none',
                      borderRadius: '20px',
                      paddingBottom: '30px'
                    }}
                  />
                </div>

                {/* Map through and render dragged thumbnails */}
                {draggedThumbnails.map((thumbnail, index) => (
                  <div
                    key={index}
                    className="position-relative"
                    onClick={() => {
                      // Create a new Blob from the thumbnail data URL
                      fetch(thumbnail)
                        .then(res => res.blob())
                        .then(blob => {
                          // Create a File object from the Blob
                          const file = new File([blob], `thumbnail-${index}.png`, { type: 'image/png' });

                          // Update media states
                          setMedia(file);
                          setMediaType('image');
                          setMediaBlobUrl(thumbnail); // Use thumbnail URL directly
                          setCurrentMediaIndex(index);
                          setSelectedThumbnailIndex(index);

                          // If there's a video element, update its display
                          const videoPreview = document.getElementById('videoPreview');
                          if (videoPreview) {
                            videoPreview.style.display = 'none';
                          }

                          // Update the preview div
                          const previewDiv = document.querySelector('.d_bg_preview');
                          if (previewDiv) {
                            // Clear existing content
                            previewDiv.innerHTML = '';

                            // Create and add new image
                            const img = document.createElement('img');
                            img.src = thumbnail;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'contain';
                            previewDiv.appendChild(img);
                          }
                        });
                    }}
                  >
                    <img
                      src={thumbnail}
                      alt={`Dragged Thumbnail ${index}`}
                      style={{
                        width: `${thumbnailWidth}px`,
                        height: '70px',
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                ))}

                {/* Right border decorative element */}
                <div style={{ paddingTop: "9px", paddingBottom: "8px" }}>
                  <span
                    style={{
                      borderLeft: draggedThumbnails.length > 0 ? '4px solid black' : 'none',
                      borderRadius: '20px',
                      paddingBottom: '30px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
