import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;

  if (auth !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-green-950 flex">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
