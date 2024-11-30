import React from "react";
import aboutImg from "../../assets/images/AN-1.png";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative flex flex-col md:flex-row items-center justify-center md:justify-end min-h-screen bg-fixed bg-cover bg-center pt-0 p-6 md:p-10"
      style={{
        // backgroundColor: "rgba(245, 252, 255, 100)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "50% 10%",
      }}
    >
      {/* Image */}
      <div className="flex justify-center w-full md:w-1/2">
        <img src={aboutImg} alt="" className="w-3/4 md:w-2/3" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-full md:w-1/2 text-left md:text-left px-4 md:px-6 lg:pr-16">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue tracking-wider">
            About Me
          </h2>
        </div>

        <p className="text-deep-blue text-base md:text-lg lg:text-xl leading-relaxed">
          Hi, I’m Anuka, a Full-Stack Developer with a passion for crafting
          seamless digital solutions that blend functionality with aesthetic
          appeal. With hands-on experience across both front-end and back-end
          development, I’m dedicated to turning complex ideas into simple,
          impactful digital experiences.
        </p>
      </div>
    </section>
  );
}
