import fetch from 'node-fetch';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const GAS_URL = 'https://script.google.com/macros/library/d/1ZbBfsiGRg4JhPeQdijyofWIls5XyHIRsIUXrIQRMSTWffCIgnQI9DT-5/2';

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
