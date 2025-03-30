import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function AIResultsPage() {
    const location = useLocation();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (location.state?.response) {
            setResponse(location.state.response);
            setIsLoading(false);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar darkMode={true} />
            
            <div className="flex-grow container mx-auto p-8 max-w-3xl">
                <h2 className="text-3xl mb-8 text-center">Recommended Settings</h2>
                
                {isLoading ? (
                    <div className="text-center text-gray-400">
                        <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent rounded-full mb-4"></div>
                        <p>Generating recommendations...</p>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                        <div className="prose prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap">{response}</pre>
                        </div>
                    </div>
                )}
            </div>

            <Footer darkMode={true} />
        </div>
    );
}

export default AIResultsPage;