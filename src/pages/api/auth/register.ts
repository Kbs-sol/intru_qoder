import type { APIRoute } from 'astro';
import { getUserByEmail } from '@/lib/db';
import { hashPassword, createToken, setSessionCookie } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  try {
    const { name, email, password } = await request.json() as { name: string; email: string; password: string };

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400 });
    }

    const existing = await getUserByEmail(env.DB, email);
    if (existing) {
      return new Response(JSON.stringify({ error: 'An account with this email already exists' }), { status: 409 });
    }

    const userId = generateId();
    const passwordHash = await hashPassword(password);

    await env.DB.prepare(
      'INSERT INTO users (id, email, name, provider, role, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(userId, email, name, 'credentials', 'customer', passwordHash, new Date().toISOString()).run();

    const token = await createToken({ sub: userId, email, name, role: 'customer' }, env.AUTH_SECRET);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': setSessionCookie(token),
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
};
