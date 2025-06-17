let state = {
  toggles: {
    "ENGINES": false,
    "REAR CARGO RAMP": false,
    "LASER GUN": false,
    "LANDING GEAR": true  // Initial state: gear down
  },
  thrust: 0
};

export async function handler(event) {
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");

      // ✅ Handle full toggle updates with explicit states
      if (body.toggles && typeof body.toggles === "object") {
        for (const key in body.toggles) {
          if (state.toggles.hasOwnProperty(key)) {
            state.toggles[key] = !!body.toggles[key];  // Force to boolean
          }
        }
      }

      // ✅ Handle explicit thrust percentage
      if (typeof body.thrust === "number") {
        state.thrust = Math.max(0, Math.min(100, body.thrust));
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON", detail: e.message })
      };
    }
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        toggles: state.toggles,
        thrust: state.thrust
      })
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
}
