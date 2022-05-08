import { React } from "react";
import {
  RiInstagramFill,
  RiTwitterFill,
  RiFacebookFill,
  RiWhatsappFill,
} from "react-icons/ri";
import "./../css/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-dark">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li>
                <Link to="/">Market Place</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3 item">
            <h3>Important links</h3>
            <ul>
              <li>
                <Link to="/loginPO">Login Product Owner</Link>
              </li>
              <li>
                <Link to="/loginAdmin">Login Admin</Link>
              </li>
              <li>
                <Link to="/registerPO">Start selling in our marketplace</Link>
              </li>
              <li>
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/TermsAndConditions">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 item text">
            <h3>E-MarketPlace</h3>
            <p>
              Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus
              ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique
              lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.
            </p>
          </div>
          <div className="col item social">
            <a href="/">
              <RiFacebookFill className="icon" />
            </a>
            <a href="/">
              <RiTwitterFill className="icon" />
            </a>
            <a href="/">
              <RiWhatsappFill className="icon" />
            </a>
            <a href="/">
              <RiInstagramFill className="icon" />
            </a>
          </div>
        </div>
        <p className="copyright">M - Place © 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
