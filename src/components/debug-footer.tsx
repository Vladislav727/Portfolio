"use client";

import { useEffect } from "react";

export function DebugFooter({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    // client-only component
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 12,
        bottom: 12,
        zIndex: 9999,
        padding: "8px 10px",
        borderRadius: 10,
        background: "rgba(165,180,252,0.14)",
        border: "1px solid rgba(165,180,252,0.35)",
        color: "#a5b4fc",
        fontSize: 12,
        fontFamily: "monospace",
        pointerEvents: "none",
      }}
    >
      footer debug: visible (client)
    </div>
  );
}

