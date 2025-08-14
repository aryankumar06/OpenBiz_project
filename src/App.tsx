import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BusinessList from './components/BusinessList';
import AddBusiness from './components/AddBusiness';
import WebScraper from './components/WebScraper';
import ApiDocs from './components/ApiDocs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/businesses" element={<BusinessList />} />
              <Route path="/add-business" element={<AddBusiness />} />
              <Route path="/scraper" element={<WebScraper />} />
              <Route path="/api-docs" element={<ApiDocs />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </Router>
  );
}

export default App;