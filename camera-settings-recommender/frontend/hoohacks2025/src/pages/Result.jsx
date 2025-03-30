import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function Result() {
    const { filename } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/results/${filename}`);
                
                // Set image URL
                setImageUrl(response.data.imageUrl);
                
                // Set result JSON directly from response
                setResultData(JSON.parse(response.data.resultJson)); // Parse the JSON string
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading results:', error);
                setIsLoading(false);
            }
        };
        fetchResults();
    }, [filename]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar darkMode={true} />
            
            <div className="flex-grow container mx-auto p-8">
                <h2 className="text-3xl mb-8 text-center">Processing Results</h2>
                
                {isLoading ? (
                    <div className="text-center text-gray-400">
                        <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full mb-4"></div>
                        <p>Loading results...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl mb-4">Original Image</h3>
                            {imageUrl ? (
                                <img src={imageUrl} alt="Original" className="rounded-lg w-full" />
                            ) : (
                                <p className="text-gray-400">Image not available</p>
                            )}
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl mb-4">Analysis Results</h3>
                            {resultData ? (
                                <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded">
                                    {JSON.stringify(resultData, null, 2)}
                                </pre>
                            ) : (
                                <p className="text-gray-400">No results available</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Footer darkMode={true} />
        </div>
    );
}

export default Result;