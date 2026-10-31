"use client";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f3f7fa", color: "#0f2a45" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, margin: 0, color: "#0f2a45" }}>Filing360 is temporarily unavailable</h1>
          <p style={{ maxWidth: 440, color: "#4a5d68", lineHeight: 1.6 }}>
            We&apos;re sorry — something went wrong on our side. Please try again in a moment.
          </p>
          {error.digest && <p style={{ fontSize: 13, color: "#5b6e7a" }}>Error reference: {error.digest}</p>}
          <button
            type="button"
            onClick={() => retry()}
            style={{ marginTop: 16, height: 44, padding: "0 20px", borderRadius: 12, border: 0, background: "#0e7b5b", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
