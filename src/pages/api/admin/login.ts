import type { APIRoute } from 'astro';
import { createToken, setSessionCookie } from '@/lib/auth';

// Hardcoded admin password - in production, store hash in D1
const ADMIN_PASSWORD = 'intru@27';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  try {
    const { password } = await request.json() as { password: string };

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), { status: 400 });
    }

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    const token = await createToken(
      { sub: 'admin_001', email: 'admin@intru.in', name: 'Admin', role: 'admin' },
      env.AUTH_SECRET
    );

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
