import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Image as ImageIcon,
  CalendarCheck,
  Settings,
  LogOut,
  ChevronsUpDown,
  LayoutDashboard,
} from "lucide-react";
import { currentAdmin } from "@/lib/admin/auth";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/bookings", label: "Booking", icon: CalendarCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export async function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await currentAdmin();

  if (!admin) redirect("/admin");

  const initials = (admin.name ?? admin.email)
    .split(" ")
    .map((s: string) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center h-10 py-1">
            <Image 
              src='/ggp-2-no-bg.png' 
              alt="GGP Image Logo" 
              priority 
              width={150} 
              height={0}
              className="relative top-0 -left-8"
            />
          </div>
        </SidebarHeader>

        <Separator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-manrope">Manage</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.label} render={<Link href={item.href}>
                      <item.icon />
                      <span className="text-lg font-manrope">{item.label}</span>
                    </Link>} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Separator className="mb-2" />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage
                  src={admin.avatarUrl ?? undefined}
                  alt={admin.name ?? admin.email}
                />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-base font-medium leading-tight">
                  {admin.name ?? "Admin"}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {admin.email}
                </p>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              sideOffset={8}
              className="w-56"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-base font-medium">
                    {admin.name ?? "Admin"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {admin.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                  <form action="/api/auth/logout" method="post">
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer w-full"
                      nativeButton
                      render={<button type="submit" className="w-full text-base">
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>}
                    />
                  </form>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14.25 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <span className="text-xl font-medium font-manrope text-muted-foreground">
            Admin
          </span>
        </header>

        <main className="flex-1 bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}