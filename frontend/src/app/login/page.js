"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("https://media-tracker-api-os56.onrender.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("access_token", data.access);
        
        router.push("/");
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) {
      setError("Something went wrong connecting to the server.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>

        
        <p className="text-slate-400 text-sm text-center mb-6">
          To test full CRUD functionality, log in with Demo Account <br/>
          Username: <strong className="text-white">akmal_live</strong> | Password: <strong className="text-white">Tracker2026!</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-slate-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold p-3 rounded hover:bg-blue-500 transition-colors"
          >
            Log In
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 text-red-200 border border-red-700 rounded text-center">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}