"use client";
import { useEffect } from "react";

const Bubbles = () => {
  useEffect(() => {
    const canvas = document.querySelector(".canvas") as HTMLElement | null;

    if (canvas) {
      for (let i = 0; i < 15; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const size = Math.random() * (100 - 5) + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `${Math.random() * 100}vh`;

        const animationDuration = Math.random() * (15 - 3) + 3;
        bubble.style.animation = `move${i + 1} infinite ${animationDuration}s`;

        const position = i % 2 === 0 ? "top right" : "center";
        bubble.style.background = `radial-gradient(ellipse at ${position}, #b8c6c6 0%, #30b3d3 46%, #20628c 100%)`;

        const keyframes = `
          @keyframes move${i + 1} {
            0% {
              bottom: -100px;
            }
            100% {
              bottom: ${Math.random() * 100}vh;
              transform: translate(${Math.random() * 300 - 100}px, 0);
              opacity: 0;
            }
          }
        `;

        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        canvas.appendChild(bubble);
      }
    }
  }, []);

  return null;
};

export default Bubbles;
