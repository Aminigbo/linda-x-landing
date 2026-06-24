"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadImage } from "@/lib/admin/imageUpload";

export default function ImageUpload({ value, onChange, label = "Featured Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const result = await uploadImage(file);

      if (result.success) {
        URL.revokeObjectURL(previewUrl);
        setPreview(result.url);
        onChange(result.url);
      } else {
        alert("Upload failed: " + result.error);
        setPreview(value || "");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + error.message);
      setPreview(value || "");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div className="image-upload">
      <label className="form-label">{label}</label>

      {preview ? (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <button type="button" onClick={removeImage} className="image-remove-btn">
            <X size={16} />
          </button>
          {uploading && (
            <div className="image-preview-overlay">
              <div>Uploading...</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`image-upload-zone ${dragOver ? "dragover" : ""}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onClick={() => document.getElementById("image-upload").click()}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: "none" }}
            disabled={uploading}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            {uploading ? (
              <>
                <Upload size={32} style={{ color: "var(--primary)" }} className="bounce" />
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--gray-600)" }}>
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <ImageIcon size={32} style={{ color: "var(--gray-400)" }} />
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--gray-600)" }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--gray-500)" }}>
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
