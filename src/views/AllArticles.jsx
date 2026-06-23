"use client";

import React from "react";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

function AllArticles() {
  const [activeTitle, setActiveTitle] = React.useState("All Articles");
  // Ensure the parent div uses flex to place SideNav and body side by side
  const [articles, setArticles] = useState([]); // State to hold our fetched articles
  const [loading, setLoading] = useState(true); // Tracks if data is still loading
  const [error, setError] = useState(null); // Stores any error messages

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors

        // Fetch only the necessary preview data from your 'articles' table
        const { data, error } = await supabase
          .from("articles")
          .select("id, title, subtitle, description, image_url"); // Requesting only these columns

        if (error) {
          throw error; // If Supabase returns an error, throw it
        }

        if (data) {
          setArticles(data); // Update state with fetched articles
        }
      } catch (err) {
        console.error("Error fetching articles:", err); // Log the detailed error
        setError("Failed to load articles. Please try again later."); // User-friendly error message
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    };

    fetchArticles(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <div className="max-w-screen p-10 bg-black relative min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen p-10 bg-black relative min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-screen p-10 bg-black relative min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">
          No articles found yet. Time to write some!
        </p>
      </div>
    );
  }

  // Dummy handleDelete function (replace with your actual logic)
  const handleDelete = (id) => {
    // TODO: Implement delete logic here, e.g., call API or update state
    alert(`Delete article with id: ${id}`);
  };

  return (
    <div className="flex">
      <SideNav setActiveTitle={setActiveTitle} />
      <div className="ml-5 p-6">
        <h1 className="text-2xl font-bold mb-4">{activeTitle}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p>Loading articles...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && articles.length === 0 && (
            <p>No articles found.</p>
          )}
          {!loading &&
            !error &&
            articles.map((article) => (
              <div key={article.id}>
                <img src={article.image_url || ""} alt={article.title} />
                <p>{article.title}</p>
                <p>{article.description}</p>
                <button
                  className="px-4 py-2 font-semibold bg-[#E02B20] text-white transition"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllArticles;
