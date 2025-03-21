const express = require("express");
const { OpenAI } = require("openai");
const LRU = require("lru-cache"); // 🛑 Import LRU cache for caching
const { PredefinedStructure, PresetAppliances } = require("../utilities/constants");
const DefaultHomeLayout = require("../utilities/DefaultHomeLayout.json");

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Configure Cache (24-hour TTL)
const cache = new LRU({
  max: 100, // Store up to 100 cached layouts
  //   ttl: 1000 * 60 * 60 * 24, // Cache expiry: 24 hours
});

/**
 * 📌 GPT-4 Direct API Call with Caching
 */
const fetchLayoutUsingGPT = async (prompt, cacheKey) => {
  if (cache.has(cacheKey)) {
    console.info("✅ Returning cached GPT-4 response...");
    return cache.get(cacheKey);
  }

  try {
    console.info("🚀 Fetching home layout using direct GPT API...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.5,
      response_format: "json_object",
    });

    const parsedResponse = response.choices[0]?.message?.content?.trim();
    if (!parsedResponse) throw new Error("Empty response from OpenAI");

    const layoutData = JSON.parse(parsedResponse);

    cache.set(cacheKey, layoutData); // ✅ Store in cache
    return layoutData;
  } catch (error) {
    console.info("❌ GPT API Error:", error);
    return DefaultHomeLayout;
  }
};

/**
 * 📌 OpenAI Assistant API Call with Caching
 */
const fetchLayoutUsingAssistant = async (prompt, cacheKey) => {
  if (cache.has(cacheKey)) {
    console.info("✅ Returning cached Assistant response...");
    return cache.get(cacheKey);
  }

  try {
    console.info("🚀 Creating a new assistant thread...");

    const thread = await openai.beta.threads.create();
    const threadId = thread.id;

    await openai.beta.threads.messages.create(threadId, { role: "user", content: prompt });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });

    console.info(`🔄 Running assistant... Run ID: ${run.id}`);

    let runStatus = run.status;
    let attempts = 0;

    while (runStatus !== "completed" && attempts < 20) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const runStatusResponse = await openai.beta.threads.runs.retrieve(threadId, run.id);
      runStatus = runStatusResponse.status;
      console.info(`⏳ Attempt ${attempts + 1}: Run Status - ${runStatus}`);
      attempts++;
    }

    if (runStatus !== "completed") throw new Error("Assistant run did not complete in time.");

    console.info("✅ Run completed. Retrieving messages...");

    const messages = await openai.beta.threads.messages.list(threadId);
    const lastMessage = messages.data[0]?.content?.[0]?.text?.value;

    if (!lastMessage) throw new Error("Empty response from OpenAI Assistant");

    const jsonMatch = lastMessage.match(/\{.*\}/s);
    if (jsonMatch) {
      const layoutData = JSON.parse(jsonMatch[0]);
      cache.set(cacheKey, layoutData); // ✅ Store in cache
      return layoutData;
    }

    throw new Error("Invalid JSON response from OpenAI Assistant");
  } catch (error) {
    console.info("❌ OpenAI Assistant Error:", error);
    return DefaultHomeLayout;
  }
};

/**
 * 🎯 API Endpoint to Choose Between GPT or Assistant
 */
router.post("/home-layout-suggestion", async (req, res) => {
  const { dimensions, country, zipCode } = req.body;
  const useAssistant = req.query.useAssistant === "true" || process.env.USE_ASSISTANT === "true";

  if (!dimensions || !country || !zipCode) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // ✅ Create a unique cache key
  const cacheKey = `${dimensions}_${country}_${zipCode}_${useAssistant ? "assistant" : "gpt"}`;

  // ✅ Create prompt dynamically
  const prompt = `
  Given a home layout of premium houses/properties in the neighborhood with:
  - Country: ${country}
  - ZipCode: ${zipCode}
  - Total Area: ${dimensions} square feet,

  Generate a structured JSON response strictly following this predefined structure:
  ${JSON.stringify(PredefinedStructure, null, 2)}

  Ensure that the JSON response follows the format exactly as specified without any deviations, markdown, or additional text.
  The appliances list should be based on the following preset appliances:
  ${JSON.stringify(PresetAppliances, null, 2)}.

  Consider the property dimensions to define the number of rooms and appliances logically.
  `;

  try {
    const layout = useAssistant ? await fetchLayoutUsingAssistant(prompt, cacheKey) : await fetchLayoutUsingGPT(prompt, cacheKey);

    return res.json(layout);
  } catch (error) {
    console.info("❌ Error generating layout:", error);
    res.status(500).json({ error: "Failed to fetch layout suggestions." });
  }
});

module.exports = router;
