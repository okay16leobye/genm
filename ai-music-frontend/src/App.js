import React, { useState } from "react";
import { Sparkles, Music, XCircle} from "lucide-react";

const LyricsGenerator = () => {
  const [summary, setSummary] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [style, setStyle] = useState("");
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState("");
  const [structure, setStructure] = useState("");
  const [length, setLength] = useState("");

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const generateSummary = async () => {
    setIsGenerated(true);
    setSummary("Generating lyrics...");

    try {
      const response = await fetch("http://127.0.0.1:5000/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          music_style: style || "pop",
          theme: theme || "love",
          length: parseInt(length) || 350,
          emotion: tone || "happy",
          structure: structure || "verse-chorus-verse",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.lyrics);
      } else {
        setSummary("Error generating lyrics. Please try again.");
      }
    } catch (error) {
      setSummary("Failed to connect to the server.");
    }
  };

  const clearLyrics = () => {
    setSummary("");
    setIsGenerated(false);
    setStyle("");
    setTheme("");
    setTone("");
    setStructure("");
    setLength("");
  };


  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 mt-28 pb-20">
      <div className="flex flex-col justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-bold text-gray-800 font-cartoon">AI Lyrics Generator</h1>
          <Music size={40} className="text-gray-800" />
        </div>
        <h3 className="text-1xl font-bold text-gray-400 mt-4">Create your customized lyrics!</h3>
      </div>
      
      <div className="relative">
        <div className="flex justify-between gap-8">
          {/* 左侧输入区域 */}
          <div className={`transition-all duration-1000 ease-in-out ${
            isGenerated ? 'w-1/2' : 'w-3/5 mx-auto'
          }`}>
            <div className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Style</h2>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="e.g. Pop, Rock, Country, Hip-Hop, Jazz, R&B"
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Theme</h2>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g. Love, Friendship, Journey, Heartbreak, Success"
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Emotional Tone</h2>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="e.g. Happy, Sad, Hopeful, Angry, Nostalgic, Upbeat"
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Structure</h2>
              <input
                type="text"
                value={structure}
                onChange={(e) => setStructure(e.target.value)}
                placeholder="e.g. Verse-Chorus-Verse, AABA, Includes Bridge"
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Length</h2>
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g. Around 200 words"
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>
          </div>

          {/* 右侧生成区域 */}
          <div className={`w-3/5 transition-all duration-1000 ease-in-out ${
            isGenerated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden'
          }`}>
            <div className="relative">
              <h2 className="text-md font-bold text-gray-700 mb-2 font-sora">Modify your lyrics:</h2>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-4 font-bold bg-gray-50 border border-gray-200 rounded-lg text-gray-500 min-h-[470px] resize-y"
              />
              <div className="absolute right-3 bottom-3 text-sm text-gray-400">
                {getWordCount(summary)} words
              </div>
            </div>
          </div>
        </div>

        {/* 按钮区域 */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={generateSummary}
            className="flex flex-row justify-center items-center px-8 py-3 bg-[#1DB954] text-white font-large rounded-lg transition-colors hover:bg-[#1ed760] font-sora"
          >  
            Generate Lyrics
            <Sparkles className="w-5 h-5 ml-2" />
          </button>

          {/* 清空按钮 */}
          {isGenerated && (
            <button
              onClick={clearLyrics}
              className="flex flex-row justify-center items-center px-6 py-3 bg-gray-300 text-gray-800 font-large rounded-lg transition-colors hover:bg-gray-400 font-sora"
            >  
              Clear
              <XCircle className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsGenerator;