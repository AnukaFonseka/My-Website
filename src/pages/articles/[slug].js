import Head from "next/head";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Link from "next/link";
import { motion } from "framer-motion";
import { articles } from "@/data/articlesData";
import { useState } from "react";

// ── Content Block Renderers ──────────────────────────────────────────────────

const EnvironmentBadge = ({ text }) => (
  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-dark/50 dark:text-light/40
    bg-dark/5 dark:bg-light/5 border border-dark/10 dark:border-light/10
    rounded-lg px-4 py-2 mb-8 w-fit">
    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
    {text}
  </div>
);

const SectionHeading = ({ title }) => (
  <h2 className="text-xl font-bold text-dark dark:text-light mt-10 mb-3 pb-2
    border-b border-dark/10 dark:border-light/10">
    {title}
  </h2>
);

const BodyText = ({ text }) => (
  <div className="text-sm leading-7 text-dark/80 dark:text-light/70 mb-4 whitespace-pre-line">
    {text.split('\n').map((line, i) => (
      <p key={i} className={line.trim() === '' ? 'mt-3' : 'mb-1'}>{line}</p>
    ))}
  </div>
);

const Architecture = ({ steps }) => (
  <div className="my-6 flex flex-col items-start gap-0">
    {steps.map((step, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-dark dark:bg-light text-light dark:text-dark
            flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className="w-px h-6 bg-dark/20 dark:bg-light/20" />
          )}
        </div>
        <p className="text-sm text-dark/80 dark:text-light/70 pt-1 pb-4">{step}</p>
      </div>
    ))}
  </div>
);

const Callout = ({ variant, title, body }) => {
  const styles = {
    warning: "border-amber-400/60 bg-amber-50/60 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300",
    info: "border-blue-400/60 bg-blue-50/60 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300",
  };
  const icons = {
    warning: "⚠️",
    info: "ℹ️",
  };
  return (
    <div className={`border-l-4 rounded-r-lg px-4 py-3 my-5 ${styles[variant]}`}>
      <p className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
        <span>{icons[variant]}</span> {title}
      </p>
      <p className="text-sm leading-relaxed">{body}</p>
    </div>
  );
};

const DataTable = ({ headers, rows }) => (
  <div className="my-5 overflow-x-auto rounded-xl border border-dark/10 dark:border-light/10">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-dark/5 dark:bg-light/5">
          {headers.map((h) => (
            <th key={h} className="px-4 py-2.5 text-left font-semibold text-dark/70 dark:text-light/60
              text-xs uppercase tracking-wider border-b border-dark/10 dark:border-light/10">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={`border-b last:border-0 border-dark/5 dark:border-light/5
            ${i % 2 === 0 ? '' : 'bg-dark/[0.02] dark:bg-light/[0.02]'}`}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2.5 text-dark/80 dark:text-light/70 font-mono text-xs">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CodeBlock = ({ code, language, label }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-dark/10 dark:border-light/10">
      <div className="flex items-center justify-between px-4 py-2
        bg-dark/5 dark:bg-light/5 border-b border-dark/10 dark:border-light/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs font-mono text-dark/40 dark:text-light/40">{label || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold text-dark/50 dark:text-light/40
            hover:text-dark dark:hover:text-light transition-colors duration-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-dark/[0.03] dark:bg-light/[0.03] p-4">
        <code className="text-xs font-mono text-dark/80 dark:text-light/70 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
};

const Checklist = ({ title, items }) => (
  <div className="my-6 border border-dark/10 dark:border-light/10 rounded-xl overflow-hidden">
    <div className="px-4 py-3 bg-dark/5 dark:bg-light/5 border-b border-dark/10 dark:border-light/10">
      <h3 className="text-sm font-bold text-dark dark:text-light">{title}</h3>
    </div>
    <ul className="divide-y divide-dark/5 dark:divide-light/5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 px-4 py-2.5 text-sm text-dark/70 dark:text-light/60">
          <span className="text-dark/30 dark:text-light/30 font-mono text-xs mt-0.5 shrink-0">[ ]</span>
          <span className="font-mono text-xs leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const renderBlock = (block, i) => {
  switch (block.type) {
    case "environment": return <EnvironmentBadge key={i} text={block.text} />;
    case "section": return (
      <div key={i}>
        <SectionHeading title={block.title} />
        {block.body && <BodyText text={block.body} />}
      </div>
    );
    case "body": return <BodyText key={i} text={block.text} />;
    case "architecture": return <Architecture key={i} steps={block.steps} />;
    case "callout": return <Callout key={i} variant={block.variant} title={block.title} body={block.body} />;
    case "table": return <DataTable key={i} headers={block.headers} rows={block.rows} />;
    case "code": return <CodeBlock key={i} code={block.code} language={block.language} label={block.label} />;
    case "checklist": return <Checklist key={i} title={block.title} items={block.items} />;
    default: return null;
  }
};

// ── Page ─────────────────────────────────────────────────────────────────────

export async function getStaticPaths() {
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = articles.find((a) => a.slug === params.slug) || null;
  return { props: { article } };
}

export default function ArticlePage({ article }) {
  if (!article) return null;

  return (
    <>
      <Head>
        <title>{article.title} - Anuka Fonseka</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={`${article.title} - Anuka Fonseka`} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={`https://anuka-fonseka.vercel.app/articles/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2026-02-01" />
        <meta name="keywords" content={article.tags.join(', ')} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": article.title,
              "description": article.description,
              "author": { "@type": "Person", "name": "Anuka Fonseka" },
              "datePublished": "2026-02-01",
            })
          }}
        />
      </Head>

      <TransitionEffect />

      <main className="text-dark dark:text-light min-h-[calc(100vh-5rem)]">
        <Layout className="!pt-10 md:!pt-14 sm:!pt-12 ">
          <div className="max-w-3xl mx-auto">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-semibold
                text-dark/50 dark:text-light/40 hover:text-dark dark:hover:text-light
                transition-colors duration-200 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              All articles
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span key={tag}
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded
                    bg-dark/5 dark:bg-light/10 text-dark/50 dark:text-light/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-black text-dark dark:text-light mb-2 leading-tight
              xl:text-3xl md:text-2xl sm:text-xl">
              {article.title}
            </h1>
            <p className="text-lg font-medium text-dark/50 dark:text-light/40 mb-4 md:text-base">
              {article.subtitle}
            </p>
            <p className="text-sm text-dark/60 dark:text-light/50 leading-relaxed max-w-2xl mb-4">
              {article.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-dark/40 dark:text-light/30 font-medium">
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </motion.div>

          <div className="border-t border-dark/10 dark:border-light/10" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 pb-20"
          >
            {article.content.map((block, i) => renderBlock(block, i))}
          </motion.div>
          </div>

        </Layout>
      </main>
    </>
  );
}