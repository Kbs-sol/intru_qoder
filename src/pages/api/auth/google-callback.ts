import type { APIRoute } from 'astro';
import { upsertUser, getUserByEmail } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export const GET: APIRoute = async ({ request, locals, url }) => {
  const env = locals.runtime.env;
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response(null, { status: 302, headers: { Location: '/auth/login?error=no_code' } });
  }

  try {
    const redirectUri = `${env.SITE_URL || url.origin}/api/auth/google-callback`;

    // Exchange code for token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      return new Response(null, { status: 302, headers: { Location: '/auth/login?error=token_exchange' } });
    }

    const tokenData = await tokenRes.json() as { access_token: string };

    // Fetch user profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!profileRes.ok) {
      return new Response(null, { status: 302, headers: { Location: '/auth/login?error=profile_fetch' } });
    }

    const profile = await profileRes.json() as { email: string; name: string; picture: string };

    // Check if existing user
    const existing = await getUserByEmail(env.DB, profile.email);
    const userId = existing?.id || generateId();
    const role = existing?.role || 'customer';

    // Upsert user
    await upsertUser(env.DB, {
      id: userId,
      email: profile.email,
      name: profile.name,
      image: profile.picture,
      provider: 'google',
      role,
    });

    // Create session
    const token = await createToken({ sub: userId, email: profile.email, name: profile.name, role }, env.AUTH_SECRET);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
        'Set-Cookie': setSessionCookie(token),
      },
    });
  } catch {
    return new Response(null, { status: 302, headers: { Location: '/auth/login?error=unknown' } });
  }
};
