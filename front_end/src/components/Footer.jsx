import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import librolinkImage from "../assets/home-banner-image.png";

const Footer = () => {
  return (
    <div className="Footer bg-">
      <div className=" flex">
        <div className="row flex items-center justify-around w-full">
          <div className="col-md-6 col-lg-5 col-12 ft-1">
            <img
              src={librolinkImage}
              alt="logo-footer"
              className="size-96"
            />
          </div>
          <div className="flex space-x-32">
            <div className="col-md-6 col-lg-3 col-12 ft-2">
              <h5 className="text-orange-500 font-semibold text-[1.2rem]">Quick Links</h5>
              <ul>
                <li className="nav-item">
                  <a className="" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">
                    Our Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 col-12 ft-3">
              <h5 className="text-orange-500 font-semibold text-[1.2rem]" >Contact Us</h5>
              <p className="font-[550]">
                <FontAwesomeIcon icon={faPhoneVolume} /> +212611228809
              </p>
              <p className="font-[550]">
                <FontAwesomeIcon icon={faEnvelope} /> librolink@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
