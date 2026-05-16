"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const response = await fetch("https://media-tracker-api-os56.onrender.com/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), 
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        
        toast.success("Successfully logged in!"); 
        router.push("/");
    } 
    else {
      toast.error("Invalid username or password!"); 
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-10 bg-gray-950 text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">Welcome Back</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input 
            type="text" name="username" placeholder="Username" 
            value={credentials.username} onChange={handleChange} required
            className="p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input 
            type="password" name="password" placeholder="Password" 
            value={credentials.password} onChange={handleChange} required
            className="p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4 transition-colors">
            Log In
          </button>

        </form>
      </div>
    </main>
  );
}