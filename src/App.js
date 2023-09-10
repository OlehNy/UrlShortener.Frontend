import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlsTableView from './components/ShortUrlsTableView';
import LoginView from './components/LoginView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" exact element={<UrlsTableView />} />
      </Routes>
    </Router>
  );
};

export default App;
