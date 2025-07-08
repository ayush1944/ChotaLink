import React, { useState } from 'react'
import { createCustomShortUrl, createShortUrl } from '../../api/createShortUrl';
import { useSelector } from 'react-redux';

function Form() {
    const [originalUrl, setOriginalUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [customSlug, setCustomSlug] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  

        const handleSubmit = async (event) => {
        event.preventDefault();
        if(isAuthenticated){
        const data = await createCustomShortUrl(originalUrl, customSlug);
        setShortUrl(data);
        setCopied(false); // Reset copied state when new URL is generated
        }
        else{
            const data = await createShortUrl(originalUrl);
            setShortUrl(data);
            setCopied(false); // Reset copied state when new URL is generated
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl.data);
            setCopied(true);
            // Reset the copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shortUrl.data;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (fallbackError) {
                console.error("Fallback copy failed:", fallbackError);
            }
            document.body.removeChild(textArea);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}
          className="space-y-4">
          <input
            type="url"
            placeholder="Enter your long URL..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
            {isAuthenticated && (
              <input
                type="text"
                placeholder="Custom slug (optional)"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              />
            )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium"
          >
            Generate Chota Link
          </button>
        </form>
        
        {/* Custom slug input, only visible if user is authenticated */}

        {shortUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="text-sm text-gray-600 mb-2">Your shortened URL:</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shortUrl.data}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <a href={shortUrl.data} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
                Click to test your short URL
              </a>
            </div>
          </div>
        )}
    </div>
  )
}

export default Form