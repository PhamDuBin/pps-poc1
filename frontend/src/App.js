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
          {/* fallback nếu route không khớp */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
