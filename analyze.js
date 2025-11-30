require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- CONFIGURATION ---
const COMPONENT_PATH = './src/UserCard.jsx';
const OUTPUT_PATH = './mock-data.json';

async function generateMockData() {
  try {
    console.log(`📖 Reading component from ${COMPONENT_PATH}...`);
    
    // 1. Read the user's component file
    const componentCode = fs.readFileSync(COMPONENT_PATH, 'utf8');

    // 2. Initialize Gemini (Copy the model name that worked for you in test-ai.js!)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    // 3. Construct the prompt
    // We give the AI the code and strict instructions to return ONLY JSON.
    const prompt = `
      You are a mock data generator for React components.
      Analyze the following React component code and understand its 'props'.
      Generate a realistic JSON object containing data for these props.
      
      Requirements:
      - The data should be realistic (e.g., real-looking names, emails).
      - If there are arrays (like lists), generate 2-3 items.
      - Output ONLY valid JSON. Do not include markdown formatting like \`\`\`json.

      Component Code:
      ${componentCode}
    `;

    console.log("🧠 Analyzing code with AI...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 4. Clean the Output (Remove markdown code blocks if AI adds them)
    // Sometimes AI returns "\`\`\`json { ... } \`\`\`". We strip that out.
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // 5. Save to file
    fs.writeFileSync(OUTPUT_PATH, text);
    console.log(`✅ Success! Mock data saved to: ${OUTPUT_PATH}`);
    console.log("Preview:", text);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

generateMockData();