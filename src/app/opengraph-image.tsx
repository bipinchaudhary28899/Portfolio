import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Bipin Chaudhary — Full Stack AI Engineer";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "space-between",
          background:      "#07070f",
          fontFamily:      "sans-serif",
          padding:         "60px 72px",
          position:        "relative",
          overflow:        "hidden",
        }}
      >
        {/* ── grid dot background ── */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            backgroundImage:
              "radial-gradient(circle, #1c1c30 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity:    0.6,
          }}
        />

        {/* ── top glow ── */}
        <div
          style={{
            position:   "absolute",
            top:        -120,
            left:       "50%",
            transform:  "translateX(-50%)",
            width:      800,
            height:     400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,101,53,0.22) 0%, transparent 70%)",
          }}
        />

        {/* ── top accent line ── */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     3,
            background: "linear-gradient(90deg, #ff6535, #ff9f1c)",
          }}
        />

        {/* ── top bar: available badge + year ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          8,
              background:   "#0f0f1f",
              border:       "1px solid #1c1c30",
              borderRadius: 999,
              padding:      "8px 18px",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ color: "#5e5e80", fontSize: 14, letterSpacing: "0.05em" }}>
              Available for work
            </span>
          </div>
          <span style={{ color: "#1c1c30", fontSize: 14, fontFamily: "monospace" }}>
            {new Date().getFullYear()}
          </span>
        </div>

        {/* ── main content ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <span
            style={{
              fontSize:      13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "#ff6535",
            }}
          >
            Full Stack AI Engineer
          </span>

          {/* name */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
            <span
              style={{
                fontSize:    96,
                fontWeight:  900,
                color:       "#e4e2f0",
                letterSpacing: "-0.03em",
              }}
            >
              BIPIN
            </span>
            <span
              style={{
                fontSize:    96,
                fontWeight:  900,
                letterSpacing: "-0.03em",
                background:  "linear-gradient(135deg, #ff6535, #ff9f1c)",
                backgroundClip: "text",
                color:       "transparent",
              }}
            >
              CHAUDHARY
            </span>
          </div>

          {/* tagline */}
          <span style={{ fontSize: 20, color: "#a8a6c4", marginTop: 8 }}>
            Building scalable web systems that move metrics.
          </span>
        </div>

        {/* ── bottom: stats + stack ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>

          {/* stats */}
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { value: "3+",   label: "Years exp"    },
              { value: "40%",  label: "Latency cut"  },
              { value: "350+", label: "DSA solved"   },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#ff6535" }}>{s.value}</span>
                <span style={{ fontSize: 13, color: "#5e5e80", letterSpacing: "0.05em" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* stack tags */}
          <div style={{ display: "flex", gap: 8 }}>
            {["Next.js", "Node.js", "AWS", "Redis", "OpenAI"].map(t => (
              <div
                key={t}
                style={{
                  fontSize:     13,
                  color:        "#a8a6c4",
                  background:   "#0f0f1f",
                  border:       "1px solid #1c1c30",
                  borderRadius: 6,
                  padding:      "6px 14px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* ── bottom accent line ── */}
        <div
          style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            height:     1,
            background: "#1c1c30",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
