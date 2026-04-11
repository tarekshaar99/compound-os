import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "../../lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ access: false }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data } = await supabase
      .from("users")
      .select("paid, admin")
      .eq("email", email)
      .single();

    if (data && (data.paid || data.admin)) {
      return NextResponse.json({ access: true });
    }

    return NextResponse.json({ access: false });
  } catch {
    return NextResponse.json({ access: false }, { status: 500 });
  }
}
