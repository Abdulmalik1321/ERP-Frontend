import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Settings,
  SunMoon,
  UserCircle,
} from "lucide-react";
import { useContext } from "react";
import { systemContext } from "../Router";
import { Switch } from "@/shadcn/ui/switch";
import { Label } from "@/shadcn/ui/label";
import { useTheme } from "@/shadcn/theme-provider";

export function Profile() {
  const { state } = useContext(systemContext);
  const { theme, setTheme } = useTheme();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={state.userInfo.img}
                  alt={`${state.userInfo.firstName} ${state.userInfo.lastName}`}
                />
                <AvatarFallback className="rounded-lg">{`${state.userInfo.firstName[0]}${state.userInfo.lastName[0]}`}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {`${state.userInfo.firstName} ${state.userInfo.lastName}`}
                </span>
                <span className="truncate text-xs">{state.userInfo.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={state.userInfo.image}
                    alt={`${state.userInfo.firstName} ${state.userInfo.lastName}`}
                  />
                  <AvatarFallback className="rounded-lg">{`${state.userInfo.firstName[0]}${state.userInfo.lastName[0]}`}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {`${state.userInfo.firstName} ${state.userInfo.lastName}`}
                  </span>
                  <span className="truncate text-xs">
                    {state.userInfo.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div className="flex w-full justify-between items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <SunMoon />
                    <Label htmlFor="airplane-mode">Theme</Label>
                  </div>
                  <Switch
                    checked={theme === "light"}
                    onCheckedChange={() => {
                      if (theme === "light") {
                        setTheme("dark");
                      }
                      if (theme === "dark") {
                        setTheme("light");
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
