import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Placeholder components for each page
const Home = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
  </div>
);
const About = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800">About Page</h1>
  </div>
);
const Contact = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800">Contact Page</h1>
  </div>
);
const MiscProjects = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-800">Misc Projects Page</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/misc-projects" element={<MiscProjects />} />
      </Routes>
    </Router>
  );
}

export default App;
