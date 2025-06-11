import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRepurpose = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post('http://localhost:5000/api/repurpose', { content });
      setResult(response.data.repurposed);
    } catch (error) {
      setResult('❌ Error: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00040c] via-[#0a0f1c] to-[#3a0b59]
 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1e1e2f]/60 to-[#2a003f]/60 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl
 p-8 w-full max-w-3xl ">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          🚀 Content Repurposing Engine
        </h1>

        <textarea
          rows={8}
          className="w-full p-4 rounded-lg text-base text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
          placeholder="Paste your text content here (not just a link)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleRepurpose}
          disabled={loading || !content.trim()}
          className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
            loading || !content.trim()
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-white text-purple-700 hover:bg-purple-100'
          }`}
        >
          {loading ? 'Repurposing...' : 'Repurpose Content'}
        </button>

        {result && (
          <pre className="whitespace-pre-wrap bg-white text-gray-800 p-6 mt-6 rounded-lg max-h-[400px] overflow-auto text-base">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
