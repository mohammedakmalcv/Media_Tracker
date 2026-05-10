"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; 

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const response = await fetch(`http://127.0.0.1:8000/api/media/${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Item successfully deleted!"); 
      router.refresh();
    } else {
      toast.error("Failed to delete the item."); 
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