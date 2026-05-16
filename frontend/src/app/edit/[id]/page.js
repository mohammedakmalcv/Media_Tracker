"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMedia() {
  const router = useRouter();
  const params = useParams(); 
  const id = params.id;

  const [formData, setFormData] = useState({
    title: "",
    category: "Manga",
    status: "Active",
    current_progress: 0,
    total_progress: "",
  });

  
  useEffect(() => {
    if (!id) return;
    
    const fetchItem = async () => {
      const response = await fetch(`https://media-tracker-api-os56.onrender.com`);
      if (response.ok) {
        const data = await response.json();
        
        if (data.total_progress === null) data.total_progress = ""; 
        setFormData(data);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const response = await fetch(`/api/media/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Failed to update item.");
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Edit Media</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        
        <input 
          type="text" name="title" placeholder="Title" 
          value={formData.title} onChange={handleChange} required
          className="p-3 bg-gray-800 rounded border border-gray-700"
        />

        <select name="category" value={formData.category} onChange={handleChange} className="p-3 bg-gray-800 rounded border border-gray-700">
          <option value="Manga">Manga</option>
          <option value="Manhwa">Manhwa</option>
          <option value="Game">Game</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange} className="p-3 bg-gray-800 rounded border border-gray-700">
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On-Hold">On-Hold</option>
        </select>

        <div className="flex gap-4">
          <input 
            type="number" name="current_progress" placeholder="Current Progress" 
            value={formData.current_progress} onChange={handleChange} required
            className="p-3 bg-gray-800 rounded border border-gray-700 w-full"
          />
          <input 
            type="number" name="total_progress" placeholder="Total (Optional)" 
            value={formData.total_progress} onChange={handleChange}
            className="p-3 bg-gray-800 rounded border border-gray-700 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4">
          Update Database
        </button>

      </form>
    </main>
  );
}