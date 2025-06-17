let lastReceived = {}; // Stores last unmodified POST body

export async function handler(event) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders };
  }

  if (event.httpMethod === "POST") {
    try {
      lastReceived = JSON.parse(event.body || "{}");
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true })
      };
    } catch (e) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid JSON" })
      };
    }
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(lastReceived)
    };
  }

  return {
    statusCode: 405,
    headers: corsHeaders,
    body: "Method Not Allowed"
  };
}
