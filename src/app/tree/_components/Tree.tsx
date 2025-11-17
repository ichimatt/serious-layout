"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Tree.module.css";

type Direction = "above" | "below";

export type TreeProps = {
  historySteps: readonly Direction[];
  goalSteps: readonly Direction[];
};

export default function Tree({ historySteps, goalSteps }: TreeProps) {
  const [futurePath, setFuturePath] = useState<Direction[]>([]);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [goalMatchLevel, setGoalMatchLevel] = useState<number | null>(null);
  const futureNodeDots = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const goalCheckFrame = useRef<number | null>(null);

  const updateFutureNodeDot = (
    level: number,
    element: HTMLDivElement | null
  ) => {
    if (element) {
      futureNodeDots.current.set(level, element);
    } else {
      futureNodeDots.current.delete(level);
    }
  };

  const futureNodeMatchesGoal = (level: number) => {
    const futureDot = futureNodeDots.current.get(level);
    if (typeof document === "undefined") {
      return false;
    }
    const goalDot = document.getElementById(
      "goalNode"
    ) as HTMLDivElement | null;

    if (!futureDot || !goalDot) {
      return false;
    }

    const futureRect = futureDot.getBoundingClientRect();
    const goalRect = goalDot.getBoundingClientRect();
    const tolerance = 0.5;
    type RectKey = "top" | "left" | "width" | "height";
    const keys: RectKey[] = ["top", "left", "width", "height"];

    return keys.every(
      (key) => Math.abs(futureRect[key] - goalRect[key]) <= tolerance
    );
  };

  const handleFutureDecision = (level: number, direction: Direction) => {
    if (isGoalAchieved) {
      return;
    }

    setFuturePath((prev) => {
      if (level !== prev.length) {
        return prev;
      }

      return [...prev, direction];
    });
    scheduleGoalCheck(level);
  };

  const scheduleGoalCheck = (level: number) => {
    if (isGoalAchieved || typeof window === "undefined") {
      return;
    }

    if (goalCheckFrame.current !== null) {
      window.cancelAnimationFrame(goalCheckFrame.current);
    }

    goalCheckFrame.current = window.requestAnimationFrame(() => {
      goalCheckFrame.current = null;
      if (futureNodeMatchesGoal(level)) {
        setGoalMatchLevel(level);
        setIsGoalAchieved(true);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (goalCheckFrame.current !== null) {
        window.cancelAnimationFrame(goalCheckFrame.current);
      }
    };
  }, []);

  const renderFutureNode = (level: number): ReactNode => {
    const direction = level > 0 ? futurePath[level - 1] : undefined;
    const decision = futurePath[level];
    const isDecided = level < futurePath.length;
    const hasExistingChild = level + 1 < futurePath.length;
    const canOfferNextDecision =
      !isGoalAchieved && level + 1 === futurePath.length;
    const shouldRenderNext =
      isDecided && (hasExistingChild || canOfferNextDecision);
    const isGoalNode = goalMatchLevel === level;
    const classNames = [styles.futureNode, "future-node"];

    return (
      <div
        className={classNames.join(" ")}
        data-level={level}
        data-direction={direction ?? "root"}
        data-decision={decision ?? undefined}
        data-goal-match={isGoalNode ? "true" : undefined}
        data-state={isDecided ? "decided" : "undecided"}
      >
        <button
          className={styles.button}
          type="button"
          onClick={() => handleFutureDecision(level, "above")}
          disabled={isDecided}
          data-direction="up"
        >
          <div className={styles.buttonDot}></div>
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={() => handleFutureDecision(level, "below")}
          disabled={isDecided}
          data-direction="down"
        >
          <div className={styles.buttonDot}></div>
        </button>
        <div
          className={styles.nodeDot}
          ref={(element) => updateFutureNodeDot(level, element)}
        ></div>
        <ConnectionAscent />
        <ConnectionDescent />

        {shouldRenderNext && renderFutureNode(level + 1)}
      </div>
    );
  };

  return (
    <div className={styles.tree}>
      <div className={styles.sections}>
        <section className={styles.time}>
          <div className={styles.history}>
            {renderHistoryBranch(historySteps) ?? (
              <p>The history list is empty.</p>
            )}
          </div>
        </section>

        <section className={styles.time}>
          <div className={styles.future}>
            {renderGoalNode(goalSteps, isGoalAchieved) ?? (
              <p>The history list is empty.</p>
            )}

            {renderFutureNode(0)}
          </div>
        </section>
      </div>
    </div>
  );
}

function renderHistoryBranch(steps: readonly Direction[]): ReactNode {
  if (steps.length === 0) {
    return null;
  }

  return steps.reduceRight<ReactNode | null>((child, direction, index) => {
    const Connection =
      direction === "below" ? ConnectionAscent : ConnectionDescent;

    return (
      <div
        className={styles.historyNode}
        data-step={index}
        data-direction={direction}
      >
        <Connection />
        {child}
        <div className={styles.nodeDot}></div>
      </div>
    );
  }, null);
}

function renderGoalNode(
  steps: readonly Direction[],
  achieved: boolean
): ReactNode {
  if (steps.length === 0) {
    return null;
  }

  return steps.reduceRight<ReactNode | null>((child, direction, index) => {
    const isLastStep = index === steps.length - 1;

    return (
      <div
        className={styles.goalNode}
        data-step={index}
        data-direction={direction}
        data-goal={isLastStep}
      >
        {child}
        {isLastStep ? (
          <>
            <div
              id="goalNode"
              className={styles.nodeDot}
              data-goal="true"
              data-achieved={achieved ? "true" : "false"}
            >
              <HandDrawnFortyTwo />
              {!achieved && <HandDrawnArrowLeft />}
            </div>
          </>
        ) : null}
      </div>
    );
  }, null);
}

function ConnectionAscent() {
  return (
    <svg
      className={styles.ascender}
      width="52"
      height="28"
      viewBox="0 0 52 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 26H14.3333C18.3703 26 22.0114 23.5726 23.5641 19.8462L28.4359 8.15385C29.9886 4.42738 33.6297 2 37.6667 2H46" />
    </svg>
  );
}

function ConnectionDescent() {
  return (
    <svg
      className={styles.descender}
      width="52"
      height="28"
      viewBox="0 0 52 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2H14.3333C18.3703 2 22.0114 4.42738 23.5641 8.15385L28.4359 19.8462C29.9886 23.5726 33.6297 26 37.6667 26H46" />
    </svg>
  );
}

function HandDrawnArrowLeft() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#F2700E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.arrow}
    >
      <path d="M11.5269 6.84058C8.41185 8.52789 2.33748 12.0583 2.96051 12.6814C3.58353 13.3045 8.93104 15.9264 11.5269 17.1595" />
      <path d="M5.39844 12.447L21.084 11.6082" />
    </svg>
  );
}

function HandDrawnFortyTwo() {
  return (
    <svg
      className={styles.fortyTwo}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#823FF7"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.6867 38.785C14.7829 36.1529 22.0217 8.73516 18.7313 10.0512C15.441 11.3673 3.15784 28.0373 6.6673 27.818C9.47488 27.6425 19.9739 25.1128 24.8725 23.8698" />
      <path d="M28.5737 14.6457C29.7105 11.7406 33.9723 6.98707 37.9205 8.96108C41.8686 10.9351 41.836 16.6659 35.8574 24.6233C31.0853 30.9749 26.1148 35.9343 24.6523 37.4697L39.1289 35.4956" />
    </svg>
  );
}
