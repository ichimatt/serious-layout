"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import faceA from "../assets/faces/a.svg";
import faceB from "../assets/faces/b.svg";
import faceC from "../assets/faces/c.svg";
import faceD from "../assets/faces/d.svg";
import faceE from "../assets/faces/e.svg";

const CARD_STATES = ["fourth", "third", "upNext", "onDeck", "swiped"] as const;
const ROTATION_MS = 1000;

type CardState = (typeof CARD_STATES)[number];

type Card = {
  id: string;
  name: string;
  score: string;
  image: StaticImageData;
};

const CARDS: Card[] = [
  { id: "a", name: "Anna", score: "382", image: faceA },
  { id: "b", name: "Suzy", score: "406", image: faceB },
  { id: "c", name: "Margot", score: "442", image: faceC },
  { id: "d", name: "Agatha", score: "375", image: faceD },
  { id: "e", name: "Tilda", score: "439", image: faceE },
];

export default function Swipey() {
  const [offset, setOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // return;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setOffset((previous) => (previous + 1) % CARD_STATES.length);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const deck = useMemo(
    () =>
      CARDS.map((card, index) => {
        const state = CARD_STATES[
          (index + offset) % CARD_STATES.length
        ] as CardState;
        return { ...card, state };
      }),
    [offset]
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.cardDeck}>
          {deck.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className={`${styles.card} ${styles[card.state]}`}
              data-state={card.state}
              data-card-id={card.id}
              aria-label={`${card.name} is ${card.state}`}
            >
              <div className={styles.avatarWrapper}>
                <Image
                  src={card.image}
                  alt={`${card.name}'s avatar`}
                  className={styles.avatar}
                  priority={card.state === "onDeck"}
                />
              </div>
              {/* <p className={styles.name}>{card.state}</p> */}
              <h2 className={styles.score}>{card.score}</h2>
              <p className={styles.name}>{card.name}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
