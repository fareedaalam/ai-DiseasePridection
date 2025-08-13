const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const { fixInvalidJsonString } = require('../utils/jsonFixer');

let appSettings = {};
try {
  const settingsPath = path.join(__dirname, "../appsettings.json");
  if (fs.existsSync(settingsPath)) {
    appSettings = require(settingsPath);
  } else {
    console.warn("⚠️ appsettings.json not found, using default prompt.");
  }
} catch (err) {
  console.warn("⚠️ Failed to load appsettings.json, using default prompt.", err);
}

const apiKey = process.env.API_KEY;

class OpenAiService {
  constructor() {
    this.config = {
      OpenAI: {
        apiKey: apiKey || "",
        defaultPrompt: appSettings.OpenAI.defaultPrompt || "You are a medical assistant. Predict possible diseases based on symptoms.\n Respond only with valid JSON, no extra text."
      }
    };

    if (!this.config.OpenAI.apiKey) {
      throw new Error("❌ Missing OpenAI API key in configuration.");
    }

    this.client = new OpenAI({ apiKey: this.config.OpenAI.apiKey });
  }

  async getDiseasePrediction(userInput) {
    if (!userInput || userInput.length < 3) {
      throw new Error("Input must be at least 3 characters long.");
    }

    //const prompt = `${this.config.OpenAI.defaultPrompt}\nSymptoms: ${userInput}`;
    const prompt=    this.config.OpenAI.defaultPrompt.replace("${input}", userInput);

    //console.log(prompt);

    try {
      const response = await this.client.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250,
        temperature: 0.0
      });

     

    const aiResult = response.choices[0].message.content;

        try {
        const fixedJson = fixInvalidJsonString(aiResult); 
        return fixedJson;      
        } catch (error) {
        console.error(error.message);
        return []
        }

        

    } catch (error) {
      if (error.status === 429) {
        throw new Error("🚫 OpenAI quota exceeded — check your plan and billing at https://platform.openai.com/account/billing");
      }
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }
  
}
function fixAndParseJSON(badJSON) {
  try {
    let clean = badJSON.trim();

    // Ensure it is wrapped in array brackets
    if (!clean.startsWith("[")) {
      clean = `[${clean}]`;
    }

    // Remove any trailing commas before closing brackets
    clean = clean.replace(/,\s*([\]}])/g, "$1");

    // Parse into JS object
    return JSON.parse(clean);
  } catch (err) {
    console.error("JSON parse error:", err.message);
    console.log("Raw response:", jsonString);
    return [];
  }
}

function repairAndParseJSON(badJSON) {
  try {
    let clean = badJSON.trim();

    // Wrap in array if not starting with '['
    if (!clean.startsWith("[")) {
      clean = `[${clean}]`;
    }

    // Remove any trailing commas before object/array close
    clean = clean.replace(/,\s*([\]}])/g, "$1");

    // Count curly braces and add missing ones if needed
    const openBraces = (clean.match(/{/g) || []).length;
    const closeBraces = (clean.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      clean += "}".repeat(openBraces - closeBraces);
    }

    // Count square brackets and add missing ones if needed
    const openBrackets = (clean.match(/\[/g) || []).length;
    const closeBrackets = (clean.match(/]/g) || []).length;
    if (openBrackets > closeBrackets) {
      clean += "]".repeat(openBrackets - closeBrackets);
    }

    // Try parsing
    return JSON.parse(clean);
  } catch (err) {
    console.error("Still failed to parse JSON:", err.message);
    console.log("Cleaned JSON Attempt:\n", badJSON);
    return [];
  }
}


module.exports = OpenAiService;
