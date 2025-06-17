import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { Helmet } from "react-helmet";

function StoryPopup() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the story ID from the URL parameters
  const [story, setStory] = useState(null); // State to hold the fetched single story
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // --- Fetch the single story from Supabase ---
  useEffect(() => {
    const fetchStory = async () => {
      if (!id) {
        // Ensure id exists before attempting to fetch
        setError("No story ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("stories")
          .select("title, image_url, content") // Fetch only title, image_url, and content
          .eq("id", id) // Filter by the story ID from the URL
          .single(); // Expect only one record

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setStory(data);
        } else {
          setStory(null); // Story not found
        }
      } catch (err) {
        console.error("Error fetching single story:", err);
        setError("Failed to load story details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]); // Re-run effect if the 'id' parameter changes

  // --- Handle Loading, Error, and Story Not Found States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-xl">Loading story...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div>
          <p className="text-red-500 text-xl">Error: {error}</p>
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div>
          <p className="text-xl">Story not found.</p>
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- Main Render for Displaying the Story ---
  return (
    <>
      <Helmet>
        <title>{story.title}</title>
        <link rel="icon" type="image" href={story.image_url} /> 
      </Helmet>
      <div className="flex flex-col items-center bg-black min-h-screen p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-6 mt-8 mb-8 animate-fade-in relative">
          {/* Back button in top-left */}
          <Link to="/">
            {/* Note: The button's position 'bottom-0 right-0 lg:-left-26'
              might put it off-screen or not where intended.
              Consider 'top-4 left-4' or similar for a typical back button.
              I'm keeping your original Tailwind classes for now. */}
            <button className="absolute bottom-0 right-0 lg:-left-26 text-white w-[100px] hover:text-blue-700 font-semibold flex items-center gap-1 p-3 bg-[#E02B20] ">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </button>
          </Link>

          {/* Story image */}
          {story.image_url && ( // Use story.image_url from Supabase
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full max-h-80 object-cover rounded-md mb-6"
            />
          )}

          <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-1">
            {story.title}
          </h1>
          {/* Removed subtitle as per your request for this component */}
          {/* Removed description as per your request for this component */}

          {/* Story content */}
          <div
            id="popup-story-content"
            className="text-gray-800 whitespace-pre-line leading-relaxed"
            style={{
              fontSize: "1.1rem",
            }}
          >
            {/* Assuming story.content is a single string. If it's an array of paragraphs, you might need to map over it or join it with line breaks. */}
            {story.content}
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryPopup;
