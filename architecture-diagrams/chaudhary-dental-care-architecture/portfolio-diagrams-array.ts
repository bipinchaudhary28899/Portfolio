// Paste this `diagrams` array into the project object whose title === "Chaudhary Dental Care"
// in src/data/portfolio.ts, placed right AFTER that project's `caseStudy` block.
// (Same shape as the StreamSphere project's diagrams array.)

  diagrams: [
    {
      src: "/images/chaudhary-dental-care-architecture/01-high-level-design.png",
      title: "High-Level Design",
      caption:
        "The whole system at a glance: patient, doctor and developer clients hit a Next.js app on Vercel, backed by Supabase Postgres, with WhatsApp and Vercel Cron as external services.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/02-patient-otp-authentication.png",
      title: "Patient OTP Authentication",
      caption:
        "Patients sign in with a 6-digit WhatsApp OTP (hashed, 5-minute expiry, max 3 attempts) that mints a JWT patient session in an httpOnly cookie.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/03-doctor-authentication.png",
      title: "Doctor Authentication",
      caption:
        "Doctors log in with email and password verified against a bcrypt hash; the resulting JWT lets middleware guard every /dashboard route.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/04-appointment-booking-flow.png",
      title: "Appointment Booking Flow",
      caption:
        "The multi-step booking journey from service and date selection through live slot lookup to a session-gated appointment insert plus a WhatsApp confirmation.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/05-slot-availability-engine.png",
      title: "Slot Availability Engine",
      caption:
        "How /api/slots computes open times by cross-referencing weekly availability, blocked dates, blocked slots, existing appointments and multi-slot service durations.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/06-appointment-status-lifecycle.png",
      title: "Appointment Status Lifecycle",
      caption:
        "The status machine from upcoming through in_consultation, in_treatment and completed, plus cancellation and the frontend-only overdue (due) state.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/07-live-queue-walkin.png",
      title: "Live Queue & Walk-in Management",
      caption:
        "The doctor's real-time queue: today's cards, overdue highlighting, the Waiting to Done workflow stepper, patient search and walk-in registration.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/08-whatsapp-notification-pipeline.png",
      title: "WhatsApp Notification Pipeline",
      caption:
        "Five appointment and OTP events map to Meta-approved templates through lib/whatsapp.ts, with sends gated on whether Meta credentials are configured.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/09-review-submission-moderation.png",
      title: "Review Submission & Moderation",
      caption:
        "Patients can only review completed appointments; reviews stay pending until the doctor approves them, after which high-rated ones appear on the homepage.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/10-schedule-blocking-management.png",
      title: "Schedule & Blocking Management",
      caption:
        "The doctor's editors for weekly hours, blocked date ranges, partial-day blocked slots and service CRUD — all feeding back into the slot availability engine.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/11-api-observability-dev-console.png",
      title: "API Observability & Dev Console",
      caption:
        "Every wrapped route logs an api_logs row with a computed severity; the password-protected /dev console surfaces DB overview, API metrics and a log explorer.",
    },
    {
      src: "/images/chaudhary-dental-care-architecture/12-log-cleanup-cron.png",
      title: "Log Cleanup Cron",
      caption:
        "A daily Vercel Cron call, authorized with CRON_SECRET, applies a tiered retention policy that prunes api_logs by severity (CRITICAL 30d down to NORMAL 3d).",
    },
  ],
