"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setVisible(true);
        let targetX = -100;
        let targetY = -100;
        let currentX = -100;
        let currentY = -100;

        const onMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const animate = () => {
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;
            setPos({ x: currentX, y: currentY });
            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove);
        const raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="custom-cursor"
            style={{ left: pos.x, top: pos.y }}
        />
    );
}
