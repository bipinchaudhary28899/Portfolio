export const personalInfo = {
  name: "Bipin Kumar Chaudhary",
  firstName: "Bipin",
  lastName: "Chaudhary",
  role: "Full Stack Engineer",
  tagline: "Building scalable web systems that move metrics.",
  bio: "Full Stack Engineer with 3+ years of experience building scalable web systems across video streaming, enterprise analytics, and cloud-native applications. Improved video startup latency by 40% using HLS-based adaptive streaming, reduced database query latency by 30%, and enhanced UI performance by 20% through Angular rendering strategies. Strong in system design, distributed systems, and AI-powered features.",
  achievements: [
    "Improved video playback startup time by 40% via serverless HLS adaptive streaming (S3 → Lambda → FFmpeg)",
    "Enhanced frontend performance by 20% TBT reduction using Angular OnPush strategy — 60 FPS under high data load",
    "Architected a rail asset management backend serving 170K+ assets with sub-second real-time updates at Nagarro",
  ],
  stats: [
    { value: "3+",    label: "Years experience" },
    { value: "40%",   label: "Latency cut" },
    { value: "350+",  label: "DSA problems" },
  ],
  email: "bkumar28899@gmail.com",
  phone: "+91-8787230009",
  github: "https://github.com/bipinchaudhary28899",
  linkedin: "https://www.linkedin.com/in/bipin-chaudhary-39781b152/",
  leetcode: "https://leetcode.com/u/bkumar28899/",
  resumeUrl: "/resume/resume.pdf",
  location: "Bareilly, India",
};

export const projects = [
  {
    id: 1,
    title: "StreamSphere",
    description:
      "Serverless video streaming platform with HLS adaptive bitrate (360p/720p), event-driven Redis caching, cursor-based infinite scroll, and an AI enrichment pipeline using Whisper + GPT — reducing playback startup time by 40% and feed latency by 30–40%.",
    tech: ["Angular", "Node.js", "AWS S3", "Lambda", "FFmpeg", "MongoDB", "Redis"],
    liveUrl: "https://stream-sphere-blru.vercel.app/home",
    githubUrl: "https://github.com/bipinchaudhary28899/StreamSphere",
  },
  {
    id: 2,
    title: "DentalConnect",
    description:
      "Full-stack appointment platform for a dental clinic. OTP auth via WhatsApp, dynamic scheduling engine reconciling weekly schedules and slot blocks, doctor dashboard with live queue management, Row-Level Security, and API observability with cron-based log retention.",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Vercel", "WhatsApp API", "Zod", "JWT"],
    liveUrl: "https://www.chaudharydentalcare.com/",
    githubUrl: "https://github.com/bipinchaudhary28899/DentalConnect",
  },
  {
    id: 3,
    title: "Argumint",
    description:
      "Full-stack debate platform with AI-powered argument generation using OpenAI APIs, real-time WebSocket updates, and a React frontend. Users can create debate topics, post arguments, and receive AI-generated counterarguments to foster critical thinking and engagement.",
    tech: ["React.js", "Socket.io", "Node.js", "MongoDB", "Whisper API", "Zod", "JWT"],
    liveUrl: "https://argumint-frontend.vercel.app/",
    githubUrl: "https://github.com/bipinchaudhary28899/Argumint",
  }
];

export const skills = {
  "Languages": ["TypeScript", "JavaScript", "C++", "Java", "SQL"],
  "Core Concepts": ["Data Structures & Algorithms", "System Design", "OOP", "Concurrency", "Caching", "Distributed Systems", "REST APIs"],
  "Frontend": ["Angular", "React", "Next.js", "HTML5 / CSS3", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "REST APIs", "CI/CD", "Docker", "Git"],
  "AI / ML": ["OpenAI APIs", "Whisper (ASR)", "HuggingFace Transformers", "RAG", "Vector Embeddings"],
  "Cloud & Databases": ["AWS (S3, Lambda, CloudFront, EventBridge)", "SAP BTP", "SAP HANA", "MongoDB", "Redis", "PostgreSQL"],
};

export const experiences = [
  {
    id: 1,
    role: "Independent Full-Stack Developer",
    company: "Self-Employed",
    companyFull: "Independent Full-Stack Developer (Remote)",
    period: "Sept 2025 – Present",
    description:
      "Built and deployed production-grade applications including a video streaming platform (StreamSphere) and a clinic management system (DentalConnect) with real-world users. Designed end-to-end system architecture covering authentication, scheduling engines, caching strategies, and async workflows. Integrated third-party services — WhatsApp API and OpenAI — for real-time communication and AI-powered features.",
    tech: ["Next.js", "Angular", "Node.js", "AWS", "MongoDB", "Redis", "PostgreSQL", "OpenAI", "WhatsApp API"],
  },
  {
    id: 2,
    role: "Graduate Research Engineer",
    company: "SAP Labs",
    companyFull: "SAP Labs — iXp Internship (M.Tech MNNIT Allahabad)",
    period: "Aug 2024 – Jun 2025",
    description:
      "Performed functional and regression testing for SAP Business Application Studio (BAS), ensuring reliability of development workflows and platform features. Developed automated test scripts to convert manual test cases into repeatable validation pipelines. Validated database artifacts using SAP HANA Database Explorer and tested the HANA Vector Engine for correctness and stability.",
    tech: ["SAP BAS", "SAP HANA", "SAP BTP", "Vector Engine", "SQL", "Test Automation"],
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "Nagarro",
    companyFull: "Nagarro",
    period: "May 2021 – Sep 2023",
    description:
      "Improved frontend performance by 20% TBT reduction using Angular OnPush strategy and reusable component architecture, maintaining 60 FPS under high data load. Designed and developed scalable backend services for a rail asset management system managing 170K+ assets with sub-second real-time updates. Standardised CI/CD pipelines and unit testing (Jasmine), improving deployment speed by 15% and mentoring junior developers.",
    tech: ["Angular", "TypeScript", "Node.js", "REST APIs", "CI/CD", "Jasmine", "Docker"],
  },
];

export const education = [
  {
    id: 1,
    degree: "M.Tech — Computer Science & Engineering",
    institution: "MNNIT Allahabad",
    institutionFull: "Motilal Nehru National Institute of Technology, Allahabad",
    period: "Aug 2023 – Aug 2025",
    grade: "CPI: 8.75 / 10",
    description:
      "Advanced study in algorithms, distributed systems, machine learning, and cloud computing. Completed the SAP Labs iXp internship as part of the programme.",
    highlights: [
      "SAP Labs iXp Internship (Aug 2024 – Jun 2025)",
      "Research: distributed systems, cloud-native architectures, database internals",
      "CPI: 8.75 / 10",
    ],
  },
  {
    id: 2,
    degree: "B.Tech — Computer Science & Engineering",
    institution: "BIET Jhansi",
    institutionFull: "Bundelkhand Institute of Engineering and Technology",
    period: "Aug 2017 – Aug 2021",
    grade: "78.6%",
    description:
      "Core CS fundamentals: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
    highlights: [
      "Graduated with 78.6% aggregate",
      "Built first full-stack projects during coursework",
      "Solved 300+ DSA problems on LeetCode",
    ],
  },
];

export const codingPlatforms = [
  {
    id: 1,
    name: "LeetCode",
    handle: "bkumar28899",
    url: "https://leetcode.com/u/bkumar28899/",
    stat: "350+",
    statLabel: "Problems Solved",
    badge: "300+ Solved",
    color: "#FFA116",
    description: "Focus on arrays, dynamic programming, graphs, trees, and system design patterns.",
  },
  {
    id: 2,
    name: "HackerRank",
    handle: "bkumar28899",
    url: "https://www.hackerrank.com/profile/bkumar288991",
    stat: "5★",
    statLabel: "Gold Badge",
    badge: "5★ Gold",
    color: "#2EC866",
    description: "5-star ratings in Problem Solving and SQL. Certified in Problem Solving (Intermediate) and SQL (Advanced).",
  },
  {
    id: 3,
    name: "GitHub",
    handle: "bipinchaudhary28899",
    url: "https://github.com/bipinchaudhary28899",
    stat: "20+",
    statLabel: "Repositories",
    badge: "Open Source",
    color: "#ff6535",
    description: "Full-stack apps, serverless pipelines, AI integrations, and open-source contributions.",
  },
];

export type ContributionType = "feature" | "bug" | "documentation";
export type ContributionStatus = "merged" | "open" | "draft";

export const openSourceContributions = [
  {
    id: 1,
    date: "2025",
    repo: "S3DFX-CYBER/GSoC-Org-Finder",
    repoUrl: "https://github.com/S3DFX-CYBER/GSoC-Org-Finder-",
    prTitle: "feat: replace static milestone HTML with JS-driven rendering engine",
    prUrl: "https://github.com/S3DFX-CYBER/GSoC-Org-Finder-/pull/128",
    prNumber: "#128",
    type: "feature" as ContributionType,
    status: "merged" as ContributionStatus,
    language: "JavaScript",
    langColor: "#F7DF1E",
    description:
      "Replaced hardcoded static milestone HTML with a JS-driven rendering engine — introduced a MILESTONES data layer, date-aware state classification, and live 60s re-render cycle. Merged after multi-round review with edge case handling for invalid dates, UTC normalisation, and DOM guard checks.",
  },
  {
    id: 2,
    date: "2025",
    repo: "Shaurya01836/online-clipboard",
    repoUrl: "https://github.com/Shaurya01836/online-clipboard",
    prTitle: "feat: add animated skeleton loaders for dashboard and community pages",
    prUrl: "https://github.com/Shaurya01836/online-clipboard/pull/11",
    prNumber: "#11",
    type: "feature" as ContributionType,
    status: "merged" as ContributionStatus,
    language: "React",
    langColor: "#61DAFB",
    description:
      "Added animated skeleton loaders for Dashboard and Community pages, replacing plain text loading states with layout-matched shimmer rows and a smooth Framer Motion fade-in on data arrival — improving perceived performance across both desktop and mobile views.",
  },
];

export const certifications = [
  {
    id: 1,
    title: "JavaScript Foundations Professional Certificate",
    issuer: "Mozilla",
    date: "Jul 2025",
    credentialId: "",
    credentialUrl: "#",
    color: "#FF6611",
    skills: ["JavaScript", "Web Development"],
  },
  {
    id: 2,
    title: "Back End | Full Stack Web Development in Node.js",
    issuer: "Coding Ninjas",
    date: "Mar 2020",
    credentialId: "CN_Certificate_6e76f28bafc2bae8",
    credentialUrl: "#",
    color: "#F0672A",
    skills: ["Node.js", "Back-End Web Development"],
  },
  {
    id: 3,
    title: "Front End | Full Stack Web Development",
    issuer: "Coding Ninjas",
    date: "Jan 2020",
    credentialId: "CN_Certificate_b28d2dc8b7913999",
    credentialUrl: "#",
    color: "#F0672A",
    skills: ["Front-End Development"],
  },
  {
    id: 4,
    title: "Core Java with AI",
    issuer: "Internshala",
    date: "Feb 2019",
    credentialId: "DDC88A55-9E42-2011-2E6F-8BB60E254C10",
    credentialUrl: "#",
    color: "#0088CC",
    skills: ["Core Java", "Data Structures", "AI"],
  },
  {
    id: 5,
    title: "C++ Foundation with Data Structures",
    issuer: "Coding Ninjas",
    date: "Jan 2019",
    credentialId: "CN_Certificate_871670485fd70490",
    credentialUrl: "#",
    color: "#F0672A",
    skills: ["C++", "Data Structures"],
  },
];

export const navLinks = [
  { label: "About",       href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Skills",      href: "#skills" },
  { label: "Education",   href: "#education" },
  { label: "Open Source", href: "#opensource" },
  { label: "Contact",     href: "#contact" },
];
