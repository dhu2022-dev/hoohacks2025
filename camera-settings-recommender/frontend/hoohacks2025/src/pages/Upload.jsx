import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadPage() {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.raw']
    },
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Navigate using imageFilename from the response
      navigate(`/result/${response.data.imageFilename}`);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Navbar darkMode={true} />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-light mb-8">Enhance Your Photos</h1>
          
          <div 
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 mb-6 transition-all cursor-pointer
              ${isDragActive ? 'border-blue-500 bg-gray-800' : 'border-gray-600 hover:border-gray-400'}`}
          >
            <input {...getInputProps()} />
            
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-96 w-full object-contain rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <svg 
                  className="w-16 h-16 mx-auto text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-xl text-gray-300">
                  {isDragActive ? 'Drop files here' : 'Drag & drop photos, or click to select'}
                </p>
                <p className="text-gray-500">Supported formats: JPG, PNG, RAW</p>
              </div>
            )}
          </div>

          {preview && (
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant="success" 
                size="lg" 
                className="rounded-pill px-5 py-2"
                onClick={handleSubmit}
                disabled={isUploading}
              >
                {isUploading ? 'Processing...' : 'Analyze Image'}
              </Button>
              
              <Button 
                variant="outline-danger" 
                size="lg" 
                className="rounded-pill px-5 py-2"
                onClick={() => {
                  setPreview(null);
                  setSelectedFile(null);
                }}
                disabled={isUploading}
              >
                Clear
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline-light" 
              size="lg" 
              className="rounded-pill px-5 py-2"
              as={Link}
              to="/"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <Footer darkMode={true} />
    </div>
  );
}

export default UploadPage;