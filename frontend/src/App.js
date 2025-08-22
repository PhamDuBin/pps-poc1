import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CheckInputScreen from "./pages/CheckInputScreen";
import CheckKeyScreen from "./pages/CheckKeyScreen";
import Window3 from "./pages/Window_F3";
import Window4 from "./pages/Window_F4";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./component/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import GragDropPage from "./pages/GragDropPage";
import MouseTestPage from "./pages/MouseTestPage";
import NotificationControlPage from "./pages/NotificationControlPage";
import ScrollPage from "./pages/ScrollPage";
import PrintPage from "./pages/PrintPage";
import NextPage from "./pages/NextPage";
import TankMeterPage from "./pages/TankMeterPage";
import TrancInfoScreen from "./pages/transaction_information_01.01.01/TrancInfoScreen";
import CheckSaleByCategoryScreen from "./component/transaction_information/1.1.1_03/CheckSaleByCategoryScreen";
import CheckCurrentMonthSalesStatusScreen from "./component/transaction_information/1.1.1_03/CheckCurrentMonthSalesStatus";
import LinkDestinationScreen from "./component/transaction_information/1.1.1_03/LinkDestinationScreen";
import SaleSlipEntryScreen from "./pages/sale_slip_entry_03.03.01/SaleSlipEntryScreen";
import SaleDetailModal from "./component/sale_slip_entry/3.3.3_01/SaleDetail/SaleDetailModal.tsx"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/check-input"
            element={
              <PrivateRoute>
                <CheckInputScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/check-saleByCategory"
            element={
              <PrivateRoute>
                <CheckSaleByCategoryScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/check-current-month-sales-status"
            element={
              <PrivateRoute>
                <CheckCurrentMonthSalesStatusScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/check-key"
            element={
              <PrivateRoute>
                <CheckKeyScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/window3"
            element={
              <PrivateRoute>
                <Window3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/window4"
            element={
              <PrivateRoute>
                <Window4 />
              </PrivateRoute>
            }
          />
          <Route
            path="/position-custome"
            element={
              <PrivateRoute>
                <GragDropPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mouse-test"
            element={
              <PrivateRoute>
                <MouseTestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/noti-control"
            element={
              <PrivateRoute>
                <NotificationControlPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scroll"
            element={
              <PrivateRoute>
                <ScrollPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/print"
            element={
              <PrivateRoute>
                <PrintPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/next-page"
            element={
              <PrivateRoute>
                <NextPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tank-meter"
            element={
              <PrivateRoute>
                <TankMeterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tranc-info"
            element={
              <PrivateRoute>
                <TrancInfoScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/sale-slip-entry-info"
            element={
              <PrivateRoute>
                <SaleSlipEntryScreen />
              </PrivateRoute>
            }
          />          
          <Route
            path="/link-destination"
            element={
              <PrivateRoute>
                <LinkDestinationScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
