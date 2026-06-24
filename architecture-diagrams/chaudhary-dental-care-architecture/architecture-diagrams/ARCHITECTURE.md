# Chaudhary Dental Care — Architecture Diagrams

Architecture diagram set for the Chaudhary Dental Care (DentalConnect) platform: a
single-doctor dental clinic system with patient OTP booking, a live patient queue,
WhatsApp notifications, review moderation, API observability, and a doctor dashboard.

Every diagram is authored twice — a Graphviz `.dot` source (the renderer of record) and
a Mermaid `.mmd` source. PNGs are rendered from the `.dot` files with Graphviz `dot`
(monochrome: plain black outlines on white, no fills).

## Layout

```
architecture-diagrams/
├── dot/NN-name.dot      # Graphviz source (renders the PNGs)
├── src/NN-name.mmd      # Mermaid source (equivalent diagram)
└── ARCHITECTURE.md      # this file
public/images/chaudhary-dental-care-architecture/NN-name.png   # rendered output
```

PNGs live **only** under `public/` so they never enter the JS/app bundle.

## Rendering

Graphviz is the renderer (not mermaid-cli — it needs a bundled Chromium that is
network-blocked in CI/sandbox). Render every diagram with:

```bash
for f in architecture-diagrams/dot/*.dot; do
  base=$(basename "$f" .dot)
  dot -Tpng -Gdpi=140 "$f" \
    -o "public/images/chaudhary-dental-care-architecture/$base.png"
done
```

## Conventions

- `rankdir=TB` (top-to-bottom); `LR` only where a flow is clearly wider than tall.
- `node [shape=box, fontname="Helvetica", color=black, fontcolor=black]`, `bgcolor=white`.
- Shapes: **box** = process/component, **cylinder** = datastore/cache/bucket,
  **diamond** = decision, **hexagon** = event/trigger, **oval** = actor/user.
- Multi-stage flows grouped with `subgraph cluster_*` + a cluster label.
- No color, no fills, no theme — monochrome only.

## Diagram set

| # | Diagram | What it shows |
|---|---------|---------------|
| 01 | High-Level Design | Whole system: clients (patient / doctor / developer), Next.js app + middleware + API + lib on Vercel, Supabase Postgres, and external WhatsApp API + Vercel Cron. |
| 02 | Patient OTP Authentication | Phone → `/api/otp/send` → hashed 6-digit OTP (5-min expiry) → WhatsApp → `/api/otp/verify` → JWT patient session. |
| 03 | Doctor Authentication | Email + password → bcrypt verify against `doctors` → JWT doctor cookie → middleware guards `/dashboard/*`. |
| 04 | Appointment Booking Flow | Service → date → `/api/slots` → slot pick → `/api/appointments` (session-gated) → insert + WhatsApp confirmation → success page. |
| 05 | Slot Availability Engine | `/api/slots` cross-references availability, blocked dates, blocked slots, existing appointments, and service duration (multi-slot aware). |
| 06 | Appointment Status Lifecycle | `created → upcoming → in_consultation → in_treatment → completed`, plus `cancelled` and the frontend-only `due` state. |
| 07 | Live Queue & Walk-in | Today's queue cards, overdue highlight, the Waiting → In Consultation → In Treatment → Done stepper, patient search, and walk-in registration. |
| 08 | WhatsApp Notification Pipeline | Five event triggers map to approved templates via `lib/whatsapp.ts`; send gated on Meta credentials (always in prod, optional in dev). |
| 09 | Review Submission & Moderation | Completed-appointment gate → pending review → doctor approve/reject → approved reviews surface on the public homepage carousel. |
| 10 | Schedule & Blocking Management | Doctor editors for weekly availability, blocked dates (overlap detection), blocked slots, and service CRUD — all feeding the slot engine. |
| 11 | API Observability & Dev Console | `withLogging()` classifies severity and writes `api_logs`; the password-protected `/dev` console reads DB overview, API metrics, and a log explorer. |
| 12 | Log Cleanup Cron | Vercel Cron (daily 14:00 UTC) → `CRON_SECRET`-authorized `/api/cron/cleanup-logs` → tiered retention deletes from `api_logs`. |

## Tech stack reference

Next.js 15 · React 19 · TypeScript · Tailwind · Supabase (PostgreSQL + RLS) ·
custom JWT (`jose`) in httpOnly cookies · Meta WhatsApp Business API · Zod validation ·
Vercel (bom1 region) + Vercel Cron.
