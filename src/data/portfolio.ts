export const personalInfo = {
  name: "Bipin Kumar Chaudhary",
  firstName: "Bipin",
  lastName: "Chaudhary",
  role: "Full Stack Engineer",
  tagline: "Building scalable web systems that move metrics.",
  bio: "Full Stack Engineer with 3+ years of experience building scalable web systems across video streaming, enterprise analytics, and cloud-native applications. Improved video startup latency by 40% using HLS-based adaptive streaming, reduced database query latency by 30%, and enhanced UI performance by 20% through Angular rendering strategies. Strong in system design, distributed systems, and AI-powered features.",
  achievements: [
    "Improved video playback startup time by 40% via serverless HLS adaptive streaming (S3 → Lambda → FFmpeg)",
    "Enhanced frontend performance by 20% TBT reduction using Angular OnPush strategy - 60 FPS under high data load",
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
      "Serverless video streaming platform with HLS adaptive bitrate (360p/720p), event-driven Redis caching, cursor-based infinite scroll, and an AI enrichment pipeline using Whisper + GPT - reducing playback startup time by 40% and feed latency by 30–40%.",
    tech: ["Angular", "Node.js", "AWS S3", "Lambda", "FFmpeg", "MongoDB", "Redis"],
    liveUrl: "https://stream-sphere-blru.vercel.app/home",
    githubUrl: "https://github.com/bipinchaudhary28899/StreamSphere",
    image: "/images/StreamSphere.png",
  },
  {
    id: 2,
    title: "DentalConnect",
    description:
      "Full-stack appointment platform for a dental clinic. OTP auth via WhatsApp, dynamic scheduling engine reconciling weekly schedules and slot blocks, doctor dashboard with live queue management, Row-Level Security, and API observability with cron-based log retention.",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Vercel", "WhatsApp API", "Zod", "JWT"],
    liveUrl: "https://www.chaudharydentalcare.com/",
    githubUrl: "https://github.com/bipinchaudhary28899/DentalConnect",
    image: "/images/DentalCare.png",
  },
  {
    id: 3,
    title: "Argumint",
    description:
      "Full-stack debate platform with AI-powered argument generation using OpenAI APIs, real-time WebSocket updates, and a React frontend. Users can create debate topics, post arguments, and receive AI-generated counterarguments to foster critical thinking and engagement.",
    tech: ["React.js", "Socket.io", "Node.js", "MongoDB", "Whisper API", "Zod", "JWT"],
    liveUrl: "https://argumint-frontend.vercel.app/",
    githubUrl: "https://github.com/bipinchaudhary28899/Argumint",
    image: "/images/Argumint.png",
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
    logo: "",
    description:
      "Built and deployed production-grade applications including a video streaming platform (StreamSphere) and a clinic management system (DentalConnect) with real-world users. Designed end-to-end system architecture covering authentication, scheduling engines, caching strategies, and async workflows. Integrated third-party services - WhatsApp API and OpenAI - for real-time communication and AI-powered features.",
    tech: ["Next.js", "Angular", "Node.js", "AWS", "MongoDB", "Redis", "PostgreSQL", "OpenAI", "WhatsApp API"],
    achievements: [
      "Built StreamSphere - serverless HLS video platform reducing playback startup latency by 40%",
      "Built DentalConnect - full-stack clinic booking system with WhatsApp OTP and live queue management",
      "Integrated OpenAI Whisper + GPT pipeline for AI-powered video content enrichment",
      "Designed end-to-end system architecture: auth, scheduling engine, Redis caching, async workflows",
    ],
    metrics: [
      { value: "40%",  label: "Latency reduced",    numeric: 40,  suffix: "%",  float: false },
      { value: "2",    label: "Products shipped",    numeric: 2,   suffix: "",   float: false },
      { value: "5+",   label: "APIs integrated",     numeric: 5,   suffix: "+",  float: false },
    ],
  },
  {
    id: 2,
    role: "Graduate Research Engineer",
    company: "SAP Labs",
    companyFull: "SAP Labs - iXp Internship (M.Tech MNNIT Allahabad)",
    period: "Aug 2024 – Jun 2025",
    logo: "/images/logos/sap-logo.png",
    description:
      "Performed functional and regression testing for SAP Business Application Studio (BAS), ensuring reliability of development workflows and platform features. Developed automated test scripts to convert manual test cases into repeatable validation pipelines. Validated database artifacts using SAP HANA Database Explorer and tested the HANA Vector Engine for correctness and stability.",
    tech: ["SAP BAS", "SAP HANA", "SAP BTP", "Vector Engine", "SQL", "Test Automation"],
    achievements: [
      "Performed functional & regression testing for SAP Business Application Studio (BAS)",
      "Converted manual test cases into automated repeatable validation pipelines",
      "Validated SAP HANA Vector Engine - correctness, performance, and stability testing",
      "Worked within M.Tech iXp programme, gaining deep exposure to enterprise cloud platforms",
    ],
    metrics: [
      { value: "10mo",  label: "Duration",               numeric: 10,  suffix: "mo", float: false },
      { value: "3",     label: "SAP products tested",    numeric: 3,   suffix: "",   float: false },
      { value: "100+",  label: "Test cases automated",   numeric: 100, suffix: "+",  float: false },
    ],
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "Nagarro",
    companyFull: "Nagarro",
    period: "May 2021 – Sep 2023",
    logo: "/images/logos/nagarro-logo.png",
    description:
      "Improved frontend performance by 20% TBT reduction using Angular OnPush strategy and reusable component architecture, maintaining 60 FPS under high data load. Designed and developed scalable backend services for a rail asset management system managing 170K+ assets with sub-second real-time updates. Standardised CI/CD pipelines and unit testing (Jasmine), improving deployment speed by 15% and mentoring junior developers.",
    tech: ["Angular", "TypeScript", "Node.js", "REST APIs", "CI/CD", "Jasmine", "Docker"],
    achievements: [
      "Reduced frontend TBT by 20% using Angular OnPush strategy - sustained 60 FPS under high data load",
      "Architected backend for rail asset management system serving 170K+ assets with sub-second updates",
      "Standardised CI/CD pipelines, improving deployment speed by 15%",
      "Mentored junior developers and established unit testing culture with Jasmine",
    ],
    metrics: [
      { value: "2.3yr",  label: "Tenure",            numeric: 2.3,  suffix: "yr",  float: true  },
      { value: "170K+",  label: "Assets managed",    numeric: 170,  suffix: "K+",  float: false },
      { value: "20%",    label: "TBT reduction",     numeric: 20,   suffix: "%",   float: false },
    ],
  },
  {
    id: 4,
    role: "Web Development Intern",
    company: "FoodWagon",
    companyFull: "FoodWagon Private Limited · Internship",
    period: "Jun 2020 – Jul 2020",
    logo: "/images/logos/Foodwagon-logo.png",
    description:
      "Developed a full-stack web application for FoodWagon, enhancing user experience and functionality. Utilised HTML, CSS, and JavaScript to create a responsive and visually appealing interface. Delivered the project on time, demonstrating strong time management and organisational skills.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    achievements: [
      "Developed a full-stack food ordering web application from scratch",
      "Built responsive, visually appealing UI using HTML, CSS, and JavaScript",
      "Delivered the complete project on time within the 2-month internship window",
    ],
    metrics: [
      { value: "2mo",  label: "Duration",         numeric: 2,  suffix: "mo", float: false },
      { value: "1",    label: "Full-stack app",   numeric: 1,  suffix: "",   float: false },
    ],
  },
  {
    id: 5,
    role: "Teaching Assistant",
    company: "Coding Ninjas",
    companyFull: "Coding Ninjas India · Internship",
    period: "Jun 2019 – Sep 2019",
    logo: "/images/logos/coding_ninjas_logo.png",
    description:
      "Assisted students in understanding and solving problems related to Data Structures and Algorithms using C++. Resolved doubts through chat support, discussion forums, and one-on-one interactions, ensuring conceptual clarity and logical thinking. Guided learners through coding exercises and debugged code to help them build strong problem-solving skills. Contributed to maintaining an engaging and supportive learning environment for better course outcomes.",
    tech: ["C++", "Data Structures", "Algorithms", "Competitive Programming", "Computer Science"],
    achievements: [
      "Mentored 200+ students in Data Structures & Algorithms using C++",
      "Resolved doubts via chat support, discussion forums, and 1-on-1 sessions",
      "Debugged student code and guided them through structured problem-solving frameworks",
      "Maintained high student engagement and course completion rates",
    ],
    metrics: [
      { value: "200+",  label: "Students mentored",  numeric: 200,  suffix: "+",  float: false },
      { value: "4mo",   label: "Duration",            numeric: 4,    suffix: "mo", float: false },
      { value: "7+",    label: "Topics covered",      numeric: 7,    suffix: "+",  float: false },
    ],
  },
];

export const education = [
  {
    id: 1,
    degree: "M.Tech - Computer Science & Engineering",
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
    degree: "B.Tech - Computer Science & Engineering",
    institution: "BIET Jhansi",
    institutionFull: "Bundelkhand Institute of Engineering and Technology",
    period: "Aug 2017 – Aug 2021",
    grade: "78.6%",
    description:
      "Core CS fundamentals: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
    highlights: [
      "Graduated with 78.6% aggregate",
      "Built first full-stack projects during coursework",
      "Solved 350+ DSA problems on LeetCode",
    ],
  },
  {
    id: 3,
    degree: "Intermediate (Class 12th) - PCM",
    institution: "Dyal Singh Public School",
    institutionFull: "Dyal Singh Public School, Karnal, Haryana",
    period: "2016 – 2017",
    grade: "87.2% (CBSE)",
    description:
      "Physics, Chemistry & Mathematics stream with CBSE board examinations. Achieved school topper position in the Computers subject.",
    highlights: [
      "School topper in Computers - 96/100 (CBSE Boards)",
      "87.2% aggregate in PCM stream",
    ],
  },
  {
    id: 4,
    degree: "High School (Class 10th)",
    institution: "Kendriya Vidyalaya Karnal",
    institutionFull: "Kendriya Vidyalaya Karnal",
    period: "2014 – 2015",
    grade: "9.2 / 10 (CGPA)",
    description:
      "Completed secondary schooling under CBSE curriculum with strong academic performance across all core subjects.",
    highlights: [
      "CGPA: 9.2 / 10 - CBSE board examinations",
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
    badge: "350+ Solved",
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
      "Replaced hardcoded static milestone HTML with a JS-driven rendering engine - introduced a MILESTONES data layer, date-aware state classification, and live 60s re-render cycle. Merged after multi-round review with edge case handling for invalid dates, UTC normalisation, and DOM guard checks.",
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
      "Added animated skeleton loaders for Dashboard and Community pages, replacing plain text loading states with layout-matched shimmer rows and a smooth Framer Motion fade-in on data arrival - improving perceived performance across both desktop and mobile views.",
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
    image: "/images/Certificates/JS_Mozilla.png",
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
    image: "/images/Certificates/Backend_Nodejs.png",
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
    image: "/images/Certificates/Frontend.png",
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
    image: "/images/Certificates/Core_Java_with_AI.png",
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
    image: "/images/Certificates/DS_in_C++.png",
  },
  {
    id: 6,
    title: "Java (Basic) Certificate",
    issuer: "HackerRank",
    date: "Sep 11, 2020",
    credentialId: "417e976c4067",
    credentialUrl: "https://www.hackerrank.com/certificates/417e976c4067",
    color: "#00EA64",
    skills: ["Java"],
    image: "/images/Certificates/Java(Basic).png",
  },
  {
    id: 7,
    title: "Java (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "Sep 15, 2020",
    credentialId: "999df518f646",
    credentialUrl: "https://www.hackerrank.com/certificates/999df518f646",
    color: "#00EA64",
    skills: ["Java"],
    image: "/images/Certificates/Java(Intermediate).png",
  },
  {
    id: 8,
    title: "C++ (Basic) Certificate",
    issuer: "HackerRank",
    date: "Sep 15, 2020",
    credentialId: "a0daf08a64c4",
    credentialUrl: "https://www.hackerrank.com/certificates/a0daf08a64c4",
    color: "#00EA64",
    skills: ["C++"],
    image: "/images/Certificates/C++(Basic).png",
  },
];

export const navLinks = [
  { label: "About",       href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Skills",      href: "#skills" },
  { label: "Education",   href: "#education" },
  { label: "Open Source", href: "#opensource" },
  { label: "Hire Me",     href: "#freelance" },
  { label: "Contact",     href: "#contact" },
];
