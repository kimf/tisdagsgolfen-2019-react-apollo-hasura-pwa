import { useState, useEffect } from 'react';

// Usage
// Call hook multiple times to get animated values with different start delays
// const animation2 = useAnimation('elastic', 600, 150);
// style = {{
//   marginTop: animation2 * 200 - 100
// }}

function useAnimation(
  easingName: 'linear' | 'elastic' | 'inExpo' = 'linear',
  duration: number = 500,
  delay: number = 0
) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
interface Easing {
  linear: (n: number) => number;
  elastic: (n: number) => number;
  inExpo: (n: number) => number;
}
const easing: Easing = {
  linear: n => n,
  elastic: n =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: n => Math.pow(2, 10 * (n - 1))
};

function useAnimationTimer(duration: number = 1000, delay: number = 0) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame: number, timerStop: NodeJS.Timeout, start: number;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        },                     duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}

export default useAnimation;
