const OpenAiService = require("../services/OpenAiService");
const aiService = new OpenAiService();

exports.getDiseaseDetails = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms are required" });
    }

    const result = await aiService.getDiseasePrediction(symptoms);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
