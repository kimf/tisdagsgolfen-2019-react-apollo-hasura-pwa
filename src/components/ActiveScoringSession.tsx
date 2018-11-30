import * as React from "react";
// @ts-ignore
import { useSpring, animated, interpolate } from "react-spring";
// @ts-ignore
import { useGesture } from "react-with-gesture";

const stayLimit = -100;
let currentPos = 0;
const topPos = -window.innerHeight + 80;

const whereToGo = (yDelta: number) => {
  if (yDelta < stayLimit) {
    currentPos = topPos;
  }

  if (yDelta > stayLimit) {
    currentPos = 0;
  }

  return currentPos;
};

const makeSureItsOk = (value: number) => {
  if (value > topPos) {
    return value;
  } else return topPos;
};

interface ScoringSession {
  starts_at: string;
  team_event: boolean;
  id: string;
}

const ActiveScoringSession = React.memo(
  ({ scoringSessions }: { scoringSessions: ScoringSession[] }) => {
    let [handlers, { down, yDelta }] = useGesture();

    const [{ y }] = useSpring({
      y: down ? makeSureItsOk(currentPos + yDelta) : whereToGo(yDelta),
      immediate: (name: string) => down && name === "y"
    });

    return (
      <animated.div
        {...handlers}
        className="active-scoring-session"
        style={{
          transform: interpolate([y], y => `translate3d(0,${y}px,0)`)
        }}
      >
        <h4 onClick={() => null}>Pågående runda!</h4>
      </animated.div>
    );
  }
);

export default ActiveScoringSession;
