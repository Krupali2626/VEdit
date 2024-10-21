import React, { useState, useEffect, useRef } from 'react';
// ... (other imports remain the same)

export default function MediaComponent({ uploadedMedia, onMediaUpload }) {
  // ... (other state variables and functions remain the same)

  // Modified to use actual video durations
  useEffect(() => {
    const durations = {};
    allMedia.forEach((file, index) => {
      if (file.type.startsWith('video/')) {
        // For videos, use their natural duration
        if (videoDurations[index]) {
          durations[index] = videoDurations[index];
        }
      } else if (file.type.startsWith('image/')) {
        // Default duration for images (you can adjust this if needed)
        durations[index] = 5;
      }
    });
    setClipDurations(durations);
  }, [allMedia, videoDurations]);

  // Modified renderClip function to display clips in a single line
  const renderClip = (file, index) => {
    const isEditing = editingClipIndex === index;
    const duration = clipDurations[index] || 0;

    return (
      <div
        key={index}
        className="clip-container"
        style={{
          width: `${(duration / totalDuration) * 100}%`, // Width based on duration
          height: '50px',
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        {file.type.startsWith('video/') ? (
          <video
            src={URL.createObjectURL(file)}
            alt={`Video Clip ${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={URL.createObjectURL(file)}
            alt={`Image Clip ${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Duration display/editor */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '2px'
          }}
        >
          {isEditing ? (
            <input
              type="number"
              value={tempDuration}
              onChange={(e) => setTempDuration(e.target.value)}
              onBlur={() => {
                handleDurationChange(index, tempDuration);
                setEditingClipIndex(null);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleDurationChange(index, tempDuration);
                  setEditingClipIndex(null);
                }
              }}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                textAlign: 'center'
              }}
              min="0.1"
              step="0.1"
              autoFocus
            />
          ) : (
            <span
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => {
                setEditingClipIndex(index);
                setTempDuration(duration.toString());
              }}
            >
              {`${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`}
            </span>
          )}
        </div>
      </div>
    );
  };

  // ... (other functions remain the same)

  return (
    <div>
      {/* ... (other JSX remains the same) */}

      <div className="row mt-3">
        <div className="d_timeline_bg_icon px-0">
          {/* ... (timeline JSX remains the same) */}

          {/* Modified to display clips in a single line */}
          <div className='d_clip_main' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
            {allMedia.length > 0 ? (
              allMedia.map((file, index) => renderClip(file, index))
            ) : (
              <p>No clips available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}