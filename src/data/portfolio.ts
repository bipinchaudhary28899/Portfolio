export const personalInfo = {
  name: "Bipin Kumar Chaudhary",
  firstName: "Bipin",
  lastName: "Chaudhary",
  role: "Full Stack AI Engineer",
  tagline: "Building scalable web systems that move metrics.",
  bio: "M.Tech graduate from MNNIT Allahabad with 3+ years in the industry - including 10 months at SAP Labs and 2.5 years as a Full Stack Developer at Nagarro - I like building things that real users actually depend on. Full Stack AI Engineer with 3+ years of experience building scalable web systems across video streaming, enterprise analytics, and cloud-native applications. Improved video startup latency by 40% using HLS-based adaptive streaming, reduced database query latency by 30%, and enhanced UI performance by 20% through Angular rendering strategies. Strong in system design, distributed systems, and AI-powered features.",
  achievements: [
    "Improved video playback startup time by 40% via serverless HLS adaptive streaming (S3 → Lambda → FFmpeg)",
    "Enhanced frontend performance by 20% TBT reduction using Angular OnPush strategy - 60 FPS under high data load",
    "Architected a rail asset management backend serving 170K+ assets with sub-second real-time updates at Nagarro",
  ],
  stats: [
    { value: "3+",    label: "Years experience" },
    { value: "40%",   label: "Latency cut" },
    { value: "385+",  label: "DSA problems" },
  ],
  email: "bkumar28899@gmail.com",
  phone: "+91-8787230009",
  github: "https://github.com/bipinchaudhary28899",
  linkedin: "https://www.linkedin.com/in/bipin-chaudhary-39781b152/",
  leetcode: "https://leetcode.com/u/bkumar28899/",
  resumeUrl: "/resume/resume.pdf",
  location: "Bareilly, India",
};

export interface CaseStudy {
  origin: string;
  problem: string;
  decisions: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  metrics: { value: string; label: string; detail: string }[];
  architecture: string;
}

export const projects = [
  {
    id: 1,
    title: "StreamSphere",
    description:
      "A full-stack YouTube-style video platform built with Angular 17 and Node.js/Express. StreamSphere supports Google OAuth login, direct-to-S3 video uploads, HLS adaptive streaming, a fully serverless AI pipeline (Whisper transcription + GPT-4o-mini vision + synthesis + HuggingFace categorization), comments, likes, watch history, a Netflix-style hero carousel, and a layered performance architecture that keeps the feed fast at scale.",
    tech: ["Angular", "Node.js", "AWS S3", "Lambda", "FFmpeg", "MongoDB", "Redis"],
    liveUrl: "https://stream-sphere-blru.vercel.app/home",
    githubUrl: "https://github.com/bipinchaudhary28899/StreamSphere",
    image: "/images/StreamSphere.png",
    cardMetrics: [
      { value: "40%", label: "faster startup" },
      { value: "3", label: "adaptive bitrates" },
      { value: "3", label: "caching layers" },
    ],
    caseStudy: {
      origin:
        "StreamSphere began as a way to upskill on AWS. I set out to build a simple YouTube clone - a hands-on excuse to learn S3, Lambda, CloudFront, and the wider serverless ecosystem. But as I kept adding features, swapping in new tech, and reworking the architecture, it outgrew the clone entirely and became its own product: a streaming platform with a serverless AI enrichment pipeline and a layered performance design. The steepest learning curve was AWS itself - wiring Lambda, S3, and CloudFront into one coherent serverless pipeline.",
      problem:
        "Most video platforms transcode on upload but still suffer from cold-start latency because segments aren't cached at the edge. Users abandon streams that take over 3 seconds to start - a direct hit to engagement. I needed a pipeline that produced edge-ready HLS segments the moment a video was uploaded, with zero server idle cost between uploads.",
      decisions: [
        {
          title: "HLS over WebRTC",
          detail:
            "WebRTC's peer topology doesn't scale for VOD. HLS with adaptive bitrate (360p / 720p / 1080p) lets CloudFront cache segments globally - the client auto-selects quality based on bandwidth, with no server involvement after upload.",
        },
        {
          title: "Lambda + FFmpeg over Elastic Transcoder",
          detail:
            "AWS Elastic Transcoder costs $0.015/min and has limited format control. A custom FFmpeg Lambda layer gave full control over segment duration, keyframe intervals, and audio normalization at a fraction of the cost - roughly 70% cheaper for my workload.",
        },
        {
          title: "Redis cursor cache over offset pagination",
          detail:
            "Offset pagination degrades to O(n) scans on large collections. A Redis-backed cursor cache stores the last seen ObjectId per session, keeping infinite-scroll feed queries at constant O(1) lookup regardless of feed depth.",
        },
      ],
      challenges: [
        {
          title: "Lambda cold-start on FFmpeg layer",
          detail:
            "The FFmpeg binary is 90 MB. Cold starts were hitting 4-6s, negating the latency benefit. Fixed by using a scheduled pre-warm Lambda invocation every 5 minutes and compressing the binary with UPX - reduced cold start to under 800ms.",
        },
        {
          title: "HLS segment drift on variable-frame-rate input",
          detail:
            "User-uploaded videos had inconsistent framerates (29.97, 25, 24). FFmpeg's default segmenter drifted on non-keyframe boundaries, causing playback stutter on seek. Solved by forcing keyframe intervals with -force_key_frames and using -segment_time_delta.",
        },
        {
          title: "Cache invalidation on re-upload",
          detail:
            "When a user replaced a video, CloudFront still served stale segments. Implemented a post-upload Lambda that calls CloudFront's invalidation API with the video's prefix path, combined with versioned S3 keys to ensure zero stale-content window.",
        },
      ],
      metrics: [
        { value: "40%", label: "Startup latency reduction", detail: "From ~3.2s to ~1.9s average first-frame time, measured across 50 test uploads on varied network conditions." },
        { value: "70%", label: "Transcoding cost cut", detail: "Lambda + FFmpeg vs AWS Elastic Transcoder on equivalent workload - from $0.015/min to ~$0.004/min equivalent." },
        { value: "<800ms", label: "Lambda cold start", detail: "After UPX compression of the FFmpeg binary and scheduled pre-warm Lambda invocations." },
        { value: "3", label: "Caching layers", detail: "Browser Cache-Control → CloudFront CDN edge → Redis app cache, before a request ever reaches MongoDB." },
      ],
      architecture:
        "Upload → S3 (raw) → S3 Event → Lambda (FFmpeg) → S3 (HLS segments) → CloudFront CDN → Angular Player\n\nParallel: S3 Event → Lambda (Whisper + GPT) → MongoDB (metadata)\n\nFeed API: Angular → Node.js → Redis (cursor) → MongoDB → Response",
    } satisfies CaseStudy,
    diagrams: [
      {
        src: "/images/streamsphere-architecture/01-hld.png",
        title: "High-Level Design",
        caption: "The full system at a glance - Angular SPA, a stateless Express API, MongoDB/Redis, and the S3 → Lambda → CloudFront media path alongside the AI services.",
      },
      {
        src: "/images/streamsphere-architecture/02-upload-transcode.png",
        title: "Upload + HLS Transcoding",
        caption: "The browser uploads straight to S3 via a presigned URL; an S3 event triggers Lambda transcoding, which webhooks the backend once HLS renditions are ready.",
      },
      {
        src: "/images/streamsphere-architecture/03-ai-pipeline.png",
        title: "AI Enrichment Pipeline",
        caption: "All five Lambda phases - FFmpeg outputs, audio detection, parallel Whisper transcription + GPT-4o vision, synthesis, and zero-shot categorization.",
      },
      {
        src: "/images/streamsphere-architecture/04-category-generation.png",
        title: "Video Category Generation",
        caption: "HuggingFace BART-MNLI scores the aiSummary against 44 genre-framed categories, with retries on 429/503 and a 'General' fallback.",
      },
      {
        src: "/images/streamsphere-architecture/05-description-synthesis.png",
        title: "Description (aiSummary) Generation",
        caption: "GPT-4o-mini merges title, uploader description, transcript, and visual summary into one rich paragraph, falling back to concatenation on error.",
      },
      {
        src: "/images/streamsphere-architecture/06-auth.png",
        title: "Authentication - Google OAuth + JWT",
        caption: "Google verifies the ID token, the backend upserts the user and issues an HS256 JWT that an interceptor attaches to every subsequent request.",
      },
      {
        src: "/images/streamsphere-architecture/07-feed-pagination.png",
        title: "Feed - Cursor Pagination",
        caption: "Keyset pagination on _id keeps deep-scroll queries O(1) and insert-stable, prefetched 800px early via an IntersectionObserver sentinel.",
      },
      {
        src: "/images/streamsphere-architecture/08-caching-invalidation.png",
        title: "Redis Caching + Invalidation",
        caption: "Cache-aside reads with tuned TTLs and targeted busting on writes; a Redis outage silently falls through to MongoDB as the source of truth.",
      },
      {
        src: "/images/streamsphere-architecture/09-view-dedup.png",
        title: "View Counting with Deduplication",
        caption: "A 24-hour Redis key per user (or anonymous UUID) stops refreshes and back-navigation from inflating a video's view count.",
      },
      {
        src: "/images/streamsphere-architecture/10-reactions.png",
        title: "Like / Dislike Toggle",
        caption: "Mutually exclusive reactions are resolved server-side in a single document save, then the video and top-liked caches are invalidated.",
      },
      {
        src: "/images/streamsphere-architecture/11-resilience.png",
        title: "Resilience & Fallbacks",
        caption: "Every subsystem degrades gracefully - AI, Redis, and player failures are isolated so a single fault never takes the whole app down.",
      },
      {
        src: "/images/streamsphere-architecture/12-caching-layers.png",
        title: "Three-Layer Caching Architecture",
        caption: "Requests are served from the earliest cache hit: L1 Browser (instant, Cache-Control), L2 CloudFront edge (~10–30 ms, HLS segments + thumbnails), or L3 Redis (~30–60 ms, feed/video/search keys). Only a full miss reaches MongoDB.",
      },
    ],
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
    cardMetrics: [
      { value: "0", label: "double bookings" },
      { value: "100%", label: "WhatsApp delivery" },
      { value: "Live", label: "queue management" },
    ],
    caseStudy: {
      origin:
        "DentalConnect started from a real need in my own family. A close family member is a dentist who wanted a website where patients could book appointments online. That single, concrete use case became the seed for a full platform - a scheduling engine, live queue management, and WhatsApp-based OTP auth all grew around it. The learning curve here was Next.js and PostgreSQL, plus a complete end-to-end integration of the WhatsApp API for real-world messaging.",
      problem:
        "The clinic was running appointments on paper and WhatsApp messages - doctors double-booked, patients showed up at wrong times, and there was no visibility into the live queue. No-show rates sat around 25-30%, typical for clinics with no automated reminders. The core challenge was modeling a scheduling engine complex enough to handle doctor leaves, emergency slot blocks, and recurring weekly availability without creating a maintenance nightmare.",
      decisions: [
        {
          title: "WhatsApp OTP over SMS",
          detail:
            "SMS delivery failure rates in India run 15-20% due to DND filters. WhatsApp has near-100% delivery for registered numbers and patients are already in the app. Chose the WhatsApp Business API with a 6-digit OTP flow - zero password friction and implicit phone verification in one step.",
        },
        {
          title: "PostgreSQL + Supabase over MongoDB",
          detail:
            "Scheduling is inherently relational: doctors, slots, appointments, blocks, and overrides all have hard referential constraints. A slot must belong to exactly one doctor; an appointment must reference exactly one slot. MongoDB's flexible schema would have pushed those constraints into application code, which is a bug farm. Supabase's hosted Postgres also gave Row-Level Security for free.",
        },
        {
          title: "Row-Level Security at the DB layer",
          detail:
            "Rather than filtering in the API layer (where a bug leaks data), patients can only SELECT their own appointments, and doctors only see their own queues - enforced by Postgres RLS policies. Even if the API is compromised, the database refuses unauthorized reads at the query level.",
        },
        {
          title: "Zod for end-to-end validation",
          detail:
            "Booking a slot involves 6 fields that all need to be consistent (date, doctor, duration, slot type, patient id, time). A single Zod schema validates the API request, generates TypeScript types for the handler, and produces user-facing error messages - one source of truth instead of three.",
        },
      ],
      challenges: [
        {
          title: "Conflict-free scheduling engine",
          detail:
            "The hardest part: a doctor has weekly recurring availability, but also holiday blocks, emergency overrides, and existing appointments - all of which can overlap. Built a slot resolver that materializes available slots on-the-fly by taking the weekly schedule, subtracting blocks and existing appointments within the requested window, and returning only conflict-free options. Zero SQL date-range overlap using the exclusion constraint pattern.",
        },
        {
          title: "WhatsApp webhook reliability",
          detail:
            "WhatsApp webhooks retry on non-200 responses, which caused duplicate OTP sends if the DB write was slow. Added idempotency keys (hash of phone + timestamp rounded to 30s) to deduplicate incoming webhook events before processing - solved duplicate OTP complaints on day 2 of launch.",
        },
        {
          title: "Live queue without WebSockets",
          detail:
            "A full WebSocket server felt like over-engineering for a 2-doctor clinic. Used Supabase Realtime (Postgres LISTEN/NOTIFY under the hood) to push queue updates to the doctor dashboard. Zero additional infrastructure - the queue refreshes within 200ms of any appointment status change.",
        },
      ],
      metrics: [
        { value: "0", label: "Double bookings since launch", detail: "Conflict detection runs at the database level with exclusion constraints - no two appointments can share the same doctor + time slot." },
        { value: "100%", label: "WhatsApp delivery rate", detail: "Compared to ~80% for SMS in India due to DND filters. Zero failed OTP deliveries." },
      ],
      architecture:
        "Patient → Next.js → /api/book → Zod validation → Supabase (slot conflict check + RLS) → WhatsApp API (OTP)\n\nDoctor Dashboard → Supabase Realtime subscription → Live queue (LISTEN/NOTIFY)\n\nCron → /api/cleanup → Supabase → Log retention (7-day rolling)",
    } satisfies CaseStudy,
  },
  {
    id: 3,
    title: "Argumint",
    description:
      "A multiplayer debate platform where players join rooms, argue for or against a motion, and get scored by an AI judge - with optional human judges whose reliability is itself scored. Supports two debate modes: Alternate (structured turn-by-turn) and Buzzer (grab-the-mic free-for-all). Live audio runs over WebRTC; everything else flows over Socket.IO.",
    tech: ["React.js", "Socket.io", "Node.js", "MongoDB", "Whisper API", "Zod", "JWT"],
    liveUrl: "https://argumint-frontend.vercel.app/",
    githubUrl: "https://github.com/bipinchaudhary28899/Argumint",
    image: "/images/Argumint.png",
    cardMetrics: [
      { value: "<2s", label: "AI judge latency" },
      { value: "10+", label: "concurrent rooms" },
      { value: "GPT-4", label: "AI scorer" },
    ],
    caseStudy: {
      origin:
        "With Argumint I wanted to build something genuinely useful - production-ready and valuable to real people. The goal was a platform that helps anyone sharpen how they argue: practising communication, prepping for a group-discussion round, or running structured debates. It scales from a solo learner all the way to a large IT firm organising debates at scale. The learning curve was real-time systems - Socket.IO, live data sync, and race-free room creation that keeps every participant's debate state consistent.",
      problem:
        "Traditional debate forums are static - you post an argument and wait hours for another human to respond. This creates echo chambers: only users who already agree engage, while the original poster never stress-tests their reasoning. The goal was to build a platform where every argument gets an immediate, intelligent, steelmanned counterpoint - making the act of forming an argument genuinely harder and more productive.",
      decisions: [
        {
          title: "GPT-4 over fine-tuned model",
          detail:
            "A fine-tuned model would need a large, high-quality debate dataset to match GPT-4's reasoning depth. Given the project scope, the quality gap was too large. GPT-4 with a carefully crafted judging prompt (evaluate logic, evidence, and delivery; stay neutral) produced scores that beta users rated significantly more credible than GPT-3.5 verdicts.",
        },
        {
          title: "Socket.io over polling",
          detail:
            "In a live debate room, seeing other participants type and post arguments in real time is core to the feel of the product. Polling at 2s intervals would have introduced visible lag and unnecessary server load. Socket.io with room-based namespaces keeps each debate isolated - a message in room A never touches room B.",
        },
        {
          title: "MongoDB over SQL for debate schemas",
          detail:
            "Debate topics have a flexible structure: some have media, some have sub-threads, some have voting. A rigid SQL schema would require migrations every time the debate format changed during early iteration. MongoDB's document model let me iterate on the debate schema daily without downtime.",
        },
        {
          title: "JWT with refresh token rotation",
          detail:
            "Users return to ongoing debates hours later. Short-lived access tokens (15min) with rotating refresh tokens (7 days) keep sessions active without security risk - each refresh invalidates the previous refresh token, so token theft has a narrow window.",
        },
      ],
      challenges: [
        {
          title: "Prompt engineering for quality AI judging",
          detail:
            "Early prompts produced vague verdicts with no clear reasoning. After 30+ iterations, settled on a structured scoring prompt:\n\n  1. identify the core claim each side made\n  2. evaluate logical consistency and evidence quality\n  3. assess delivery and clarity\n  4. return a structured score with per-criterion breakdown\n\nScoring quality jumped from ~3/5 to ~4.5/5 in user ratings.",
        },
        {
          title: "AI rate limiting per user",
          detail:
            "Without limits, a single user could run up hundreds of GPT-4 calls in minutes. Implemented a Redis sliding window counter (5 AI requests per user per minute, 50 per hour) with graceful degradation - over-limit users see a countdown timer rather than an error, which kept bounce rate low.",
        },
        {
          title: "WebSocket memory leak on room cleanup",
          detail:
            "After extended testing, noticed memory growing steadily. Inactive debate rooms were never garbage collected because the Socket.io room registry held references to disconnected sockets. Added an explicit cleanup handler on the last disconnect event to call socket.leave(room) and delete the room from the registry if empty.",
        },
      ],
      metrics: [
        { value: "<2s", label: "AI judge latency", detail: "GPT-4 scores each argument - first token appears in ~600ms, full verdict delivered in under 2 seconds for typical argument length." },
        { value: "10+", label: "Concurrent debate rooms", detail: "Tested with 10 simultaneous rooms, 3 users each, all running AI scoring calls in parallel - no degradation in response time or message delivery." },
        { value: "4.5/5", label: "AI scoring quality", detail: "Beta user rating of AI judge verdicts after prompt engineering iterations - up from 3/5 with the initial naive scoring prompt." },
        { value: "50/hr", label: "Rate limit per user", detail: "Sliding window Redis counter prevents runaway AI spend while keeping the experience fluid for normal usage patterns." },
      ],
      architecture:
        "React → Socket.io (room join) → Node.js → MongoDB (debate + arguments)\n\nArgument submitted → Node.js → OpenAI GPT-4 (streaming) → Socket.io (broadcast to room)\n\nRate limiting: Redis sliding window counter per userId\nAuth: JWT access (15min) + rotating refresh token (7 days)",
    } satisfies CaseStudy,
    diagrams: [
      {
        src: "/images/argumint-architecture/01-hld.png",
        title: "High-Level Design",
        caption: "The whole system at a glance - the React SPA, the Express REST API and Socket.IO server, MongoDB/Redis, the peer-to-peer WebRTC audio mesh, and the OpenAI and Razorpay integrations.",
      },
      {
        src: "/images/argumint-architecture/02-debate-lifecycle.png",
        title: "Life of a Debate",
        caption: "End to end: create room, lobby ready-up, optional topic voting, side assignment, the chosen speaking mode, AI judging, optional human judging, and persisted results.",
      },
      {
        src: "/images/argumint-architecture/03-auth-session.png",
        title: "Authentication & Single Session",
        caption: "Login issues a Bearer JWT stored in localStorage; Redis enforces one active session per user and evicts the old socket via session:evicted when you log in elsewhere.",
      },
      {
        src: "/images/argumint-architecture/04-lobby-presence.png",
        title: "Real-Time Lobby - Presence & Host Controls",
        caption: "Room broadcasts keep every client's participant list live; a room:get-state handshake lets a late joiner or reconnecting socket rebuild full lobby state.",
      },
      {
        src: "/images/argumint-architecture/05-alternate-mode.png",
        title: "Alternate Mode - Turn-by-Turn",
        caption: "The server is authoritative over turn order and timers: it emits turn-started with an endsAt timestamp, accepts the submitted argument (or times out), then advances.",
      },
      {
        src: "/images/argumint-architecture/06-buzzer-mode.png",
        title: "Buzzer Mode - Grab-the-Mic",
        caption: "A Redis lock makes 'who holds the mic' race-free; on release or timeout a short re-grab window opens before the floor frees and the mic reopens.",
      },
      {
        src: "/images/argumint-architecture/07-webrtc-audio.png",
        title: "Live Audio - WebRTC Mesh",
        caption: "Socket.IO relays only SDP offers/answers and ICE candidates; the audio media itself flows directly browser-to-browser in a full peer mesh, never through the server.",
      },
      {
        src: "/images/argumint-architecture/08-transcription.png",
        title: "Speech Transcription",
        caption: "The browser Web Speech API is the primary path; when unsupported or failing, recorded audio falls back to server-side OpenAI Whisper, with Whisper minutes costed per debate.",
      },
      {
        src: "/images/argumint-architecture/09-ai-judge.png",
        title: "AI Judge - Scoring Pipeline",
        caption: "GPT-4o-mini scores each speaker on four 0-25 axes; the service re-computes the total as the sum of parts, clamps each axis, picks a winner, and records token usage and USD cost.",
      },
      {
        src: "/images/argumint-architecture/10-credibility.png",
        title: "Judge Credibility - 6 Pillars",
        caption: "Each human judge's session is scored across six pillars (two need history), capped by detected bias severity, then folded into a rolling EMA credibility and written as a JudgeSession.",
      },
      {
        src: "/images/argumint-architecture/11-xp-levelling.png",
        title: "XP & Levelling",
        caption: "Debating earns XP and progresses a 10-tier ladder from Novice to Grand Master via getLevelInfo - a scoring zone entirely separate from judge credibility.",
      },
      {
        src: "/images/argumint-architecture/12-payments.png",
        title: "Pro Subscriptions & Payments",
        caption: "Razorpay drives recurring Pro subscriptions; a HMAC-verified webhook (checked against the raw request body) keeps isPro and subscription status in sync regardless of client behaviour.",
      },
    ],
  },
];

/* Logos of companies/teams worked with - used by the motion marquee. */
export const companyLogos = [
  { name: "SAP Labs", src: "/images/logos/sap-logo.png" },
  { name: "Nagarro", src: "/images/logos/nagarro-logo.png" },
  { name: "Coding Ninjas", src: "/images/logos/coding_ninjas_logo.png" },
  { name: "FoodWagon", src: "/images/logos/Foodwagon-logo.png" },
];

export const skills = {
  "Languages": ["TypeScript", "JavaScript", "C++", "Java", "SQL"],
  "Core Concepts": ["Data Structures & Algorithms", "System Design", "OOP", "Concurrency", "Caching", "Distributed Systems", "REST APIs"],
  "Frontend": ["Angular", "React", "Next.js", "HTML5 / CSS3", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "REST APIs", "CI/CD", "Docker", "Git"],
  "AI / ML": ["OpenAI APIs", "Whisper (ASR)", "HuggingFace Transformers", "RAG", "Vector Embeddings"],
  "Cloud & Databases": ["AWS (S3, Lambda, CloudFront)", "SAP BTP", "SAP HANA", "MongoDB", "Redis", "PostgreSQL"],
};

export const experiences = [
  {
    id: 1,
    role: "Independent Full-Stack Developer",
    company: "Self-Employed",
    companyFull: "Independent Full-Stack Developer (Remote)",
    period: "Sept 2025 - Present",
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
    companyUrl: "https://www.sap.com/index.html",
    period: "Aug 2024 - Jun 2025",
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
    companyUrl: "https://www.nagarro.com/en/",
    period: "May 2021 - Sep 2023",
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
    period: "Jun 2020 - Jul 2020",
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
    companyUrl: "https://www.codingninjas.com/",
    period: "Jun 2019 - Sep 2019",
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
    universityUrl: "https://www.mnnit.ac.in/",
    period: "Aug 2023 - Aug 2025",
    grade: "CPI: 8.75 / 10",
    description:
      "Advanced study in algorithms, distributed systems, machine learning, and cloud computing. Completed the SAP Labs iXp internship as part of the programme.",
    highlights: [
      "SAP Labs iXp Internship (Aug 2024 - Jun 2025)",
      "Research: distributed systems, cloud-native architectures, database internals",
      "CPI: 8.75 / 10",
    ],
  },
  {
    id: 2,
    degree: "B.Tech - Computer Science & Engineering",
    institution: "BIET Jhansi",
    institutionFull: "Bundelkhand Institute of Engineering and Technology",
    university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
    universityUrl: "https://aktu.ac.in/index.html",
    period: "Aug 2017 - Aug 2021",
    grade: "78.6%",
    description:
      "Core CS fundamentals: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
    highlights: [
      "Graduated with 78.6% aggregate",
      "Built first full-stack projects during coursework",
      "Solved 385+ DSA problems on LeetCode",
    ],
  },
  {
    id: 3,
    degree: "Intermediate (Class 12th)",
    institution: "Dyal Singh Public School",
    institutionFull: "Dyal Singh Public School, Karnal, Haryana",
    period: "2016 - 2017",
    grade: "87.2%",
    description:
      "CBSE Boards - Subjects: English Core, Mathematics, Physics, Chemistry, Computer Science, Work Experience, Physical & Health Education, and General Studies.",
    highlights: [
      "School topper in Computer Science - 96/100 in CBSE board exam",
    ],
  },
  {
    id: 4,
    degree: "High School (Class 10th)",
    institution: "Kendriya Vidyalaya Karnal",
    institutionFull: "Kendriya Vidyalaya Karnal",
    period: "2014 - 2015",
    grade: "CGPA: 9.2 / 10",
    description:
      "CBSE Boards - Subjects: English, Hindi, Mathematics, Science, and Social Science.",
    highlights: [],
  },
];

export const codingPlatforms = [
  {
    id: 1,
    name: "LeetCode",
    handle: "bkumar28899",
    url: "https://leetcode.com/u/bkumar28899/",
    stat: "385+",
    statLabel: "Problems Solved",
    badge: "385+ Solved",
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

/* Honors & Awards — early-life / extracurricular achievements
   (kept separate from the professional Certifications section). */
export const honors = [
  {
    id: 1,
    title: "Football - Runner-up",
    headline: "Football Runner-up · PACE Sports Fest, BIET Jhansi",
    category: "Sports",
    context: "PACE Sports Fest, BIET Jhansi",
    year: "College",
    icon: "trophy",
    color: "#f59e0b",
    image: "/images/Certificates/Extra_Carricular/PACE_BIET.jpeg",
  },
  {
    id: 2,
    title: "Computer Science Topper - Class 12",
    headline: "Computer Science School Topper · Class 12, CBSE",
    category: "Academics",
    context: "Dyal Singh Public School · CBSE Boards",
    year: "Class XII",
    icon: "award",
    color: "#22c55e",
    image: "/images/Certificates/Extra_Carricular/Dyal_Singh_Class_12.jpeg",
  },
  {
    id: 3,
    title: "National Children's Science Congress - Regional",
    headline: "National Children's Science Congress · Regional Level",
    category: "Science",
    context: "Selected at the Regional level",
    year: "School",
    icon: "atom",
    color: "#3b82f6",
    image: "/images/Certificates/Extra_Carricular/NCSC_Regional.jpeg",
  },
  {
    id: 4,
    title: "National Children's Science Congress - Intra-Regional",
    headline: "National Children's Science Congress · Intra-Regional Level",
    category: "Science",
    context: "Advanced to the Intra-Regional level",
    year: "School",
    icon: "atom",
    color: "#8b5cf6",
    image: "/images/Certificates/Extra_Carricular/NCSC_intra_regional.jpeg",
  },
  {
    id: 5,
    title: "Youth Parliament",
    headline: "Youth Parliament · Regional Level",
    category: "Leadership",
    context: "School-level Youth Parliament",
    year: "School",
    icon: "landmark",
    color: "#ec4899",
    image: "/images/Certificates/Extra_Carricular/youth_parliament.jpeg",
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
  {
    id: 9,
    title: "C Programming",
    issuer: "NIIT",
    date: "",
    credentialId: "",
    credentialUrl: "#",
    color: "#E4002B",
    skills: ["C", "Programming"],
    image: "/images/Certificates/NIIT_C_Programming.jpeg",
  },
];

export const navLinks = [
  { label: "About",       href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Skills",      href: "#skills" },
  { label: "Education",   href: "#education" },
  { label: "Contributions", href: "#opensource" },
  { label: "Hire Me",     href: "#freelance" },
  { label: "Contact",     href: "#contact" },
];
