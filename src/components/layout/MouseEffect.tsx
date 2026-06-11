"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Particle {
  angle: number;
  speed: number;
  radius: number;
  targetRadius: number;
  size: number;
  opacity: number;
  isRed: boolean;
  wobble: number;
  wobbleSpeed: number;
}

export default function MouseEffect() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prevPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const [renderParticles, setRenderParticles] = useState<Particle[]>([]);
  const frameRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const prev = prevPosRef.current;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    setVelocity(Math.min(speed / 5, 1));
    prevPosRef.current = { x: e.clientX, y: e.clientY };
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

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
    for (let i = 0; i < 24; i++) {
      p.push({
        angle: (Math.PI * 2 / 24) * i,
        speed: 0.008 + Math.random() * 0.015,
        radius: 20 + Math.random() * 30,
        targetRadius: 20 + Math.random() * 30,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.5,
        isRed: Math.random() > 0.35,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      });
    }
    particlesRef.current = p;
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      const updated = particlesRef.current.map(p => {
        const newAngle = p.angle + p.speed + velocity * 0.04;
        const newWobble = p.wobble + p.wobbleSpeed;
        const wobbleOffset = Math.sin(newWobble) * 5;
        
        // Expand radius when moving fast
        const speedExpand = velocity * 25;
        const newTargetRadius = p.targetRadius + speedExpand;
        const newRadius = p.radius + (newTargetRadius - p.radius) * 0.1;
        
        return {
          ...p,
          angle: newAngle,
          wobble: newWobble,
          radius: newRadius,
        };
      });
      particlesRef.current = updated;
      setRenderParticles([...updated]);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [velocity]);

  const prev = prevPosRef.current;
  const moveAngle = Math.atan2(mousePos.y - prev.y, mousePos.x - prev.x) * (180 / Math.PI);

  return (
    <>
      {/* Background glow */}
      <div
        className="fixed pointer-events-none z-[9996]"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, rgba(200, 50, 70, 0.08) 0%, transparent 60%)`,
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
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
          const wobbleOffset = Math.sin(p.wobble) * 5;
          const x = Math.cos(p.angle) * (p.radius + wobbleOffset);
          const y = Math.sin(p.angle) * (p.radius + wobbleOffset);
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
                  ? `0 0 ${p.size * 3}px rgba(200, 50, 70, ${p.opacity * 0.8}), 0 0 ${p.size * 6}px rgba(200, 50, 70, ${p.opacity * 0.3})`
                  : `0 0 ${p.size * 3}px rgba(58, 123, 213, ${p.opacity * 0.8}), 0 0 ${p.size * 6}px rgba(58, 123, 213, ${p.opacity * 0.3})`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* Inner ring particles (faster, smaller) */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {[...Array(8)].map((_, i) => {
          const angle = (Math.PI * 2 / 8) * i + Date.now() * 0.003;
          const radius = 12 + velocity * 10;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={`inner-${i}`}
              className="absolute rounded-full"
              style={{
                left: x,
                top: y,
                width: 2,
                height: 2,
                backgroundColor: `rgba(200, 50, 70, ${0.5 + velocity * 0.3})`,
                boxShadow: `0 0 4px rgba(200, 50, 70, 0.5)`,
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
            border: `1px solid rgba(200, 50, 70, ${0.3 + velocity * 0.4})`,
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
            boxShadow: `0 0 ${8 + velocity * 20}px rgba(200, 50, 70, ${0.5 + velocity * 0.3})`,
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