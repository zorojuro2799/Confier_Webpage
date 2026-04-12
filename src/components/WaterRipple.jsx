import React, { useEffect, useState } from 'react';

export default function WaterRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 4500); 
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999, overflow: 'hidden' }}>
      {ripples.map((r) => (
        <div key={r.id} style={{ position: 'absolute', left: r.x, top: r.y }}>
          
          {/* THE DROPLET REBOUND SPLASH */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: '6px', height: '10px', borderRadius: '50%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.2))',
            boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            transformOrigin: 'bottom center',
            animation: 'reboundSplash 1.2s cubic-bezier(0.2, 0.9, 0.4, 1) forwards'
          }} />

          {/* PRIMARY 3D POND WAVE */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            animation: 'pondWave 4s cubic-bezier(0.1, 0.8, 0.2, 1) forwards',
            boxShadow: 'inset 0 8px 12px rgba(255,255,255,0.8), inset 0 -8px 12px rgba(0, 95, 115, 0.15), 0 10px 20px rgba(0, 95, 115, 0.2), 0 -4px 8px rgba(255,255,255,0.6)',
            backdropFilter: 'blur(3px)',
            border: '2px solid rgba(255,255,255,0.3)'
          }} />

          {/* SECONDARY ECHO WAVE */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            animation: 'echoWave 4.5s cubic-bezier(0.15, 0.85, 0.3, 1) forwards',
            boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.5), inset 0 -4px 8px rgba(0, 95, 115, 0.05), 0 5px 10px rgba(0, 95, 115, 0.1), 0 -2px 4px rgba(255,255,255,0.3)',
            backdropFilter: 'blur(1px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />

        </div>
      ))}
      <style>{`
        @keyframes reboundSplash {
          0% { transform: translate(-50%, 0) translateY(0px) scale(0.5); opacity: 1; }
          20% { transform: translate(-50%, 0) translateY(-30px) scale(1.2); opacity: 0.9; }
          100% { transform: translate(-50%, 0) translateY(10px) scale(2); opacity: 0; }
        }
        @keyframes pondWave {
          0% { width: 0px; height: 0px; opacity: 1; }
          100% { width: 500px; height: 500px; opacity: 0; }
        }
        @keyframes echoWave {
          0% { width: 0px; height: 0px; opacity: 0; }
          4% { opacity: 1; }
          100% { width: 700px; height: 700px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
