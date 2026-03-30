import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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



// import { AnimatePresence } from 'framer-motion';
import { DashboardProvider, useDashboard } from './cashier/context/DashboardContext';
import { 
  CashierDashboardLayout 
} from './cashier/components/layout/CashierDashboardLayout';

import { CashierDashboard, Customer, Loans, NewLoan, Notifications, Setting, Transactions } from "./cashier/components/pages";
import { TransactionDetailModal } from "./cashier/components/shared/TransactionDetailModal";






function App() {
  return (
    <>
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
           <DashboardProvider>
      <AppRoutes />
    </DashboardProvider>
      </Router>

      
    </>
    
  );
}

export default App;
const AppRoutes = () => {
  const { selectedTransaction, setSelectedTransaction, getTransactionDetails } = useDashboard();

  return (
    <>
<Routes>
  <Route  element={<CashierDashboardLayout />}>
            <Route path="/cashiers" element={<CashierDashboard />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/cashier/settings" element={<Setting />} />
            <Route path="/loans/new" element={<NewLoan />} />
            {/* <Route path="*" element={<Navigate to="/cashiers" replace />} /> */}
          </Route>
</Routes>
      <TransactionDetailModal 
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
        details={selectedTransaction ? getTransactionDetails(selectedTransaction) : { customer: undefined, loan: undefined }}
      />
    </>
  );
};
