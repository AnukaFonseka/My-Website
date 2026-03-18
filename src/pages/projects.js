import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import { projects } from "@/data/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import proj11 from "../../public/images/projects/tution-manager/1.PNG";
import proj12 from "../../public/images/projects/tution-manager/2.PNG";
import proj13 from "../../public/images/projects/tution-manager/3.PNG";
import proj14 from "../../public/images/projects/tution-manager/4.PNG";
import proj15 from "../../public/images/projects/tution-manager/5.PNG";
import proj16 from "../../public/images/projects/tution-manager/6.PNG";

import proj21 from "../../public/images/projects/digital-raffle/1.PNG";
import proj22 from "../../public/images/projects/digital-raffle/2.PNG";

import proj31 from "../../public/images/projects/voting-dapp/1.PNG";
import proj32 from "../../public/images/projects/voting-dapp/2.PNG";

import proj41 from "../../public/images/projects/futsal-hub/1.PNG";
import proj42 from "../../public/images/projects/futsal-hub/2.PNG";
import proj43 from "../../public/images/projects/futsal-hub/3.PNG";
import proj44 from "../../public/images/projects/futsal-hub/4.PNG";

import proj51 from "../../public/images/projects/book-review-app/1.PNG";
import proj52 from "../../public/images/projects/book-review-app/2.PNG";
import proj53 from "../../public/images/projects/book-review-app/3.PNG";

import proj61 from "../../public/images/projects/medisense/1.PNG";
import proj62 from "../../public/images/projects/medisense/2.PNG";
import proj63 from "../../public/images/projects/medisense/3.PNG";
import proj64 from "../../public/images/projects/medisense/4.PNG";
import proj65 from "../../public/images/projects/medisense/5.PNG";
import proj66 from "../../public/images/projects/medisense/6.PNG";
import proj67 from "../../public/images/projects/medisense/7.PNG";

import proj71 from "../../public/images/projects/weddings-by-sonali/1.PNG";
import proj72 from "../../public/images/projects/weddings-by-sonali/2.PNG";
import proj73 from "../../public/images/projects/weddings-by-sonali/3.PNG";
import proj74 from "../../public/images/projects/weddings-by-sonali/4.PNG";


import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

// Image Slider Component
const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg group">
      {/* Add fixed aspect ratio container */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0" // Changed to absolute positioning
          >
            <FramerImage
              src={images[currentIndex]}
              className="h-full w-full object-cover" // Changed to object-cover
              alt={`${title} - Image ${currentIndex + 1}`}
              fill // Use fill instead of h-auto w-full
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              paginate(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-dark/70 dark:bg-light/70 
                     text-light dark:text-dark rounded-full p-2 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 hover:bg-dark dark:hover:bg-light"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              paginate(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-dark/70 dark:bg-light/70 
                     text-light dark:text-dark rounded-full p-2 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 hover:bg-dark dark:hover:bg-light"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-primary dark:bg-primaryDark"
                  : "w-2 bg-light/50 dark:bg-dark/50 hover:bg-light/80 dark:hover:bg-dark/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FeaturedProject = ({ type, title, summary, images, link, github, techStack, features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="relative flex w-full items-center  justify-between rounded-3xl rounded-br-2xl border
border-solid border-dark bg-light p-12 shadow-2xl  dark:border-light dark:bg-dark  lg:flex-col 
lg:p-8 xs:rounded-2xl  xs:rounded-br-3xl xs:p-4 
    "
    >
      <div
        className="absolute  top-0 -right-3 -z-10 h-[103%] w-[101%] rounded-[2.5rem] rounded-br-3xl bg-dark
         dark:bg-light  xs:-right-2 xs:h-[102%] xs:w-[100%]
        xs:rounded-[1.5rem] "
      />

      {/* F12: guard empty link — avoid href="" reloading the page */}
      {link ? (
        <Link
          href={link}
          target={"_blank"}
          className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
        >
          <ImageSlider images={images} title={title} />
        </Link>
      ) : (
        <div className="w-1/2 overflow-hidden rounded-lg lg:w-full">
          <ImageSlider images={images} title={title} />
        </div>
      )}

      <div className="flex w-1/2 flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-xl font-medium text-primary dark:text-primaryDark xs:text-base">
          {type}
        </span>
        {link ? (
          <Link
            href={link}
            target={"_blank"}
            className="underline-offset-2 hover:underline"
          >
            <h2 className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-4xl font-bold lg:text-3xl xs:text-2xl">
            {title}
          </h2>
        )}
        <p className="my-2 rounded-md font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-md bg-dark px-3 py-1 text-sm font-medium text-light dark:bg-light dark:text-dark xs:px-2 xs:py-0.5 xs:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Details Section */}
        {(features) && (
          <div className="mt-3 w-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-primaryDark hover:underline transition-all"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4">
                    {/* Tech Stack Section */}
                    {/* {techStack && techStack.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-base font-semibold text-dark dark:text-light xs:text-sm">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="rounded-md bg-dark px-3 py-1 text-sm font-medium text-light dark:bg-light dark:text-dark xs:px-2 xs:py-0.5 xs:text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {/* Key Features Section */}
                    {features && features.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-base font-semibold text-dark dark:text-light xs:text-sm">
                          Key Features
                        </h3>
                        <ul className="space-y-1.5">
                          {features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start text-sm font-medium text-dark dark:text-light sm:text-xs"
                            >
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary dark:bg-primaryDark" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* F12: guard empty/hash links */}
        <div className="mt-4 flex items-center gap-4">
          {github && github !== "#" && (
            <Link
              href={github}
              target={"_blank"}
              className="w-10"
              aria-label={`${title} github link`}
            >
              <GithubIcon />
            </Link>
          )}
          {link && (
            <Link
              href={link}
              target={"_blank"}
              className="rounded-lg bg-dark p-2 px-6 text-lg font-semibold text-light dark:bg-light dark:text-dark sm:px-4 sm:text-base"
              aria-label={title}
            >
              Visit Project
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, images, link, github, techStack }) => {
  return (
    <article
      className="relative flex w-full flex-col items-center justify-center rounded-2xl  rounded-br-2xl 
      border  border-solid  border-dark bg-light p-6  shadow-2xl dark:border-light dark:bg-dark 
      xs:p-4
      "
    >
      <div
        className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark
         dark:bg-light  md:-right-2 md:w-[101%] xs:h-[102%]
        xs:rounded-[1.5rem]  "
      />

      <Link
        href={link}
        target={"_blank"}
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <ImageSlider images={images} title={title} />
      </Link>

      <div className="mt-4 flex w-full flex-col items-start justify-between">
        <span className="text-xl font-medium text-primary dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>

        <Link
          href={link}
          target={"_blank"}
          className="underline-offset-2 hover:underline"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl ">
            {title}
          </h2>
        </Link>

        <div className="flex flex-wrap gap-2">
          {techStack && (techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-md bg-dark px-3 py-1 text-sm font-medium text-light dark:bg-light dark:text-dark xs:px-2 xs:py-0.5 xs:text-xs"
            >
              {tech}
            </span>
          )))}
        </div>
        <div className="flex w-full items-center  justify-between mt-4">
          {link && (
            <Link
              href={link}
              target={"_blank"}
              className="rounded text-lg
              font-medium underline md:text-base
              "
              aria-label={title}
            >
              Visit
            </Link>
          )}
          
          {github && (
            <Link
              href={github}
              target={"_blank"}
              className="w-8 md:w-6"
              aria-label={title}
          >
            <GithubIcon />
          </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const projectImages = {
  "tuition-management-app": [proj11, proj12, proj13, proj14, proj15, proj16],
  "digital-raffle": [proj21, proj22],
  "voting-dapp": [proj31, proj32],
  "futsalhub": [proj44, proj41, proj42, proj43],
  "book-seller-platform": [proj51, proj52, proj53],
  "medisense": [proj61, proj62, proj63, proj64, proj65, proj66, proj67],
  "weddings-by-sonali": [proj71, proj72, proj73, proj74],
};

export default function Projects() {
  // F14: useEffect runs client-side so errors appear in browser DevTools, not just server console
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      projects.forEach((p) => {
        if (!projectImages[p.slug]) {
          console.error(
            `[projects.js] Missing image entry for slug: "${p.slug}"`
          );
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>My Projects - Anuka Fonseka</title>
        <meta
          name="description"
          content="Explore Anuka Fonseka's software engineering projects, showcasing expertise in Next.js, React, blockchain, and full-stack development. Discover innovative web applications and DApps that demonstrate a passion for technology and problem-solving."
        />
      </Head>

      <TransitionEffect />
      <main
        className={`mb-16  flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            {projects.map((project) => {
              const images = projectImages[project.slug];
              const isFeatured = project.type === "Featured Project";
              return (
                <div
                  key={project.slug}
                  className={isFeatured ? "col-span-12" : "col-span-6 sm:col-span-12"}
                >
                  {isFeatured ? (
                    <FeaturedProject
                      type={project.type}
                      title={project.title}
                      summary={project.summary}
                      images={images}
                      link={project.link}
                      github={project.github}
                      techStack={project.techStack}
                      features={project.features}
                    />
                  ) : (
                    <Project
                      type={project.type}
                      title={project.title}
                      images={images}
                      link={project.link}
                      github={project.github}
                      techStack={project.techStack}
                      features={project.features}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Layout>
      </main>
    </>
  );
}