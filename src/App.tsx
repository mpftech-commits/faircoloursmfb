import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ScrollToTop from "./components/ScrollToTop";
import VerifyPhone from "./pages/VerifyPhone";
import Login from "./pages/auth/Login";
import StepForm from "./pages/StepForm";
import Summary from "./pages/Steps/Summary";
import DashboardLayout from "./agentdashboardlayout/DashboardLayout";
import Dashboard from "./pages/agentdashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import PersonalInformation from "./pages/PersornalInformation";
import BusinessInformation from "./pages/BusinessInformation";
import ChangePassword from "./pages/ChangePassword";
import HelpSupport from "./pages/HelpSupport";
import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import MultiStepForm from "./pages/PropertyListing";
import ListingSubmitted from "./pages/ListingSubmitted";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/upload-document" element={<StepForm />} />
        <Route path="/summary" element={<Summary />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
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
            <Route path="settings/my-document" element={<Document />} />
            <Route path="settings/help-support" element={<HelpSupport />} />
            {/* LISTINGS */}
            <Route path="agent/listings" element={<MultiStepForm />} />
            <Route
              path="dashboard/listing-submitted"
              element={<ListingSubmitted />}
            />
           
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
