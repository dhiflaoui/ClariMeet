import DashboardSidebar from "@/components/dashboard/Dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
