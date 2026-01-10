import { ImageResponse } from "next/og";
import { SITE_CONFIG, FEATURED_TECH } from "@/data/seo";

export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Extract domain from URL for display
const displayUrl = SITE_CONFIG.url.replace(/^https?:\/\//, "");

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1a1a2e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a2e 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(90deg, #38bdf8, #a855f7, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              marginBottom: 16,
              letterSpacing: "-2px",
            }}
          >
            {SITE_CONFIG.name}
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: 36,
              color: "#94a3b8",
              margin: 0,
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            {SITE_CONFIG.title}
          </p>

          {/* Tagline */}
          <p
            style={{
              fontSize: 24,
              color: "#64748b",
              margin: 0,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            {SITE_CONFIG.description.tagline}
          </p>

          {/* Tech stack badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {FEATURED_TECH.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: 20,
                  color: "#38bdf8",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Website URL */}
          <p
            style={{
              fontSize: 20,
              color: "#475569",
              margin: 0,
              marginTop: 48,
              fontWeight: 500,
            }}
          >
            {displayUrl}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
