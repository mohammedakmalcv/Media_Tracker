"use client"; 

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";


export default function MediaList({ initialItems }) {
  
  const [searchQuery, setSearchQuery] = useState("");

  
  const filteredItems = initialItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title (e.g., Jujutsu Kaisen)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredItems.map((item) => (
          <div key={item.id}className="border border-gray-800 rounded-xl p-5 bg-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 hover:border-gray-600">
            
            <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
              {item.category}
            </p>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                  ${item.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                  {item.status}
                </span>

                <Link 
                  href={`/edit/${item.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-bold ml-2 border border-blue-900 px-2 py-1 rounded"
                >
                  Edit
                </Link>

                <DeleteButton id={item.id} /> 
              </div>
              
              <span className="text-gray-300 font-mono text-sm">
                Progress: {item.current_progress} {item.total_progress ? `/ ${item.total_progress}` : ''}
              </span>
            </div>
            
          </div>
        ))}
        
        
        {filteredItems.length === 0 && (
          <p className="text-gray-500 mt-4">No media found matching your search.</p>
        )}
      </div>
    </div>
  );
}