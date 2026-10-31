import type { ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  FileText,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Inbox,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";
import { api, setCsrfToken } from "@/lib/admin/api-client";
import type { AdminUserSummary } from "@/lib/admin/queries";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const navGroups = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/pages", label: "Pages", icon: FileText },
      { to: "/admin/navigation", label: "Navigation", icon: MenuIcon },
      { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
      { to: "/admin/media", label: "Media", icon: ImageIcon },
      { to: "/admin/fragments", label: "Fragments", icon: TableIcon },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/admin/submissions", label: "Submissions", icon: Inbox },
      { to: "/admin/users", label: "Users", icon: Users },
      { to: "/admin/profile", label: "Profile", icon: UserCircle },
    ],
  },
] as const;

export function AdminShell({ user, children }: { user: AdminUserSummary; children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const logout = useMutation({
    mutationFn: () => api.post("/api/admin/auth/logout"),
    onSettled: () => {
      setCsrfToken(undefined);
      queryClient.clear();
      navigate({ to: "/admin/login" });
    },
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-2 py-1.5">
            <p className="text-sm font-semibold">SEBWA Admin</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive =
                      item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.to}>
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">{user.name}</span>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
