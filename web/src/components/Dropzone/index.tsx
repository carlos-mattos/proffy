import React from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";
import { FiUpload } from "react-icons/fi";
import { useCallback } from "react";
import { useState } from "react";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Escolha seu avatar
        </p>
      )}
    </div>
  );
};

export default Dropzone;
