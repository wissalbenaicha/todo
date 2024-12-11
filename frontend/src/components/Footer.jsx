import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaFacebook,
} from 'react-icons/fa'; // Import de Facebook
import '../styles/Footer.css';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <img src={logo} alt="planify logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li>Online Task Management</li>
              <li>Templates</li>
              <li>Apps & Integrations</li>
              <li>Developer Platform</li>
              <li>Security & Compliance</li>
              <li>Accessibility</li>
              <li>Changelog</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Solutions</h3>
            <ul>
              <li>Task Prioritization & Planning</li>
              <li>Task Management & Organization</li>
              <li>Daily Task Tracking</li>
              <li>Task Categories & Labels</li>
              <li>Strategy & Planning</li>
              <li>Task Visualizations</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>planify Academy</li>
              <li>Help Center</li>
              <li>Blog</li>
              <li>Status</li>
              <li>planify Community</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About us</li>
              <li>Careers 🚀</li>
              <li>planify in the News</li>
              <li>Customer Stories</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
        <div className="footer-lang">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Manage Cookies</a>
        </div>
        <div className="footer-copyright">
          <p>© 2024 planify</p>
        </div>
        <div className="footer-app-links">
          <div className="footer-app-link">
            <a href="#" aria-label="App Store">
              <FaApple size={30} />
            </a>
            <span>App Store</span>
          </div>
          <div className="footer-app-link">
            <a href="#" aria-label="Google Play">
              <FaGooglePlay size={30} />
            </a>
            <span>Google Play</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
