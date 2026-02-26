// Razorpay REST API client (no SDK needed - Cloudflare Workers compatible)

const RAZORPAY_BASE = 'https://api.razorpay.com/v1';

function getAuthHeader(keyId: string, keySecret: string): string {
  return 'Basic ' + btoa(`${keyId}:${keySecret}`);
}

export async function createRazorpayOrder(
  amount: number,
  receipt: string,
  keyId: string,
  keySecret: string
): Promise<{ id: string; amount: number; currency: string; receipt: string; status: string }> {
  const response = await fetch(`${RAZORPAY_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(keyId, keySecret),
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Razorpay order creation failed: ${error}`);
  }

  return response.json();
}

export async function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = `${orderId}|${paymentId}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(keySecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const computedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computedSignature === signature;
}
