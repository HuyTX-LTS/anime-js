import React, { useEffect, useRef } from "react";
import { animate, createTimeline, createTimer, stagger, utils } from "animejs";

import "./creature.css";

const CreatureEffect: React.FC = () => {
  const creatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = { x: 0, y: 0 };
    const viewport = {
      w: window.innerWidth * 0.5,
      h: window.innerHeight * 0.5,
    };
    const rows = 10; // Number of rows and columns in the grid
    const grid = [rows, rows];
    const from = "center";
    const scaleStagger = stagger([2, 5], { ease: "inQuad", grid, from });
    const opacityStagger = stagger([1, 0.1], { ease: "inQuad", grid, from });
    const creatureEl = creatureRef.current;

    if (!creatureEl) return;

    // Clear previous children
    const div = creatureEl.querySelectorAll("div");
    if (div?.length) {
      for (let index = 0; index < div?.length; index++) {
        creatureEl.removeChild(div[index]);
      }
    }

    // Generate grid
    const rowCol = rows * rows;
    for (let i = 0; i < rowCol; i++) {
      const div = document.createElement("div");
      creatureEl.appendChild(div);
    }

    const particuleEls = creatureEl.querySelectorAll("div");

    utils.set(creatureEl, {
      width: `${rows * 10}em`,
      height: `${rows * 10}em`,
    });

    utils.set(particuleEls, {
      x: 0,
      y: 0,
      scale: scaleStagger,
      opacity: opacityStagger,
      // background: stagger([80, 20], {
      //   grid,
      //   from,
      // modifier: (v) => `hsl(4, 70%, ${v}%)`,
      // }),
      boxShadow: stagger([8, 1], {
        grid,
        from,
        modifier: (v) => `0px 0px ${utils.round(v, 0)}em 0px var(--red)`,
      }),
      // zIndex: stagger([rows * rows, 1], {
      //   grid,
      //   from,
      //   modifier: utils.round(0),
      // }),
      zIndex: -1,
    });

    const pulse = () => {
      animate(particuleEls, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: stagger(90, { start: 1650, grid, from }),
            duration: 150,
          },
          {
            scale: scaleStagger,
            opacity: opacityStagger,
            ease: "inOutQuad",
            duration: 600,
          },
        ],
      });
    };

    const mainLoop = createTimer({
      // frameRate: 120, // Animate to the new cursor position every 250ms
      onUpdate: () => {
        animate(particuleEls, {
          x: cursor.x,
          y: cursor.y,
          delay: stagger(40, { grid, from }),
          duration: stagger(120, { start: 750, ease: "inQuad", grid, from }),
          ease: "inOut",
          composition: "blend", // This allows the animations to overlap nicely
        });
      },
    });

    const autoMove = createTimeline()
      .add(
        cursor,
        {
          x: [-viewport.w * 0.45, viewport.w * 0.45],
          modifier: (x) =>
            x + Math.sin(mainLoop.currentTime * 0.0007) * viewport.w * 0.5,
          duration: 3000,
          ease: "inOutExpo",
          alternate: true,
          loop: true,
          onBegin: pulse,
          onLoop: pulse,
        },
        0
      )
      .add(
        cursor,
        {
          y: [-viewport.h * 0.45, viewport.h * 0.45],
          modifier: (y) =>
            y + Math.cos(mainLoop.currentTime * 0.00012) * viewport.h * 0.5,
          duration: 1000,
          ease: "inOutQuad",
          alternate: true,
          loop: true,
        },
        0
      );

    const manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: () => autoMove.play(),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const followPointer = (e: any) => {
      const event = e.type === "touchmove" ? e.touches[0] : e;
      cursor.x = event.pageX - viewport.w;
      cursor.y = event.pageY - viewport.h;
      autoMove.pause();
      manualMovementTimeout.restart();
    };

    document.addEventListener("mousemove", followPointer); // Listen for mouse movements (desktop)
    document.addEventListener("touchmove", followPointer); // Listen for touch movements (mobile devices)

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousemove", followPointer);
      document.removeEventListener("touchmove", followPointer);
    };
  }, []);

  return (
    <div id="creature-wrapper">
      <div ref={creatureRef} id="creature" />
    </div>
  );
};

export default CreatureEffect;
