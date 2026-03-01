import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './stores/useAppStore';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProviderRegister } from './pages/ProviderRegister';

// User Pages
import { UserHome } from './pages/user/UserHome';
import { UserProfile } from './pages/user/UserProfile';
import { UserSettings } from './pages/user/UserSettings';
import { UserMessages } from './pages/user/UserMessages';

// Admin Pages
import { AdminHome } from './pages/admin/AdminHome';
import { UserManagement } from './pages/admin/UserManagement';
import { AdminProviders } from './pages/admin/AdminProviders';
import { Roles } from './pages/admin/Roles';
import { ActivityLogs } from './pages/admin/ActivityLogs';
import { AdminSettings } from './pages/admin/AdminSettings';

// Provider Pages
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { ProviderSchedule } from './pages/provider/ProviderSchedule';
import { ProviderEarnings } from './pages/provider/ProviderEarnings';
import { ProviderMessages } from './pages/provider/ProviderMessages';

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/provider-register" element={<ProviderRegister />} />

        {/* Shared Dashboard Routes (User & Provider) */}
        <Route element={<ProtectedRoute allowedRoles={['User', 'ServiceProvider']} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Route>

        {/* User Specific Routes */}
        <Route element={<ProtectedRoute allowedRoles={['User']} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<UserHome />} />
            <Route path="messages" element={<UserMessages />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="providers" element={<AdminProviders />} />
            <Route path="roles" element={<Roles />} />
            <Route path="activity" element={<ActivityLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Provider Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ServiceProvider']} />}>
          <Route path="/provider" element={<DashboardLayout />}>
            <Route index element={<ProviderDashboard />} />
            <Route path="schedule" element={<ProviderSchedule />} />
            <Route path="earnings" element={<ProviderEarnings />} />
            <Route path="messages" element={<ProviderMessages />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
