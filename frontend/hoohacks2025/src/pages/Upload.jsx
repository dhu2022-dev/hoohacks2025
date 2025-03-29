import { useState } from 'react';
import Button from '../components/common/Button';

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // TODO: Call API to upload image to backend here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-light mb-6">Upload Your Image</h2>

      {/* Image Upload Placeholder */}
      <div className="w-full max-w-md">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.9 5.5 5.5 0 10-9.9 5.1A4 4 0 003 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12v4m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload</p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {selectedImage && (
        <Button
          text="Process Image"
          className="mt-4 bg-black text-white hover:bg-gray-800"
          onClick={() => {
            // TODO: Send image to backend and navigate to /result
            console.log('Processing image...');
            // const navigate = useNavigate();

            // const handleUpload = async () => {
            // const result = await uploadImage(selectedImage);
            // navigate('/result', { state: { result } });
            // };
          }}
        />
      )}
    </div>
  );
}

export default Upload;