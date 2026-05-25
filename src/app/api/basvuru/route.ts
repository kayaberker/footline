import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();
  const { name, email, phone, club_name, role, message } = body;

  if (!name || !email || !phone || !role) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { error } = await supabase.from("applications").insert({
    name, email, phone, club_name, role, message,
  });

  if (error) {
    return NextResponse.json({ error: "Başvuru kaydedilemedi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
