"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Particle {
  angle: number;
  speed: number;
  radius: number;
  size: number;
  opacity: number;
  isRed: boolean;
}

export default function MouseEffect() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [prevPos, setPrevPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const [renderParticles, setRenderParticles] = useState<Particle[]>([]);
  const frameRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - mousePos.x;
    const dy = e.clientY - mousePos.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    setVelocity(Math.min(speed / 10, 1));
    setPrevPos(mousePos);
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [mousePos]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button';
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [handleMouseMove]);

  // Initialize particles
  useEffect(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      p.push({
        angle: (Math.PI * 2 / 12) * i,
        speed: 0.015 + Math.random() * 0.02,
        radius: 18 + Math.random() * 14,
        size: 1.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
        isRed: Math.random() > 0.4,
      });
    }
    particlesRef.current = p;
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      const updated = particlesRef.current.map(p => ({
        ...p,
        angle: p.angle + p.speed + velocity * 0.03,
      }));
      particlesRef.current = updated;
      setRenderParticles([...updated]);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [velocity]);

  const moveAngle = Math.atan2(mousePos.y - prevPos.y, mousePos.x - prevPos.x) * (180 / Math.PI);

  return (
    <>
      {/* Background glow */}
      <div
        className="fixed pointer-events-none z-[9996]"
        style={{
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(200, 50, 70, 0.06) 0%, transparent 60%)`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Orbiting particles */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {renderParticles.map((p, i) => {
          const x = Math.cos(p.angle) * p.radius;
          const y = Math.sin(p.angle) * p.radius;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: x,
                top: y,
                width: p.size,
                height: p.size,
                backgroundColor: p.isRed 
                  ? `rgba(200, 50, 70, ${p.opacity})` 
                  : `rgba(58, 123, 213, ${p.opacity})`,
                boxShadow: p.isRed
                  ? `0 0 ${p.size * 3}px rgba(200, 50, 70, ${p.opacity * 0.6})`
                  : `0 0 ${p.size * 3}px rgba(58, 123, 213, ${p.opacity * 0.6})`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* Diamond ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) rotate(${moveAngle}deg) scale(${isHovering ? 1.8 : 1})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div 
          style={{
            width: 28,
            height: 28,
            border: `1px solid rgba(200, 50, 70, ${0.3 + velocity * 0.3})`,
            transform: 'rotate(45deg)',
            transition: 'border-color 0.15s ease',
          }}
        />
      </div>

      {/* Main dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className="rounded-full"
          style={{
            width: isHovering ? 8 : 4,
            height: isHovering ? 8 : 4,
            backgroundColor: 'rgb(200, 50, 70)',
            transition: 'width 0.2s ease, height 0.2s ease',
            boxShadow: `0 0 ${8 + velocity * 16}px rgba(200, 50, 70, ${0.4 + velocity * 0.3})`,
          }}
        />
      </div>

      {/* Corner brackets on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="absolute" style={{ left: -18, top: -18, width: 8, height: 8, borderTop: '1px solid rgba(200, 50, 70, 0.5)', borderLeft: '1px solid rgba(200, 50, 70, 0.5)' }} />
          <div className="absolute" style={{ left: 10, top: -18, width: 8, height: 8, borderTop: '1px solid rgba(200, 50, 70, 0.5)', borderRight: '1px solid rgba(200, 50, 70, 0.5)' }} />
          <div className="absolute" style={{ left: -18, top: 10, width: 8, height: 8, borderBottom: '1px solid rgba(200, 50, 70, 0.5)', borderLeft: '1px solid rgba(200, 50, 70, 0.5)' }} />
          <div className="absolute" style={{ left: 10, top: 10, width: 8, height: 8, borderBottom: '1px solid rgba(200, 50, 70, 0.5)', borderRight: '1px solid rgba(200, 50, 70, 0.5)' }} />
        </div>
      )}
    </>
  );
}