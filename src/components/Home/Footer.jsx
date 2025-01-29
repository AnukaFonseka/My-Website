import React from "react";

const Footer = () => {
  return (
    <section id="contact" className="bg-light-bg-blue text-deep-blue py-10 px-5 md:px-40">
      {/* Header Section */}
      <div className="flex flex-col w-full justify-center items-center mb-12 text-center">
        <p className="text-gray-500 md:text-lg mb-2">
          Feel free to reach out or explore more about me!
        </p>
        <p className="text-deep-blue text-3xl md:text-5xl font-bold">
          Stay Connected.
        </p>
      </div>

      {/* Grid Section */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
        {/* Contact Section */}
        <div>
          <h2 className="text-deep-blue text-lg font-bold mb-4">Contact Me</h2>
          <p className="flex items-center mb-2">
            <i className="fas fa-envelope bg-primary text-white p-2 rounded-full mr-3"></i>
            <a
              href="mailto:akunafonseka@gmail.com"
              className="hover:text-primary transition"
            >
              akunafonseka@gmail.com
            </a>
          </p>
          <p className="flex items-center">
            <i className="fas fa-phone bg-primary text-white p-2 rounded-full mr-3"></i>
            <a
              href="tel:+94760723331"
              className="hover:text-primary transition"
            >
              +94 76 072 3331
            </a>
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-deep-blue text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <i className="fab fa-github bg-primary text-white p-2 rounded-full mr-3"></i>
              <a
                href="https://github.com/AnukaFonseka"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center">
              <i className="fab fa-linkedin bg-primary text-white p-2 rounded-full mr-3"></i>
              <a
                href="https://www.linkedin.com/in/anukafonseka/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center">
              <i className="fas fa-file-alt bg-primary text-white p-2 rounded-full mr-3"></i>
              <a
                href="https://drive.google.com/file/d/1kJdqo5-cNMGjJpN5TnTE29V_1EGBRC5U/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-deep-blue text-lg font-bold mb-4">Follow Me</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/your_username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-deep-blue transition"
            >
              <i className="fab fa-twitter bg-gray-100 text-primary p-3 rounded-full"></i>
            </a>
            <a
              href="https://instagram.com/_.a.n.u.k.a._"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-deep-blue transition"
            >
              <i className="fab fa-instagram bg-gray-100 text-primary p-3 rounded-full"></i>
            </a>
            <a
              href="https://facebook.com/anuka.fonseka.3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-deep-blue transition"
            >
              <i className="fab fa-facebook bg-gray-100 text-primary p-3 rounded-full"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-300 mt-12 pt-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-primary hover:underline outline-none"
        >
          Back to Top
        </button>
        <p className="text-gray-500 mt-4">
          © {new Date().getFullYear()} Anuka Fonseka. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
