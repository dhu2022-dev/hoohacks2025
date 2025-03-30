import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function Result() {
    const { filename } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setImageUrl(`http://localhost:8080/api/images/${filename}`);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        fetchImage();
    }, [filename]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar darkMode={true} />
            
            <div className="flex-grow container mx-auto p-8">
                <h2 className="text-3xl mb-8 text-center">Processing Results</h2>
                
                {isLoading ? (
                    <div className="text-center text-gray-400">
                        <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full mb-4"></div>
                        <p>Analyzing your image...</p>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-xl mb-4">Original Image</h3>
                        <img 
                            src={imageUrl} 
                            alt="Uploaded preview" 
                            className="rounded-lg shadow-xl border border-gray-700"
                        />
                    </div>
                )}
            </div>

            <Footer darkMode={true} />
        </div>
    );
}

export default Result;