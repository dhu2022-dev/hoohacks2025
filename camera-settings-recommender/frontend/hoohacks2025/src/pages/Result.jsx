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
                                <img src={imageUrl} alt="Original" className="rounded-lg w-full max-h-96 object-contain" />
                            ) : (
                                <p className="text-gray-400">Image not available</p>
                            )}
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-xl mb-4">Analysis Results</h3>
                            {resultData.matches.map((match, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg mb-8"> {/* Added mb-8 for space between cards */}
                                    <div className="flex justify-between items-center space-x-4">
                                        <img 
                                            src={`https://shuttersense-bucket.s3.us-east-1.amazonaws.com/dataset/${match.matched_image}`} 
                                            alt="Matched" 
                                            className="rounded-lg w-1/2 max-h-80 object-contain" // Increased image size
                                        />
                                        <div className="bg-gray-600 text-white p-2 rounded-lg text-center w-1/3">
                                            <span className="block text-lg font-semibold">Similarity</span>
                                            <span className="text-xl font-bold">{(match.similarity * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-semibold mt-4">Matched Image: {match.matched_image}</h4>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                        <h5 className="text-lg font-semibold col-span-1">Camera Settings</h5>
                                        <div className="col-span-2 grid grid-cols-2 gap-4">
                                            {Object.entries(match.settings).map(([key, value]) => (
                                                <div key={key} className="bg-gray-600 text-white p-2 rounded-lg text-center">
                                                    <span className="block font-semibold">{key.replace(/_/g, ' ')}</span>
                                                    <span className="text-sm">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </div>

            <Footer darkMode={true} />
        </div>
    );
}

export default Result;
