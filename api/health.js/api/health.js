export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    providers: {
      gemini: {
        configured: !!process.env.GEMINI_API_KEY
      }
    }
  });
}
