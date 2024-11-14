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
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPause } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [allMedia, setAllMedia] = useState([]);
  const videoRef = useRef(null);
  const [hasMedia, setHasMedia] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
  const [displayTime, setDisplayTime] = useState(30);
  const [thumbnails, setThumbnails] = useState({});
  const [draggedThumbnails, setDraggedThumbnails] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [draggedThumbnailIndex, setDraggedThumbnailIndex] = useState(null);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState({});
  const [deletedMediaNames, setDeletedMediaNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mediaToDeleteIndex, setMediaToDeleteIndex] = useState(null);
  const [copiedVideoThumbnails, setCopiedVideoThumbnails] = useState([]);

  const thumbnailWidth = 132;

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const fileURL = URL.createObjectURL(file);
      if (allMedia.some(media => media.name === file.name) || deletedMediaNames.includes(file.name)) return; // Prevent re-upload of deleted media
      setHasMedia(true);
      setAllMedia((prev) => [...prev, file]); // Update state with new media
      onMediaUpload(file); // Call the upload handler
      if (fileType === 'video') {
        await generateThumbnails(file); // Ensure thumbnails are generated for videos
      } else if (fileType === 'image') {
        await generateImageThumbnail(file, fileURL); // Generate thumbnail for images
      }
      console.log("Uploaded Media:", file); // Log the uploaded media
    }
  };

  const generateImageThumbnail = (file, fileURL, numThumbnails = 5) => {
    const img = new Image();
    img.src = fileURL;
    img.onload = () => {
      const thumbnails = [];
      const timeStamps = [];
      for (let i = 0; i < numThumbnails; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 132;
        canvas.height = 150;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const seconds = i * 2;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        thumbnails.push({ image: canvas.toDataURL(), timestamp: formattedTime, seconds: seconds });
        timeStamps.push(seconds);
      }
      setThumbnails((prev) => ({
        ...prev,
        [file.name]: { images: thumbnails, times: timeStamps }
      }));
      updateDisplayTime(numThumbnails);
    };
  };

  const renderThumbnails = () => {
    return Object.entries(thumbnails).reverse().map(([fileName, { images }]) => {
      if (deletedMediaNames.includes(fileName)) return null;
      const isCurrentMedia = currentMediaIndex !== null && allMedia[currentMediaIndex].name === fileName;
      const totalDuration = images.length * 2;
      return (
        <div key={fileName} className="col-12 px-0 d-flex flex-column align-items-start">
          <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative', margin: '5px 0px', borderLeft: isCurrentMedia ? '7px solid white' : 'none', borderRight: isCurrentMedia ? '7px solid white' : 'none', borderTop: isCurrentMedia ? '2px solid white' : 'none', borderBottom: isCurrentMedia ? '2px solid white' : 'none', borderRadius: '4px', padding: '0 0px', backgroundColor: 'white' }}>
            <div style={{ width: isCurrentMedia ? '4px' : '0px', backgroundColor: 'black', padding: '10px 0px !important', borderRadius: '4px', marginTop: "10px", marginBottom: "10px" }} />
            <div style={{ width: isCurrentMedia ? '5px' : '0px', backgroundColor: 'white', borderRadius: '4px 0 0 4px' }} />
            {images.map((thumbnail, index) => {
              const totalSeconds = index * 2;
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
              const timelineTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              return (
                <div key={index} className="position-relative" style={{ margin: '0 1px' }}>
                  <img src={thumbnail.image} alt={`Thumbnail ${index}`} style={{ width: `${thumbnailWidth}px`, height: '70px', objectFit: 'cover', cursor: 'pointer' }} onClick={() => handleThumbnailSelect(fileName, index)} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.7)', color: 'white', fontSize: '10px', padding: '2px 4px', textAlign: 'center' }}>{timelineTime}</div>
                </div>
              );
            })}
            <div style={{ width: isCurrentMedia ? '7px' : '0px', backgroundColor: 'white', borderRadius: '0 4px 4px 0' }} />
            <div style={{ width: isCurrentMedia ? '4px' : '0px', backgroundColor: 'black', padding: '10px 0px !important', borderRadius: '4px', marginTop: "10px", marginBottom: "10px" }} />
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const processUploadedMedia = async () => {
      if (uploadedMedia.length > 0) {
        setAllMedia(uploadedMedia);
        setCurrentMediaIndex(0);
        const file = uploadedMedia[0];
        setMedia(file);
        setMediaType(file.type.split('/')[0]);
        const fileURL = URL.createObjectURL(file);
        setMediaBlobUrl(fileURL);
        for (const uploadedFile of uploadedMedia) {
          if (uploadedFile.type.startsWith('video/')) {
            await generateThumbnails(uploadedFile);
          } else if (uploadedFile.type.startsWith('image/')) {
            await generateImageThumbnail(uploadedFile, URL.createObjectURL(uploadedFile));
          }
        }
      }
    };
    processUploadedMedia();
  }, [uploadedMedia]);

  const generateThumbnails = (videoFile) => {
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.addEventListener('loadedmetadata', () => {
      const duration = Math.floor(videoElement.duration);
      const newThumbnails = [];
      const timeStamps = [];
      const captureFrame = (time) => {
        return new Promise((resolve) => {
          videoElement.currentTime = time;
          videoElement.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 132;
            canvas.height = 150;
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            newThumbnails.push({ image: canvas.toDataURL(), timestamp: formattedTime, seconds: time });
            timeStamps.push(time);
            resolve();
          }, { once: true });
        });
      };
      const captureAllFrames = async () => {
        for (let i = 0; i < duration; i += 2) {
          await captureFrame(i);
        }
        newThumbnails.sort((a, b) => a.seconds - b.seconds);
        setThumbnails((prev) => ({
          ...prev,
          [videoFile.name]: { images: newThumbnails, times: timeStamps }
        }));
        updateDisplayTime(newThumbnails.length);
      };
      captureAllFrames();
    });
  };

  const updateDisplayTime = (thumbnailCount) => {
    const newDisplayTime = thumbnailCount * 2;
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

  useEffect(() => {
    const updateCursor = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const position = (currentTime / duration) * 100;
        setCursorPosition(position);
      }
    };
    const interval = setInterval(updateCursor, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleThumbnailSelect = (fileName, index) => {
    setSelectedThumbnailIndex((prev) => {
      const newSelected = {};
      newSelected[fileName] = index;
      handleMediaSelect(allMedia.findIndex(media => media.name === fileName));
      return newSelected;
    });
  };

  const handleDeleteMedia = (index) => {
    if (index < 0 || index >= allMedia.length) return;
    const fileName = allMedia[index].name; // Get the name of the media to be deleted
    console.log("Deleting Media:", fileName); // Log the media being deleted
    setAllMedia((prev) => {
      const newMedia = prev.filter((_, i) => i !== index); // Remove the media from the array
      if (newMedia.length === 0) {
        setMedia(null);
        setMediaType('');
        setMediaBlobUrl(null);
        setCurrentMediaIndex(null);
        setHasMedia(false);
      } else {
        if (currentMediaIndex === index) {
          setMedia(null);
          setMediaType('');
          setMediaBlobUrl(null);
          setCurrentMediaIndex(null);
        } else {
          const newIndex = Math.min(index, newMedia.length - 1);
          handleMediaSelect(newIndex);
        }
      }
      return newMedia; // Return the updated media array
    });
    setThumbnails((prev) => {
      const newThumbnails = { ...prev };
      delete newThumbnails[fileName]; // Remove thumbnails associated with the deleted media
      return newThumbnails;
    });
    setDeletedMediaNames((prev) => [...prev, fileName]); // Track deleted media names
  };


  // const confirmDeleteMedia = () => {
  //   if (mediaToDeleteIndex !== null) {
  //     handleDeleteMedia(mediaToDeleteIndex);
  //     setMediaToDeleteIndex(null);
  //   }
  //   setShowModal(false);
  // };
  const confirmDeleteMedia = () => {
    if (mediaToDeleteIndex !== null) {
      const fileName = allMedia[mediaToDeleteIndex].name;

      // Create new array without the deleted media
      const newMediaArray = allMedia.filter((_, index) => index !== mediaToDeleteIndex);

      // Update allMedia state with filtered array
      setAllMedia(newMediaArray);

      // Update deletedMediaNames
      setDeletedMediaNames(prev => [...prev, fileName]);

      // Clear thumbnails for deleted media
      setThumbnails(prev => {
        const newThumbnails = { ...prev };
        delete newThumbnails[fileName];
        return newThumbnails;
      });

      // Reset current media if it was deleted
      if (currentMediaIndex === mediaToDeleteIndex) {
        setMedia(null);
        setMediaType('');
        setMediaBlobUrl(null);

        // If there are remaining media items, select the next available one
        if (newMediaArray.length > 0) {
          const newIndex = Math.min(mediaToDeleteIndex, newMediaArray.length - 1);
          const nextMedia = newMediaArray[newIndex];
          setMedia(nextMedia);
          setMediaType(nextMedia.type.split('/')[0]);
          setMediaBlobUrl(URL.createObjectURL(nextMedia));
          setCurrentMediaIndex(newIndex);
        } else {
          setCurrentMediaIndex(null);
          setHasMedia(false);
        }
      } else if (currentMediaIndex > mediaToDeleteIndex) {
        // Adjust currentMediaIndex if deleted media was before current media
        setCurrentMediaIndex(currentMediaIndex - 1);
      }

      // Stop video playback if playing
      if (isPlaying) {
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }

      // Reset mediaToDeleteIndex
      setMediaToDeleteIndex(null);
    }

    // Close modal
    setShowModal(false);
  };
  const handleThumbnailCopy = () => {
    if (currentMediaIndex !== null && allMedia[currentMediaIndex]) {
      const currentFileName = allMedia[currentMediaIndex].name;
      const currentThumbnails = thumbnails[currentFileName];
      if (currentThumbnails && currentThumbnails.images) {
        setThumbnails(prev => ({
          ...prev,
          [currentFileName]: {
            ...prev[currentFileName],
            images: [...prev[currentFileName].images, ...currentThumbnails.images]
          }
        }));
      }
    }
  };

  const handleThumbnailDrop = (event) => {
    event.preventDefault();
    const { allThumbnails, fileName } = JSON.parse(event.dataTransfer.getData("text/plain"));
    setDraggedThumbnails(allThumbnails);
  };
  const handleDeleteThumbnail = () => {
    if (currentMediaIndex !== null && selectedThumbnailIndex) {
      const currentFileName = allMedia[currentMediaIndex].name;
      const currentThumbnails = thumbnails[currentFileName];

      if (currentThumbnails && currentThumbnails.images) {
        // Find which thumbnail is selected for the current media
        const selectedIndex = selectedThumbnailIndex[currentFileName];

        if (selectedIndex !== undefined) {
          // Create new array of thumbnails excluding the selected one
          const updatedThumbnails = currentThumbnails.images.filter((_, index) => index !== selectedIndex);

          // Update the thumbnails state
          setThumbnails(prev => ({
            ...prev,
            [currentFileName]: {
              ...prev[currentFileName],
              images: updatedThumbnails
            }
          }));

          // Clear the selection
          setSelectedThumbnailIndex(prev => {
            const newSelected = { ...prev };
            delete newSelected[currentFileName];
            return newSelected;
          });

          // Update display time based on new thumbnail count
          updateDisplayTime(updatedThumbnails.length);
        }
      }
    }
  };
  const handleDeleteVideoThumbnails = () => {
    if (currentMediaIndex !== null) {
      const currentFileName = allMedia[currentMediaIndex].name;

      // Remove all thumbnails for the current video
      setThumbnails(prev => {
        const newThumbnails = { ...prev };
        delete newThumbnails[currentFileName];
        return newThumbnails;
      });

      // Clear the selection for this video
      setSelectedThumbnailIndex(prev => {
        const newSelected = { ...prev };
        delete newSelected[currentFileName];
        return newSelected;
      });

      // Add the filename to deleted media names to prevent re-rendering
      setDeletedMediaNames(prev => [...prev, currentFileName]);

      // Update the display time
      setDisplayTime(0);

      // Optional: Move to the next available media if any
      if (currentMediaIndex < allMedia.length - 1) {
        handleMediaSelect(currentMediaIndex + 1);
      } else if (currentMediaIndex > 0) {
        handleMediaSelect(currentMediaIndex - 1);
      } else {
        // If no other media available, reset current media
        setMedia(null);
        setMediaType('');
        setMediaBlobUrl(null);
        setCurrentMediaIndex(null);
      }
    }
  };
  const hasActiveThumbnails = () => {
    if (currentMediaIndex !== null) {
      const currentFileName = allMedia[currentMediaIndex].name;
      return thumbnails[currentFileName] && !deletedMediaNames.includes(currentFileName);
    }
    return false;
  };
  return (
    <div>
      <div className="row w-100">
        <div className="col-xl-3 d-xl-block d-none px-0">
          {allMedia.length === 0 ? (
            <div>
              <div className="d_bg_media" onClick={() => document.getElementById('fileInput').click()}>
                <div className="d_bg_overlayer">
                  <img src={d_m1} alt="Upload Icon" />
                  <p className='mb-0'>Click to upload</p>
                  <p className='mb-0 text-secondary'>or drag & drop file here</p>
                  <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*,video/*" onChange={handleUpload} />
                </div>
              </div>
            </div>
          ) : (
            <div className="d_uploaded_media border p-2 overflow-hidden" style={{ height: '487px' }}>
            <div className="row w-100">
                {allMedia
                    .filter((file) => !deletedMediaNames.includes(file.name)) // Filter out deleted media
                    .slice()
                    .reverse() // Reverse the order for display
                    .map((file, index) => {
                        const reversedIndex = allMedia.length - 1 - index; // Calculate the reversed index for selection
                        return (
                            <div className="col-4 d-flex justify-content-center position-relative" key={file.name} style={{ marginBottom: '15px' }} onClick={() => handleMediaSelect(reversedIndex)}>
                                {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '132px', height: '150px', objectFit: 'cover' }} />
                                ) : file.type.startsWith('video/') ? (
                                    <video controls={false} style={{ width: '132px', height: '150px', objectFit: 'cover' }}>
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <p>Unsupported media type</p>
                                )}
                                <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="delete-icon">
                                    <img src="path/to/delete-icon.svg" alt="Delete" style={{ width: '20px', height: '20px' }} />
                                </button>
                                <div className="hover-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '10px', opacity: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}>
                                    <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'right', fontSize: '22px', paddingTop: '6px', display: 'flex', justifyContent: 'end', alignItems: 'baseline' }}>
                                        <RiDeleteBin6Line />
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'left', fontSize: '18px', display: 'flex', paddingLeft: '10px', alignItems: 'baseline' }}>
                                        10:13
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
                  <video id="videoPreview" ref={videoRef} key={mediaBlobUrl} controls={false} style={{ width: '100%', height: '100%' }}>
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
            <img className="d_control_img mx-2" src={mp1} alt="Previous" onClick={handleRightClick} style={{ cursor: currentMediaIndex < allMedia.length - 1 ? 'pointer' : 'not-allowed', filter: currentMediaIndex < allMedia.length - 1 ? 'none' : 'grayscale(100%)' }} />
            <span onClick={handlePlayPause} style={{ cursor: 'pointer' }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </span>
            <img className="d_control_img mx-2" src={mp3} alt="Next" onClick={handleLeftClick} style={{ cursor: currentMediaIndex > 0 ? 'pointer' : 'not-allowed', filter: currentMediaIndex > 0 ? 'none' : 'grayscale(100%)' }} />
          </div>
        </div>
      </div>
      <div className="row mt-3 w-100">
        <div className="d_timeline_bg_icon px-0" style={{ overflow: 'auto', width: '100%' }}>
          <div className="d_timeline_icon_row p-2 d-flex justify-content-between align-items-center">
            <div className="d_timeline_left_icons d-flex align-items-center">
              <img className="mx-2" src={t11} alt="Icon 1" />
              <img className="mx-2" src={t1} alt="Icon 2" onClick={handleThumbnailCopy} style={{ cursor: 'pointer' }} />
              <img className="mx-2" src={t2} alt="Icon 3" onClick={handleDeleteVideoThumbnails}
                style={{
                  cursor: hasActiveThumbnails() ? 'pointer' : 'not-allowed',
                  opacity: hasActiveThumbnails() ? 1 : 0.5
                }} />
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
                    <div style={{ position: 'absolute', width: '1px', height: '12px', backgroundColor: '#FFFFFF40', top: '0', left: `${(index * 100) / Math.ceil(displayTime / 2)}%` }} />
                    <span style={{ position: 'absolute', fontSize: '12px', color: '#FFFFFF80', marginLeft: '4px', top: '14px', left: `${(index * 100) / Math.ceil(displayTime / 2)}%` }}>{time}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ position: 'absolute', width: '2px', height: '100%', backgroundColor: 'white', left: `${cursorPosition}%`, top: '0', zIndex: 10 }}>
              <div style={{ position: 'absolute', width: '0', height: '0', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '5px solid white', top: '-5px', left: '-5px' }} />
            </div>
          </div>
          <div id='d_dreg' className="row w-100 px-0 d_delete_media" style={{ overflowX: 'auto' }}>
            {Object.keys(thumbnails).length > 0 ? renderThumbnails() : (
              <p>No thumbnails available</p>
            )}
          </div>
          <div className="row w-100 px-0" onDrop={handleThumbnailDrop} onDragOver={(e) => e.preventDefault()}>
            <div className="col-12 px-0">
              <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto', borderRadius: '4px', whiteSpace: 'nowrap', borderLeft: draggedThumbnails.length > 0 ? '7px solid white' : 'none', borderRight: draggedThumbnails.length > 0 ? '7px solid white' : 'none' }}>
                <div style={{ paddingTop: "9px", paddingBottom: "8px" }}>
                  <span style={{ borderLeft: draggedThumbnails.length > 0 ? '4px solid black' : 'none', borderRadius: '20px', paddingBottom: '30px' }} />
                </div>
                {draggedThumbnails.map((thumbnail, index) => (
                  <div key={index} className="position-relative" onClick={() => {
                    fetch(thumbnail)
                      .then(res => res.blob())
                      .then(blob => {
                        const file = new File([blob], `thumbnail-${index}.png`, { type: 'image/png' });
                        setMedia(file);
                        setMediaType('image');
                        setMediaBlobUrl(thumbnail);
                        setCurrentMediaIndex(index);
                        setSelectedThumbnailIndex(index);
                        const videoPreview = document.getElementById('videoPreview');
                        if (videoPreview) {
                          videoPreview.style.display = 'none';
                        }
                        const previewDiv = document.querySelector('.d_bg_preview');
                        if (previewDiv) {
                          previewDiv.innerHTML = '';
                          const img = document.createElement('img');
                          img.src = thumbnail;
                          img.style.width = '100%';
                          img.style.height = '100%';
                          img.style.objectFit = 'contain';
                          previewDiv.appendChild(img);
                        }
                      });
                  }}>
                    <img src={thumbnail} alt={`Dragged Thumbnail ${index}`} style={{ width: `${thumbnailWidth}px`, height: '70px', objectFit: 'cover', cursor: 'pointer' }} />
                  </div>
                ))}
                <div style={{ paddingTop: "9px", paddingBottom: "8px" }}>
                  <span style={{ borderLeft: draggedThumbnails.length > 0 ? '4px solid black' : 'none', borderRadius: '20px', paddingBottom: '30px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} className='d_dwnld_model' onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Delete file</Modal.Title>
          <button type="button" className="btn-close p-0 fs-2" aria-label="Close" onClick={() => setShowModal(false)}>
            <MdClose className='mb-4 text-white' />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className='text-center px-md-5 px-2 mt-2'>Are you sure you want to delete file?</p>
          <div className='mt-5'>
            <div className="row my-4 justify-content-between">
              <div className="col-6 p-0">
                <button className='border w-100 p-2 rounded bg-transparent text-white' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button className='border w-100 p-2 fw-bold rounded' onClick={confirmDeleteMedia}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}


// import React, { useState, useEffect, useRef } from 'react';
// import { RiDeleteBin6Line } from "react-icons/ri";

// export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
//     const [allMedia, setAllMedia] = useState([]); // Store all uploaded media
//     const [deletedMediaNames, setDeletedMediaNames] = useState([]); // Store names of deleted media
//     const [mediaToDeleteIndex, setMediaToDeleteIndex] = useState(null); // Index of media to delete
//     const [showModal, setShowModal] = useState(false); // Control modal visibility

//     const handleUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Check if the file is already uploaded or deleted
//             if (allMedia.some(media => media.name === file.name) || deletedMediaNames.includes(file.name)) return; // Prevent re-upload of deleted media
//             setAllMedia((prev) => [...prev, file]); // Add new media to the state
//             onMediaUpload(file); // Call the upload handler
//             console.log("Uploaded Media:", file); // Log the uploaded media
//         }
//     };

//     const handleDeleteMedia = (index) => {
//         if (index < 0 || index >= allMedia.length) return;
//         const fileName = allMedia[index].name; // Get the name of the media to be deleted
//         console.log("Deleting Media:", fileName); // Log the media being deleted
//         setAllMedia((prev) => {
//             const newMedia = prev.filter((_, i) => i !== index); // Remove the media from the array
//             return newMedia; // Return the updated media array
//         });
//         setDeletedMediaNames((prev) => [...prev, fileName]); // Track deleted media names
//     };

//     const confirmDeleteMedia = () => {
//         if (mediaToDeleteIndex !== null) {
//             handleDeleteMedia(mediaToDeleteIndex); // Delete the selected media
//             setMediaToDeleteIndex(null);
//         }
//         setShowModal(false); // Close the modal
//     };

//     return (
//         <div className="d_uploaded_media border p-2 overflow-hidden" style={{ height: '487px' }}>
//             <div className="row w-100">
//                 {allMedia
//                     .filter((file) => !deletedMediaNames.includes(file.name)) // Filter out deleted media
//                     .slice()
//                     .reverse() // Reverse the order for display
//                     .map((file, index) => {
//                         const reversedIndex = allMedia.length - 1 - index; // Calculate the reversed index for selection
//                         return (
//                             <div className="col-4 d-flex justify-content-center position-relative" key={file.name} style={{ marginBottom: '15px' }} onClick={() => handleMediaSelect(reversedIndex)}>
//                                 {file.type.startsWith('image/') ? (
//                                     <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '132px', height: '150px', objectFit: 'cover' }} />
//                                 ) : file.type.startsWith('video/') ? (
//                                     <video controls={false} style={{ width: '132px', height: '150px', objectFit: 'cover' }}>
//                                         <source src={URL.createObjectURL(file)} type={file.type} />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 ) : (
//                                     <p>Unsupported media type</p>
//                                 )}
//                                 <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="delete-icon">
//                                     <img src="path/to/delete-icon.svg" alt="Delete" style={{ width: '20px', height: '20px' }} />
//                                 </button>
//                                 <div className="hover-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '10px', opacity: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}>
//                                     <button onClick={(e) => { e.stopPropagation(); setMediaToDeleteIndex(reversedIndex); setShowModal(true); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'right', fontSize: '22px', paddingTop: '6px', display: 'flex', justifyContent: 'end', alignItems: 'baseline' }}>
//                                         <RiDeleteBin6Line />
//                                     </button>
//                                     <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', float: 'left', fontSize: '18px', display: 'flex', paddingLeft: '10px', alignItems: 'baseline' }}>
//                                         10:13
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>
//         </div>
//     );
// }