import { LOG } from "../utilities/logger";
import { API_CONSTANTS, HUXY_EP, HUXY_SERVICES_URL } from "../utilities/urls";

/**
 * Creates a task in Huxy API.
 * @param {string} token - Authorization token.
 * @param {string} homeId - The ID of the home.
 * @param {object} taskData - Task details (title, description, category, etc.).
 * @returns {Promise<object>} - API response.
 */
export const createTask = async (token, homeId, taskData) => {
  try {
    const response = await fetch(`${HUXY_SERVICES_URL}${HUXY_EP}`, {
      method: API_CONSTANTS.POST,
      headers: {
        [API_CONSTANTS.Authorization]: token,
        [API_CONSTANTS.ApiVersion]: API_CONSTANTS.v100,
        [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON,
        homeId,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      LOG.error(`Failed to create a task with error: ${JSON.stringify(errorData)}`);
      throw new Error(`API Error: ${errorData.message || response.status}`);
    }
    LOG.info("Successfully created task");

    return await response.json();
  } catch (error) {
    LOG.error("Error creating task:", error);
    throw error;
  }
};

/**
 * Updates an existing task in Huxy API.
 * @param {string} token - Authorization token.
 * @param {string} homeId - The ID of the home.
 * @param {string} taskId - The ID of the task to update.
 * @param {object} taskData - Updated task details.
 * @returns {Promise<object>} - API response.
 */
export const updateTask = async (token, homeId, taskId, taskData) => {
  try {
    const response = await fetch(`${HUXY_SERVICES_URL}${HUXY_EP}/${taskId}`, {
      method: API_CONSTANTS.PUT,
      headers: {
        [API_CONSTANTS.Authorization]: token,
        [API_CONSTANTS.ApiVersion]: API_CONSTANTS.v100,
        [API_CONSTANTS.ContentType]: API_CONSTANTS.ApplicationJSON,
        homeId,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      LOG.error(`Failed to update task with error: ${JSON.stringify(errorData)}`);
      throw new Error(`API Error: ${errorData.message || response.status}`);
    }
    LOG.info("Successfully updated task");

    return await response.json();
  } catch (error) {
    LOG.error("Error updating task:", error);
    throw error;
  }
};
