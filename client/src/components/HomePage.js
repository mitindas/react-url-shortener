import React, { useState} from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import axios from 'axios';


const HomePage = () => {
	const APP_URL = 'https://u-l.onrender.com/';
	const [longUrl, setlongUrl] = useState('');
	const [shortUrl, setshortUrl] = useState('');
	const handleSubmit = async () => {
	if (longUrl.trim() === '') return;
	try {
		const response = await axios.post(APP_URL, {longUrl});
		setshortUrl(response.data);
		console.log(response.data);
	} catch (error) {
		console.error("Error adding task", error);
	}};

	return (
	<div className="min-h-screen bg-gray-50 flex flex-col">
  {/* Hero Section */}
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
        Shorten URLs
        <span className="text-blue-600 block font-medium">Effortlessly</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-normal">
        Transform long URLs into simple, shareable links in seconds.
      </p>
    </div>

    {/* URL Shortener Form - Material Design Card */}
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-8">
      <div className="space-y-6">
        {/* Material Design Text Field */}
        <div className="relative">
          <input
            type="url"
            id="longUrl"
            value={longUrl}
            onInput={(e) => setlongUrl(e.target.value)}
            placeholder=" "
            className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-t-md focus:border-blue-600 focus:border-b-2 focus:outline-none transition-all text-base peer bg-transparent"
          />
          <label
            htmlFor="longUrl"
            className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-200 transform origin-left peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-blue-600"
          >
            Enter your URL
          </label>
          <div className="h-px bg-gray-300"></div>
        </div>

        {/* Material Design Button */}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-150 text-sm font-medium uppercase tracking-wide shadow-md hover:shadow-lg"
        >
          Shorten URL
        </button>
      </div>

      {/* Result Card - Material Design */}
      {shortUrl && (
        <div className="mt-6 p-0 bg-transparent">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-md">
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Your shortened URL:</p>
                  <div className="relative">
                    <input
                      id="shortUrl"
                      placeholder="https://example.com/short-url..."
                      type="text"
                      readOnly
                      value={shortUrl}
                      className="text-base font-mono text-blue-600 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800 transition-colors duration-150 shadow-md hover:shadow-lg"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 focus:bg-gray-700 focus:outline-none active:bg-gray-800 transition-colors duration-150 shadow-md hover:shadow-lg"
                    title="Open in new tab"
                    onClick={() => window.open(shortUrl, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>)}
    </div>
  </main>

  {/* Material Design Footer */}
  <footer className="bg-white border-t border-gray-200 py-4">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-gray-600">
        Made with React by{' '}
        <a
          href="https://github.com/mitindas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150 hover:underline"
        >
          Mitin
        </a>
      </p>
    </div>
  </footer>
</div>


  )
};

export default HomePage
