import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/modules/auth/services/logout.service";
import { LogOut } from "lucide-react";

export function SidebarLogout() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarMenuButton className="border">
              <LogOut />
              Logout
            </SidebarMenuButton>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin logout?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={logout}>
                <AlertDialogAction type="submit" className="bg-gradient-purple">Continue</AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
