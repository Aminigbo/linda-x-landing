"use client";

import React from "react";
import SideNav from "../components/SideNav";
import { supabase } from "@/lib/supabase/client";

function Upload() {
  // State for file upload
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);

  // State for story details (title, subtitle, description, and content)
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [storyUploadError, setStoryUploadError] = React.useState(null);
  const [storyUploadSuccess, setStoryUploadSuccess] = React.useState(false);

  const [activeTitle, setActiveTitle] = React.useState("Upload Story");

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false); // Reset success/error messages
      setUploadError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission and page reload

    // Basic validation
    if (!title) {
      setStoryUploadError("Please enter a story title.");
      return;
    }
    if (!content) {
      setStoryUploadError("Please enter story content.");
      return;
    }
    // Subtitle and Description can be optional, so no validation here for them
    if (!file) {
      setUploadError("Please select an image file for your story.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setStoryUploadError(null);
    setStoryUploadSuccess(false);

    let imgUrl = null; // Initialize imgUrl to null

    try {
      // 1. Upload the file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`; // Generates a unique filename
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadErrorRes } = await supabase.storage
        .from("book") // Your specified bucket name for images
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadErrorRes) {
        throw uploadErrorRes;
      }

      // Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from("book")
        .getPublicUrl(filePath);

      imgUrl = urlData.publicUrl;

      // 2. Insert the story data (title, subtitle, description, content, image_url) into your database table
      const { data: storyData, error: storyInsertError } = await supabase
        .from("stories") // IMPORTANT: Replace 'stories' with your actual table name for stories
        .insert([
          {
            title: title,
            subtitle: subtitle, // <-- Added subtitle here
            description: description, // <-- Added description here
            content: content,
            image_url: imgUrl,
          },
        ]);

      if (storyInsertError) {
        throw storyInsertError;
      }

      setUploadSuccess(true);
      setStoryUploadSuccess(true);
      setTitle(""); // Clear form fields on success
      setSubtitle(""); // Clear subtitle
      setDescription(""); // Clear description
      setContent("");
      setFile(null); // Clear selected file
      console.log("Story uploaded successfully:", storyData);
    } catch (error) {
      console.error("Error during upload process:", error);
      // Differentiate between file upload error and story insert error
      if (error.message && error.message.includes("upload")) {
        setUploadError(`Image upload failed: ${error.message}`);
      } else {
        setStoryUploadError(`Story submission failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <SideNav setActiveTitle={setActiveTitle} />
      <div className="ml-5 p-6 flex-grow">
        {" "}
        {/* Use flex-grow to make it take available space */}
        <h1 className="text-2xl font-bold mb-4">{activeTitle}</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-2xl mt-10"
        >
          <div>
            <label
              htmlFor="storyTitle"
              className="block text-lg font-bold text-black"
            >
              Title
            </label>
            <input
              id="storyTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2.5 h-9"
              placeholder="Enter story title"
            />
          </div>

          <div>
            <label
              htmlFor="storySubtitle"
              className="block text-lg font-bold text-black"
            >
              Subtitle
            </label>
            <input
              id="storySubtitle" // Corrected htmlFor/id for subtitle
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2.5 h-9"
              placeholder="Enter story subtitle"
            />
          </div>

          <div>
            <label
              htmlFor="storyImage"
              className="block text-lg font-bold text-black"
            >
              Image
            </label>
            <input
              id="storyImage"
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-2.5 h-9 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" // Added some styling for the file input button
            />
          </div>

          <div>
            <label
              htmlFor="storyDescription"
              className="block text-lg font-bold text-black"
            >
              Description
            </label>
            <textarea // Changed from input to textarea for multi-line description
              id="storyDescription" // Corrected htmlFor/id for description
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              rows="3" // Rows attribute is valid for textarea
              placeholder="Enter story description"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="storyContent"
              className="block text-lg font-bold text-black"
            >
              Content
            </label>
            <textarea
              id="storyContent"
              rows="15" // Slightly reduced rows for better visibility on initial load
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5" // Changed pl-2.5 to p-2.5 for padding all around
              placeholder="Write your story here..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={uploading} // Disable button while uploading
            className="px-4 py-2 bg-[#E02B20] text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styling
          >
            {uploading ? "Uploading..." : "Upload Story"}
          </button>

          {uploadError && (
            <p className="text-red-600 mt-2">Error: {uploadError}</p>
          )}
          {storyUploadError && (
            <p className="text-red-600 mt-2">Error: {storyUploadError}</p>
          )}
          {uploadSuccess && storyUploadSuccess && (
            <p className="text-green-600 mt-2">Story uploaded successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Upload;
