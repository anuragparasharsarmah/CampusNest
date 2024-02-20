import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import video from "../../../../../SPD=video2.mp4"; 
import { useRef } from "react";
import Typed from "typed.js";

const Header = () => {

  const typeDataRef = useRef<Typed | null>(null); 

  useEffect(() => {
    const options = {
      strings: [
        "PG",
        "Room",
        "Hostel",
        "Apartment",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    };

    typeDataRef.current = new Typed(".role", options);
    return () => {
      if (typeDataRef.current) {
        typeDataRef.current.destroy();
      }
    };
  }, []);

  const { isLoggedIn } = useAppContext();
  
  return (
    <div className="relative">
      <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full gg opacity-85">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="comp py-6 z-10">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl  font-bold tracking-tight" style={{ fontFamily: 'blanka' }}>
            <Link to="/">C A M P U S N E S T</Link>
          </span>
          <span className="flex space-x-2">
            {isLoggedIn ? (
              <>
                <Link
                  className="flex items-center  px-3 font-bold hover:bg-blue-600 rounded-lg"
                  to="/my-bookings" style={{ fontFamily: 'Segoe UI' }}
                >
                  My Bookings
                </Link>
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600 rounded-lg"
                  to="/my-hotels" style={{ fontFamily: 'Segoe UI' }}
                >
                  My Hotels
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="flex bg-white items-center text-blue-600 px-3 font-bold rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-800" style={{ fontFamily: 'Segoe UI' }}
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
        <br /><br />
        <div className="comp pb-10">
          <div className="container mx-auto flex flex-col gap-2">
            <h1 className="text-5xl font-bold pb-2 pt-3" style={{ fontFamily: 'Hero' }}>
              Discover Your Ideal Student <span className="role"></span>
            </h1>
            <p className="text-2xl " style={{ fontFamily: 'Hero' }}>
              <b>Locate Cost-Effective Lodgings for Your Educational Escape . . .</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
