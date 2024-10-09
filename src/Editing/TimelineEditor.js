// src/Editing/TimelineEditor.js

import React, { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import '../CSS/TimelineEditor.css';

const ffmpeg = new FFmpeg({ log: true });

const TimelineEditor = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [markers, setMarkers] = useState(generateMarkers(zoomLevel));
    const [clips, setClips] = useState([]); // To store clips with images
    const [image, setImage] = useState(null); // For uploaded image
    const [videoFile, setVideoFile] = useState(null); // For uploaded video
    const [outputImage, setOutputImage] = useState(''); // For the output image after frame extraction
    const [loading, setLoading] = useState(false); // Loading state for processing

    function generateMarkers(level) {
        const markersCount = level === 1 ? 5 : level === 2 ? 10 : 20; // Adjust number of markers based on zoom level
        const interval = 60 / markersCount; // Total 60 seconds, divide by number of markers
        return Array.from({ length: markersCount + 1 }, (_, index) => Math.round(index * interval));
    }

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const zoomIn = () => {
        if (zoomLevel < 3) {
            setZoomLevel(zoomLevel + 1);
            setMarkers(generateMarkers(zoomLevel + 1));
        }
    };

    const zoomOut = () => {
        if (zoomLevel > 1) {
            setZoomLevel(zoomLevel - 1);
            setMarkers(generateMarkers(zoomLevel - 1));
        }
    };

    const handleMarkerClick = (marker) => {
        alert(`Marker at ${marker}s clicked!`);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
    };

    const fetchFile = async (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const extractFrames = async () => {
        if (!videoFile) return;

        setLoading(true);
        const fileName = videoFile.name;

        // Load FFmpeg core
        await ffmpeg.load();

        // Write the video file to memory
        ffmpeg.FS('writeFile', fileName, await fetchFile(videoFile));

        // Run the FFmpeg command
        await ffmpeg.run('-i', fileName, '-frames', '1', '-vf', 'select=not(mod(n\\,800)),scale=100:-2,tile=10x1', 'output.png', '-y');

        // Read the output file back from memory
        const data = ffmpeg.FS('readFile', 'output.png');

        // Create a URL for the output image
        const imageUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
        setOutputImage(imageUrl);
        setLoading(false);
    };

    const addClip = (marker) => {
        if (image) {
            setClips([...clips, { time: marker, image }]);
            setImage(null); // Clear image after adding the clip
        }
    };

    const editClip = (index) => {
        const newImage = prompt("Enter new image URL or upload again");
        if (newImage) {
            const updatedClips = [...clips];
            updatedClips[index].image = newImage;
            setClips(updatedClips);
        }
    };

    return (
        <div className="timeline-editor">
            <div className="controls">
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <input type="file" accept="video/*" onChange={handleVideoUpload} />
                <button onClick={extractFrames} disabled={loading}>
                    {loading ? 'Processing...' : 'Extract Frames'}
                </button>
            </div>
            <div className="timeline">
                {markers.map((marker, index) => (
                    <div
                        key={index}
                        className="marker"
                        style={{ left: `${(marker / 60) * 100}%` }} // 60 seconds total width
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                {clips.map((clip, index) => (
                    <div
                        key={index}
                        className="clip"
                        style={{ left: `${(clip.time / 60) * 100}%` }}
                    >
                        <img src={clip.image} alt={`Clip at ${clip.time}s`} />
                        <button onClick={() => editClip(index)}>Edit</button>
                    </div>
                ))}
            </div>
            <div className="time-labels">
                {markers.map((marker, index) => (
                    <span key={index}>
                        {Math.floor(marker / 60)}:{marker % 60 < 10 ? `0${marker % 60}` : marker % 60}
                    </span>
                ))}
            </div>
            <input
                type="range"
                className="slider"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
            />
            {outputImage && <img src={outputImage} alt="Output" />}
        </div>
    );
};

export default TimelineEditor;
