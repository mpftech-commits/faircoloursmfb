import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./pages/auth/Signup";
import ScrollToTop from "./components/ScrollToTop";
// import VerifyPhone from "./pages/VerifyPhone";
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
import Customers from "./pages/agentdashboard/Customers";
import Cashiers from "./pages/Cashiers";
import { CashierDashboardLayout } from "./cashier/components/layout/CashierDashboardLayout";

import {
  CashierDashboard,
  Customer,
  Loans,
  Notifications,
  Setting,
  Transactions,
} from "./cashier/components/pages";
// import JoinRolePage from "./pages/JoinRolesPage";
import CustomerForm from "./pages/CreateCustomer";
import ReportsPage from "./pages/ReportPage";
import CreateCustomerForm from "./cashier/components/pages/CashierCreateCustomer";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<JoinRolePage />} /> */}
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/verify-phone" element={<VerifyPhone />} /> */}
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

              <Route path="customer" element={<Customers />} />
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
              <Route path="/cashiers/loans" element={<Loans />} />
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
