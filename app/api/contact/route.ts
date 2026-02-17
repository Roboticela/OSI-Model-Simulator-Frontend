import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

const ALLOWED_ORIGINS = [
  'https://app.osi-model-simulator.roboticela.com',
  'http://app.osi-model-simulator.roboticela.com',
  'https://osi-model-simulator.roboticela.com',
  'http://osi-model-simulator.roboticela.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') ?? '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

interface ContactBody {
  fullName: string;
  email: string;
  message: string;
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS ?? process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!host || !user || !pass) {
    throw new Error('SMTP not configured: set SMTP_HOST, SMTP_USER, and SMTP_PASS (or SMTP_PASSWORD) in .env');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(request: NextRequest) {
  const headers = getCorsHeaders(request);

  try {
    const body: ContactBody = await request.json();

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Full name, email, and message are required.' },
        { status: 400, headers }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER;
    if (!toEmail) {
      console.error('CONTACT_EMAIL (or SMTP_USER) not set');
      return NextResponse.json(
        { error: 'Contact form is not configured.' },
        { status: 500, headers }
      );
    }

    const transporter = createTransporter();

    const subject = `OSI Model Simulator Support: from ${fullName}`;
    const text = [
      `From: ${fullName}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    let html: string;
    try {
      const templatePath = join(process.cwd(), 'EmailStructures', 'support-contact.html');
      html = readFileSync(templatePath, 'utf-8')
        .replace(/\{\{fullName\}\}/g, escapeHtml(fullName))
        .replace(/\{\{email\}\}/g, escapeHtml(email))
        .replace(/\{\{message\}\}/g, escapeHtml(message));
    } catch {
      html = [
        '<p><strong>From:</strong> ' + escapeHtml(fullName) + '</p>',
        '<p><strong>Email:</strong> ' + escapeHtml(email) + '</p>',
        '<p><strong>Message:</strong></p>',
        '<pre style="white-space:pre-wrap;font-family:inherit;">' + escapeHtml(message) + '</pre>',
      ].join('\n');
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200, headers });
  } catch (error) {
    console.error('Contact form error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to send message.', message },
      { status: 500, headers }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
