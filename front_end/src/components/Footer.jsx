import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import librolinkImage from "../assets/home-banner-image.png";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-12 ft-1">
            <img src={librolinkImage} alt="logo-footer" className='logo-footer' />
          </div>
          <div className="col-md-6 col-lg-3 col-12 ft-2">
            <h5>Quick Links</h5>
            <ul>
              <li className="nav-item">
                <a className="" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="" href="/">Our Products</a>
              </li>
              <li className="nav-item">
                <a className="" href="/">Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="" href="/">About Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 col-12 ft-3">
            <h5>Quick Links</h5>
            <p><FontAwesomeIcon icon={faPhoneVolume} /> +212611228809</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> librolink@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
