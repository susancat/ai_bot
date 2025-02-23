"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");

  const handleRequest = async (mode: string) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, mode }),
    });
    const data = await res.json();

    if (mode === "text") setResponse(data.response);
    if (mode === "image") setImage(data.imageUrl);
    if (mode === "speech") setAudio(data.audioUrl);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
        placeholder="輸入你的問題..."
      />
      <div className="mt-4 flex space-x-2">
        <button onClick={() => handleRequest("text")} className="btn">
          生成文本
        </button>
        <button onClick={() => handleRequest("image")} className="btn">
          生成圖片
        </button>
        <button onClick={() => handleRequest("speech")} className="btn">
          讀出文字
        </button>
      </div>
      {response && <p className="mt-4">{response}</p>}
      {image && <img src={image} alt="AI 生成圖片" className="mt-4 w-64" />}
      {audio && (
        <audio controls className="mt-4">
          <source src={audio} type="audio/wav" />
          您的瀏覽器不支援音頻播放
        </audio>
      )}
    </div>
  );
}
