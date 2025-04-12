import axios from "axios";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateSummary(bookTitle) {
  const prompt = `Summarize the book titled "${bookTitle}" in 3-5 sentences in simple English.`;

  try {
    // const res = await axios.post(
    //   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    //   {
    //     contents: [
    //       {
    //         parts: [{ text: prompt }],
    //         role: "user",
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-goog-api-key": GEMINI_API_KEY,
    //     },
    //   }
    // );

    // return res.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary found.";
    return "We're saving credits";
  } catch (err) {
    console.error("Gemini summary error:", err);
    return "Failed to generate summary.";
  }
}
