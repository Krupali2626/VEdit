import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

function VideoTimeline(props) {
    const [clips, setClips] = useState([]);
    const [scale, setScale] = useState(1); // pixels per second
    const timelineRef = useRef(null);

    const addClip = () => {
        const newClip = {
            id: Date.now(),
            start: 0,
            duration: 5,
            color: getRandomColor(),
        };
        setClips([...clips, newClip]);
    };

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const handleClipResize = (id, d) => {
        setClips(clips.map(clip =>
            clip.id === id ? { ...clip, duration: d.width / scale } : clip
        ));
    };

    const handleClipDrag = (id, d) => {
        setClips(clips.map(clip =>
            clip.id === id ? { ...clip, start: d.x / scale } : clip
        ));
    };

    const zoomIn = () => setScale(scale * 1.2);
    const zoomOut = () => setScale(scale / 1.2);

    return (
        <>
            <div className="w-full h-screen bg-gray-100 p-4">
                <div className="mb-4">
                    <button onClick={addClip} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Clip</button>
                    <button onClick={zoomIn} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Zoom In</button>
                    <button onClick={zoomOut} className="bg-red-500 text-white px-4 py-2 rounded">Zoom Out</button>
                </div>
                <div ref={timelineRef} className="relative w-full h-40 bg-gray-200 overflow-x-auto">
                    {clips.map(clip => (
                        <Rnd
                            key={clip.id}
                            size={{ width: clip.duration * scale, height: 50 }}
                            position={{ x: clip.start * scale, y: 0 }}
                            onDragStop={(e, d) => handleClipDrag(clip.id, d)}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                handleClipResize(clip.id, ref.style);
                            }}
                            bounds="parent"
                            className="absolute"
                            style={{ backgroundColor: clip.color }}
                        >
                            <div className="w-full h-full flex items-center justify-center text-white">
                                Clip {clip.id}
                            </div>
                        </Rnd>
                    ))}
                </div>
                <div className="mt-4">
                    Timeline Scale: {scale.toFixed(2)} pixels/second
                </div>
            </div>
        </>
    );
}

export default VideoTimeline;