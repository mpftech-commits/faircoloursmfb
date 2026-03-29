import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ScrollToTop from "./components/ScrollToTop";
import VerifyPhone from "./pages/VerifyPhone";
import Login from "./pages/auth/Login";
import DashboardLayout from "./agentdashboardlayout/DashboardLayout";
import Dashboard from "./pages/agentdashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import PersonalInformation from "./pages/PersornalInformation";
import BusinessInformation from "./pages/BusinessInformation";
import ChangePassword from "./pages/ChangePassword";
import HelpSupport from "./pages/HelpSupport";
// import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import LoanApproval from "./pages/agentdashboard/LoanApproval"
import Cashier from "./pages/agentdashboard/Cashier";
import NotFoundPage from "./NotFound";
import Customers from "./pages/agentdashboard/Customers";
// import CashierReport from "./pages/agentdashboard/CashierReport";
import Member from "./pages/member";
import GenerateReports from "./pages/ReportPage/GenerateReportsPage";
import ReportPage from "./pages/ReportPage/ReportPage";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        {/* <Route element={<ProtectedRoute />}>
         
        </Route> */}
         <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* loan */}
            <Route path="loan-approval" element={<LoanApproval />} />
            <Route path="cashier-approval" element={<Cashier />} />

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
            <Route path="settings/help-support" element={<HelpSupport />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="customer" element={<Customers />} />
            {/* <Route path="report" element={<CashierReport />} /> */}
            <Route path="cashier" element={<Member />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="generate-reports" element={<GenerateReports />} />
          </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
