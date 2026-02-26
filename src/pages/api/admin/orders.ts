import type { APIRoute } from 'astro';
import { getSession } from '@/lib/auth';
import { updateOrderStatus } from '@/lib/db';

export const PUT: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const session = await getSession(request, env.AUTH_SECRET);
  if (!session || session.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { id, status } = await request.json() as { id: string; status: string };

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'Order ID and status required' }), { status: 400 });
    }

    const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'failed'];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }

    await updateOrderStatus(env.DB, id, status);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500 });
  }
};
