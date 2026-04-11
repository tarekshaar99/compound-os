import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "../../lib/supabase";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const email = session.customer_details?.email;

      // Create or update user in Supabase
      if (email) {
        try {
          const supabase = getServiceSupabase();
          const { data: existing } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

          if (existing) {
            await supabase
              .from("users")
              .update({ paid: true })
              .eq("email", email);
          } else {
            await supabase
              .from("users")
              .insert({ email, paid: true });
          }
        } catch {
          // Don't fail the payment verification if Supabase is down
          console.error("Failed to update Supabase user record");
        }
      }

      return NextResponse.json({
        valid: true,
        token: `cos_${session.id}_${Date.now()}`,
        email,
      });
    }

    return NextResponse.json({ valid: false });
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
