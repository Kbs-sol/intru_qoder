import type { APIRoute } from 'astro';
import { getUserByEmail, upsertUser } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export const GET: APIRoute = async ({ locals, url }) => {
  const env = locals.runtime.env;
  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = `${env.SITE_URL || url.origin}/api/auth/google-callback`;

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('access_type', 'online');

  return Response.redirect(authUrl.toString(), 302);
};
