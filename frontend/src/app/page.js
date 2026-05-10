import MediaList from "./components/MediaList";
import Link from "next/link"; 

export default async function Home() {
  
  const response = await fetch('http://127.0.0.1:8000/api/media/', {
    cache: 'no-store' 
  });
  const mediaItems = await response.json();

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