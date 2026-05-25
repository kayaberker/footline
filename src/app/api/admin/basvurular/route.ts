import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAdmin() {
  const c = await cookies();
  const authed = c.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  return { authed, supabase };
}

export async function GET() {
  const { authed, supabase } = await getAdmin();
  if (!authed) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const { authed, supabase } = await getAdmin();
  if (!authed) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  const { id, status, admin_notes } = await req.json();
  const { error } = await supabase
    .from("applications")
    .update({ status, admin_notes })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
