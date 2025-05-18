export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const range = request.headers.get('range');

  if (!url) {
    return new Response('Missing url', { status: 400 });
  }

  const headers = {};
  if (range) {
    headers['Range'] = range;
  }

  try {
    const response = await fetch(url, { headers });
    if (!response.ok && response.status !== 206) {
      return new Response('Failed to fetch audio', { status: 500 });
    }

    // Forward all relevant headers
    const resHeaders = new Headers();
    for (const [key, value] of response.headers.entries()) {
      resHeaders.set(key, value);
    }
    resHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(response.body, {
      status: response.status,
      headers: resHeaders,
    });
  } catch (err) {
    return new Response('Proxy error', { status: 500 });
  }
}