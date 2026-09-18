const BASE_URL = "https://api.rawg.io/api";

/**
 * Server-only helper. Never import this into a "use client" component —
 * it reads process.env.RAWG_API_KEY, which must stay on the server.
 */
export async function rawgFetch(path, searchParams = {}) {
  const key = process.env.RAWG_API_KEY;
  if (!key) {
    throw new Error(
      "RAWG_API_KEY is missing. Add it to .env.local — see .env.example."
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("key", key);
  Object.entries(searchParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    // Game metadata barely changes — cache for an hour to stay well
    // inside RAWG's free 20,000 req/month limit.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`RAWG request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
