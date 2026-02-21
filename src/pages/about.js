import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import profile from "../../public/images/profile/coder.png";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { LinkArrow } from "@/components/Icons";

export default function About() {
  return (
    <>
      <Head>
        <title>Who I am - Anuka Fonseka</title>
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

          <div className="grid px-4 grid-cols-2 gap-16 sm:gap-8 md:grid-cols-1">
            {/* Biography Section - 2/3 width */}
            <div className="col-span-1 flex flex-col items-start justify-start md:order-2">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75 tracking-wider">
                Biography
              </h2>
              
              <div className="space-y-4">
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Hello, I&apos;m <span className="text-primary dark:text-primaryDark font-semibold">Anuka Fonseka</span>, 
                  a Software Engineer specializing in building enterprise grade web applications and scalable 
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
                  Beyond writing code, I focus on the complete software lifecycle from system architecture and 
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
                
                {/* <div className="pt-4 border-l-4 border-primary/30 dark:border-primaryDark/30 pl-4 mt-6">
                  <p className="font-medium italic text-dark/75 dark:text-light/75 leading-relaxed">
                    &quot;I&apos;m passionate about creating systems that make a difference whether it&apos;s 
                    streamlining authentication for thousands of users or building high performance web platforms. 
                    Let&apos;s build something amazing together.&quot;
                  </p>
                </div> */}
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
                  href="https://drive.google.com/file/d/1Y38sQ-aZUQ_nBH4gcE5UFRql7QTU3LMi/view?usp=sharing"
                  target="_blank"
                  className="group flex items-center gap-2 px-4 py-2 border-2 border-dark dark:border-light 
                  text-dark dark:text-light rounded-lg font-medium transition-all hover:bg-dark 
                  hover:text-light dark:hover:bg-light dark:hover:text-dark"
                >
                  Resume <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </a>
              </div>
            </div>

            {/* Profile Image Section - 1/3 width, no frame or effects */}
            <div className="col-span-1 h-full md:order-1 flex items-center justify-center">
              <Image
                className="h-auto w-full rounded-2xl"
                src={profile}
                alt="Anuka Fonseka - Software Engineer - Digital Art"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
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