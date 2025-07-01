// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckInputScreen from "./app/CheckInputScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="text-center mt-10 text-blue-600">Trang chính</div>} />
        <Route path="/check-input" element={<CheckInputScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
