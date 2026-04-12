const width = 800; const height = 600;
const mouse = { x: -1000, y: -1000, radius: 300 };
class Shrimp {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 25 + 40; 
        this.baseSpeed = Math.random() * 0.3 + 0.2; 
        this.currentSpeedMultiplier = 1; 
        this.speedX = (Math.random() - 0.5) * this.baseSpeed;
        this.speedY = (Math.random() - 0.5) * this.baseSpeed;
        this.angle = Math.atan2(this.speedY, this.speedX);
        this.swimCycle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
      }
      update() {
        this.swimCycle += 0.08 * (this.baseSpeed * this.currentSpeedMultiplier);
        if (Math.random() < 0.015) {
          this.targetAngle += (Math.random() - 0.5) * 1.2; 
        }
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let targetSpeedMultiplier = 1;
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const fleeAngle = Math.atan2(dy, dx) + Math.PI; 
          this.targetAngle = fleeAngle;
          targetSpeedMultiplier = 1 + (force * 15); 
          this.swimCycle += 0.3 * force; 
        }
        this.currentSpeedMultiplier += (targetSpeedMultiplier - this.currentSpeedMultiplier) * 0.04;
        const diff = this.targetAngle - this.angle;
        this.angle += Math.atan2(Math.sin(diff), Math.cos(diff)) * 0.06;
        this.speedX = Math.cos(this.angle) * this.baseSpeed * this.currentSpeedMultiplier;
        this.speedY = Math.sin(this.angle) * this.baseSpeed * this.currentSpeedMultiplier;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -150) this.x = width + 150;
        if (this.x > width + 150) this.x = -150;
        if (this.y < -150) this.y = height + 150;
        if (this.y > height + 150) this.y = -150;
      }
}

const s = new Shrimp();
for(let i=0; i<60; i++) {
   s.update();
}
console.log("X:", s.x, "Y:", s.y, "Angle:", s.angle, "SpeedMultiplier:", s.currentSpeedMultiplier, "speedX:", s.speedX);
