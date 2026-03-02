import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const json = await response.json();
    const reviews = Array.isArray(json.result?.reviews) ? json.result.reviews : [];
    const normalized = reviews.map(
      (r: { author_name?: string; rating?: number; text?: string; time?: number }) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
      })
    );
    return NextResponse.json(normalized);
  } catch {
    return NextResponse.json([]);
  }
}
