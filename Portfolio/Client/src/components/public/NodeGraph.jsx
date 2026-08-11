import React, { useEffect, useRef } from "react";

export default function NodeGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Mouse tracking for gentle attraction (lerp target)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Colors
    const colorAccent = "#FFB84D"; // warm amber
    const colorAccent2 = "#6EE7B7"; // mint teal

    // Create 16 nodes (alternating colors)
    const nodeCount = 16;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      baseX: Math.random() * (width - 100) + 50,
      baseY: Math.random() * (height - 100) + 50,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 3.5,
      color: i % 2 === 0 ? colorAccent : colorAccent2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      pulseTime += 0.02;

      // Draw connections
      const maxDistance = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35 * (0.7 + 0.3 * Math.sin(pulseTime + i + j));
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color === colorAccent ? `rgba(255, 184, 77, ${alpha})` : `rgba(110, 231, 183, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        if (!isReducedMotion) {
          // Slow drift
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 30 || node.x > width - 30) node.vx *= -1;
          if (node.y < 30 || node.y > height - 30) node.vy *= -1;

          // Gentle attraction to cursor position if hovered
          if (mouse.isHovered) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220 && dist > 1) {
              const force = (220 - dist) / 220 * 0.08;
              node.x += (dx / dist) * force;
              node.y += (dy / dist) * force;
            }
          }
        }

        // Draw node glow
        const glowRadius = node.radius * 3.5;
        const radialGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );
        const baseRgb = node.color === colorAccent ? "255, 184, 77" : "110, 231, 183";
        radialGradient.addColorStop(0, `rgba(${baseRgb}, 0.8)`);
        radialGradient.addColorStop(0.5, `rgba(${baseRgb}, 0.2)`);
        radialGradient.addColorStop(1, `rgba(${baseRgb}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = radialGradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0 flex items-center justify-center">
      {/* Subtle radial background glow using --accent & --accent-2 at low opacity */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, var(--accent-2) 60%, transparent 100%)",
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />
    </div>
  );
}
