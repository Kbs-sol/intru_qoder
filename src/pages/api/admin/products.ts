import type { APIRoute } from 'astro';
import { getSession } from '@/lib/auth';
import { createProduct, deleteProduct } from '@/lib/db';
import { generateId } from '@/lib/utils';

async function requireAdmin(request: Request, secret: string) {
  const session = await getSession(request, secret);
  if (!session || session.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  return null;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const authError = await requireAdmin(request, env.AUTH_SECRET);
  if (authError) return authError;

  try {
    const data = await request.json() as {
      name: string; description: string; price: string; sale_price: string;
      category: string; image_url: string; stock_status: string; featured: boolean;
    };

    await createProduct(env.DB, {
      id: generateId(),
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      sale_price: data.sale_price ? parseFloat(data.sale_price) : null,
      category: data.category,
      image_url: data.image_url,
      stock_status: data.stock_status || 'in_stock',
      featured: data.featured ? 1 : 0,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals, url }) => {
  const env = locals.runtime.env;
  const authError = await requireAdmin(request, env.AUTH_SECRET);
  if (authError) return authError;

  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ error: 'Product ID required' }), { status: 400 });
  }

  try {
    await deleteProduct(env.DB, id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }
};
