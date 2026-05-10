export default function Loading() {
  return (
    <main className="min-h-screen p-10 bg-gray-950 text-white">
      <div className="flex justify-between items-center mb-8">
        
        <div className="h-10 w-64 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-12 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>

      <div className="mb-8">
       
        <div className="h-14 w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl animate-pulse"></div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-gray-800 rounded-xl p-5 bg-gray-900 shadow-lg h-48 animate-pulse">
            <div className="h-8 w-3/4 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 w-1/4 bg-gray-800 rounded mb-8"></div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
              <div className="flex gap-3">
                <div className="h-6 w-20 bg-gray-800 rounded-full"></div>
                <div className="h-6 w-12 bg-gray-800 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}