import React, { useState } from 'react';
import { useIotaClient } from '@iota/dapp-kit';

function App() {
  const [image, setImage] = useState(null);
  const [verificationData, setVerificationData] = useState('');
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(1);
  const [objectId, setObjectId] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  const { client } = useIotaClient();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setStep(2);
    }
  };

  const handleDataChange = (e) => {
    setVerificationData(e.target.value);
  };

  const handleObjectIdChange = (e) => {
    setObjectId(e.target.value);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // Placeholder for verification logic
    setResult('Verification in progress...');
    setTimeout(() => {
      setResult('✔️ Verification result will appear here.');
    }, 1000);
  };

  const handleQueryObject = async () => {
    if (!objectId.trim() || !client) return;
    
    try {
      setQueryResult('Querying...');
      const object = await client.getObject(objectId);
      setQueryResult(JSON.stringify(object, null, 2));
    } catch (error) {
      setQueryResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-2 relative bg-gradient-to-b from-[#181c2e] via-[#23284a] to-[#23284a] overflow-hidden">
      {/* Floating dots for background polish */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-purple-500 opacity-30 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-400 opacity-20 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 opacity-20 rounded-full animate-pulse" />
      <div className="absolute bottom-10 left-1/3 w-2.5 h-2.5 bg-purple-300 opacity-20 rounded-full animate-pulse" />
      <div className="w-full max-w-md bg-[#23284a] rounded-2xl shadow-2xl p-8 font-sans relative z-10 border border-[#2e335a]">
        <img src="/ic_launcher_round.png" alt="YumeProof Logo" className="mx-auto mb-4 w-24 h-24 rounded-full shadow-lg" />
        <h1 className="text-2xl font-bold mb-2 text-center text-white">YumeProof Web Verifier</h1>
        <p className="text-gray-300 text-center mb-8">Verify the authenticity of an image using YumeProof notarization data.</p>
        
        {/* IOTA Object Query Section */}
        <div className="mb-8 p-4 bg-[#1a1f3a] rounded-lg border border-[#393e6a]">
          <h2 className="text-lg font-semibold mb-3 text-white">Query IOTA Testnet Object</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={objectId}
              onChange={handleObjectIdChange}
              placeholder="Enter Object ID..."
              className="flex-1 px-3 py-2 border border-[#393e6a] rounded-lg bg-[#23284a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <button
              onClick={handleQueryObject}
              disabled={!objectId.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Query
            </button>
          </div>
          {queryResult && (
            <div className="mt-3 p-3 bg-[#23284a] rounded-lg border border-[#393e6a]">
              <pre className="text-xs text-gray-300 overflow-auto max-h-32">{queryResult}</pre>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className={step >= 1 ? "opacity-100" : "opacity-60"}>
            <label htmlFor="image-upload" className="block font-semibold mb-2 text-gray-200">1. Upload Image</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full px-3 py-2 border border-[#393e6a] rounded-lg bg-[#23284a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            {image && (
              <div className="mt-2 text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="inline-block max-w-[180px] max-h-[180px] rounded-lg shadow-lg border border-[#393e6a]"
                />
              </div>
            )}
          </div>
          <div className={step >= 2 ? "opacity-100" : "opacity-60"}>
            <label htmlFor="verification-data" className="block font-semibold mb-2 text-gray-200">2. Paste Verification Data</label>
            <textarea
              id="verification-data"
              value={verificationData}
              onChange={handleDataChange}
              placeholder="Paste notarization data (JSON or text) here..."
              className="block w-full px-3 py-2 border border-[#393e6a] rounded-lg bg-[#23284a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              rows={6}
              disabled={!image}
            />
          </div>
          <div className={step >= 2 ? "opacity-100" : "opacity-60"}>
            <button
              className="w-full py-3 rounded-lg font-semibold text-lg mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:from-purple-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={handleVerify}
              disabled={!image || !verificationData}
            >
              Verify
            </button>
          </div>
          <div className="mt-4 text-center">
            {result && (
              <div className="inline-block bg-[#23284a] text-purple-200 rounded-lg px-6 py-4 text-base shadow-sm mt-2 border border-[#393e6a]">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
