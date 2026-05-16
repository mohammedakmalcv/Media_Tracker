"use client";

import { useState, useEffect } from "react";
import MediaList from "./components/MediaList";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMedia = async () => {
      const token = localStorage.getItem("access_token");
      
      
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/media/', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMediaItems(data);
        } else if (response.status === 401) {
         
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen p-10 bg-gray-950 text-white flex justify-center items-center">Loading your tracker...</div>;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">My Media Tracker</h1>
        
        <Link href="/add" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold shadow-lg transition-all">
          + Add New
        </Link>
      </div>

      <MediaList initialItems={mediaItems} />
    </main>
  );
}