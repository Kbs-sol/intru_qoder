import type { APIRoute } from 'astro';
import { getOrderByRazorpayId, updateOrderStatus } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json() as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      order_id: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Missing payment details' }), { status: 400 });
    }

    const verified = await verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, env.RAZORPAY_KEY_SECRET);

    if (!verified) {
      return new Response(JSON.stringify({ verified: false, error: 'Invalid signature' }), { status: 400 });
    }

    // Update order status
    const order = await getOrderByRazorpayId(env.DB, razorpay_order_id);
    if (order) {
      await updateOrderStatus(env.DB, order.id, 'paid');
    }

    return new Response(JSON.stringify({ verified: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ verified: false, error: 'Verification failed' }), { status: 500 });
  }
};
