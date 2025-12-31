import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} TOEIC 단어 학습 시스템. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;