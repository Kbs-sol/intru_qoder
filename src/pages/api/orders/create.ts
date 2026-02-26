import type { APIRoute } from 'astro';
import { createOrder } from '@/lib/db';
import { createRazorpayOrder } from '@/lib/razorpay';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  try {
    const { items, total, customer } = await request.json() as {
      items: Array<{ id: string; name: string; price: number; size: string; quantity: number }>;
      total: number;
      customer: { name: string; email: string; phone: string; address: string; city: string; state: string; pincode: string };
    };

    if (!items?.length || !total || !customer?.name || !customer?.email || !customer?.phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const session = await getSession(request, env.AUTH_SECRET);
    const orderId = generateId();

    // Create Razorpay order
    const rzpOrder = await createRazorpayOrder(total, orderId, env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET);

    // Store order in D1
    const shippingAddress = `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`;
    await createOrder(env.DB, {
      id: orderId,
      user_id: session?.sub || null,
      products: JSON.stringify(items),
      total_amount: total,
      status: 'pending',
      razorpay_order_id: rzpOrder.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: shippingAddress,
    });

    return new Response(JSON.stringify({
      order_id: orderId,
      razorpay_order_id: rzpOrder.id,
      razorpay_key_id: env.RAZORPAY_KEY_ID,
      amount: rzpOrder.amount,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Order creation failed';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
