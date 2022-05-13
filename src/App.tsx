import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./Components/HomePage/Home";
import LaunchPage from "./Components/LaunchPage/LaunchPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch/:id" element={<LaunchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
