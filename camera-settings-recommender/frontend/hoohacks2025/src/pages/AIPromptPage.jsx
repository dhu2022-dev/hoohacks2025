import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function AIPromptPage() {
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || prompt.split(' ').length > 50) return;

        try {
            setIsProcessing(true);
            const response = await axios.post('http://localhost:8080/api/ai/generate', {
                prompt: prompt
            });
            navigate('/ai-results', { state: { response: response.data } });
        } catch (error) {
            console.error('AI request failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar darkMode={true} />
            
            <div className="flex-grow container mx-auto p-8 max-w-3xl">
                <h2 className="text-3xl mb-8 text-center">Describe Your Vision</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <textarea
                            className="w-full bg-gray-800 rounded-lg p-4 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            rows="6"
                            placeholder="Example: I want settings for a vintage film look with faded colors, soft contrast, and subtle grain. The image should have warm tones and slightly blown-out highlights..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            maxLength={300}
                        />
                        <div className="text-right text-sm text-gray-500 mt-2">
                            {prompt.length}/300 characters
                        </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="primary"
                            type="submit"
                            className="rounded-pill px-6 py-3"
                            disabled={isProcessing || !prompt.trim()}
                        >
                            {isProcessing ? 'Generating...' : 'Generate Settings'}
                        </Button>
                    </div>
                </form>
            </div>

            <Footer darkMode={true} />
        </div>
    );
}

export default AIPromptPage;