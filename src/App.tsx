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
  NewLoan,
  Notifications,
  Setting,
  Transactions,
} from "./cashier/components/pages";
import JoinRolePage from "./pages/JoinRolesPage";
import CustomerForm from "./pages/CreateCustomer";
import ReportsPage from "./pages/ReportPage";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<JoinRolePage />} />
          <Route path="admin/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
         
       
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* loan */}
            <Route path="loan-approval" element={<LoanApproval />} />
            {/* <Route path="cashier-approval" element={<Cashier />} /> */}

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
            <Route path="create-customer" element={<CustomerForm />} />
            {/* <Route path="report" element={<CashierReport />} /> */}
            <Route path="cashier" element={<Cashiers />} />
            <Route path="report" element={<ReportsPage />} />
          </Route>
        </Route>

        {/* CASHIER ROUTES */}
 
        <Route element={<CashierDashboardLayout />}>
          <Route path="/cashier-dashboard" element={<CashierDashboard />} />
          <Route path="/cashiers/customers" element={<Customer />} />
          <Route path="/cashiers/loans" element={<Loans />} />
          <Route path="/cashiers/transactions" element={<Transactions />} />
          <Route path="/cashiers/notifications" element={<Notifications />} />
          <Route path="/cashiers/settings" element={<Setting />} />
          <Route path="/cashiers/loans/new" element={<NewLoan />} />
          {/* <Route path="*" element={<Navigate to="/cashiers" replace />} /> */}
        </Route>
      
      {/* <TransactionDetailModal/> */}
       
        
        </Routes>
      </Router>
    </>
  );
}

export default App;

  // <AppRoutes />
  // const AppRoutes = () => {
  //   const { selectedTransaction, setSelectedTransaction, getTransactionDetails } =
      

  //   return (
  //     <>
  //       <Routes>
  //         <Route element={<CashierDashboardLayout />}>
  //           <Route path="/cashier-dashboard" element={<CashierDashboard />} />
  //           <Route path="/cashiers/customers" element={<Customer />} />
  //           <Route path="/cashiers/loans" element={<Loans />} />
  //           <Route path="/cashiers/transactions" element={<Transactions />} />
  //           <Route path="/cashiers/notifications" element={<Notifications />} />
  //           <Route path="/cashiers/settings" element={<Setting />} />
  //           <Route path="/cashiers/loans/new" element={<NewLoan />} />
  //           {/* <Route path="*" element={<Navigate to="/cashiers" replace />} /> */}
  //         </Route>
  //       </Routes>
  //       <TransactionDetailModal
  //         isOpen={!!selectedTransaction}
  //         onClose={() => setSelectedTransaction(null)}
  //         transaction={selectedTransaction}
  //         details={
  //           selectedTransaction
  //             ? getTransactionDetails(selectedTransaction)
  //             : { customer: undefined, loan: undefined }
  //         }
  //       />
  //     </>
  //   );
  // };
