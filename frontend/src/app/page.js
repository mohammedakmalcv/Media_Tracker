"use client";

import { useState, useEffect } from "react";
import MediaList from "./components/MediaList";
import Link from "next/link";

export default function Home() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      
      const token = localStorage.getItem("access_token");
      
      
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      try {
        
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch('https://media-tracker-api-os56.onrender.com/api/media/', {
          headers: headers
        });

        if (response.ok) {
          const data = await response.json();
          setMediaItems(data);
        } else {
          console.error("API Error - Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen p-10 bg-gray-950 text-white flex justify-center items-center">Loading your tracker...</div>;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">My Media Tracker</h1>
        
      
        {isLoggedIn && (
          <Link href="/add" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold shadow-lg transition-all">
            + Add New
          </Link>
        )}
      </div>
    
      
      <MediaList initialItems={mediaItems} isLoggedIn={isLoggedIn} />
    </main>
  );
}