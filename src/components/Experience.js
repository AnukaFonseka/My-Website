import React, { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const ProjectDetail = ({ title, technologies, achievements }) => {
  return (
    <div className="mt-3 mb-4 pl-4 border-l-2 border-primary/30 dark:border-primaryDark/30">
      <h4 className="font-semibold text-lg text-primary dark:text-primaryDark sm:text-base">
        {title}
      </h4>
      <p className="text-sm text-dark/60 dark:text-light/40 mb-2">
        {technologies}
      </p>
      <ul className="list-disc list-inside space-y-1 text-dark/75 dark:text-light/60 md:text-sm">
        {achievements.map((achievement, index) => (
          <li key={index} className="leading-relaxed">
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  projects,
  showProjects = false,
}) => {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full"
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          {companyLink ? (
            <a
              className="capitalize text-primary dark:text-primaryDark hover:underline"
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{company}
            </a>
          ) : (
            <span className="capitalize text-primary dark:text-primaryDark">
              @{company}
            </span>
          )}
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} {address && `| ${address}`}
        </span>
        <p className="font-medium w-full mt-2 md:text-sm text-dark/90 dark:text-light/80">
          {work}
        </p>

        {projects && projects.length > 0 && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-primary dark:text-primaryDark font-semibold hover:underline text-sm flex items-center gap-1"
            >
              {isExpanded ? "Hide" : "Show"} Key Projects
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {projects.map((project, index) => (
                  <ProjectDetail
                    key={index}
                    title={project.title}
                    technologies={project.technologies}
                    achievements={project.achievements}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Software Engineer"
            company="Tryonics"
            companyLink="https://tryonics.com"
            time="March 2025 - Present"
            address=""
            work="Design, develop, and deploy enterprise web applications using Java, Spring Boot, Next.js, Vue.js, Laravel, Docker, and Linux-based infrastructure. Responsible for system architecture, authentication integration, deployment automation, and performance optimization."
            projects={[
              {
                title: "Intranet System - Fairfirst",
                technologies:
                  "Java, Vue.js, WSO2 Identity Server, Docker, Linux, Nginx",
                achievements: [
                  "Integrated WSO2 Identity Server with enterprise applications",
                  "Implemented Single Sign-On (SSO) authentication across internal systems",
                  "Developed Java background jobs and services for user and application usage report (CSV) generation",
                  "Implemented HMAC authentication for legacy systems integration",
                  "Configured WSO2 Identity Server with multiple user stores (LDAP, JDBC)",
                  "Automated synchronization of Active Directory and external user databases",
                  "Customized authentication portals, login UI, email templates, and account management branding",
                  "Managed deployments using Docker Compose, Nginx reverse proxy, and SSL configuration",
                  "Performed server and application security hardening",
                ],
              },
              {
                title: "IASL Website & CMS Platform - IASL",
                technologies: "Next.js, Spring Boot, MySQL, Docker, Nginx",
                achievements: [
                  "Migrated static website to dynamic Next.js-based CMS platform",
                  "Designed system architecture and UI workflows",
                  "Developed dynamic content management with responsive preview capabilities",
                  "Achieved 95%+ Lighthouse performance score through optimization",
                  "Implemented SEO optimization using server-side rendering, optimized image delivery, sitemap generation, and dynamic metadata handling",
                  "Managed QA and production deployments using Docker Compose",
                  "Configured Nginx reverse proxy for backend services",
                  "Optimized Docker container builds to reduce server resource usage and deployment size",
                ],
              },
              {
                title: "Assessor Management System - Fairfirst",
                technologies: "Laravel, Vue.js, MySQL, Nginx",
                achievements: [
                  "Resolved QA issues and stabilized production builds",
                  "Implemented synchronization with call center database systems",
                  "Managed UAT deployment and production configurations",
                ],
              },
              {
                title: "Tryo Corporate Website CMS - Tryonics",
                technologies: "Next.js, Tailwind CSS, Java, Docker, Nginx",
                achievements: [
                  "Migrated application architecture to modern Next.js routing",
                  "Converted SCSS-based styling into optimized Tailwind CSS implementation",
                  "Designed system architecture and database schema",
                  "Mentored junior developers and supported development delivery",
                ],
              },
            ]}
          />

          <Details
            position="Software Engineering Intern"
            company="Amerck"
            companyLink="https://www.amerck.com/"
            time="August 2023 - October 2023"
            address=""
            work="Contributed to development of a remote ICU patient monitoring system. Developed REST APIs using Node.js, Express, and Sequelize ORM. Built responsive front-end components using Vite, Tailwind CSS, and Redux Toolkit. Collaborated in Agile (Scrum) environment using Jira and Confluence."
          />

          <Details
            position="Software Engineering Intern"
            company="Medisense"
            companyLink="#"
            time="April 2022 - June 2022"
            address=""
            work="Developed backend services using Java Spring Boot and MySQL. Participated in database design and system architecture discussions. Led UI/UX design using Figma to improve application usability and workflow efficiency. Built frontend features using React."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;