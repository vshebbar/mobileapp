const functions = require("@google-cloud/functions-framework");
const app = require("./server"); // Import main Express app

// ✅ Google Cloud Function
functions.http("huxyservice", app);
