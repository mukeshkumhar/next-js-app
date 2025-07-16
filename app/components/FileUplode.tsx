"use client"; // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
interface FileUploadProps {
  onSuccess?: (response: any) => void;
  onProgress?: (progress: number) => void;
  fileTypes?: "image" | "video";
  // onError?: (error: Error) => void;
}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({onSuccess, onProgress, fileTypes}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if( fileTypes === "video"){
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
      }
    }

    if (file.size > 10 * 1024 * 1024) { // 10 MB limit
      setError("File size exceeds 10 MB limit.");
    }
    return true;
  };


  return (
    <>

      <input type="file" ref={fileInputRef} />

      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />

      Upload progress: <progress value={progress} max={100}></progress>
    </>
  );
};

export default FileUpload;
