import React, { useEffect, useRef } from 'react';

export default function TopDownPond() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const scaleFactor = isMobile ? 0.6 : 1;
    const mouse = { x: -1000, y: -1000, radius: isMobile ? 150 : 300 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };
    
    const handleReset = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', handleReset);
    window.addEventListener('mouseout', handleReset);
    
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    class Shrimp {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Scales based on screen width
        this.size = (Math.random() * 25 + 40) * scaleFactor; 
        this.baseSpeed = Math.random() * 0.3 + 0.2; // Smooth, slow, chill drifting when alone
        this.currentSpeedMultiplier = 1; // Used for smooth organic acceleration
        this.speedX = (Math.random() - 0.5) * this.baseSpeed;
        this.speedY = (Math.random() - 0.5) * this.baseSpeed;
        this.angle = Math.atan2(this.speedY, this.speedX);
        
        this.swimCycle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
      }

      update() {
        // Base tail movement linked to actual current speed
        this.swimCycle += 0.08 * (this.baseSpeed * this.currentSpeedMultiplier);

        if (Math.random() < 0.015) {
          this.targetAngle += (Math.random() - 0.5) * 1.2; // Gentle roaming turns
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetSpeedMultiplier = 1;

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const fleeAngle = Math.atan2(dy, dx) + Math.PI; 
          
          this.targetAngle = fleeAngle;
          targetSpeedMultiplier = 1 + (force * 15); // Explosive fast movement when mouse is near!
          this.swimCycle += 0.3 * force; // Frantic tail flicking
        }

        // Extremely smooth organic acceleration / deceleration physics
        this.currentSpeedMultiplier += (targetSpeedMultiplier - this.currentSpeedMultiplier) * 0.04;

        const diff = this.targetAngle - this.angle;
        this.angle += Math.atan2(Math.sin(diff), Math.cos(diff)) * 0.06; // Smooth rotation

        this.speedX = Math.cos(this.angle) * this.baseSpeed * this.currentSpeedMultiplier;
        this.speedY = Math.sin(this.angle) * this.baseSpeed * this.currentSpeedMultiplier;

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -150) this.x = width + 150;
        if (this.x > width + 150) this.x = -150;
        if (this.y < -150) this.y = height + 150;
        if (this.y > height + 150) this.y = -150;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const sz = this.size;
        const tailBeat = Math.sin(this.swimCycle) * 0.3; // Angle of tail bend

        // High detail, NO shadows to maintain 60fps
        const mainOrange = '#eb6434';
        const darkOrange = '#cc4c23';
        const lightOrange = '#f7885e';
        const legColor = 'rgba(235, 100, 52, 0.6)';

        // Vector 1: Double Pair of Sweeping Antennae
        ctx.beginPath();
        // Front-sweeping sensory antennae
        ctx.moveTo(sz * 0.4, -sz * 0.1);
        ctx.quadraticCurveTo(sz * 1.0, -sz * 0.5, sz * 1.2, -sz * 0.2);
        ctx.moveTo(sz * 0.4, sz * 0.1);
        ctx.quadraticCurveTo(sz * 1.0, sz * 0.5, sz * 1.2, sz * 0.2);
        // Extremely long backwards-sweeping primary antennae
        ctx.moveTo(sz * 0.4, -sz * 0.05);
        ctx.bezierCurveTo(sz * 0.8, -sz * 0.8, 0, -sz * 1.2, -sz * 1.5, -sz * 0.9);
        ctx.moveTo(sz * 0.4, sz * 0.05);
        ctx.bezierCurveTo(sz * 0.8, sz * 0.8, 0, sz * 1.2, -sz * 1.5, sz * 0.9);
        ctx.strokeStyle = 'rgba(255, 180, 150, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Vector 2: Front Walking Legs (Pereiopods) - projecting from under the carapace
        ctx.beginPath();
        for(let j=0; j<3; j++) {
            let offset = sz * 0.1 * j;
            // Left legs
            ctx.moveTo(sz * 0.3 - offset, -sz * 0.15);
            ctx.lineTo(sz * 0.4 - offset, -sz * 0.4);
            ctx.lineTo(sz * 0.3 - offset, -sz * 0.5);
            // Right legs
            ctx.moveTo(sz * 0.3 - offset, sz * 0.15);
            ctx.lineTo(sz * 0.4 - offset, sz * 0.4);
            ctx.lineTo(sz * 0.3 - offset, sz * 0.5);
        }
        ctx.strokeStyle = legColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Vector 3: Carapace (Tapered Head Shield)
        ctx.beginPath();
        ctx.moveTo(sz * 0.5, 0); // Sharp rostrum (nose)
        ctx.lineTo(sz * 0.3, -sz * 0.2); // Flairs out to eyes
        ctx.lineTo(0, -sz * 0.22); // Widest at back of head
        ctx.lineTo(0, sz * 0.22); 
        ctx.lineTo(sz * 0.3, sz * 0.2); 
        ctx.closePath();
        // Fast local gradient for 3D sheen (zero lag)
        let bodyGrad = ctx.createLinearGradient(0, -sz * 0.2, 0, sz * 0.2);
        bodyGrad.addColorStop(0, darkOrange);
        bodyGrad.addColorStop(0.5, lightOrange);
        bodyGrad.addColorStop(1, darkOrange);
        ctx.fillStyle = bodyGrad;
        ctx.strokeStyle = darkOrange;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // White speckles on the carapace
        ctx.beginPath();
        ctx.arc(sz * 0.2, -sz * 0.1, sz * 0.02, 0, Math.PI * 2);
        ctx.arc(sz * 0.1, -sz * 0.12, sz * 0.03, 0, Math.PI * 2);
        ctx.arc(sz * 0.15, sz * 0.08, sz * 0.025, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        // Vector 4: Stalk Eyes pointing outward
        ctx.beginPath();
        ctx.arc(sz * 0.4, -sz * 0.15, sz * 0.06, 0, Math.PI * 2);
        ctx.arc(sz * 0.4, sz * 0.15, sz * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#111';
        ctx.fill();
        // Tiny white eye glints
        ctx.beginPath();
        ctx.arc(sz * 0.42, -sz * 0.17, sz * 0.015, 0, Math.PI * 2);
        ctx.arc(sz * 0.42, sz * 0.13, sz * 0.015, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Vector 5: Segmented Abdomen (Scale plates bending down the tail)
        ctx.save();
        ctx.translate(0, 0); // Start at back of carapace
        
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          // Segments get smaller and narrower
          let segWidth = sz * 0.2;
          let segHeight = sz * 0.2 - (i * sz * 0.025);
          
          ctx.translate(-sz * 0.15, 0);
          ctx.rotate(tailBeat * 0.2); // Bend recursively 
          
          // Draw overlapping curved armor plate
          ctx.ellipse(0, 0, segWidth, segHeight, 0, 0, Math.PI * 2);
          ctx.fillStyle = bodyGrad; // Reuse the gradient
          ctx.fill();
          ctx.stroke();

          // Swimmerets (Pleopods) under the tail
          if(i < 4) {
             ctx.beginPath();
             ctx.moveTo(0, -segHeight * 0.8);
             ctx.lineTo(-sz * 0.1, -segHeight * 1.4);
             ctx.moveTo(0, segHeight * 0.8);
             ctx.lineTo(-sz * 0.1, segHeight * 1.4);
             ctx.strokeStyle = legColor;
             ctx.lineWidth = 1.5;
             ctx.stroke();
          }

          // Singular bright white dot per segment
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(0, segHeight * 0.5, sz * 0.02, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fill();
          }
        }

        // Vector 6: Uropod & Telson (Detailed 3-part Tail Fan)
        ctx.beginPath();
        // Central spike (telson)
        ctx.moveTo(-sz * 0.1, 0);
        ctx.lineTo(-sz * 0.4, 0);
        
        // Left fan (uropod)
        ctx.moveTo(-sz * 0.1, -sz * 0.05);
        ctx.quadraticCurveTo(-sz * 0.4, -sz * 0.3, -sz * 0.5, -sz * 0.2);
        ctx.lineTo(-sz * 0.1, 0);
        
        // Right fan (uropod)
        ctx.moveTo(-sz * 0.1, sz * 0.05);
        ctx.quadraticCurveTo(-sz * 0.4, sz * 0.3, -sz * 0.5, sz * 0.2);
        ctx.lineTo(-sz * 0.1, 0);
        
        ctx.fillStyle = lightOrange;
        ctx.fill();
        ctx.strokeStyle = darkOrange;
        ctx.stroke();

        ctx.restore(); // Undo recursive tail bend
        ctx.restore(); // Undo full shrimp translation/rotation
      }
    }

    const shrimpCount = isMobile ? 12 : 26;
    const shrimpFlock = [];
    for (let i = 0; i < shrimpCount; i++) { 
      shrimpFlock.push(new Shrimp());
    }

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#0b617a');
      bg.addColorStop(1, '#032533');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let r = 0; r < 5; r++) {
         ctx.beginPath();
         ctx.moveTo(width * 0.2 * r, -100);
         ctx.lineTo(width * 0.3 * (r+1), height + 100);
         ctx.lineTo(width * 0.4 * (r+1), height + 100);
         ctx.lineTo(width * 0.3 * r, -100);
         ctx.fillStyle = 'rgba(148,210,189, 0.015)';
         ctx.fill();
      }

      shrimpFlock.forEach(shrimp => {
        shrimp.update();
        shrimp.draw();
      });

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleReset);
      window.removeEventListener('mouseout', handleReset);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', inset: 0, width: '100%', height: '100%', 
        pointerEvents: 'none', zIndex: 0 
      }} 
    />
  );
}
