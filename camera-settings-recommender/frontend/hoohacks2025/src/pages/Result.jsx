import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function Result() {
  // UseLocation to get data passed from Upload page (e.g., processed image URL)
  const location = useLocation();
  const { result } = location.state || { result: null }; // Fallback if no state

  // Placeholder image URLs (replace with actual data from backend)
  const originalImage = 'https://via.placeholder.com/400x300?text=Original';
  const processedImage = result?.processedUrl || 'https://via.placeholder.com/400x300?text=Processed';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-light text-center mb-6">Processing Result</h2>

        {/* Side-by-Side Images */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
          <div className="flex-1 max-w-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Original</h3>
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="flex-1 max-w-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Processed</h3>
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
        </div>

        {/* Text Box */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Details</h3>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Processing details will appear here (e.g., filters applied, resolution changes)..."
            readOnly
            value={result?.details || 'No details available yet.'}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Result;