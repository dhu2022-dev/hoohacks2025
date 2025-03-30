import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';
import heroImage from '../assets/hero_image.jpg';
import section1Image from '../assets/section1_image.jpg';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar darkMode={true} />

      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Left Section - Upload Section */}
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gray-800 p-4">
            <h1 className="text-4xl font-light mb-4 text-center text-white">
              Extract Settings from a Photo
            </h1>
            <p className="text-white mb-2 text-center">
              Upload a photo to get instant Lightroom settings that will recreate the look and feel of your image.
            </p>
            <div className="image-container mb-5 mt-1 p-4 bg-gray-900 rounded-xl">
              <img
                src={section1Image}
                alt="Upload Preview"
                className="img-fluid rounded-lg shadow-xl"
                style={{ 
                  maxWidth: '400px',
                  border: '1px solid #374151'
                }}
              />
            </div>
            <Link to="/upload" className="text-decoration-none">
              <Button 
                variant="dark" 
                className="rounded-pill px-5 py-3 border border-gray-600 hover:border-gray-400 transition-all"
              >
                Upload Photo
              </Button>
            </Link>
          </div>

          {/* Right Section - AI Prompt Feature */}
          <div className="col-md-6 d-flex align-items-center justify-content-center min-vh-100 bg-gray-800 p-4">
            <div className="feature-card bg-gray-900 rounded-xl p-6 w-100 max-w-2xl">
              <div className="text-center mb-5">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  AI-Powered Settings Generator
                </h2>
                <p className="text-white text-lg">
                  Describe your vision and get instant Lightroom presets
                </p>
              </div>

              <div className="mockup-interface bg-black rounded-lg p-4 mb-6">
                <div className="prompt-example mb-4">
                  <div className="flex items-center gap-2 mb-2 text-white">
                    <span className="text-sm">Example Prompt:</span>
                  </div>
                  <div className="bg-gray-700 rounded px-4 py-3 text-white">
                    "I want settings for a Studio Ghibli-style animation look with soft pastels and dreamy highlights"
                  </div>
                </div>

                <div className="response-mockup animate-pulse">
                  <div className="flex items-center gap-2 mb-2 text-white">
                    <span className="text-sm">Generated Settings:</span>
                  </div>
                  <div className="bg-white rounded px-4 py-3 space-y-2">
                    <div className="h-4 text-black">Aperture: f/11</div>
                    <div className="h-4 text-black">Shutter Speed: 1/800</div>
                    <div className="h-4 text-black">ISO 140</div>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline-light" 
                className="w-full rounded-pill py-3 hover:bg-gray-800 transition-all"
              >
                Try AI Generator
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer darkMode={true} />
    </div>
  );
}

export default Home;