import React from "react";

const currentYear = new Date();

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content border-t border-yellow-500/60">
      <div>
        <p>{`Copyright © ${currentYear.getFullYear()} - All right reserved by Qantum Restaurant`}</p>
      </div>
    </footer>
  );
};

export default Footer;
