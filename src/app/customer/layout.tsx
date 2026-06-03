import { getCurrentUser } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/admin/dashboard");

  return <DashboardShell role="customer">{children}</DashboardShell>;
}
