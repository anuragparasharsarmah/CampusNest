import video from "../../../SPD=video2.mp4"; // Import your video file
import { FaFacebook, FaTwitter, FaDribbble, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative bg-sky-700 py-10">
      {/* Video Background */}
      <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full opacity-20">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center relative z-10">
        {/* About Section */}
        <div className="mb-4 lg:mb-0 lg:w-1/2 lg:pr-6"> {/* Width between 1/3 and 2/3 */}
          <h6 className="text-white font-bold mb-2">About Us</h6>
          <p className="text-white text-sm">
            CampusNest aims to revolutionize student accommodation searches, providing real-time availability, transparent reviews, and personalized roommate matching for Christ University students in SG Palya.
          </p><br></br>
          <span className="text-white text-1xl font-bold tracking-tight" style={{ fontFamily: "Segoe UI" }}>
            © Anurag & Hrishabh
          </span>
        </div>
        {/* Copyright and Links */}
        <div className="flex items-center justify-center">
          {/* Social Media Links */}
          <ul className="ml-4 flex space-x-4">
            <li>
              <a href="#" className="text-white">
                <FaFacebook size={26} /> {/* Increase icon size */}
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                <FaTwitter size={26} /> {/* Increase icon size */}
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                <FaDribbble size={26} /> {/* Increase icon size */}
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                <FaLinkedin size={26} /> {/* Increase icon size */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
