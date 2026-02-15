import { motion } from "framer-motion";
import React from "react";

const SkillCategory = ({ title, skills, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="mb-8 lg:mb-6"
    >
      <h3 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark lg:text-xl md:text-lg">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3 md:gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            viewport={{ once: true }}
            className="px-4 py-2 bg-dark text-light dark:bg-light dark:text-dark 
            rounded-lg font-semibold text-sm shadow-md hover:shadow-lg 
            transition-shadow cursor-default
            lg:px-3 lg:py-1.5 md:text-xs"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: ["Java", "JavaScript", "Spring Boot", "Next.js", "React", "Vue.js", "Laravel"],
    },
    {
      title: "DevOps & Infrastructure",
      skills: ["Docker", "Docker Compose", "Nginx", "Linux", "CI/CD", "SSL Configuration"],
    },
    {
      title: "Authentication & Security",
      skills: ["WSO2 Identity Server", "SSO", "LDAP", "OAuth", "HMAC Authentication"],
    },
    {
      title: "Databases & Backend",
      skills: ["MySQL", "JDBC", "REST APIs", "Microservices", "Node.js", "Express"],
    },
    {
      title: "Frontend Technologies",
      skills: ["Tailwind CSS", "Redux Toolkit", "Server-Side Rendering", "SEO Optimization", "Responsive Design"],
    },
    {
      title: "Tools & Practices",
      skills: ["Git", "Jira", "Confluence", "Figma", "Postman", "Agile/Scrum", "System Design"],
    },
  ];

  return (
    <div className="mt-64 mb-32 md:mt-32 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-bold text-8xl mb-16 w-full text-center md:text-6xl xs:text-4xl md:mb-12"
      >
        Skills
      </motion.h2>

      <div className="w-[75%] mx-auto lg:w-[90%] md:w-full px-4">
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={category.title}
            title={category.title}
            skills={category.skills}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Optional: Performance Highlights Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="w-[75%] mx-auto mt-16 lg:w-[90%] md:w-full px-4 md:mt-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-center text-dark dark:text-light lg:text-xl md:text-lg">
          Key Competencies
        </h3>
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 border-2 border-dark dark:border-light rounded-xl text-center
            hover:shadow-lg transition-shadow md:p-4"
          >
            <div className="text-3xl font-bold text-primary dark:text-primaryDark mb-2 md:text-2xl">
              DevOps
            </div>
            <div className="text-sm font-semibold text-dark/75 dark:text-light/75">
              Containerization & CI/CD
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 border-2 border-dark dark:border-light rounded-xl text-center
            hover:shadow-lg transition-shadow md:p-4"
          >
            <div className="text-3xl font-bold text-primary dark:text-primaryDark mb-2 md:text-2xl">
              SSO
            </div>
            <div className="text-sm font-semibold text-dark/75 dark:text-light/75">
              Enterprise Authentication
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 border-2 border-dark dark:border-light rounded-xl text-center
            hover:shadow-lg transition-shadow md:p-4"
          >
            <div className="text-3xl font-bold text-primary dark:text-primaryDark mb-2 md:text-2xl">
              Full Stack
            </div>
            <div className="text-sm font-semibold text-dark/75 dark:text-light/75">
              Architecture to Deployment
            </div>
          </motion.div>
        </div>
      </motion.div> */}
    </div>
  );
};

export default Skills;