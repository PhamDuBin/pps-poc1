// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckInputScreen from "./pages/CheckInputScreen";
import CheckKeyScreen from "./pages/CheckKeyScreen";
import Window3 from "./pages/Window_F3";
import Window4 from "./pages/Window_F4";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center mt-10 text-blue-600">Trang chính</div>
          }
        />
        <Route path="/check-input" element={<CheckInputScreen />} />
        <Route path="/check-key" element={<CheckKeyScreen />} />
        <Route path="/window3" element={<Window3 />} />
        <Route path="/window4" element={<Window4 />} />
      </Routes>
    </Router>
  );
}

export default App;
