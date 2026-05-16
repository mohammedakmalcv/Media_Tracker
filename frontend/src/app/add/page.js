"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddMedia() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Manga",
    status: "Active",
    current_progress: 0,
    total_progress: "",
    image_url: "", 
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchAPI = async () => {
    if (!formData.title) {
      toast.error("Please enter a title to search!");
      return;
    }

    setIsSearching(true);
    try {
      if (formData.category === "Game") {
        
        const apiKey = "f1dd93c66ae942b98cac8efb2cef73b7"; 
        const response = await fetch(`https://media-tracker-api-os56.onrender.com/api/media/`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const formattedResults = data.results.map(game => ({
              id: game.id,
              title: game.name,
              image: game.background_image, 
              type: "Game",
              chapters: "" 
          }));
          setSearchResults(formattedResults);
          toast.success("Found some games!");
        } else {
          toast.error("No games found.");
          setSearchResults([]);
        }

      } else {
       
        const response = await fetch(`https://api.jikan.moe/v4/manga?q=${formData.title}&limit=5`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const formattedResults = data.data.map(manga => ({
              id: manga.mal_id,
              title: manga.title_english || manga.title,
              image: manga.images.jpg.large_image_url, 
              type: manga.type,
              chapters: manga.chapters || ""
          }));
          setSearchResults(formattedResults);
          toast.success("Found some results!");
        } else {
          toast.error("No results found.");
          setSearchResults([]);
        }
      }
    } catch (error) {
      toast.error("Failed to connect to the API.");
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (item) => {
    setFormData({
      ...formData,
      title: item.title, 
      total_progress: item.chapters, 
      image_url: item.image 
    });
    setSearchResults([]); 
    toast.success("Form auto-filled!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("access_token");

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(formData), 
    });

    if (response.ok) {
        toast.success("Successfully added to your tracker!"); 
        router.push("/");
        router.refresh(); 
    } else if (response.status === 401) {
        toast.error("Please log in again.");
        router.push("/login");
    } else {
        toast.error("Something went wrong!"); 
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Add New Media</h1>
      
      <div className="flex flex-col gap-4 max-w-md">
        
        
        <select name="category" value={formData.category} onChange={handleChange} className="p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500">
          <option value="Manga">Manga</option>
          <option value="Manhwa">Manhwa</option>
          <option value="Game">Game</option>
        </select>

        <div className="flex gap-2">
          <input 
            type="text" name="title" placeholder="Title..." 
            value={formData.title} onChange={handleChange} required
            className="p-3 bg-gray-800 rounded border border-gray-700 w-full focus:outline-none focus:border-blue-500"
          />
          <button 
            type="button" 
            onClick={handleSearchAPI}
            disabled={isSearching}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded font-bold transition-colors whitespace-nowrap"
          >
            {isSearching ? "..." : "Search API"}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded p-2 flex flex-col gap-2 max-h-60 overflow-y-auto z-10">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Select the correct match:</p>
            {searchResults.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                onClick={() => selectSearchResult(item)}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors"
              >
                <img src={item.image} alt="cover" className="w-10 h-14 object-cover rounded" />
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.type} {item.chapters && `• ${item.chapters} Chapters`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select name="status" value={formData.status} onChange={handleChange} className="p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500">
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On-Hold">On-Hold</option>
          </select>

          <div className="flex gap-4">
            <div className="w-full">
               <label className="text-xs text-gray-400 font-bold mb-1 block">Current Progress</label>
               <input 
                 type="number" name="current_progress" placeholder="Current" 
                 value={formData.current_progress} onChange={handleChange} required
                 className="p-3 bg-gray-800 rounded border border-gray-700 w-full focus:outline-none focus:border-blue-500"
               />
            </div>
            <div className="w-full">
               <label className="text-xs text-gray-400 font-bold mb-1 block">Total (Auto-filled)</label>
               <input 
                 type="number" name="total_progress" placeholder="Total" 
                 value={formData.total_progress} onChange={handleChange}
                 className="p-3 bg-gray-800 rounded border border-gray-700 w-full focus:outline-none focus:border-blue-500"
               />
            </div>
          </div>
          
         
          {formData.image_url && (
              <div className="mt-2 rounded border border-gray-700 overflow-hidden relative h-40">
                  <img src={formData.image_url} className="w-full h-full object-cover opacity-80" alt="Preview"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
          )}

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Save to Database
          </button>
        </form>
      </div>
    </main>
  );
}