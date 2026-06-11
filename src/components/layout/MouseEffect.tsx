"use client";

import { useEffect, useState, useCallback } from "react";

export default function MouseEffect() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [prevPos, setPrevPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

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

  const angle = Math.atan2(mousePos.y - prevPos.y, mousePos.x - prevPos.x) * (180 / Math.PI);

  return (
    <>
      {/* Background glow - large ambient */}
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

      {/* Rotating diamond ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${isHovering ? 1.8 : 1})`,
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
          {/* Top-left */}
          <div className="absolute" style={{ left: -18, top: -18, width: 8, height: 8, borderTop: '1px solid rgba(200, 50, 70, 0.5)', borderLeft: '1px solid rgba(200, 50, 70, 0.5)' }} />
          {/* Top-right */}
          <div className="absolute" style={{ left: 10, top: -18, width: 8, height: 8, borderTop: '1px solid rgba(200, 50, 70, 0.5)', borderRight: '1px solid rgba(200, 50, 70, 0.5)' }} />
          {/* Bottom-left */}
          <div className="absolute" style={{ left: -18, top: 10, width: 8, height: 8, borderBottom: '1px solid rgba(200, 50, 70, 0.5)', borderLeft: '1px solid rgba(200, 50, 70, 0.5)' }} />
          {/* Bottom-right */}
          <div className="absolute" style={{ left: 10, top: 10, width: 8, height: 8, borderBottom: '1px solid rgba(200, 50, 70, 0.5)', borderRight: '1px solid rgba(200, 50, 70, 0.5)' }} />
        </div>
      )}

      {/* Speed lines */}
      {velocity > 0.3 && (
        <>
          <div
            className="fixed pointer-events-none z-[9995]"
            style={{
              left: mousePos.x - 12 - velocity * 20,
              top: mousePos.y,
              width: velocity * 15,
              height: 1,
              backgroundColor: `rgba(200, 50, 70, ${velocity * 0.3})`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: 'right center',
            }}
          />
          <div
            className="fixed pointer-events-none z-[9995]"
            style={{
              left: mousePos.x + 12,
              top: mousePos.y,
              width: velocity * 15,
              height: 1,
              backgroundColor: `rgba(200, 50, 70, ${velocity * 0.2})`,
              transform: `rotate(${angle + 180}deg)`,
              transformOrigin: 'left center',
            }}
          />
        </>
      )}
    </>
  );
}