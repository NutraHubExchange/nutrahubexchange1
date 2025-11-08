import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// Public Pages
import HomePage from '../pages/public/HomePage';
import SignupPage from '../pages/public/SignupPage';
import SignupWizardPage from '../pages/public/SignupWizardPage';
import LoginPage from '../pages/public/LoginPage';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage';
import ResetPasswordPage from '../pages/public/ResetPasswordPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import BlogsPage from '../pages/public/BlogsPage';
import HelpPage from '../pages/public/HelpPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import TermsPage from '../pages/public/TermsPage';
import { DirectoryPage } from '../pages/public/DirectoryPage';
import NutraSenseAIPage from '../pages/public/NutraSenseAIPage';
import SwagPage from '../pages/public/SwagPage';
import SmartMatchmakingPage from '../pages/public/SmartMatchmakingPage';
import AutoBiddingPage from '../pages/public/AutoBiddingPage';
import QualityGuardrailsPage from '../pages/public/QualityGuardrailsPage';
import PriceIntelligencePage from '../pages/public/PriceIntelligencePage';

// Shared Pages
import DashboardPage from '../pages/shared/DashboardPage';
import ChatPage from '../pages/shared/ChatPage';
import ActivityLogPage from '../pages/shared/ActivityLogPage';
import ProfileEditPage from '../pages/shared/ProfileEditPage';
import SecuritySettingsPage from '../pages/shared/SecuritySettingsPage';
import NotificationSettingsPage from '../pages/shared/NotificationSettingsPage';
import BillingPage from '../pages/shared/BillingPage';
import PaymentMethodPage from '../pages/shared/PaymentMethodPage';
import InvoiceHistoryPage from '../pages/shared/InvoiceHistoryPage';
import TeamManagementPage from '../pages/shared/TeamManagementPage';

// Buyer Pages
import CreateRFQPage from '../pages/buyer/CreateRFQPage';
import MyRFQsPage from '../pages/buyer/MyRFQsPage';
import RFQDetailPage from '../pages/buyer/RFQDetailPage';
import RFQTemplatesPage from '../pages/buyer/RFQTemplatesPage';
import SupplierDirectoryPage from '../pages/buyer/SupplierDirectoryPage';
import SupplierProfilePage from '../pages/buyer/SupplierProfilePage';

// Supplier Pages
import IncomingRFQsPage from '../pages/supplier/IncomingRFQsPage';
import IncomingRFQDetailPage from '../pages/supplier/IncomingRFQDetailPage';
import MyQuotesPage from '../pages/supplier/MyQuotesPage';
import MyCertificationsPage from '../pages/supplier/MyCertificationsPage';
import PayoutSettingsPage from '../pages/supplier/PayoutSettingsPage';

// Dispute Pages
import DisputeCenterPage from '../pages/disputes/DisputeCenterPage';
import FileDisputePage from '../pages/disputes/FileDisputePage';
import DisputeDetailPage from '../pages/disputes/DisputeDetailPage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import PlatformAnalyticsPage from '../pages/admin/PlatformAnalyticsPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import EditUserPage from '../pages/admin/EditUserPage';
import PendingCertificationsPage from '../pages/admin/PendingCertificationsPage';
import GlobalRFQManagementPage from '../pages/admin/GlobalRFQManagementPage';
import GlobalQuoteManagementPage from '../pages/admin/GlobalQuoteManagementPage';
import GlobalTransactionManagementPage from '../pages/admin/GlobalTransactionManagementPage';
import AdminDisputeMediationPage from '../pages/admin/AdminDisputeMediationPage';
import EmailTemplateEditorPage from '../pages/admin/EmailTemplateEditorPage';
import SubscriptionPlanManagementPage from '../pages/admin/SubscriptionPlanManagementPage';
import PlatformSettingsPage from '../pages/admin/PlatformSettingsPage';

interface Route {
  path: string;
  component: React.ComponentType;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const routes: Route[] = [
  // Public routes
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signup/wizard', component: SignupWizardPage, requireAuth: true },
  { path: '/login', component: LoginPage },
  { path: '/forgot-password', component: ForgotPasswordPage },
  { path: '/reset-password', component: ResetPasswordPage },
  { path: '/about', component: AboutPage },
  { path: '/swag', component: SwagPage },
  { path: '/contact', component: ContactPage },
  { path: '/blogs', component: BlogsPage },
  { path: '/help', component: HelpPage },
  { path: '/directory', component: DirectoryPage }, // Accessible to all, shows more info when logged in
  { path: '/nutrasense-ai', component: NutraSenseAIPage },
  { path: '/ai/smart-matchmaking', component: SmartMatchmakingPage },
  { path: '/ai/auto-bidding', component: AutoBiddingPage },
  { path: '/ai/quality-guardrails', component: QualityGuardrailsPage },
  { path: '/ai/price-intelligence', component: PriceIntelligencePage },
  { path: '/privacy', component: PrivacyPage },
  { path: '/terms', component: TermsPage },

  // Shared authenticated routes
  { path: '/dashboard', component: DashboardPage, requireAuth: true },
  { path: '/chat', component: ChatPage, requireAuth: true },
  { path: '/activity-log', component: ActivityLogPage, requireAuth: true },
  { path: '/profile/edit', component: ProfileEditPage, requireAuth: true },
  { path: '/profile/security', component: SecuritySettingsPage, requireAuth: true },
  { path: '/profile/notifications', component: NotificationSettingsPage, requireAuth: true },
  { path: '/profile/billing', component: BillingPage, requireAuth: true },
  { path: '/profile/payment-method', component: PaymentMethodPage, requireAuth: true },
  { path: '/profile/invoices', component: InvoiceHistoryPage, requireAuth: true },
  { path: '/team', component: TeamManagementPage, requireAuth: true },

  // Buyer routes
  { path: '/rfq/new', component: CreateRFQPage, requireAuth: true, allowedRoles: ['buyer'] },
  { path: '/rfq/my-list', component: MyRFQsPage, requireAuth: true, allowedRoles: ['buyer'] },
  { path: '/rfq/detail/:id', component: RFQDetailPage, requireAuth: true, allowedRoles: ['buyer'] },
  { path: '/rfq/templates', component: RFQTemplatesPage, requireAuth: true, allowedRoles: ['buyer'] },
  { path: '/suppliers', component: SupplierDirectoryPage, requireAuth: true, allowedRoles: ['buyer'] },
  { path: '/suppliers/:id', component: SupplierProfilePage, requireAuth: true, allowedRoles: ['buyer'] },

  // Supplier routes
  { path: '/rfq/incoming', component: IncomingRFQsPage, requireAuth: true, allowedRoles: ['supplier'] },
  { path: '/rfq/incoming/detail/:id', component: IncomingRFQDetailPage, requireAuth: true, allowedRoles: ['supplier'] },
  { path: '/quotes/my-list', component: MyQuotesPage, requireAuth: true, allowedRoles: ['supplier'] },
  { path: '/profile/certifications', component: MyCertificationsPage, requireAuth: true, allowedRoles: ['supplier'] },
  { path: '/profile/payout-settings', component: PayoutSettingsPage, requireAuth: true, allowedRoles: ['supplier'] },

  // Dispute routes
  { path: '/disputes', component: DisputeCenterPage, requireAuth: true },
  { path: '/disputes/new', component: FileDisputePage, requireAuth: true },
  { path: '/disputes/:id', component: DisputeDetailPage, requireAuth: true },

  // Admin routes
  { path: '/admin/dashboard', component: AdminDashboardPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/analytics', component: PlatformAnalyticsPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/users', component: UserManagementPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/users/edit/:id', component: EditUserPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/certifications/pending', component: PendingCertificationsPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/rfqs', component: GlobalRFQManagementPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/quotes', component: GlobalQuoteManagementPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/transactions', component: GlobalTransactionManagementPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/disputes', component: AdminDisputeMediationPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/settings/email-templates', component: EmailTemplateEditorPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/settings/plans', component: SubscriptionPlanManagementPage, requireAuth: true, allowedRoles: ['admin'] },
  { path: '/admin/settings/general', component: PlatformSettingsPage, requireAuth: true, allowedRoles: ['admin'] },
];

export const useRouter = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.hash.slice(1) || '/');

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { currentPath, navigate };
};

export const Router: React.FC = () => {
  const { currentPath } = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Extract dynamic route parameters
  const matchRoute = (routePath: string, actualPath: string) => {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) {
      return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }

    return params;
  };

  // Find matching route
  let matchedRoute: Route | null = null;
  let params: Record<string, string> = {};

  for (const route of routes) {
    const match = matchRoute(route.path, currentPath);
    if (match !== null) {
      matchedRoute = route;
      params = match;
      break;
    }
  }

  // Handle 404
  if (!matchedRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>404 - Page Not Found</h1>
          <a href="#/" className="text-blue-600 hover:underline">Go Home</a>
        </div>
      </div>
    );
  }

  // Check authentication
  if (matchedRoute.requireAuth && !isAuthenticated) {
    window.location.hash = '/login';
    return null;
  }

  // Check role authorization
  if (matchedRoute.allowedRoles && user && !matchedRoute.allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>403 - Access Denied</h1>
          <p>You don't have permission to access this page.</p>
          <a href="#/dashboard" className="text-blue-600 hover:underline">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  const Component = matchedRoute.component;
  return <Component {...params} />;
};
