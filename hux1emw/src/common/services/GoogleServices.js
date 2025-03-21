import { LOG } from "../utilities/logger";
import { GOOGLE_GEOCODE_URL, GOOGLE_MAPS_API_KEY, GOOGLE_PLACES_URL, GOOGLE_SPEECH_TEXT_API_KEY, GOOGLE_SPEECH_URL } from "../utilities/urls";

export const searchInGooglePlaces = async (query, latitude, longitude, radius = 5000) => {
  try {
    LOG.info(`Searching in google places for query: ${query}`);
    const url = `${GOOGLE_PLACES_URL}?query=${query}&location=${latitude},${longitude}&radius=${radius}&key=${GOOGLE_MAPS_API_KEY}`;

    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    if (data.status !== "OK") {
      LOG.error("Google Places API failed with status:", data.status);
      return [];
    }

    // Transform results into desired format
    const results = data.results.map((place) => ({
      id: place.place_id,
      name: place.name,
      location: place.formatted_address,
      rating: place.rating || "N/A",
    }));

    return results; // Update results state
  } catch (error) {
    LOG.error(`Failed to perform google maps search with error: ${JSON.stringify(error)}`);
  }
  return [];
};

// Function to get transcript from Google Speech-to-Text
export const getTranscriptFromGoogle = async (base64Audio) => {
  const response = await fetch(`${GOOGLE_SPEECH_URL}:recognize?key=${GOOGLE_SPEECH_TEXT_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
      audio: { content: base64Audio },
    }),
  });

  if (!response.ok) {
    throw new Error(`Google API Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  const transcript = data?.results?.[0]?.alternatives?.[0]?.transcript || "";
  LOG.info(`Extracted transcript: ${JSON.stringify(transcript)}`);
  return transcript;
};

export const extractAddressFromGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(`${GOOGLE_GEOCODE_URL}/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].address_components;
    } else {
      LOG.error("Failed to retrieve address");
      LOG.error(data);
    }
  } catch (error) {
    LOG.error(`Failed to fetch geocoding with error: ${JSON.stringify(error)}`);
  }
  return null;
};
