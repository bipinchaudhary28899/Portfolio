export const personalInfo = {
  name: "Bipin Chaudhary",
  role: "Full Stack Engineer",
  tagline: "Building scalable products with clean code and great UX.",
  bio: "I'm a Full Stack Engineer passionate about crafting high-performance web applications. I love working across the entire stack — from designing intuitive user interfaces to architecting robust backend systems. My focus is on writing clean, maintainable code that solves real problems.",
  achievements: [
    "3+ years building production web applications",
    "Delivered 10+ end-to-end features across distributed teams",
    "Strong advocate for performance, accessibility, and developer experience",
  ],
  email: "bkumar28899@gmail.com",
  github: "https://github.com/bipinchaudhary28899",
  linkedin: "https://linkedin.com/in/bipinchaudhary28899",
  twitter: "https://twitter.com/bipinchaudhary",
  resumeUrl: "/resume/resume.pdf",
  location: "India",
};

export const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A high-end, production-ready developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light mode, smooth animations, and a fully responsive layout.",
    image: "/projects/portfolio.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "https://github.com/bipinchaudhary28899/Portfolio",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with real-time inventory, Stripe payments, auth, and an admin dashboard. Built with Next.js, Prisma, PostgreSQL, and Stripe.",
    image: "/projects/ecommerce.png",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop kanban boards, and team collaboration features powered by WebSockets.",
    image: "/projects/taskapp.png",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "AI Chat Interface",
    description:
      "A sleek chat interface integrated with OpenAI API supporting streaming responses, conversation history, multiple models, and markdown rendering.",
    image: "/projects/aichat.png",
    tech: ["Next.js", "OpenAI API", "TypeScript", "Vercel AI SDK"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard with interactive charts, data filtering, CSV export, and role-based access control for enterprise teams.",
    image: "/projects/analytics.png",
    tech: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "REST API Boilerplate",
    description:
      "Production-ready Node.js REST API with JWT auth, rate limiting, input validation, Docker support, and comprehensive test coverage.",
    image: "/projects/api.png",
    tech: ["Node.js", "Express", "JWT", "Docker", "Jest"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const skills = {
  "Frontend": [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "𝓣𝓢" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Framer Motion", icon: "✦" },
    { name: "HTML / CSS", icon: "🌐" },
  ],
  "Backend": [
    { name: "Node.js", icon: "🟢" },
    { name: "Express.js", icon: "🚀" },
    { name: "Python", icon: "🐍" },
    { name: "FastAPI", icon: "⚡" },
    { name: "REST APIs", icon: "🔗" },
    { name: "GraphQL", icon: "◈" },
  ],
  "Database": [
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Redis", icon: "🔴" },
    { name: "Prisma", icon: "◆" },
    { name: "MySQL", icon: "🐬" },
    { name: "Supabase", icon: "⚡" },
  ],
  "DevOps & Tools": [
    { name: "Docker", icon: "🐳" },
    { name: "Git / GitHub", icon: "🔧" },
    { name: "Vercel", icon: "▲" },
    { name: "AWS", icon: "☁️" },
    { name: "CI/CD", icon: "🔄" },
    { name: "Linux", icon: "🐧" },
  ],
};

export const experiences = [
  {
    id: 1,
    role: "Full Stack Engineer",
    company: "Tech Startup",
    period: "2023 – Present",
    description:
      "Lead development of customer-facing web applications serving 50k+ users. Built and maintained microservices, improved core web vitals by 40%, and mentored junior developers.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2022 – 2023",
    description:
      "Delivered 15+ client projects from design to deployment. Specialized in React applications, animation-heavy UIs, and performance optimization for high-traffic sites.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Software Company",
    period: "2021 – 2022",
    description:
      "Developed and maintained full-stack web features. Gained strong foundation in REST API design, database modeling, and agile development workflows.",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
