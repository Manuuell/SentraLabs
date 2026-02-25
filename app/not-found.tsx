"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setBlink((b) => !b), 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}
        >
            <div style={{ textAlign: "center", maxWidth: 520 }}>
                <p
                    style={{
                        color: "#3f3f46",
                        fontSize: "0.8rem",
                        marginBottom: "1rem",
                        letterSpacing: "0.15em",
                    }}
                >
          // error
                </p>
                <h1
                    style={{
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "1.5rem",
                        lineHeight: 1,
                    }}
                >
                    404
                </h1>
                <p
                    style={{
                        color: "#a1a1aa",
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#34d399" }}>{'>'}</span> Página no encontrada
                    <span
                        style={{
                            color: "#60a5fa",
                            opacity: blink ? 1 : 0,
                            transition: "opacity 0.1s",
                        }}
                    >
                        _
                    </span>
                </p>
                <p
                    style={{
                        color: "#4a4e5e",
                        fontSize: "0.85rem",
                        marginBottom: "2.5rem",
                        lineHeight: 1.7,
                    }}
                >
                    La ruta que buscas no existe o fue movida.
                </p>
                <Link
                    href="/"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#f0f0f5",
                        color: "#000",
                        padding: "12px 28px",
                        borderRadius: "9999px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace",
                        textDecoration: "none",
                        transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                >
                    ← Volver al inicio
                </Link>
            </div>
        </div>
    );
}
