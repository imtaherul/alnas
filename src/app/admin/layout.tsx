import { getCurrentUser } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/customer/dashboard");

  return <DashboardShell role="admin">{children}</DashboardShell>;
}
