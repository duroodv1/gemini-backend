import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    providers: {
      gemini: {
        configured: !!process.env.GEMINI_API_KEY
      }
    }
  });
});

app.post("/api/test", (req, res) => {
  res.json({
    success: true
  });
});

app.post("/api/teach", async (req, res) => {
  try {
    const { question, subject, topic, level } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
Anda ialah CIKGU AI JUNIOR PPKI.

Subjek: ${subject || ""}
Topik: ${topic || ""}
Tahap: ${level || 1}

Soalan:
${question}
`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const jawapan =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, tiada jawapan.";

    res.json({
      title: "CIKGU AI",
      explanation: jawapan,
      steps: [],
      examples: [],
      quiz: []
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
