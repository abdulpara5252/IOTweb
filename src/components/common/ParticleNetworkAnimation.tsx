"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParticleNetworkAnimation.module.scss";

// Helper functions
function getLimitedRandom(min: number, max: number, roundToInteger?: boolean) {
  let number = Math.random() * (max - min) + min;
  if (roundToInteger) number = Math.round(number);
  return number;
}
function returnRandomArrayitem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Particle logic
class Particle {
  network: ParticleNetwork;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particleColor: string;
  radius: number;
  opacity: number;
  x: number;
  y: number;
  velocity: { x: number; y: number };

  constructor(parent: ParticleNetwork, x?: number, y?: number) {
    this.network = parent;
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
    this.radius = getLimitedRandom(1.5, 2.5);
    this.opacity = 0;
    this.x = x ?? Math.random() * this.canvas.width;
    this.y = y ?? Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * parent.options.velocity,
      y: (Math.random() - 0.5) * parent.options.velocity,
    };
  }

  update() {
    this.opacity = Math.min(this.opacity + 0.01, 1);
    if (this.x > this.canvas.width + 100 || this.x < -100) this.velocity.x = -this.velocity.x;
    if (this.y > this.canvas.height + 100 || this.y < -100) this.velocity.y = -this.velocity.y;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

class ParticleNetwork {
  options = {
    velocity: 1,
    density: 15000,
    netLineDistance: 200,
    netLineColor: "#ccc9c9",
    particleColors: ["#c0bfbf"],
  };
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[] = [];
  animationFrame: number = 0;
  interactionParticle?: Particle;
  createIntervalId?: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.createParticles(true);
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  createParticles(isInitial = false) {
    this.particles = [];
    const quantity = (this.canvas.width * this.canvas.height) / this.options.density;
    if (isInitial) {
      let counter = 0;
      clearInterval(this.createIntervalId);
      this.createIntervalId = window.setInterval(() => {
        if (counter < quantity - 1) {
          this.particles.push(new Particle(this));
        } else {
          clearInterval(this.createIntervalId);
        }
        counter++;
      }, 250);
    } else {
      for (let i = 0; i < quantity; i++) {
        this.particles.push(new Particle(this));
      }
    }
  }

  update() {
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 1;
    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = this.particles.length - 1; j > i; j--) {
        let p1 = this.particles[i], p2 = this.particles[j];
        let distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
        if (distance > this.options.netLineDistance) continue;
        distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );
        if (distance > this.options.netLineDistance) continue;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.options.netLineColor;
        this.ctx.globalAlpha = ((this.options.netLineDistance - distance) / this.options.netLineDistance) * p1.opacity * p2.opacity;
        this.ctx.lineWidth = 0.7;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }
    // Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
    if (this.options.velocity !== 0) {
      this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }
  }

  createInteractionParticle() {
    this.interactionParticle = new Particle(this);
    this.interactionParticle.velocity = { x: 0, y: 0 };
    this.particles.push(this.interactionParticle);
    return this.interactionParticle;
  }

  removeInteractionParticle() {
    if (!this.interactionParticle) return;
    const index = this.particles.indexOf(this.interactionParticle);
    if (index > -1) {
      this.interactionParticle = undefined;
      this.particles.splice(index, 1);
    }
  }
}

const ParticleNetworkAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef<ParticleNetwork | null>(null);

  // Resize canvas
  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      networkRef.current?.createParticles();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && containerRef.current) {
      const ctx = canvas.getContext("2d")!;
      networkRef.current = new ParticleNetwork(canvas, ctx);
      sizeCanvas();
      window.addEventListener("resize", sizeCanvas);
      // Mouse/touch interaction
      let interactionParticle: Particle | undefined;
      const onMouseMove = (e: MouseEvent) => {
        if (!interactionParticle) interactionParticle = networkRef.current!.createInteractionParticle();
        interactionParticle.x = e.offsetX;
        interactionParticle.y = e.offsetY;
      };
      const onMouseOut = () => {
        networkRef.current!.removeInteractionParticle();
        interactionParticle = undefined;
      };
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseout", onMouseOut);
      return () => {
        window.removeEventListener("resize", sizeCanvas);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseout", onMouseOut);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={styles["particle-network-animation"]}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100vh" }} />
      <div className={styles.glow + " " + styles["glow-1"]}></div>
      <div className={styles.glow + " " + styles["glow-2"]}></div>
      <div className={styles.glow + " " + styles["glow-3"]}></div>
    </div>
  );
};

export default ParticleNetworkAnimation;

