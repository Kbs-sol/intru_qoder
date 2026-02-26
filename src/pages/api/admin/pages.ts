import type { APIRoute } from 'astro';
import { getSession } from '@/lib/auth';
import { updatePage } from '@/lib/db';

export const PUT: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const session = await getSession(request, env.AUTH_SECRET);
  if (!session || session.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { slug, title, content, meta_title, meta_description } = await request.json() as {
      slug: string; title?: string; content?: string; meta_title?: string; meta_description?: string;
    };

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
    }

    await updatePage(env.DB, slug, { title, content, meta_title, meta_description });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to update page' }), { status: 500 });
  }
};
