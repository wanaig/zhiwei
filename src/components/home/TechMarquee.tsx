"use client";

import { useRef, useEffect } from "react";

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Figma",
  "Git",
];

export default function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    let pos = 0;
    let animId: number;

    const animate = () => {
      pos -= 0.5;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${pos}px)`;
        if (Math.abs(pos) > trackRef.current.scrollWidth / 3) {
          pos = 0;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      className="py-10 overflow-hidden"
      style={{
        backgroundColor: "rgb(10, 10, 14)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div ref={trackRef} className="flex gap-16 whitespace-nowrap">
        {[...techStack, ...techStack, ...techStack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-base font-medium tracking-wider uppercase"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
