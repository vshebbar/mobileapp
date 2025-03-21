import { LOG } from "../utilities/logger";
import {
  API_CONSTANTS,
  HOME_LAYOUT_SUGGESTION_EP,
  HUXY_SERVICES_URL,
  OPENAI_API_KEY,
  OPENAI_API_URL,
  OPENAI_ASSISTANT_ID,
  OPENAI_THREAD_URL,
  PredefinedStructure,
  PresetAppliances,
} from "../utilities/urls";
import DefaultHomeLayout from "../../resources/defaults/DefaultHomeLayout.json";

export const fetchLayoutSuggestion = async (dimensions, lat, long) => {
  const prompt = `Given a home layout of premium houses/properties in the neighborhood with latitude: ${lat} & longitude: ${long},
  and a total area of ${dimensions} square feet, generate a structured JSON response strictly following this predefined structure:
  ${JSON.stringify(PredefinedStructure, null, 2)}
  Ensure that the JSON response follows the format exactly as specified without any deviations, markdown, or additional text.
  The appliances list should be based on the following preset appliances:
  ${JSON.stringify(PresetAppliances, null, 2)}.
  Consider the property dimensions to define the number of rooms and appliances logically.`;

  let attempts = 0;
  while (attempts < 3) {
    try {
      LOG.info("Fetching home layout suggestions from OpenAI");
      const response = await fetch(OPENAI_API_URL, {
        method: API_CONSTANTS.POST,
        headers: {
          [API_CONSTANTS.Authorization]: `Bearer ${OPENAI_API_KEY}`,
          [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON,
        },
        body: JSON.stringify({
          model: "gpt-4o", // Using GPT-4o for enhanced response quality
          messages: [{ role: "user", content: prompt }],
          max_tokens: 800,
          temperature: 0.5, // Balanced temperature for accuracy
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data");
      let content = data.choices[0]?.message?.content.trim();

      // Extract JSON block safely
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        content = jsonMatch[1].trim(); // Extract only the JSON part
      }

      // Attempt to parse the JSON response
      try {
        const parsedJSON = JSON.parse(content);
        LOG.info(`Parsed JSON response: ${JSON.stringify(parsedJSON)}`);
        return parsedJSON;
      } catch (error) {
        LOG.error(`Failed to parse OpenAI JSON response with error: ${JSON.stringify(error)}`);
        LOG.debug(`Raw response content: ${content}`);
        throw new Error("Invalid JSON format in API response");
      }
    } catch (error) {
      attempts++;
      if (attempts >= 3) {
        LOG.warn("Returning default home layout due to repeated failures.");
        return DefaultHomeLayout;
      }
      LOG.error(`Attempt: ${attempts}. Failed to fetch suggestions from OpenAI with error: ${JSON.stringify(error)}`);
    }
  }
};

export const fetchLayoutSuggestionUsingAssistant = async (dimensions, lat, lng) => {
  //   const prompt = `
  // You are an AI trained to generate structured JSON responses following the exact format below.

  // **Context:**
  // - Generate a home layout based on **premium houses/properties** in the neighborhood at:
  //   - **Latitude:** ${lat}
  //   - **Longitude:** ${long}
  //   - **Total Area:** ${dimensions} square feet

  // **Instructions:**
  // - Return a **JSON object** strictly following this format:
  //   ${JSON.stringify(PredefinedStructure, null, 2)}
  // - Use only the **preset appliances** when defining rooms:
  //   ${JSON.stringify(PresetAppliances, null, 2)}
  // - Ensure a **logical number of rooms and appliances** based on the total area.
  // - **No markdown, text explanations, or formatting outside of JSON.**
  // - Ensure the response starts with "{" and ends with "}" to form a **valid JSON object**.
  // `;

  const prompt = `
  Given a home layout of premium houses/properties in the neighborhood with:
  - Latitude: ${lat}
  - Longitude: ${lng}
  - Total Area: ${dimensions} square feet,
  
  Generate a structured JSON response strictly following this predefined structure:
  ${JSON.stringify(PredefinedStructure, null, 2)}

  Ensure that the JSON response follows the format exactly as specified without any deviations, markdown, or additional text.
  The appliances list should be based on the following preset appliances:
  ${JSON.stringify(PresetAppliances, null, 2)}.

  Consider the property dimensions to define the number of rooms and appliances logically.
  `;

  let attempts = 0;
  while (attempts < 3) {
    try {
      LOG.info("Fetching home layout suggestions from OpenAI using assistants");
      const threadResponse = await fetch(OPENAI_THREAD_URL, {
        method: API_CONSTANTS.POST,
        headers: {
          [API_CONSTANTS.Authorization]: `Bearer ${OPENAI_API_KEY}`,
          [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      const threadData = await threadResponse.json();
      const threadId = threadData.id;
      LOG.info("Got Thread response", threadId);

      // Step 2: Run the assistant
      const runResponse = await fetch(`${OPENAI_THREAD_URL}/${threadId}/runs`, {
        method: API_CONSTANTS.POST,
        headers: {
          [API_CONSTANTS.Authorization]: `Bearer ${OPENAI_API_KEY}`,
          [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ assistant_id: OPENAI_ASSISTANT_ID }),
      });

      LOG.info("Got Run response");

      const runData = await runResponse.json();
      const runId = runData.id;

      // Step 3: Poll for completion
      let runStatus = "in_progress";
      let attempts = 0;
      while (runStatus !== "completed" && attempts < 20) {
        LOG.info("Attempt: ", attempts, runId);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before checking again
        const runStatusResponse = await fetch(`${OPENAI_THREAD_URL}/${threadId}/runs/${runId}`, {
          headers: {
            [API_CONSTANTS.Authorization]: `Bearer ${OPENAI_API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        });

        const runStatusData = await runStatusResponse.json();
        runStatus = runStatusData.status;
        console.log("runStatus::", runStatus);
        attempts++;
      }

      LOG.info("Got Run completion");

      // Step 4: Retrieve the response
      const messagesResponse = await fetch(`${OPENAI_THREAD_URL}/${threadId}/messages`, {
        headers: { [API_CONSTANTS.Authorization]: `Bearer ${OPENAI_API_KEY}`, "OpenAI-Beta": "assistants=v2" },
      });

      LOG.info("Got messagesResponse", messagesResponse);

      const messagesData = await messagesResponse.json();
      const lastMessage = messagesData.data[0].content;

      // Extract JSON from response
      const jsonMatch = lastMessage.match(/\{.*\}/s);
      if (jsonMatch) {
        const response = JSON.parse(jsonMatch[0]);
        console.log("Final Response: ", response);
        return response;
      }

      throw new Error("Invalid JSON response from OpenAI Assistant");
    } catch (error) {
      attempts++;
      if (attempts >= 3) {
        LOG.warn("Returning default home layout due to repeated failures.");
        return DefaultHomeLayout;
      }
      LOG.error(`Attempt: ${attempts + 1}. Failed to fetch suggestions from OpenAI with error: ${JSON.stringify(error)}`);
      console.error(error);
    }
  }
};

export const fetchHomeLayoutSuggestions = async (dimensions, country, zipCode) => {
  try {
    LOG.info("Fetching home layout suggestions from Server/OpenAI");
    const response = await fetch(`${HUXY_SERVICES_URL}${HOME_LAYOUT_SUGGESTION_EP}`, {
      method: API_CONSTANTS.POST,
      headers: { [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON },
      body: JSON.stringify({ dimensions, country, zipCode }),
    });
    const layout = await response.json();
    LOG.info("Generated Layout:", layout);
    return layout;
  } catch (error) {
    LOG.error(`Failed to fetch suggestions from Server/OpenAI with error: ${JSON.stringify(error)}`);
    LOG.warn("Returning default home layout due to repeated failures.");
    return DefaultHomeLayout;
  }
};
