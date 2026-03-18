---
title: 'Portfolio Chatbot Widget'
slug: 'portfolio-chatbot-widget'
created: '2026-03-17'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js 13.2.1', 'React 18', '@google/generative-ai', 'Tailwind CSS', 'Framer Motion']
files_to_modify:
  - src/pages/_app.js
  - src/pages/projects.js
files_to_create:
  - src/data/projectsData.js
  - src/data/portfolioContext.js
  - src/pages/api/chat.js
  - src/components/ChatWidget.js
  - src/components/ChatMessage.js
code_patterns: ['Pages Router API route', 'default export component', 'useState session cap']
test_patterns: []
---

# Tech-Spec: Portfolio Chatbot Widget

**Created:** 2026-03-17

---

## Overview

### Problem Statement

Portfolio visitors have no way to ask specific questions about Anuka's skills, experience, projects, or articles. They must manually navigate across multiple pages to find relevant information, which creates friction and reduces engagement.

### Solution

Add a floating chat widget (bottom-right, all pages) backed by a Next.js API route that calls the Google Gemini API (free tier). The bot answers questions about Anuka in third person using a prompt-stuffed system context built from existing portfolio data files. Session capped at 10 messages — no backend infrastructure or vector database required.

### Scope

**In Scope:**
- Floating chat bubble widget visible on all pages
- Q&A about bio, skills, experience, education, projects, and articles
- Anthropic API integration via a Next.js API route
- Session message cap (10 messages, client-side)
- Dark mode support
- Extract project text data to `src/data/projectsData.js`
- Extract bio/skills/experience/education to `src/data/portfolioContext.js`

**Out of Scope:**
- RAG / vector embeddings (revisit when 15+ long articles exist)
- Chat history persistence across sessions
- User authentication or per-user tracking
- Response streaming (non-streaming for simplicity)
- Analytics on chat usage
- Admin interface to update bot knowledge

---

## Context for Development

### Codebase Patterns

- **Pages Router only** — API route goes in `src/pages/api/chat.js`, no App Router
- **JavaScript only** — all files `.js`, no TypeScript, no type annotations
- **No "use client"** — not applicable in Pages Router; client components are just regular React components
- **Data files**: `src/data/` with named exports (e.g. `export const articles = [...]`). Follow this exact pattern for `projectsData.js` and `portfolioContext.js`
- **Component pattern**: default export for main components, sub-components defined in same file when only used internally
- **Tailwind desktop-first breakpoints**: base = desktop, `md:` = ≤767px, `sm:` = ≤639px
- **Dark mode**: always pair `text-dark dark:text-light`, `bg-light dark:bg-dark` etc. — never manually set `dark` class
- **Framer Motion**: `motion.div` for animations; do NOT wrap `next/link` in `motion.*`
- **`@/` path alias** maps to `src/` — use `import X from "@/components/X"` throughout
- **API route pattern**: `export default async function handler(req, res)` in `src/pages/api/`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/data/articlesData.js` | Reference pattern for `projectsData.js` — named export of array |
| `src/components/Skills.js` | Source of `skillCategories` data to extract to `portfolioContext.js` |
| `src/components/Experience.js` | Source of experience entries to extract to `portfolioContext.js` |
| `src/components/Education.js` | Source of education entries to extract to `portfolioContext.js` |
| `src/pages/about.js` | Source of bio paragraphs to extract to `portfolioContext.js` |
| `src/pages/projects.js` | Source of project text data to extract to `projectsData.js` |
| `src/pages/_app.js` | Add `<ChatWidget />` here so it renders on all pages |
| `src/pages/api/hello.js` | Reference pattern for Next.js API route structure |

### Technical Decisions

**No RAG**: With 1 article and 7 projects, the entire portfolio knowledge fits in ~8–10k tokens — well under Claude's context window. Full prompt-stuffing is simpler, faster, and cheaper. Revisit RAG when 15+ long articles exist.

**Model**: Use Google Gemini API (`gemini-1.5-flash`) — completely free tier: 15 RPM, 1,500 requests/day, no credit card required. Get a free API key at aistudio.google.com. The 1M token context window comfortably fits the entire portfolio knowledge base. Can be upgraded to `gemini-1.5-pro` by changing one constant if response quality needs improvement.

**Non-streaming**: Simpler API route + no ReadableStream handling on the client. Response time acceptable for Q&A style interaction.

**Session cap via useState**: `messageCount` state in `ChatWidget.js`. No localStorage, no backend — resets on page refresh. Simple and requires no infrastructure.

**projectsData.js — text only, no images**: Next.js static image imports (`import proj11 from "../../public/images/..."`) must stay in `projects.js` because they're resolved at build time. `projectsData.js` contains text data only (title, type, techStack, features, summary, github, link, slug). In `projects.js`, maintain a local `projectImages` map keyed by slug to pair images with data.

**Article content in system prompt**: For the 1 current article, serialize section titles + body text (skip `code`, `table`, `checklist` block types — too verbose). Include `title`, `description`, `tags`, and all `section`/`callout`/`body` blocks.

**API key**: `GOOGLE_API_KEY` env var. Accessed server-side only in the API route — never exposed to the client. Free, no credit card required. Get one at aistudio.google.com → Get API Key.

---

## Implementation Plan

### Tasks

- [x] **Task 1 — Install Google Generative AI SDK**
  - File: `package.json` (via npm)
  - Action: Run `npm install @google/generative-ai`
  - Notes: Only new dependency. Run from project root.

---

- [x] **Task 2 — Create `src/data/projectsData.js`**
  - File: `src/data/projectsData.js` (new)
  - Action: Create a named export `projects` as an array of plain objects with these fields per project. No image imports.

```js
export const projects = [
  {
    slug: "tuition-management-app",
    title: "Tution Manager – Comprehensive Tuition Management System", // preserve exact title incl. "Tution" typo
    type: "Featured Project",
    summary: "Tution Manager is a full-featured web application designed to help startup teachers to streamline their tuition operations. It provides an all-in-one solution for managing classes, students, payments, and academic assignments through a modern, mobile-optimized interface.",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    link: "https://class-manager-beta.vercel.app",
    github: "https://github.com/AnukaFonseka/tution-management-app.git",
    features: [
      "Class & Student Management – Organize classes by grade and subject with flexible student enrollment",
      "Payment Tracking – Monitor student payments, dues, and payment history with financial data integrity",
      "Responsive Design – Card-based mobile layouts and desktop-optimized views for seamless cross-device experience",
      "Analytics Dashboard – Visualize student performance, payment trends, and class statistics",
      "Schedule Management – Easy navigation and organization of class timetables",
    ],
  },
  {
    slug: "digital-raffle",
    title: "Richmond College 150th Anniversary Digital Raffle Website",
    type: "Website",
    techStack: ["Next.js", "Supabase", "Stripe"],
    link: "https://raffle.rcoba.lk",
    github: "",
    features: [],
  },
  {
    slug: "voting-dapp",
    title: "Blockchain Based Online Voting D-App",
    type: "D-App",
    techStack: ["Next.js", "Ethereum", "Solidity", "Hardhat"],
    link: "",
    github: "https://github.com/AnukaFonseka/Blockchain-based-Voting-dApp",
    features: [],
  },
  {
    slug: "futsalhub",
    title: "FutsalHub – Futsal Match and Player Management System",
    type: "Featured Project",
    summary: "FutsalHub is a modern web application built to manage futsal matches, players, and team activities within a futsal club. It simplifies the coordination of games, player availability, and performance tracking through an intuitive, real-time interface.",
    techStack: ["Next.js", "ShadCN UI", "Supabase", "Tailwind CSS", "Vercel"],
    link: "https://futsalhub-hq.vercel.app/",
    github: "#",
    features: [
      "Schedule and manage futsal matches with ease",
      "Player registration and team assignment",
      "Track player attendance and performance stats",
      "Match history and upcoming game calendar",
      "Admin and player roles with secure access",
      "Match results and player voting system",
      "Clean and responsive UI optimized for mobile and desktop",
    ],
  },
  {
    slug: "book-seller-platform",
    title: "Book Seller Platform",
    type: "Web Application",
    techStack: ["React", "Node.js", "MySQL", "TailwindCSS"],
    link: "",
    github: "https://github.com/AnukaFonseka/book-review-app-fe",
    features: [],
  },
  {
    slug: "medisense",
    title: "Medical Laboratory Management System",
    type: "Web Application",
    techStack: ["React", "Express", "Sequelize", "MySQL", "JWT", "Bcrypt"],
    link: "",
    github: "https://github.com/AnukaFonseka/medisense_be",
    features: [],
  },
  {
    slug: "weddings-by-sonali",
    title: "Event and Inventory Management System for Weddings By Sonali",
    type: "Featured Project",
    summary: "A web-based system developed to streamline event planning and inventory management for Weddings By Sonali, an event planning company.",
    techStack: ["React", "Node", "Express", "MySQL", "Tailwind CSS", "RTK Query"],
    link: "",
    github: "#",
    features: [
      "Inventory tracking and control with notifications for low stock",
      "Event scheduling and management for various types of events",
      "User-friendly dashboard for event and inventory overview",
      "Role-based access for admin and staff",
      "Real-time status updates for events and resources",
      "Integration of event calendar and resource management",
      "Reports generation for event summaries and inventory usage",
    ],
  },
];
```

---

- [x] **Task 3 — Create `src/data/portfolioContext.js`**
  - File: `src/data/portfolioContext.js` (new)
- Action: Create a named export `portfolioContext` with bio, skills, experience, education extracted verbatim from the source components/pages.

```js
export const portfolioContext = {
  bio: [
    "Anuka Fonseka is a Software Engineer specializing in building enterprise grade web applications and scalable backend systems. With a strong foundation in full-stack development, Anuka transforms complex business requirements into elegant, maintainable solutions.",
    "Anuka's expertise lies in architecting and deploying production systems using Java Spring Boot, Next.js, and Vue.js. Anuka has successfully integrated enterprise authentication solutions like WSO2 Identity Server, implemented SSO across multiple platforms, and optimized applications to achieve 95%+ Lighthouse performance scores.",
    "Beyond writing code, Anuka focuses on the complete software lifecycle from system architecture and database design to Docker containerization, CI/CD pipelines, and Linux infrastructure management.",
    "Currently at Tryonics, Anuka works on enterprise projects for clients like Fairfirst and IASL, leading development from architecture to deployment.",
  ],
  contact: {
    email: "akunafonseka@gmail.com",
    portfolio: "https://anuka-fonseka.vercel.app",
  },
  skills: [
    { title: "Languages & Frameworks", skills: ["Java", "JavaScript", "Spring Boot", "Next.js", "React", "Vue.js", "Laravel"] },
    { title: "DevOps & Infrastructure", skills: ["Docker", "Docker Compose", "Nginx", "Linux", "CI/CD", "SSL Configuration"] },
    { title: "Authentication & Security", skills: ["WSO2 Identity Server", "SSO", "LDAP", "OAuth", "HMAC Authentication"] },
    { title: "Databases & Backend", skills: ["MySQL", "JDBC", "REST APIs", "Microservices", "Node.js", "Express"] },
    { title: "Frontend Technologies", skills: ["Tailwind CSS", "Redux Toolkit", "Server-Side Rendering", "SEO Optimization", "Responsive Design"] },
    { title: "Tools & Practices", skills: ["Git", "Jira", "Confluence", "Figma", "Postman", "Agile/Scrum", "System Design"] },
  ],
  experience: [
    {
      position: "Software Engineer",
      company: "Tryonics",
      time: "March 2025 - Present",
      work: "Design, develop, and deploy enterprise web applications using Java, Spring Boot, Next.js, Vue.js, Laravel, Docker, and Linux-based infrastructure. Responsible for system architecture, authentication integration, deployment automation, and performance optimization.",
      projects: [
        {
          title: "Intranet System - Fairfirst",
          technologies: "Java, Vue.js, WSO2 Identity Server, Docker, Linux, Nginx",
          achievements: [
            "Integrated WSO2 Identity Server with enterprise applications",
            "Implemented Single Sign-On (SSO) authentication across internal systems",
            "Developed Java background jobs for user and application usage report (CSV) generation",
            "Implemented HMAC authentication for legacy systems integration",
            "Configured WSO2 Identity Server with multiple user stores (LDAP, JDBC)",
            "Automated synchronization of Active Directory and external user databases",
            "Managed deployments using Docker Compose, Nginx reverse proxy, and SSL configuration",
          ],
        },
        {
          title: "IASL Website & CMS Platform",
          technologies: "Next.js, Spring Boot, MySQL, Docker, Nginx",
          achievements: [
            "Migrated static website to dynamic Next.js-based CMS platform",
            "Achieved 95%+ Lighthouse performance score through optimization",
            "Implemented SEO optimization using SSR, optimized image delivery, sitemap generation",
            "Managed QA and production deployments using Docker Compose",
          ],
        },
        {
          title: "Assessor Management System - Fairfirst",
          technologies: "Laravel, Vue.js, MySQL, Nginx",
          achievements: [
            "Resolved QA issues and stabilized production builds",
            "Implemented synchronization with call center database systems",
          ],
        },
        {
          title: "Tryo Corporate Website CMS",
          technologies: "Next.js, Tailwind CSS, Java, Docker, Nginx",
          achievements: [
            "Migrated application architecture to modern Next.js routing",
            "Converted SCSS-based styling into optimized Tailwind CSS implementation",
            "Mentored junior developers and supported development delivery",
          ],
        },
      ],
    },
    {
      position: "Software Engineering Intern",
      company: "Amerck",
      time: "August 2023 - October 2023",
      work: "Contributed to development of a remote ICU patient monitoring system. Developed REST APIs using Node.js, Express, and Sequelize ORM. Built responsive front-end components using Vite, Tailwind CSS, and Redux Toolkit. Collaborated in Agile (Scrum) environment using Jira and Confluence.",
    },
    {
      position: "Software Engineering Intern",
      company: "Medisense",
      time: "April 2022 - June 2022",
      work: "Developed backend services using Java Spring Boot and MySQL. Participated in database design and system architecture discussions. Led UI/UX design using Figma. Built frontend features using React.",
    },
  ],
  education: [
    {
      type: "BSc Engineering (Hons) in Computer Systems Engineering",
      time: "2020-2024",
      place: "NSBM Green University, Homagama, Sri Lanka",
      info: "Relevant courses included Data Structures and Algorithms, Computer Systems Engineering, and Artificial Intelligence.",
    },
    {
      type: "G.C.E. Advanced Level - Physical Science Stream",
      time: "2019",
      place: "Richmond College, Galle, Sri Lanka",
      info: "Combined Mathematics - B | Chemistry - B | Physics - C",
    },
  ],
};
```

---

- [x] **Task 4 — Modify `src/pages/projects.js` to use projectsData.js**
  - File: `src/pages/projects.js` (modify)
- Action: Import `projects` from `@/data/projectsData`. Add a `projectImages` map (keyed by slug) directly in `projects.js` mapping each slug to its image array. Update the JSX to spread text data from `projectsData` and add `images` from the map.
- Keep all existing `import proj11 from ...` static image imports in place — they cannot move to a data file.
- The `FeaturedProject` and `Project` component signatures remain unchanged.

Implementation pattern:
```js
import { projects } from "@/data/projectsData";

const projectImages = {
  "tuition-management-app": [proj11, proj12, proj13, proj14, proj15, proj16],
  "digital-raffle": [proj21, proj22],
  "voting-dapp": [proj31, proj32],
  "futsalhub": [proj44, proj41, proj42, proj43],
  "book-seller-platform": [proj51, proj52, proj53],
  "medisense": [proj61, proj62, proj63, proj64, proj65, proj66, proj67],
  "weddings-by-sonali": [proj71, proj72, proj73, proj74],
};
```

Replace the 7 inline project JSX blocks with the following `.map()` render. The `col-span` class goes on the **wrapper `<div>`** in the map, NOT inside the component (the components don't accept a col-span prop):

```jsx
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
```

Array order in `projectsData.js` is the canonical render order — do not reorder entries.

**Slug invariant guard (F21):** Add a dev-time assertion immediately after the `projectImages` map declaration to catch any future slug mismatch between the data file and the image map:

```js
if (process.env.NODE_ENV === "development") {
  projects.forEach((p) => {
    if (!projectImages[p.slug]) {
      console.error(`[projects.js] Missing image entry for slug: "${p.slug}"`);
    }
  });
}
```

This logs a clear error in dev if a new project is added to `projectsData.js` without a corresponding `projectImages` entry, preventing a silent runtime crash.

---

- [x] **Task 5 — Create `src/pages/api/chat.js`**
  - File: `src/pages/api/chat.js` (new)
- Action: Create a POST-only API route that builds a system prompt from portfolio data and calls the Gemini API.

```js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioContext } from "@/data/portfolioContext";
import { projects } from "@/data/projectsData";
import { articles } from "@/data/articlesData";

const MODEL = "gemini-1.5-flash";
const MAX_MESSAGES = 10;
const MAX_CONTENT_LENGTH = 1000; // chars per message

// Cached at module scope — built once per cold start, not per request (F9)
const SYSTEM_PROMPT = buildSystemPrompt();

function buildSystemPrompt() {
  const { bio, skills, experience, education, contact } = portfolioContext;

  const bioText = bio.join("\n\n");

  const skillsText = skills
    .map((c) => `${c.title}: ${c.skills.join(", ")}`)
    .join("\n");

  const expText = experience
    .map((e) => {
      let text = `${e.position} at ${e.company} (${e.time})\n${e.work}`;
      if (e.projects) {
        text += "\nKey Projects:\n" + e.projects
          .map((p) => `  - ${p.title} (${p.technologies}): ${p.achievements.join("; ")}`)
          .join("\n");
      }
      return text;
    })
    .join("\n\n");

  const eduText = education
    .map((e) => `${e.type} | ${e.time} | ${e.place} — ${e.info}`)
    .join("\n");

  const projectsText = projects
    .map((p) => {
      let text = `${p.title} (${p.type})\nTech Stack: ${p.techStack.join(", ")}`;
      if (p.summary) text += `\nSummary: ${p.summary}`;
      if (p.features && p.features.length) text += `\nFeatures: ${p.features.join("; ")}`;
      if (p.link) text += `\nLive: ${p.link}`;
      if (p.github && p.github !== "#") text += `\nGitHub: ${p.github}`;
      return text;
    })
    .join("\n\n");

  const articlesText = articles
    .map((a) => {
      const contentSummary = a.content
        .filter((b) => b.type === "section" || b.type === "callout" || b.type === "body")
        .map((b) => (b.title ? `${b.title}: ${b.body || b.text || ""}` : b.body || b.text || ""))
        .join(" | ");
      return `Title: ${a.title}\nDescription: ${a.description}\nTags: ${a.tags.join(", ")}\nContent summary: ${contentSummary}`;
    })
    .join("\n\n");

  return `You are a portfolio assistant for Anuka Fonseka, a Software Engineer. Answer questions about Anuka in third person. Be concise, friendly, and accurate. Only answer questions related to Anuka's professional background — skills, projects, articles, education, and experience. If asked something unrelated, politely redirect to portfolio topics. Do not make up information not present below.

## Bio
${bioText}

## Contact
Email: ${contact.email}
Portfolio: ${contact.portfolio}

## Skills
${skillsText}

## Experience
${expText}

## Education
${eduText}

## Projects
${projectsText}

## Articles
${articlesText}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // F11: Guard for missing API key — fail fast with a clear message
  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not configured");
    return res.status(500).json({ error: "Chatbot not configured" });
  }

  const { messages } = req.body;

  // F1+F2: Validate messages array and enforce server-side session cap
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(429).json({ error: "Session limit exceeded" });
  }

  // F3: Validate each message has the correct shape and content length
  const validRoles = ["user", "assistant"];
  for (const msg of messages) {
    if (!validRoles.includes(msg.role) || typeof msg.content !== "string" || msg.content.length === 0) {
      return res.status(400).json({ error: "Invalid message format" });
    }
    if (msg.content.length > MAX_CONTENT_LENGTH) {
      return res.status(400).json({ error: "Message too long" });
    }
  }

  // F15: Last message must be from the user
  if (messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Last message must be from user" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT, // F9: use cached prompt
    });

    // Gemini uses { role: "user"|"model", parts: [{ text }] } format
    // Convert from { role: "user"|"assistant", content } format used by the client
    const geminiHistory = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: "Failed to get response" });
  }
}
```

**Notes:**
- `messages` arrives as `[{ role: "user"|"assistant", content: "..." }]` from the client
- Gemini's `startChat` takes `history` (all messages except the last) then `sendMessage` sends the final user message — this is the correct Gemini pattern
- Gemini uses `"model"` instead of `"assistant"` for the role — the conversion happens server-side
- `GOOGLE_API_KEY` must be set in `.env.local` for local dev AND in Vercel dashboard for production
- Free tier: 15 RPM, 1,500 requests/day — sufficient for a portfolio site
- Server enforces the 10-message cap independently of the client — POST with `messages.length > 10` returns HTTP 429
- Each message `content` is capped at 1,000 characters server-side; textarea should enforce `maxLength={500}` client-side

---

- [x] **Task 6 — Create `src/components/ChatMessage.js`**
  - File: `src/components/ChatMessage.js` (new)
- Action: Simple message bubble component.

```js
export default function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed
          ${isUser
            ? "bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-br-sm"
            : "bg-dark/10 text-dark dark:bg-light/10 dark:text-light rounded-bl-sm"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
```

---

- [x] **Task 7 — Create `src/components/ChatWidget.js`**
  - File: `src/components/ChatWidget.js` (new)
- Action: Floating chat widget with bubble trigger, sliding panel, message list, input, and session cap.

Key behaviors:
- Fixed position: `fixed bottom-6 right-6 z-50`
- Two states: closed (bubble only) and open (panel + bubble)
- Panel: `w-80 h-[480px]` with message scroll area + input footer
- Session cap: `messageCount >= 10` shows a "Session limit reached" notice instead of input
- `messages` state: array of `{ role, content }` — sent directly to `/api/chat`
- Loading state: show a pulsing "..." bubble while waiting for response
- On submit: append user message, POST to `/api/chat` with full messages array, append assistant reply

Component structure (single file, no sub-components):
```
ChatWidget
  ├── chatBubble (fixed bottom-right button)
  └── chatPanel (conditional on isOpen)
       ├── header (title + close button)
       ├── messageList (scrollable, maps messages to <ChatMessage />)
       ├── loadingIndicator (conditional)
       └── inputArea (text input + send button OR limit notice)
```

State:
```js
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [messageCount, setMessageCount] = useState(0);
const MESSAGE_LIMIT = 10;
const messagesEndRef = useRef(null); // for auto-scroll
```

Auto-scroll: `useEffect` that calls `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` whenever `messages` changes.

**Greeting (F17):** The greeting is static JSX rendered when `messages.length === 0`, outside the `messages.map()`, and is **never stored in state or sent to the API**. It disappears once the first real message is added. It does not count toward the 10-message limit.

```jsx
{messages.length === 0 && (
  <ChatMessage
    role="assistant"
    content="Hi! I'm Anuka's portfolio assistant. Ask me anything about Anuka's skills, projects, experience, or articles."
  />
)}
{messages.map((msg, i) => (
  <ChatMessage key={i} role={msg.role} content={msg.content} />
))}
```

**Send handler (F10, F13):**
```js
const SESSION_LIMIT_MESSAGE = "Session limit reached. Please refresh to start a new chat."; // F27: single source of truth

async function handleSend() {
  if (!input.trim() || isLoading || messageCount >= MESSAGE_LIMIT) return;
  const userMessage = { role: "user", content: input.trim() };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInput("");
  setIsLoading(true);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });
    // F10: handle non-ok responses explicitly
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "API error");
    }
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setMessageCount((c) => c + 1); // F13: only increment on success
  } catch (err) {
    setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    // Note: messageCount NOT incremented on failure — failed exchanges don't consume the session cap
  } finally {
    setIsLoading(false);
  }
}
```

**Input area (F18):** Both the textarea and Send button must be `disabled={isLoading}` to prevent concurrent requests:

```jsx
<textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
  disabled={isLoading}
  maxLength={500}
  placeholder="Ask me anything..."
  className="..."
/>
<button onClick={handleSend} disabled={isLoading} className="...">Send</button>
```

**Session limit display:** When `messageCount >= MESSAGE_LIMIT`, replace the input area entirely:

```jsx
{messageCount >= MESSAGE_LIMIT ? (
  <p className="text-sm text-center text-dark/60 dark:text-light/40 p-4">{SESSION_LIMIT_MESSAGE}</p>
) : (
  /* textarea + button */
)}
```

**Panel width (F12):** Panel must be responsive on small screens. This project uses desktop-first (max-width) breakpoints, so the base class is for large screens:
```
className="w-80 sm:w-[calc(100vw-3rem)] h-[480px] ..."
```
This gives 320px (`w-80`) on large screens and full-minus-padding width on small screens (≤639px).

Handle Enter key: `onKeyDown` on the textarea — submit on Enter without Shift (shown in input area spec above).

Dark mode: All Tailwind classes must include `dark:` variants. Panel background: `bg-light dark:bg-dark`. Border: `border-dark/20 dark:border-light/20`.

Framer Motion: Use `motion.div` with `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` for panel open animation.

---

- [x] **Task 8 — Modify `src/pages/_app.js`**
  - File: `src/pages/_app.js` (modify)
- Action: Add `import ChatWidget from "@/components/ChatWidget"` at the top with the other imports. Place `<ChatWidget />` **inside** the `<main>` element, after `<Analytics />` and before the closing `</main>` tag.

**CRITICAL**: `<ChatWidget />` must be inside `<main>`, NOT a sibling of it. The `<main>` carries `${montserrat.variable} font-mont bg-light dark:bg-dark` — the widget must be inside this to inherit font and dark mode classes.

Current `_app.js` structure (read-confirmed):
```js
// Existing imports (preserve all):
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { Analytics } from '@vercel/analytics/react';

// Add this import:
import ChatWidget from "@/components/ChatWidget";
```

Target placement in the JSX:
```js
<main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen h-full`}>
  <div className="sticky top-0 z-50">
    <Navbar />
  </div>
  <AnimatePresence initial={false} mode="wait">
    <Component key={router.asPath} {...pageProps} />
  </AnimatePresence>
  <Analytics />
  {/* <Footer /> */}
  <ChatWidget />   {/* ← add here, inside <main>, after <Analytics /> */}
</main>
```

Do NOT place `<ChatWidget />` inside `<AnimatePresence>` — it must be a direct child of `<main>`.

---

### Acceptance Criteria

- [ ] **AC-1:** Given the app is loaded on any page (home, about, projects, articles), when the user looks at the bottom-right corner, then a chat bubble button is visible, fixed in position, not obscuring main content.

- [ ] **AC-2:** Given the chat bubble is visible, when the user clicks the bubble, then the chat panel slides in with animation; when the user clicks the × button or bubble again, then the panel closes.

- [ ] **AC-3:** Given the chat panel is opened for the first time, when no messages have been sent yet, then a static assistant greeting is visible: "Hi! I'm Anuka's portfolio assistant. Ask me anything about Anuka's skills, projects, experience, or articles."

- [ ] **AC-4:** Given the chat panel is open, when the user types a question and presses Enter or Send, then their message appears in the chat, a loading indicator appears, and within a few seconds an accurate assistant reply is shown.

- [ ] **AC-5:** Given the user has sent 10 messages in the current session, when they attempt to type and send an 11th message, then the input area is replaced with "Session limit reached. Please refresh to start a new chat." and no API call is made.

- [ ] **AC-6:** Given the user has toggled dark mode on, when the chat widget is open, then the panel, message bubbles, and input render correctly in dark theme — no hardcoded light-only colors visible.

- [ ] **AC-7:** Given the `/api/chat` endpoint, when a GET request is made to it, then it returns HTTP 405 Method Not Allowed.

- [ ] **AC-8:** Given the chat feature is deployed to Vercel, when the browser's Network tab is inspected during a chat interaction, then `GOOGLE_API_KEY` is never present in any request URL, request body, or response.

- [ ] **AC-9:** Given the projects page renders after the `projectsData.js` refactor, when the output is compared to the pre-refactor page, then all 7 project titles, tech stacks, features, summaries, and links are identical.

- [ ] **AC-10:** Given the `/api/chat` endpoint, when a POST is made with `messages.length > 10`, then it returns HTTP 429.

- [ ] **AC-11:** Given the `/api/chat` endpoint, when a POST is made with a message whose `content` exceeds 1,000 characters, then it returns HTTP 400.

- [ ] **AC-12:** Given the Gemini API returns an error (500), when the chat widget receives the failed response, then an error message is shown in the chat and the message count is NOT incremented.

---

## Additional Context

### Dependencies

- **`@google/generative-ai`** — only new npm dependency. Install with `npm install @google/generative-ai`
- **`GOOGLE_API_KEY`** — must be added to `.env.local` for local dev AND to Vercel dashboard (Settings → Environment Variables) for production. Get a free key at aistudio.google.com → Get API Key (no credit card required).
- No other new packages required — Framer Motion and Tailwind already installed

### Testing Strategy

No test framework configured. Manual testing checklist:

- [ ] Open chat on home page, ask "What are Anuka's skills?" — verify accurate response
- [ ] Ask about a specific project ("Tell me about FutsalHub") — verify correct details
- [ ] Ask about the WSO2 article — verify bot references it correctly
- [ ] Send 10 messages — verify cap notice appears on the 11th attempt
- [ ] Toggle dark mode — verify widget renders correctly in both modes
- [ ] Open on mobile (≤767px) — verify widget doesn't cover main content awkwardly
- [ ] Check browser Network tab — verify `GOOGLE_API_KEY` is not in any response
- [ ] Load projects page — verify all projects render identically after projectsData.js refactor

### Notes

- **Branch**: Create `feature/chatbot-widget` before starting implementation. Never commit directly to `main`.
- **Env var for local**: Create `.env.local` in the project root (does not exist yet — confirmed). Add `GOOGLE_API_KEY=your_key_here`. **Before creating this file, verify `.env.local` is listed in `.gitignore`** (check with `grep ".env.local" .gitignore`). If it is not listed, add it before proceeding — committing this file would expose the API key. Get key free at aistudio.google.com.
- **Vercel env var**: Add `GOOGLE_API_KEY` in Vercel Dashboard → Project → Settings → Environment Variables → Production + Preview + Development
- **Free tier limits**: 15 requests/min, 1,500 requests/day. A portfolio site will never approach these limits.
- **Future RAG migration trigger**: When article count reaches ~15 and prompt size exceeds ~60k tokens, migrate articles to Upstash Vector (serverless, Vercel-compatible, no cold-start issues). Keep bio/skills/projects in prompt-stuffing permanently.
- **Model upgrade path**: To use a smarter model, change `MODEL` constant in `chat.js` from `"gemini-1.5-flash"` to `"gemini-1.5-pro"`. No other changes needed. Both are free tier.

## Review Notes
- Adversarial review completed on 2026-03-17
- Findings: 14 total, 14 fixed, 0 skipped
- Resolution approach: auto-fix
- Key fixes: rate limiting (F1), req.body crash guards (F2/F3), MAX_MESSAGES off-by-one (F5), error state isolation (F6), article filter expansion (F9), FeaturedProject link guards (F12)
