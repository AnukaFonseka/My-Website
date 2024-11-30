import React, { useState } from "react";
import profile from "../../assets/images/profile.jpeg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // Adjust for navbar height
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Close menu on mobile after clicking
  };

  return (
    <nav className="z-50 w-full bg-white shadow-md sticky top-0 flex justify-between items-center px-3 md:px-20 py-1">
      {/* Logo and Name */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          className="h-auto w-14 md:w-20 mr-1 md:mr-3 rounded-full p-2"
          src={profile}
          alt="logo"
        />
        <div className="flex flex-col">
          <p className="text-base md:text-xl font-medium md:font-semibold text-black">
            Anuka Fonseka
          </p>
          <p className="text-sm md:text-base text-deep-blue">
            Full-Stack Developer
          </p>
        </div>
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex space-x-8 font-medium text-black">
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={() => scrollToSection("home")}
        >
          Home
        </p>
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={() => scrollToSection("about")}
        >
          About Me
        </p>
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={() => scrollToSection("projects")}
        >
          Projects
        </p>
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={() => scrollToSection("experience")}
        >
          Experience
        </p>
        <p
          className="cursor-pointer hover:text-blue-500"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </p>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
          <p
            className="cursor-pointer text-black font-medium hover:text-blue-500"
            onClick={() => scrollToSection("home")}
          >
            Home
          </p>
          <p
            className="cursor-pointer text-black font-medium hover:text-blue-500"
            onClick={() => scrollToSection("about")}
          >
            About Me
          </p>
          <p
            className="cursor-pointer text-black font-medium hover:text-blue-500"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </p>
          <p
            className="cursor-pointer text-black font-medium hover:text-blue-500"
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </p>
          <p
            className="cursor-pointer text-black font-medium hover:text-blue-500"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </p>
        </div>
      )}

      {/* Social Links (Desktop Only) */}
      <div className="hidden md:flex space-x-5">
        <a
          href="https://www.linkedin.com/in/anukafonseka/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-black hover:text-blue-500 transition"
        >
          LinkedIn
          <span className="material-symbols-outlined text-xl ml-1">
            call_made
          </span>
        </a>
        <a
          href="https://github.com/AnukaFonseka"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-black hover:text-blue-500 transition"
        >
          GitHub
          <span className="material-symbols-outlined text-xl ml-1">
            call_made
          </span>
        </a>
        <a
          href="https://drive.google.com/file/d/1Xc_jCwd075Uz2obHd84ZNtyIrXJCVNPs/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-black hover:text-blue-500 transition"
        >
          Resume
          <span className="material-symbols-outlined text-xl ml-1">
            call_made
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
