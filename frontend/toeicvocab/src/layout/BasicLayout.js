import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function BasicLayout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default BasicLayout;