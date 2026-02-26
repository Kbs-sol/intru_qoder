import type { APIRoute } from 'astro';
import { getUserByEmail } from '@/lib/db';
import { verifyPassword, createToken, setSessionCookie } from '@/lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  try {
    const { email, password } = await request.json() as { email: string; password: string };

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }

    const user = await getUserByEmail(env.DB, email);
    if (!user || !user.password_hash) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const token = await createToken({ sub: user.id, email: user.email, name: user.name || '', role: user.role }, env.AUTH_SECRET);

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
