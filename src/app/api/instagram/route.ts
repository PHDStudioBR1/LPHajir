import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://graph.instagram.com/${encodeURIComponent(userId)}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${encodeURIComponent(token)}`;
    const response = await fetch(url);
    const json = await response.json();
    const data = Array.isArray(json.data) ? json.data : [];
    const normalized = data.map((m: Record<string, unknown>) => ({
      id: m.id,
      caption: m.caption,
      media_url: m.media_url,
      permalink: m.permalink,
      media_type: m.media_type,
      timestamp: m.timestamp,
    }));
    return NextResponse.json(normalized);
  } catch {
    return NextResponse.json([]);
  }
}
