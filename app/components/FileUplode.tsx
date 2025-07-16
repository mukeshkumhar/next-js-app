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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) {
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const AuthRes = await fetch("/api/auth/imagekit-auth");
      const authData = await AuthRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.Next_ImageKit_Public_Key!,
        signature: authData.signature,
        expire: authData.expire,
        token: authData.token,
        onProgress: (event) =>{
          if(event.lengthComputable && onProgress){
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(Math.round(progress));
          }
        }
      });
      onSuccess?.(res);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      if (error instanceof ImageKitInvalidRequestError) {
        setError("Invalid request. Please check the file and try again.");
      } else if (error instanceof ImageKitServerError) {
        setError("Server error. Please try again later.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError("Network error. Please check your connection.");
      } else if (error instanceof ImageKitAbortError) {
        setError("Upload aborted.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }


  return (
    <>
      <input
        type="file"
        accept={fileTypes === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && (<span>Uploading...</span>)}
    </>
  );
};

export default FileUpload;
