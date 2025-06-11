'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  LayoutDashboard,
  Palette,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Menu,
  X,
  Zap,
  FileImage,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'editor' | 'client';
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const getNavItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', href: `/dashboard/${userRole}`, active: true },
    ];

    switch (userRole) {
      case 'admin':
        return [
          ...commonItems,
          { icon: FileImage, label: 'All Projects', href: '/dashboard/admin/projects' },
          { icon: Users, label: 'User Management', href: '/dashboard/admin/users' },
          { icon: BarChart3, label: 'Analytics', href: '/dashboard/admin/analytics' },
          { icon: Settings, label: 'System Settings', href: '/dashboard/admin/settings' },
        ];
      case 'editor':
        return [
          ...commonItems,
          { icon: Palette, label: 'Design Editor', href: '/dashboard/editor/design' },
          { icon: FileImage, label: 'My Projects', href: '/dashboard/editor/projects' },
          { icon: Zap, label: 'Templates', href: '/dashboard/editor/templates' },
          { icon: MessageSquare, label: 'Client Feedback', href: '/dashboard/editor/feedback' },
          { icon: Calendar, label: 'Schedule', href: '/dashboard/editor/schedule' },
        ];
      case 'client':
        return [
          ...commonItems,
          { icon: FileImage, label: 'My Albums', href: '/dashboard/client/albums' },
          { icon: MessageSquare, label: 'Feedback', href: '/dashboard/client/feedback' },
          { icon: Calendar, label: 'Project Timeline', href: '/dashboard/client/timeline' },
          { icon: HelpCircle, label: 'Support', href: '/dashboard/client/support' },
        ];
      default:
        return commonItems;
    }
  };

  const getUserInfo = () => {
    switch (userRole) {
      case 'admin':
        return { name: 'Admin User', email: 'admin@albumcraft.com', avatar: 'AU' };
      case 'editor':
        return { name: 'Emma Wilson', email: 'emma@albumcraft.com', avatar: 'EW' };
      case 'client':
        return { name: 'Sarah Miller', email: 'sarah@example.com', avatar: 'SM' };
      default:
        return { name: 'User', email: 'user@example.com', avatar: 'U' };
    }
  };

  const navItems = getNavItems();
  const userInfo = getUserInfo();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">AlbumCraft</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <Badge variant="outline" className="mb-4">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
          </Badge>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
  'active' in item && item.active
    ? 'bg-blue-100 text-blue-700'
    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
}`}

            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>{userInfo.avatar}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{userInfo.name}</div>
                  <div className="text-xs text-slate-500">{userInfo.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-4 lg:px-6 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
