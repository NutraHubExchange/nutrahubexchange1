import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { 
  Home, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu,
  LayoutDashboard,
  FileStack,
  UserCircle,
  Bell,
  CreditCard,
  Shield,
  FileCheck,
  Building2,
  DollarSign,
  AlertCircle,
  BarChart3,
  Mail,
  Package,
  Moon,
  Sun,
  Youtube,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisuallyHidden } from './ui/visually-hidden';
import { Logo } from './Logo';

interface LayoutProps {
  children: ReactNode;
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#/">
            <Logo className="h-20 w-20" showText={true} />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#/about" className="hover:text-primary transition-colors">About</a>
            <a href="#/directory" className="hover:text-primary transition-colors">Directory</a>
            <a href="#/nutrasense-ai" className="hover:text-primary transition-colors flex items-center gap-1">
              NutraSense AI
              <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded">NEW</span>
            </a>
            <a href="#/blogs" className="hover:text-primary transition-colors">Blogs</a>
            <a href="#/help" className="hover:text-primary transition-colors">Help</a>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              </TooltipContent>
            </Tooltip>
            <a href="#/login">
              <Button variant="ghost">Login</Button>
            </a>
            <a href="#/signup">
              <Button>Sign Up</Button>
            </a>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Main navigation menu for mobile devices</SheetDescription>
                </VisuallyHidden>
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#/about" className="hover:text-primary transition-colors">About</a>
                  <a href="#/directory" className="hover:text-primary transition-colors">Directory</a>
                  <a href="#/nutrasense-ai" className="hover:text-primary transition-colors flex items-center gap-2">
                    NutraSense AI
                    <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded">NEW</span>
                  </a>
                  <a href="#/blogs" className="hover:text-primary transition-colors">Blogs</a>
                  <a href="#/help" className="hover:text-primary transition-colors">Help</a>
                  <a href="#/login">
                    <Button variant="ghost" className="w-full">Login</Button>
                  </a>
                  <a href="#/signup">
                    <Button className="w-full">Sign Up</Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo className="h-20 w-20" showText={true} />
              </div>
              <p className="text-sm text-muted-foreground">
                The trusted B2B marketplace for nutraceutical ingredients.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#/directory" className="text-muted-foreground hover:text-primary transition-colors">Supplier Directory</a></li>
                <li><a href="#/blogs" className="text-muted-foreground hover:text-primary transition-colors">Blogs</a></li>
                <li><a href="#/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <a 
                href="mailto:support@nutrahubexchange.com" 
                className="flex items-center gap-3 p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group border border-primary/20 mb-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary group-hover:text-primary/80 break-words">
                    support@nutrahubexchange.com
                  </p>
                </div>
              </a>
              <div>
                <h5 className="text-sm font-semibold mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a 
                    href="https://www.youtube.com/@NutraHubExchange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/nutrahubexchange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/nutrahubexchange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@nutrahubexchange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="TikTok"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 NutraHubExchange. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const buyerNavItems = [
    { href: '#/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#/rfq/new', icon: FileText, label: 'Create RFQ' },
    { href: '#/rfq/my-list', icon: FileStack, label: 'My RFQs' },
    { href: '#/rfq/templates', icon: FileCheck, label: 'Templates' },
    { href: '#/suppliers', icon: Building2, label: 'Suppliers' },
    { href: '#/disputes', icon: AlertCircle, label: 'Disputes' },
    { href: '#/chat', icon: MessageSquare, label: 'Messages' },
    { href: '#/team', icon: Users, label: 'Team' },
  ];

  const supplierNavItems = [
    { href: '#/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#/rfq/incoming', icon: FileText, label: 'Incoming RFQs' },
    { href: '#/quotes/my-list', icon: FileStack, label: 'My Quotes' },
    { href: '#/profile/certifications', icon: FileCheck, label: 'Certifications' },
    { href: '#/disputes', icon: AlertCircle, label: 'Disputes' },
    { href: '#/chat', icon: MessageSquare, label: 'Messages' },
    { href: '#/profile/payout-settings', icon: DollarSign, label: 'Payouts' },
  ];

  const adminNavItems = [
    { href: '#/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '#/admin/users', icon: Users, label: 'Users' },
    { href: '#/admin/certifications/pending', icon: FileCheck, label: 'Certifications' },
    { href: '#/admin/rfqs', icon: FileText, label: 'RFQs' },
    { href: '#/admin/quotes', icon: FileStack, label: 'Quotes' },
    { href: '#/admin/transactions', icon: DollarSign, label: 'Transactions' },
    { href: '#/admin/disputes', icon: AlertCircle, label: 'Disputes' },
    { href: '#/admin/settings/email-templates', icon: Mail, label: 'Email Templates' },
    { href: '#/admin/settings/plans', icon: CreditCard, label: 'Plans' },
    { href: '#/admin/settings/general', icon: Settings, label: 'Settings' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : 
                   user?.role === 'supplier' ? supplierNavItems : 
                   buyerNavItems;

  const settingsItems = [
    { href: '#/profile/edit', icon: UserCircle, label: 'Profile' },
    { href: '#/profile/security', icon: Shield, label: 'Security' },
    { href: '#/profile/notifications', icon: Bell, label: 'Notifications' },
    { href: '#/profile/billing', icon: CreditCard, label: 'Billing' },
    { href: '#/activity-log', icon: FileText, label: 'Activity Log' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b">
        <a href="#/dashboard">
          <Logo className="h-20 w-20" showText={true} />
        </a>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Main Navigation</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Settings</p>
          <nav className="space-y-1">
            {settingsItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.companyName}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation sidebar for mobile devices</SheetDescription>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card h-16 flex items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Notifications
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
};
