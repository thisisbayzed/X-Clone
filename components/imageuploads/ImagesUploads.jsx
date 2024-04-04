"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

function ImagesUploads({ value, onChange, label }) {
  const [base64, setBase64] = useState(value);
  const Handlechange = useCallback(
    (base64) => {
      onChange(base64);
    },
    [onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64(event.target.result);
        Handlechange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [Handlechange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-black">{label}</p>
      )}
    </div>
  );
}

export default ImagesUploads;
