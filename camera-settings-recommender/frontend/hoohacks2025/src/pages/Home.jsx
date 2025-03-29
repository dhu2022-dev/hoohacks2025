import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-wide">Photographer’s Studio</h1>
        <p className="mt-2 text-lg font-light">Create, enhance, and showcase your work</p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-6">
        <p className="text-center max-w-md">
          Welcome to your creative hub. Upload an image to enhance it or explore your portfolio.
        </p>

        {/* Feature Buttons */}
        <div className="flex space-x-4">
          <Link to="/upload">
            <Button text="Upload Image" className="bg-black text-white hover:bg-gray-800" />
          </Link>
          <Link to="/portfolio">
            <Button text="View Portfolio" className="bg-transparent border border-black text-black hover:bg-gray-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;