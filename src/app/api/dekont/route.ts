import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const courseSlug = formData.get("course_slug") as string;
  const courseTitle = formData.get("course_title") as string;

  if (!file || !courseSlug || !courseTitle) {
    return NextResponse.json({ error: "Eksik alan." }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filePath = `${user.id}/${courseSlug}-${Date.now()}.${ext}`;

  const { error: uploadError } = await adminClient.storage
    .from("dekontlar")
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: "Dosya yüklenemedi." }, { status: 500 });
  }

  const { data: { publicUrl } } = adminClient.storage.from("dekontlar").getPublicUrl(filePath);

  const { error: dbError } = await adminClient.from("dekont_uploads").insert({
    user_id: user.id,
    user_email: user.email,
    course_slug: courseSlug,
    course_title: courseTitle,
    file_url: publicUrl,
  });

  if (dbError) return NextResponse.json({ error: "Kayıt hatası." }, { status: 500 });

  return NextResponse.json({ success: true });
}
