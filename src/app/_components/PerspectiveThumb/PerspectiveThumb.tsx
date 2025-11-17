"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import elephant from "../../assets/elephant.svg";
import styles from "./PerspectiveThumb.module.css";

type PerspectiveThumbProps = {
  revealIntervalMs?: number;
  revealBatchSize?: number;
};

export default function PerspectiveThumb({
  revealIntervalMs = 2000,
  revealBatchSize = 3,
}: PerspectiveThumbProps) {
  const inset = 22.5;
  const gap = 10;
  const diameter = 85;
  const viewBoxSize = 320;
  const step = diameter + gap;
  const positions = useMemo(
    () => [0, 1, 2].map((index) => inset + diameter / 2 + index * step),
    [inset, diameter, step]
  );
  const circlePositions = useMemo(() => {
    const entries: Array<{ id: string; cx: number; cy: number }> = [];
    positions.forEach((cy, row) => {
      positions.forEach((cx, col) => {
        entries.push({ id: `${row}-${col}`, cx, cy });
      });
    });
    return entries;
  }, [positions]);
  const circleIds = useMemo(
    () => circlePositions.map((position) => position.id),
    [circlePositions]
  );
  const normalizedCirclePositions = useMemo(
    () =>
      circlePositions.map(({ id, cx, cy }) => ({
        id,
        cx: cx / viewBoxSize,
        cy: cy / viewBoxSize,
      })),
    [circlePositions, viewBoxSize]
  );
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        setRevealed((prev) => {
          if (prev.size >= revealBatchSize) {
            return new Set();
          }

          const remaining = circleIds.filter((id) => !prev.has(id));
          if (remaining.length === 0) {
            return prev;
          }
          const nextId =
            remaining[Math.floor(Math.random() * remaining.length)];
          const next = new Set(prev);
          next.add(nextId);
          return next;
        });
        scheduleNext();
      }, revealIntervalMs);
    };

    scheduleNext();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [circleIds, revealBatchSize, revealIntervalMs]);

  return (
    <div className={styles.thumb}>
      <div className={styles.grid}>
        <svg
          className={styles.placeholders}
          width="320"
          height="320"
          viewBox="0 0 320 320 "
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {circlePositions.map(({ id, cx, cy }) => (
            <circle key={`static-${id}`} cx={cx} cy={cy} r={diameter / 2} />
          ))}
        </svg>

        <svg
          className={styles.mask}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="dots" clipPathUnits="objectBoundingBox">
              {normalizedCirclePositions.map(({ id, cx, cy }) => (
                <circle
                  key={id}
                  cx={cx}
                  cy={cy}
                  r={revealed.has(id) ? diameter / 2 / viewBoxSize : 0}
                />
              ))}
            </clipPath>
          </defs>
        </svg>
        <div className={styles.canvas}>
          <Image
            src={elephant}
            alt="Elephant illustration"
            className={styles.image}
          />
          <svg
            className={styles.outlines}
            width="320"
            height="320"
            viewBox="0 0 320 320 "
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {circlePositions.map(({ id, cx, cy }) => (
              <circle key={`static-${id}`} cx={cx} cy={cy} r={diameter / 2} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
