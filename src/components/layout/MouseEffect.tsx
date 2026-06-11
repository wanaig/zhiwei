"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
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
  const spawnTimerRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - mousePos.x;
    const dy = e.clientY - mousePos.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    setVelocity(Math.min(speed / 5, 1));
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

  // Particle system
  useEffect(() => {
    const animate = () => {
      spawnTimerRef.current++;
      
      // Spawn particles based on velocity
      const spawnRate = Math.max(2, Math.floor(velocity * 8));
      if (spawnTimerRef.current % spawnRate === 0) {
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3 + velocity * 4;
          particlesRef.current.push({
            x: mousePos.x,
            y: mousePos.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 60 + Math.random() * 40,
            maxLife: 60 + Math.random() * 40,
            size: 2 + Math.random() * 3,
            isRed: Math.random() > 0.3,
          });
        }
      }

      // Update particles
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.96,
          vy: p.vy * 0.96,
          life: p.life - 1,
        }))
        .filter(p => p.life > 0);

      setRenderParticles([...particlesRef.current]);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [mousePos, velocity]);

  const moveAngle = Math.atan2(mousePos.y - prevPos.y, mousePos.x - prevPos.x) * (180 / Math.PI);

  // Calculate trailing dots
  const trailDots = [];
  const dx = mousePos.x - prevPos.x;
  const dy = mousePos.y - prevPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 5) {
    for (let i = 1; i <= 4; i++) {
      trailDots.push({
        x: mousePos.x - (dx * i * 0.15),
        y: mousePos.y - (dy * i * 0.15),
        opacity: 0.4 - i * 0.08,
        size: 3 - i * 0.5,
      });
    }
  }

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

      {/* Particles */}
      <div className="fixed pointer-events-none z-[9998]">
        {renderParticles.map((p, i) => {
          const lifeRatio = p.life / p.maxLife;
          const alpha = lifeRatio * 0.8;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size * lifeRatio,
                height: p.size * lifeRatio,
                backgroundColor: p.isRed 
                  ? `rgba(200, 50, 70, ${alpha})` 
                  : `rgba(58, 123, 213, ${alpha})`,
                boxShadow: p.isRed
                  ? `0 0 ${p.size * 2}px rgba(200, 50, 70, ${alpha * 0.8})`
                  : `0 0 ${p.size * 2}px rgba(58, 123, 213, ${alpha * 0.8})`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* Trail dots */}
      <div className="fixed pointer-events-none z-[9997]">
        {trailDots.map((dot, i) => (
          <div
            key={`trail-${i}`}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              backgroundColor: `rgba(200, 50, 70, ${dot.opacity})`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
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