import Head from "next/head";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { motion } from "framer-motion";
import { articles } from "@/data/articlesData";

const ArticleCard = ({ article, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
  >
    <Link href={`/articles/${article.slug}`}>
      <div className="group relative border border-dark/10 dark:border-light/10 rounded-2xl p-6
        hover:border-dark/30 dark:hover:border-light/30
        bg-light/50 dark:bg-dark/50 backdrop-blur-sm
        hover:shadow-xl dark:hover:shadow-light/5
        transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Subtle accent line on hover */}
        <div className="absolute top-0 left-0 h-0.5 w-0 bg-dark dark:bg-light
          group-hover:w-full transition-all duration-500 ease-out" />

        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag}
                className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded
                  bg-dark/5 dark:bg-light/10 text-dark/50 dark:text-light/50"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-dark/40 dark:text-light/40 shrink-0 font-medium">
            {article.readTime}
          </span>
        </div>

        <h2 className="text-xl font-bold text-dark dark:text-light mb-1
          group-hover:underline underline-offset-4 transition-all duration-200 md:text-lg">
          {article.title}
        </h2>
        <p className="text-sm font-medium text-dark/50 dark:text-light/50 mb-3">
          {article.subtitle}
        </p>
        <p className="text-sm text-dark/70 dark:text-light/70 leading-relaxed line-clamp-2">
          {article.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-dark/40 dark:text-light/40">{article.date}</span>
          <span className="text-sm font-semibold text-dark dark:text-light flex items-center gap-1
            group-hover:gap-2 transition-all duration-200">
            Read article
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function Articles() {
  return (
    <>
      <Head>
        <title>Articles - Anuka Fonseka</title>
        <meta name="description" content="Technical articles by Anuka Fonseka on software engineering, identity systems, and web development." />
      </Head>

      <TransitionEffect />

      <main className="text-dark dark:text-light min-h-[calc(100vh-5rem)]">
        <Layout className="!pt-12 md:!pt-16 sm:!pt-16">
          <AnimatedText
            text="Writing & Thoughts."
            className="!text-6xl xl:!text-5xl lg:!text-5xl md:!text-4xl sm:!text-3xl mb-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base text-center text-dark/60 dark:text-light/60 mb-10 font-medium md:text-sm"
          >
            Deep dives, practical guides, and lessons learned building real-world software.
          </motion.p>

          <div className="grid grid-cols-1 gap-5 max-w-3xl">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}