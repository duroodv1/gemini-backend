export default async function handler(req, res) {

  const { question } = req.body;

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
            text: question
          }]
        }]
      })
    }
  );

  const data = await response.json();

  const answer =
  data?.candidates?.[0]?.content?.parts?.[0]?.text
  || "Tiada jawapan";

  res.status(200).json({
    title: "CIKGU AI",
    explanation: answer,
    steps: [],
    examples: [],
    quiz: []
  });

}
