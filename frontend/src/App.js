import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CheckInputScreen from "./pages/test_key/CheckInputScreen";
import CheckKeyScreen from "./pages/test_key/CheckKeyScreen";
import Window3 from "./pages/test_key/Window_F3";
import Window4 from "./pages/test_key/Window_F4";
import LoginPage from "./pages/test_key/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./component/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import GragDropPage from "./pages/test_key/GragDropPage";
import MouseTestPage from "./pages/test_key/MouseTestPage";
import NotificationControlPage from "./pages/test_key/NotificationControlPage";
import ScrollPage from "./pages/test_key/ScrollPage";
import PrintPage from "./pages/test_key/PrintPage";
import NextPage from "./pages/test_key/NextPage";
import TankMeterPage from "./pages/test_key/TankMeterPage";
import TrancInfoScreen from "./pages/transaction_information_01.01.01/TrancInfoScreen";
import CheckSaleByCategoryScreen from "./component/transaction_information/1.1.1_03/CheckSaleByCategoryScreen";
import CheckCurrentMonthSalesStatusScreen from "./component/transaction_information/1.1.1_03/CheckCurrentMonthSalesStatus";
import LinkDestinationScreen from "./component/transaction_information/1.1.1_03/LinkDestinationScreen";
import SaleSlipEntryScreen from "./pages/sale_slip_entry_03.03.01/SaleSlipEntryScreen";
import InspectionResultScreen from "./pages/input_inspection_result_02.04.05/InspectionResultScreen.tsx";
import InvoicingScreen from "./pages/configuration_information_04.05.04/InvoicingScreen.tsx";
import "@ant-design/v5-patch-for-react-19";
import CustomerLedgerScreen from "./pages/customer_ledger_01.04.03/CustomerledgerScreen.tsx";
import { ConfigProvider } from "antd";
const theme = {
  token: {
    controlOutline: "#FA8C16",
    colorPrimaryBorder: "#FA8C16",
  },
};
function App() {
  return (
    <ConfigProvider theme={theme}>
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
              path="/input-inspection-result"
              element={
                <PrivateRoute>
                  <InspectionResultScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/config-inf"
              element={
                <InvoicingScreen>
                  <InspectionResultScreen />
                </InvoicingScreen>
              }
            />
            <Route
              path="/customer-ledger"
              element={
                <CustomerLedgerScreen>
                  <InspectionResultScreen />
                </CustomerLedgerScreen>
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
    </ConfigProvider>
  );
}

export default App;
