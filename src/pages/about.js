import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import profile from "../../public/images/profile/developer-pic-2.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";

function AnimatedNumberFramerMotion({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );

  return <span ref={ref} />;
}

export default function About() {
  return (
    <>
      <Head>
        <title>Anuka Fonseka | Software Engineer | About</title>
        <meta name="description" content="Learn more about Anuka Fonseka, a Software Engineer specializing in full-stack development, enterprise systems, and modern web technologies. Passionate about building scalable solutions with Java, Spring Boot, Next.js, and cloud infrastructure." />
      </Head>
      <TransitionEffect />
      <main
        className={`flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Building Enterprise Solutions"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            {/* Biography Section - Enhanced */}
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 
            md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75 tracking-wider">
                Biography
              </h2>
              
              <div className="space-y-4">
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Hello, I&apos;m <span className="text-primary dark:text-primaryDark font-semibold">Anuka Fonseka</span>, 
                  a Software Engineer specializing in building enterprise-grade web applications and scalable 
                  backend systems. With a strong foundation in full-stack development, I transform complex 
                  business requirements into elegant, maintainable solutions.
                </p>
                
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  My expertise lies in architecting and deploying production systems using <span className="font-semibold">Java 
                  Spring Boot</span>, <span className="font-semibold">Next.js</span>, and <span className="font-semibold">Vue.js</span>. 
                  I&apos;ve successfully integrated enterprise authentication solutions like WSO2 Identity Server, 
                  implemented SSO across multiple platforms, and optimized applications to achieve 95%+ Lighthouse 
                  performance scores.
                </p>
                
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Beyond writing code, I focus on the complete software lifecycle—from system architecture and 
                  database design to Docker containerization, CI/CD pipelines, and Linux infrastructure management. 
                  I believe in building systems that are not only functional but also secure, performant, and 
                  maintainable.
                </p>
                
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Currently at <span className="font-semibold">Tryonics</span>, I&apos;m working on enterprise 
                  projects for clients like Fairfirst and IASL, where I lead development from architecture to 
                  deployment. I thrive in environments that challenge me to learn new technologies and solve 
                  complex problems collaboratively.
                </p>
                
                <div className="pt-4 border-l-4 border-primary/30 dark:border-primaryDark/30 pl-4 mt-6">
                  <p className="font-medium italic text-dark/75 dark:text-light/75 leading-relaxed">
                    &quot;I&apos;m passionate about creating systems that make a difference—whether it&apos;s 
                    streamlining authentication for thousands of users or building high-performance web platforms. 
                    Let&apos;s build something amazing together.&quot;
                  </p>
                </div>
              </div>
              
              {/* Quick Links Section */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="mailto:akunafonseka@gmail.com"
                  className="group flex items-center gap-2 px-4 py-2 bg-dark dark:bg-light 
                  text-light dark:text-dark rounded-lg font-medium transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get in Touch
                </a>
                
                <a 
                  href="/path-to-cv.pdf"
                  download
                  className="group flex items-center gap-2 px-4 py-2 border-2 border-dark dark:border-light 
                  text-dark dark:text-light rounded-lg font-medium transition-all hover:bg-dark 
                  hover:text-light dark:hover:bg-light dark:hover:text-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* Profile Image Section - Enhanced */}
            <div className="relative col-span-3 h-max rounded-2xl border-2 border-solid border-dark 
            bg-light p-8 dark:border-light dark:bg-dark
            xl:col-span-4 md:col-span-8 md:order-1
            group overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 
              dark:from-primaryDark/5 dark:to-primaryDark/10 opacity-0 group-hover:opacity-100 
              transition-opacity duration-500" />
              
              <div
                className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl 
                bg-dark dark:bg-light transition-transform duration-300 group-hover:translate-x-1 
                group-hover:translate-y-1"
              />
              
              <Image
                className="h-auto w-full rounded-2xl relative z-10 transition-transform duration-300 
                group-hover:scale-[1.02]"
                src={profile}
                alt="Anuka Fonseka - Software Engineer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              
              {/* Tech stack badges overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300">
                {['Java', 'Next.js', 'Spring Boot', 'Docker'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-dark/90 dark:bg-light/90 text-light dark:text-dark 
                    text-xs font-semibold rounded-full backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Section - Enhanced */}
            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row 
            xl:items-center md:order-3 gap-8 xl:gap-4">
              <div className="flex flex-col items-end justify-center xl:items-center group">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl 
                text-primary dark:text-primaryDark transition-transform duration-300 group-hover:scale-110">
                  <AnimatedNumberFramerMotion value={50} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Projects Delivered
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center group">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl 
                text-primary dark:text-primaryDark transition-transform duration-300 group-hover:scale-110">
                  <AnimatedNumberFramerMotion value={4} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Years Experience
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center group">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl 
                text-primary dark:text-primaryDark transition-transform duration-300 group-hover:scale-110">
                  <AnimatedNumberFramerMotion value={95} />%
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Performance Score
                </h2>
              </div>
            </div>
          </div>

          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
}