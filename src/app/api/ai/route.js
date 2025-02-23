import { NextRequest, NextResponse } from "next/server";
import { Ollama } from "langchain/llms/ollama";
import { FaissStore } from "langchain/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { spawn } from "child_process";

// 設定 Ollama LLM
const llm = new Ollama({
  model: "mistral", // 使用 Mistral 模型
  baseUrl: "http://localhost:11434", // Ollama 預設運行地址
});

// 設定 FAISS RAG
const vectorStore = await FaissStore.fromDocuments(
  new TextLoader("data/knowledge.txt"), // 假設你有知識庫
  new OpenAIEmbeddings()
);

// 文字轉語音 (Coqui TTS)
const generateSpeech = async (text: string) => {
  return new Promise((resolve, reject) => {
    const process = spawn("tts", [
      "--text",
      text,
      "--out_path",
      "public/output.wav",
    ]);

    process.on("close", (code) => {
      if (code === 0) resolve("output.wav");
      else reject(new Error("TTS conversion failed"));
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { query, mode } = await req.json();

    if (mode === "text") {
      const response = await llm.call(query);
      return NextResponse.json({ response });
    } else if (mode === "image") {
      return NextResponse.json({
        imageUrl: `https://api.dalle.com/generate?prompt=${encodeURIComponent(
          query
        )}`,
      });
    } else if (mode === "speech") {
      await generateSpeech(query);
      return NextResponse.json({ audioUrl: "/output.wav" });
    } else {
      return NextResponse.json({ error: "Invalid mode" });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
