import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa6";
import logo from "/logo-mj.png"

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Blog",
    link: "/blog",
  },
];

const Footer = () => {
  return (
    <>
    
    <div className=" bg-primary">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <a
              href="#"
              className=" font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
            >
              <img
              src={logo}
              alt="logo"
              className="w-[150px]"/>
            </a>
            <p className="text-gray-400 lg:pr-24 pt-3">
            Veteran House , Along Moi Avenue , 6th Floor , Room No.610 Moi, Nairobi Area, Kenya
            </p>
    
            <a
              href="https://www.youtube.com"
              target="_blank"
              className="inline-block bg-primary/90 text-white py-2 px-4 mt-4 text-sm rounded-full"
            >
              Visit our YouTube Channel
            </a>
          </div>

          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 text-white">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-400  hover:text-white scale-105 duration-300 font-medium"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* second col links */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3 text-white">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-400  hover:text-white scale-105 duration-300 font-medium"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl font-bold sm:text-left mb-3 text-white">Address</h1>
              <div>
                <div className="flex items-center gap-3">
                  <FaLocationArrow className="w-[40px] text-white" />
                  <p className="text-gray-400  hover:text-white scale-105 duration-300 font-medium text-sm">Moi Avenue Nairobi, Kenya, Veteran house 6th floor office, Room no. 610 next to Bihi Towers near The Bazaar</p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <FaMobileAlt className="text-white"/>
                  <p className="text-gray-400  hover:text-white scale-105 duration-300 font-medium text-sm">+254 723 393 114</p>
                </div>

                {/* social links */}
                <div className="flex items-center gap-3 mt-6">
                  <a href="#">
                    <FaInstagram className="text-3xl hover:text-red-500 text-white scale-105 duration-300" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-3xl hover:text-red-500 text-white scale-105 duration-300" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-3xl hover:text-red-500 text-white scale-105 duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </> 
  );
};

export default Footer;
