"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; 

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    
    const token = localStorage.getItem("access_token");

    const response = await fetch(`/api/media/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    });

    if (response.ok) {
      toast.success("Item successfully deleted!"); 
      router.refresh();
    } else {
      toast.error("Failed to delete the item. Are you logged in?"); 
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="text-red-500 hover:text-red-400 text-sm font-bold ml-4 border border-red-900 px-2 py-1 rounded transition-colors"
    >
      Delete
    </button>
  );
}