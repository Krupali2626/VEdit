import React from 'react'

export default function MediaComponent({ allMedia, deletedMediaNames = [], handleMediaSelect }) {
  console.log("All Media:", allMedia);
  console.log("Deleted Media Names:", deletedMediaNames);

  return (
    <div className="d_uploaded_media border p-2 overflow-hidden" style={{ height: '487px' }}>
      <div className="row w-100">
        {allMedia
          .slice()
          .reverse()
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
              </div>
            );
          })}
      </div>
    </div>
  )
}
