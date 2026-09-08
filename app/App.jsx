import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from '@kit/theme/ThemeProvider';
import AdminLayout from '@kit/layouts/AdminLayout';
import BlankLayout from '@kit/layouts/BlankLayout';
import navigationData from '@kit/data/navigationData';
import { sampleNotifications, sampleMessages } from '@kit/data/sampleTableData';
import {
  Overview, ComponentShowcase, LayoutShowcase, CardShowcase, FormShowcase,
  TableShowcase, ButtonShowcase, FeedbackShowcase, NavigationShowcase,
  OverlayShowcase, ChartShowcase, DisplayShowcase, AuthShowcase, TokensPage,
  TemplatesGallery, IconBrowser, Cheatsheet, NotFound,
} from './pages';
import {
  AnalyticsDashboard, SalesDashboard, ProjectDashboard, MinimalDashboard, MonitoringDashboard,
  ListPage, FormPage, DetailPage, WizardPage, ProfilePage, SettingsPage, AuditLogPage,
  KanbanPage, CalendarPage, InboxPage, FileManagerPage,
  InvoiceListPage, InvoiceViewPage, ReportPage, PricingPage,
  ErrorPage, SignInPage, SignUpPage,
} from '@kit/templates';

const DEMO_USER = { name: 'John Doe', role: 'Administrator', email: 'john.doe@example.com' };

const USER_MENU = [
  { label: 'My Profile', icon: 'person' },
  { label: 'Settings', icon: 'gear' },
  { divider: true },
  { label: 'Sign out', icon: 'box-arrow-right', danger: true },
];

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen routes (no admin chrome) */}
          <Route path="/templates/sign-in" element={<SignInPage />} />
          <Route path="/templates/sign-up" element={<SignUpPage />} />
          <Route element={<BlankLayout />}>
            <Route path="/templates/404" element={<ErrorPage code={404} />} />
            <Route path="/templates/403" element={<ErrorPage code={403} />} />
            <Route path="/templates/500" element={<ErrorPage code={500} onRetry={() => {}} />} />
            <Route path="/templates/maintenance" element={<ErrorPage code="maintenance" />} />
          </Route>

          {/* Admin shell */}
          <Route
            element={
              <AdminLayout
                navigation={navigationData}
                brand="Admin UI Kit"
                user={DEMO_USER}
                userMenu={USER_MENU}
                notifications={sampleNotifications}
                messages={sampleMessages.map((message) => ({
                  title: message.from, description: message.subject,
                  time: message.time, icon: 'envelope', unread: message.unread,
                }))}
                footerLinks={[{ label: 'Cheatsheet' }, { label: 'Templates' }]}
              />
            }
          >
            <Route index element={<Overview />} />
            <Route path="components" element={<ComponentShowcase />} />
            <Route path="components/layout" element={<LayoutShowcase />} />
            <Route path="components/cards" element={<CardShowcase />} />
            <Route path="components/forms" element={<FormShowcase />} />
            <Route path="components/tables" element={<TableShowcase />} />
            <Route path="components/buttons" element={<ButtonShowcase />} />
            <Route path="components/feedback" element={<FeedbackShowcase />} />
            <Route path="components/navigation" element={<NavigationShowcase />} />
            <Route path="components/overlays" element={<OverlayShowcase />} />
            <Route path="components/charts" element={<ChartShowcase />} />
            <Route path="components/display" element={<DisplayShowcase />} />
            <Route path="components/auth" element={<AuthShowcase />} />

            <Route path="templates" element={<TemplatesGallery />} />
            <Route path="templates/analytics" element={<AnalyticsDashboard />} />
            <Route path="templates/sales" element={<SalesDashboard />} />
            <Route path="templates/project" element={<ProjectDashboard />} />
            <Route path="templates/minimal" element={<MinimalDashboard />} />
            <Route path="templates/monitoring" element={<MonitoringDashboard />} />
            <Route path="templates/list" element={<ListPage />} />
            <Route path="templates/form" element={<FormPage />} />
            <Route path="templates/detail" element={<DetailPage />} />
            <Route path="templates/wizard" element={<WizardPage />} />
            <Route path="templates/profile" element={<ProfilePage />} />
            <Route path="templates/settings" element={<SettingsPage />} />
            <Route path="templates/audit" element={<AuditLogPage />} />
            <Route path="templates/kanban" element={<KanbanPage />} />
            <Route path="templates/calendar" element={<CalendarPage />} />
            <Route path="templates/inbox" element={<InboxPage />} />
            <Route path="templates/files" element={<FileManagerPage />} />
            <Route path="templates/invoices" element={<InvoiceListPage />} />
            <Route path="templates/invoice-view" element={<InvoiceViewPage />} />
            <Route path="templates/report" element={<ReportPage />} />
            <Route path="templates/pricing" element={<PricingPage />} />

            <Route path="tokens" element={<TokensPage />} />
            <Route path="cheatsheet" element={<Cheatsheet />} />
            <Route path="icons" element={<IconBrowser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
