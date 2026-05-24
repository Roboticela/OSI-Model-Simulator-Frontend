import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '8d23b9f4a8b74f518b3d9c8a7b6c5d4e';
const BASE_URL = 'https://osi-model-simulator.roboticela.com';

// Static URLs to always submit
const STATIC_URLS = [
  BASE_URL,
  `${BASE_URL}/blogs`,
  `${BASE_URL}/support`,
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const extraUrls: string[] = Array.isArray(body?.urls) ? body.urls : [];

    const urlList = [...STATIC_URLS, ...extraUrls];

    const payload = {
      host: 'osi-model-simulator.roboticela.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    // Submit to Bing / IndexNow
    const bingRes = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    // Also submit to Yandex
    const yandexRes = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      submitted: urlList.length,
      bing: bingRes.status,
      yandex: yandexRes.status,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    info: 'POST to this endpoint to submit URLs to IndexNow (Bing, Yandex).',
    key: INDEXNOW_KEY,
    keyUrl: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    usage: 'POST /api/indexnow with optional body: { "urls": ["https://..."] }',
  });
}
