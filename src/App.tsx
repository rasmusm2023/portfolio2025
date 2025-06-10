import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/about" element={<div />} />
            <Route path="/contact" element={<div />} />
            <Route path="/misc-projects" element={<div />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
