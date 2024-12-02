import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import projectsData from "../../assets/data/projectsData.json";
import { Box } from "@mui/material";

import p11 from "../../assets/projects/dapp/1.png"
import p12 from "../../assets/projects/dapp/2.png"

import p21 from "../../assets/projects/book-review-app/Home-Hero.png"
import p22 from "../../assets/projects/book-review-app/Home-Fav-Books.png"
import p23 from "../../assets/projects/book-review-app/Book-Details.png"

import p31 from "../../assets/projects/recipe/1.png"
import p32 from "../../assets/projects/recipe/2.png"

import p41 from "../../assets/projects/Vital-Watch/v1.png"
import p42 from "../../assets/projects/Vital-Watch/v2.png"
import p43 from "../../assets/projects/Vital-Watch/v3.png"
import p44 from "../../assets/projects/Vital-Watch/v4.png"

import p51 from "../../assets/projects/medisense/m7.png"
import p52 from "../../assets/projects/medisense/m2.png"
import p53 from "../../assets/projects/medisense/m3.png"
import p54 from "../../assets/projects/medisense/m4.png"
import p56 from "../../assets/projects/medisense/m6.png"

import p61 from "../../assets/projects/wbs/w3.png"
import p62 from "../../assets/projects/wbs/w4.png"

const imgArray = {
  p11, p12,
  p21, p22, p23,
  p31, p32,
  p41, p42, p43, p44,
  p51, p52, p53, p54, p56,
  p61, p62
}

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section
      id="projects"
      className="pb-16 px-4 sm:px-6 bg-white flex flex-col items-center"
    >
      {/* <hr className="border border-primary w-full mx-auto mb-12" /> */}
      <div className="text-center mb-12 w-full">
        <p className="text-lg text-deep-blue mt-2">Recent Projects</p>
        <h2 className="text-3xl md:text-5xl font-bold text-deep-blue">My Work</h2>
      </div>

      {/* Projects Grid */}
      <div className="md:px-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-white px-5 py-6 sm:px-6 sm:py-8 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => handleOpenModal(project)}
          >
            <img
              src={imgArray[project.images[0]]}
              alt={project.name}
              className="w-full h-40 md:h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-deep-blue mb-2">
              {project.name}
            </h3>
            <p className="text-sm text-deep-blue">{project.description}</p>
          </div>
        ))}
      </div>

      {/* Modal for Project Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 24,
            px: 4,
            py: 5,
            maxHeight: "90vh",
            overflowY: "auto",
            outline: "none",
            "@media (max-width: 768px)": { width: "90%", px: 3, py: 4 },
            "@media (max-width: 480px)": { width: "95%", px: 2, py: 3 },
          }}
          className="text-deep-blue"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {selectedProject?.name}
          </h2>
          <p className="text-sm md:text-base text-deep-blue mb-4">
            {selectedProject?.description}
          </p>

          {/* Tech Stack Section */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject?.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm md:text-base font-medium shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Key Features:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              {selectedProject?.keyFeatures.map((feature, index) => (
                <li key={index} className="text-deep-blue">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Image Slider Section */}
          <div className="mb-6">
            <Slider {...sliderSettings}>
              {selectedProject?.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={imgArray[image]}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* GitHub Links Section */}
          <div className="flex justify-between items-center mt-4">
            {selectedProject?.githubFrontend && (
              <a
                href={selectedProject.githubFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-deep-blue transition"
              >
                Frontend Code
              </a>
            )}
            {selectedProject?.githubBackend && (
              <a
                href={selectedProject.githubBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-deep-blue transition"
              >
                Backend Code
              </a>
            )}
          </div>
        </Box>
      </Modal>
    </section>
  );
};

export default Projects;
