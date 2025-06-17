let state = { toggle: null, thrust: 0 };

export async function handler(event) {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    if (body.toggle) state.toggle = body.toggle;
    if (typeof body.thrust === "number") state.thrust = body.thrust;
    return { statusCode: 200, body: "OK" };
  }

  if (event.httpMethod === "GET") {
    const response = { ...state };
    state.toggle = null; // clear toggle after use
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(response),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
}

