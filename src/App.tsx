import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/auth/Login";
import DashboardLayout from "./agentdashboardlayout/DashboardLayout";
import Dashboard from "./pages/agentdashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import PersonalInformation from "./pages/PersornalInformation";
import BusinessInformation from "./pages/BusinessInformation";
import ChangePassword from "./pages/ChangePassword";
import HelpSupport from "./pages/HelpSupport";
import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import LoanApproval from "./pages/agentdashboard/LoanApproval";
import NotFoundPage from "./NotFound";
import Cashiers from "./pages/Cashiers";
import { CashierDashboardLayout } from "./cashier/components/layout/CashierDashboardLayout";

import {
  CashierDashboard,
  Customer,
  Notifications,
  Setting,
  Transactions,
} from "./cashier/components/pages";
import CustomerForm from "./pages/CreateCustomer";
import ReportsPage from "./pages/ReportPage";
import CreateCustomerForm from "./cashier/components/pages/CashierCreateCustomer";
import AgentCustomers from "./pages/agentdashboard/Customers";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="settings/help-support" element={<HelpSupport />} />
          <Route path="404" element={<NotFoundPage />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              {/* loan */}
              <Route path="loan-approval" element={<LoanApproval />} />

              {/* settings */}
              <Route path="settings" element={<Settings />} />
              <Route
                path="settings/personal-info"
                element={<PersonalInformation />}
              />
              <Route
                path="settings/business-info"
                element={<BusinessInformation />}
              />
              <Route
                path="settings/change-password"
                element={<ChangePassword />}
              />
              <Route path="customer" element={<AgentCustomers />} />
              <Route path="create-customer" element={<CustomerForm />} />
              <Route path="cashier" element={<Cashiers />} />
              <Route path="report" element={<ReportsPage />} />
            </Route>
            {/* CASHIER ROUTES */}
            <Route element={<CashierDashboardLayout />}>
              <Route path="/cashier-dashboard" element={<CashierDashboard />} />
              <Route path="/cashiers/customers" element={<Customer />} />
              <Route
                path="/cashiers/create-customers"
                element={<CreateCustomerForm />}
              />
              <Route path="/cashiers/transactions" element={<Transactions />} />
              <Route
                path="/cashiers/notifications"
                element={<Notifications />}
              />
              <Route path="/cashiers/settings" element={<Setting />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
