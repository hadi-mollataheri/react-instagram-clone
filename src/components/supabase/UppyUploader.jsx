import { useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { supabase } from '../../utilities/supabase-apiCalls';
import { v4 as uuidv4 } from 'uuid';

const UppyUploader = ({ onUploadComplete }) => {
  // Create a persistent Uppy instance using useRef so it is not re-created on every render.
  const uppyRef = useRef(
    new Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 5,
        allowedFileTypes: ['image/*'],
      },
    }),
  );
  const uppy = uppyRef.current;

  // Cleanup Uppy on component unmount.
  useEffect(() => {
    return () => {
      if (uppy && typeof uppy.close === 'function') {
        uppy.close();
      }
    };
  }, [uppy]);

  // Listen to each file’s successful upload.
  useEffect(() => {
    // Handler for each successful file upload.
    const uploadSuccessHandler = async (file, response) => {
      console.log('upload-success event for file:', file);
      if (response.body) {
        // Use the stored path returned by Supabase.
        const storedPath = response.body.path;
        console.log('Stored path:', storedPath);
        // Get the public URL using the stored path.
        const publicUrlResponse = supabase.storage
          .from('posts-images')
          .getPublicUrl(storedPath);
        console.log('Public URL response:', publicUrlResponse);
        // Destructure the proper property (note the lower-case "u")
        const {
          data: { publicUrl },
        } = publicUrlResponse;
        console.log('Public URL from upload-success:', publicUrl);
        // Pass the new public URL to the parent via the callback.
        if (onUploadComplete) {
          onUploadComplete(publicUrl);
        }
      }
    };

    uppy.on('upload-success', uploadSuccessHandler);

    // Cleanup the event listener on unmount.
    return () => {
      uppy.off('upload-success', uploadSuccessHandler);
    };
  }, [uppy, onUploadComplete]);

  return (
    <Dashboard
      uppy={uppy}
      hideUploadButton={true} // Hides the manual upload button.
      height={400}
      note='Images only, up to 5 files'
    />
  );
};

export default UppyUploader;
