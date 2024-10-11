// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';

// export default function VideoTimelineEditor() {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(149.78); // Example duration in seconds
//   const [tracks, setTracks] = useState([
//     { id: 1, title: 'Edit your title', type: 'title', color: '#E67E22' },
//     { id: 2, title: 'How star from the Sun', type: 'audio', color: '#3498DB' }
//   ]);

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleTimeChange = (newValue) => {
//     setCurrentTime(newValue[0]);
//   };

//   const fileInputRef = {
//     photo: React.useRef(null),
//     video: React.useRef(null)
//   };

//   const handleUploadClick = (type) => {
//     fileInputRef[type].current.click();
//   };

//   const handleFileChange = (event, type) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log(`${type} uploaded:`, file.name);
//       // Here you would handle the file upload
//     }
//   };

//   return (
//     <div className="w-full bg-black text-white p-4 rounded-lg">
//       {/* Upload Section */}
//       <div className="flex gap-4 mb-4">
//         <div>
//           <input
//             type="file"
//             ref={fileInputRef.photo}
//             onChange={(e) => handleFileChange(e, 'photo')}
//             accept="image/*"
//             className="hidden"
//           />
//           <Button 
//             variant="outline" 
//             className="flex items-center gap-2"
//             onClick={() => handleUploadClick('photo')}
//           >
//             <span className="text-lg">📷</span> Upload Photo
//           </Button>
//         </div>
//         <div>
//           <input
//             type="file"
//             ref={fileInputRef.video}
//             onChange={(e) => handleFileChange(e, 'video')}
//             accept="video/*"
//             className="hidden"
//           />
//           <Button 
//             variant="outline" 
//             className="flex items-center gap-2"
//             onClick={() => handleUploadClick('video')}
//           >
//             <span className="text-lg">🎥</span> Upload Video
//           </Button>
//         </div>
//       </div>

//       {/* Timeline Controls */}
//       <div className="flex items-center gap-4 mb-4">
//         <Button variant="outline" size="icon">
//           ⏮️
//         </Button>
//         <Button variant="outline" size="icon">
//           ⏯️
//         </Button>
//         <div className="text-sm">
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </div>
//       </div>

//       {/* Timeline */}
//       <div className="relative">
//         {/* Time markers */}
//         <div className="flex justify-between text-xs mb-2">
//           {Array.from({ length: 13 }, (_, i) => (
//             <span key={i}>{formatTime(i * 10)}</span>
//           ))}
//         </div>

//         {/* Tracks */}
//         <div className="space-y-2">
//           {tracks.map(track => (
//             <div 
//               key={track.id} 
//               className="h-8 rounded relative" 
//               style={{ backgroundColor: track.color }}
//             >
//               <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-sm">
//                 {track.title}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Playhead slider */}
//         <div className="mt-4">
//           <Slider
//             value={[currentTime]}
//             max={duration}
//             step={0.1}
//             onValueChange={handleTimeChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TimelineEditor = () => {

    const [mediaItems, setMediaItems] = useState([]);

    const addMedia = (type, url) => {
        setMediaItems((prevItems) => [
            ...prevItems,
            { id: uuidv4(), type, url },
        ]);
    };

    const removeMedia = (id) => {
        setMediaItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const url = URL.createObjectURL(file);
            addMedia(file.type.startsWith('video/') ? 'video' : 'image', url);
        });
    };

    return (
        <div>
            <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} />
            <div className="timeline">
                {mediaItems.map((item) => (
                    <div key={item.id} className="timeline-item">
                        {item.type === 'video' ? (
                            <video controls src={item.url} />
                        ) : (
                            <img src={item.url} alt="uploaded" />
                        )}
                        <button onClick={() => removeMedia(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineEditor;
